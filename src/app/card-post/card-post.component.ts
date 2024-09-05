import { Component, Input, OnInit } from '@angular/core';
import { post } from '../models/post.model';
import { DataService } from '../services/data.service';
import { comment } from '../models/comment.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})
export class CardPostComponent implements OnInit {
  @Input() post!: post;
  comments: comment[]= [];
  comment= {
    body: '',
    email: '',
    name: '',
  };
  commentsVisible: boolean = false;
  onOff: boolean= false;
  constructor(private dataService: DataService, private authService: AuthService){}
  toggleComments() {
    this.commentsVisible = !this.commentsVisible;
  }
  apriForm(){
    this.onOff = !this.onOff;
  }
   ngOnInit(): void {
    this.loadComments();
  }
  loadComments(): void {
    this.dataService.getProtectedData('/posts/' + this.post.id + '/comments').subscribe({
      next: (data) => {
        this.comments = data;
        console.log('Commenti caricati:', data);
      },
      error: (error) => {
        console.error('Errore nel recupero dei commenti:', error);
      }
    });
  }
  addComment(comment: { name: string; email: string; body: string }): void {
    this.authService.addComment(this.post.id, comment).subscribe({
      next: (response) => {
        console.log('Commento aggiunto con successo:', response);
        this.loadComments();  
      },
      error: (error) => {
        console.error('Errore durante l\'aggiunta del commento:', error);
      }
    });
  }
  onSubmit(): void {
    console.log(this.comment)
    this.apriForm();
    this.addComment(this.comment)
    this.comment= {
      body: '',
      email: '',
      name: '',
    };
  }
}