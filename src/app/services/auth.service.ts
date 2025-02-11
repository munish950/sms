import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiResponse } from "../data/apiResponse";
import { User } from "../data/user";
import { Observable,tap, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly url = 'http://localhost:3000';
  private isLoggenIn = new BehaviorSubject<boolean>(false);

  constructor(private readonly httpClient: HttpClient) { }

  isAuthenticate(): Observable<boolean> {
    return this.isLoggenIn;
  }

  login(email: string, password: string): Observable<ApiResponse<User[]>> {
    const postData = { email, password };
    return this.httpClient.post<ApiResponse<User[]>>(this.url + '/users/login', postData)
    .pipe(tap((response: ApiResponse<User[]>) => {
      if (!response) {
        throw new Error('Unable to login at the moment');
      }
      if(response.success && response.data.length && response.data[0].accessToken) {
        this.isLoggenIn.next(true);
      }
    }));
  }

  logout() {
    this.isLoggenIn.next(false);
  }

  private getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }
}
