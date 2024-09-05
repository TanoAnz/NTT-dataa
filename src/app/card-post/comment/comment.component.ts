import { Component, Input } from '@angular/core';
import { comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
@Input() comment!: comment;
}
