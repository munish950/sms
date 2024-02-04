import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { PostParamater } from '../data/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPostComponent {
  @Input()
  posts: PostParamater[] = [];
  @Output()
  postId = new EventEmitter<number>();
  @Output()
  viewComments = new EventEmitter<number>();

  ngOnChanges() {
    console.log('posts', this.posts);
  }

  editPost(id: number) {
    this.postId.emit(id);
  }

  

}
