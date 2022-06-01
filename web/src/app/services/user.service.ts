import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from './userInterface';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addUser(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${this.apiServerUrl}/user`, user);
  }

  public getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.apiServerUrl}/user`);
  }

  public getUserById(uid: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.apiServerUrl}/user/${uid}`);
  }

  public deleteUserById(uid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user${uid}`);
  }

  public updateUser(user: UserInterface): Observable<UserInterface> {
    return this.http.put<UserInterface>(`${this.apiServerUrl}/user`, user);
  }
}
