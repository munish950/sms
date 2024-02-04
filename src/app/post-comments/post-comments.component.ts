import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Comment } from '../data/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.scss'
})
export class PostCommentsComponent {
  postId: number|undefined;
  comments: Comment[] = [];
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService
    ){
    this.postId = this.route.snapshot.params['postId'];
  }

  ngOnInit() {
    if(this.postId) {
      this.postService.getComments(this.postId).subscribe(data => this.comments = data);
    }
  }

}
