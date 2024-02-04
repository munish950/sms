import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment, CreatePostParameter, PostApiParamater } from '../data/post';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly url = 'https://jsonplaceholder.typicode.com/posts';
  posts$: BehaviorSubject<PostApiParamater[]> = new BehaviorSubject<PostApiParamater[]>([]);

  constructor(private readonly httpClient: HttpClient) { }

  getPosts(): Observable<PostApiParamater[]> {
    if(this.posts$.getValue().length) {
      return this.posts$;
    }
    
    return this.httpClient.get<PostApiParamater[]>(this.url).pipe(tap(data => this.posts$.next(data)));
  }

  getPost(id: number): Observable<PostApiParamater> {
    return this.httpClient.get<PostApiParamater>(`${this.url}/${id}`);
  }

  createPost(post: CreatePostParameter): Observable<PostApiParamater> {
    return this.httpClient.post<PostApiParamater>(this.url, JSON.stringify(post), {headers: this.getHeader()});
  }

  updatePost(id: string, post: PostApiParamater): Observable<PostApiParamater> {
    return this.httpClient.put<PostApiParamater>(`${this.url}/${id}`, JSON.stringify(post), {headers: this.getHeader()});
  }

  deletePost(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getHeader(): HttpHeaders {
    return new HttpHeaders({'Content-type': 'application/json',  'charset': 'UTF-8'});
  }

  getComments(postId: number) {
    return this.httpClient.request<Comment[]>('GET', `${this.url}/${postId}/comments`);
  }
}
