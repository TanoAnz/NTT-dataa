import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  utenti: User[] = [];
  recordsPerPage: number = 10;
  recordOptions: number[] = [5, 10, 15, 20, 30];
  searchTerm: string = '';

  constructor(private authService: AuthService){}

  fetchUsers(): void {
    this.authService.getUsers(this.recordsPerPage).subscribe({
      next: (data: User[]) => {
        this.utenti = data;
      },
      error: (err) => {
        console.error('Errore nel recupero degli utenti', err);
      }
    });
 }
 cercaUtenti(): void{
  this.authService.getUser(this.searchTerm).subscribe({
    next: (data: User) => {
      console.log('utente', data)
      this.utenti= [];
      this.utenti.push(data);
    },
    error: (err) => {
      console.error('Errore nella ricerca', err);
    }
  })
 }

ngOnInit(): void {
  this.fetchUsers()
}

}
