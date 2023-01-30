import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataService, Post, User } from '../data/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  //changeDetection: ChangeDetectionStrategy.Default
})
export class PostsComponent implements OnChanges {
  @Input() user: User | undefined;
  showAll = false;

  posts: Observable<Post[]> | undefined;
  selectedPost: Post | undefined;

  constructor(private data: DataService) { }

  ngOnChanges() {
    this.posts = this.data.getPosts().pipe(map((posts) => {
      return posts.filter((post) => post.userId === this.user?.id);
    }))
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  selectPost(post: Post) {
    this.selectedPost = post;
  }

}
