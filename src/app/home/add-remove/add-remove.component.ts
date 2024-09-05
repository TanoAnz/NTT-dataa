import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-addremove',
  templateUrl: './add-remove.component.html',
  styleUrl: './add-remove.component.css'
})
export class AddremoveComponent {
  isFormVisible = false;
  isFormVisible1 = false;
  user = {
    name: '',
    email: '',
    gender:'',
    status:'',
    
  };
  id!: number;
  constructor(private authService: AuthService){}


  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
  toggleForm1(): void {
    this.isFormVisible1 = !this.isFormVisible;
  }

  onSubmit(): void {
    this.authService.addUser(this.user).subscribe({
      next: (response) => {
        console.log('Utente creato:', response);
        this.isFormVisible = false;
        window.location.reload();
      },
      error: (error) => {
        console.error('Errore nella creazione dell\'utente:', error);
        if (error.status === 422) {
          console.error('Problema di validazione:', error.error);
        }
      }
    });
  }
  deleteUser(userId: number): void {
    this.authService.deleteUser(userId).subscribe({
      next: ()=> {
      console.log('Utente rimosso');
      this.isFormVisible1 = false;
      window.location.reload();
    },
    error: (err) =>{
      throw new Error('Error nella cancellazione utente')
    }

    });
  }
}