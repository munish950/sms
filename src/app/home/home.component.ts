import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post, PostParamater } from '../data/post';
import { PostService } from '../services/post.service';
import { ListPostComponent } from '../list-post/list-post.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListPostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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