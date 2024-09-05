import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { post } from '../models/post.model';

@Component({
  selector: 'app-elenco-post',
  templateUrl: './elenco-post.component.html',
  styleUrl: './elenco-post.component.css'
})
export class ElencoPostComponent implements OnInit {
  posts: post[]= [];
  recordPerPage=10;
constructor(private dataService: DataService){}
  ngOnInit(): void {
    this.dataService.getProtectedData('/posts?page=1&per_page=' + this.recordPerPage).subscribe({
      next: (data) => {
        console.log(data);
        this.posts= data;
      },
      error: (err) =>{
        throw new Error('errore nel recupero dei post', err);
      }
    })
  }
  fetchPost(){
    this.recordPerPage+=10;
    this.ngOnInit();
    
  }

}