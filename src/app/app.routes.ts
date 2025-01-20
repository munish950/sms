import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsComponent } from './posts/posts.component';
import { activateGuard } from './utils/activate-guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'create-post', component: CreatePostComponent, canActivate: [activateGuard]},
    {path: 'create-post/:postId', component: CreatePostComponent},
    {path: 'post', component: PostsComponent},
    {path: 'post/:postId', component: PostCommentsComponent}
];
