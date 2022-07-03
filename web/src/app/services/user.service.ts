import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../common/user';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl + "/user";

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`${this.apiServerUrl}/all`);
  }

  public deleteUserById(uid: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${this.apiServerUrl}/byId?id=${uid}`);
  }

  public updateUser(user: User): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(`${this.apiServerUrl}`, user);
  }
}
