import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { User } from '../common/user';
import { ApiResponse } from "../common/api-response";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl + "/user";

  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiServerUrl}`, user);
  }

  public getAllUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiServerUrl}/all`);
  }

  public getUserById(uid: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiServerUrl}/byId?id=${uid}`);
  }

  public getUserByUsername(username: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiServerUrl}/byUsername?username=${username}`);
  }

  public deleteUserById(uid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/byId?id=${uid}`);
  }

  public updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiServerUrl}`, user);
  }
}
