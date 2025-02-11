import { Component} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreatePostParameter, Post } from "../data/post";
import { CommonModule } from "@angular/common";
import { map } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../services/post.service";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-create-post",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: "./create-post.component.html",
  styleUrl: "./create-post.component.scss",
})
export class CreatePostComponent {
  postId: number | undefined;
  postDetails: Post | null = null;
  mode: string = "Create";

  postForm = this.fb.nonNullable.group({
    title: ["", Validators.required],
    body: [""],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly postService: PostService) {
    const params = this.activatedRoute.snapshot.params
    this.postId = params['postId'];
  }

  ngOnInit() {
    if(this.postId) {
      this.postService.getPost(this.postId)
        .pipe(map(post => Post.fromApi(post)))
        .subscribe(postDetail => {
          this.postDetails = postDetail;
          this.postForm.setValue({ title: postDetail.title, body: postDetail.body });
          this.mode = "Edit";
        });
    }
  }

  updatePost(postInfo: Post) {
    this.postService.updatePost(String(postInfo.id), postInfo.toApi()).subscribe(() => {
      this.router.navigateByUrl("/");
    });
  }

  createPost(values: CreatePostParameter) {
    this.postService.createPost(values).subscribe(()=>{
      this.router.navigateByUrl("/");
    });
  }

  postSubmit() {
    if(this.postForm.valid) {
      const controls = this.postForm.controls;
      let formValue = {title: controls.title.value, body: controls.body.value};
      if(this.postDetails) {
        this.postDetails.title = formValue.title;
        this.postDetails.body = formValue.body;
        this.updatePost(this.postDetails);
      } else {
        this.createPost(formValue);
      }
    }
  }

  toListPost() {
    this.router.navigateByUrl("/");
  }
}

  