import { Component, Input } from '@angular/core';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-card-social',
  templateUrl: './card-social.component.html',
  styleUrl: './card-social.component.css'
})
export class CardSocialComponent {
@Input() user!: User;
isOnline(status: string){
  if(status == 'active'){
    return true;
  } else {
    return false;
  }
  
}
}
