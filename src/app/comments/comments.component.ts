import { Component, Input, OnChanges } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Comment, DataService } from '../data/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnChanges {
  @Input() postId: number | undefined;
  comments: Observable<Comment[]> | undefined;
  constructor(private data: DataService) {
  }

  ngOnChanges() {
    this.comments = this.data.getComments().pipe(
      map((comments) => {
        return comments.filter((comment) => {
          return comment.postId === this.postId;
        })
      })
    );
  }
}
