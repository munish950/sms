import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { PostParamater } from "../data/post";
import { CommonModule } from "@angular/common";
import { OrderListModule } from "primeng/orderlist";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-list-post",
  standalone: true,
  imports: [CommonModule, OrderListModule, ButtonModule],
  templateUrl: "./list-post.component.html",
  styleUrl: "./list-post.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPostComponent {
  @Input()
  posts: PostParamater[] = [];
  @Output()
  postId = new EventEmitter<number>();
  @Output()
  viewComments = new EventEmitter<number>();

  editPost(id: number) {
    this.postId.emit(id);
  }
}
