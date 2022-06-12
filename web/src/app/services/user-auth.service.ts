import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../common/user";
import {ApiResponse} from "../common/api-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private apiServerUrl = environment.apiBaseUrl + "/user";

  private default = new BehaviorSubject(new User('',''));
  currentUser = this.default.asObservable();

  constructor(private http: HttpClient) { }

  changeUser(user: User) {
    this.default.next(user);
  }

  public loginUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiServerUrl}/login`, user);
  }

  public registerUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.apiServerUrl}/register`,user);
  }
}
