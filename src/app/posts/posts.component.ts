import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post, PostParamater } from '../data/post';
import { PostService } from '../services/post.service';
import { ListPostComponent } from '../list-post/list-post.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, ListPostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  posts$: Observable<PostParamater[]>;
  postDetails$: Observable<PostParamater|null> = new Observable<null>();

  constructor(
    private readonly postService: PostService,
    private readonly router: Router,
    ) {
    this.posts$ = this.postService.getPosts().pipe(map(posts => {
      return posts.map(post => Post.fromApi(post));
    }));
  }

  editPost(postId: number) {
    this.router.navigate(['create-post', postId]);
  }

  viewPostComments(postId: number) {
    this.router.navigate(['post', postId]);
  }

}
