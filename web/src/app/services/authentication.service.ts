import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../common/user";
import {environment} from "../../environments/environment";
import {UserCredentials} from "../common/user-credentials";
import {PrincipalResponse} from "../common/principal-response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiServerUrl = environment.apiBaseUrl;

  private authenticated: boolean = false;

  private authHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  public loginUser(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.apiServerUrl}/login`, user,
      {observe: 'response'});
  }

  public registerUser(credentials: UserCredentials): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.apiServerUrl}/register`,
      credentials,
      {observe: 'response'}
    );
  }

  authenticate(credentials: any, callback: any) {
    let userAuthData: string = '';
    this.authHeaders = new HttpHeaders(credentials ? {
      authorization : (userAuthData = 'Basic ' + btoa(credentials.username + ':' + credentials.password))
    }: {});

    this.http.get<PrincipalResponse>(
      this.apiServerUrl + '/user',
      {headers: this.authHeaders}).subscribe(
      {
        next: (res) => {
          this.authenticated = res != null; // todo: instead of null, check 'authenticated' field in response
          if(this.authenticated) {
            let user: User = {
              authData: userAuthData,
              username: res.name
            }
            localStorage.setItem('user', JSON.stringify(user));
          }
          return callback && callback();
        },
        error: (err) => {
          console.log(err.message);
        }
      }

    );
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('user');
  }
}
