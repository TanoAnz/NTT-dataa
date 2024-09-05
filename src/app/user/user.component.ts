import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { User } from '../models/User.model';
import { post } from '../models/post.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  id!: any;
  user!: User;
  posts: post[]= [];
  
constructor(private route: ActivatedRoute, private dataService: DataService){}
  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id')
   
    this.dataService.getProtectedData('users/' + this.id + '/posts').subscribe({
      next: (data) => {
        console.log('Posts Utente:', data)
        this.posts= data;
      },
      error: (err) => {
        throw new Error('errore nel recupero utenti', err);
      }
    });
    this.dataService.getProtectedData('users/' + this.id).subscribe({
      next: (data) => {
        console.log('Utente:', data)
        this.user = data;
      },
      error: (err) => {
        throw new Error('errore nel recupero utenti', err);
      }
    })
  }


}