import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../data/apiResponse';
import { User } from '../data/user';
import { Observable, catchError, map, throwError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = 'http://localhost:3000';
  constructor(private readonly httpClient: HttpClient) { }

  login(email: string, password: string): Observable<ApiResponse<User[]>> {
    const postData = { email, password };
    return this.httpClient.post<ApiResponse<User[]>>(this.url + '/users/login', postData);
  }

  private getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }
}
