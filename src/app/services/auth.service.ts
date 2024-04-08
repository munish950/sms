import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = 'http://localhost:3000';
  constructor(private readonly httpClient: HttpClient) { }

  login(email: string, password: string) {
    const postData =  {email, password};
    return this.httpClient.post(this.url + '/users/login', postData, {headers: this.getHeaders()});
  }

  private getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }
}
