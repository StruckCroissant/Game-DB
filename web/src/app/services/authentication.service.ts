import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../common/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiServerUrl = environment.apiBaseUrl;

  authenticated = false;
  private default = new BehaviorSubject({username: '', password: ''});
  currentUser = this.default.asObservable();

  constructor(private http: HttpClient) { }

  changeUser(user: User) {
    this.default.next(user);
  }

  public loginUser(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.apiServerUrl}/login`, user,
      {observe: 'response'});
  }

  public registerUser(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.apiServerUrl}/register`,
      user,
      {observe: 'response'}
    );
  }

  authenticate(credentials: any, callback: any) {
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    }: {});

    this.http.get(
      this.apiServerUrl + '/user',
      {headers: headers}).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.authenticated = res != null;
          return callback && callback();
        },
        error: (err) => {
          console.log(err.message);
        }
      }

    );
  }

  getAuthUser(): string | null {
    if(localStorage.getItem('username')) {
      return localStorage.getItem('username');
    }
    return null;
  }

  setAuthUser(username: string): void {
    localStorage.setItem('username', username);
  }

  setAuthenticated(authenticated: boolean): void {
    localStorage.setItem('authenticated', JSON.stringify(authenticated));
  }

  getAuthenticated(): boolean {
    if(localStorage.getItem('authenticated')) {
      return JSON.parse(localStorage.getItem('authenticated') || 'false');
    }
    return false;
  }
}
