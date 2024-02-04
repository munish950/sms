import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { CreatePostComponent } from './create-post/create-post.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'create-post', component: CreatePostComponent},
    {path: 'create-post/:postId', component: CreatePostComponent},
    {path: 'post/:postId', component: PostCommentsComponent}
];
