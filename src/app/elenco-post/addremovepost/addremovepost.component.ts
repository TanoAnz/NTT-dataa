import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-addremovepost',
  templateUrl: './addremovepost.component.html',
  styleUrl: './addremovepost.component.css'
})
export class AddremovepostComponent {
  id='';
  isFormVisible= false;
  isFormVisible1= false;
  post={
    title: '',
    body: '',
    user_id: '',
  };
  constructor(private dataService: DataService){}
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
  toggleForm1(): void {
    this.isFormVisible1 = !this.isFormVisible;
  }
  onSubmit(): void {
    this.dataService.addData(`/posts`, this.post).subscribe({
      next: (response) => {
        console.log(response)
        this.isFormVisible= false;
        
      },
      error: (err) => {
        console.error('Errore nella pubblicazione del post', err);
      }
    });
  }
  onDelete(): void {
    this.dataService.deleteData(`/posts/${this.id}`).subscribe({
      next: () => {
        this.isFormVisible1= false;
      },
      error: (err) => {
        console.error('Errore nella pubblicazione del post', err);
      }
    })
  }
}