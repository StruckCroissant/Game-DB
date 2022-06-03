import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl + "/user";

  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}`, user);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}`);
  }

  public getUserById(uid: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/byId?id=${uid}`);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/byUsername?username=${username}`);
  }

  public deleteUserById(uid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/byId?id=${uid}`);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user`, user);
  }
}
