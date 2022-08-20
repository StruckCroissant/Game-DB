import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiServerUrl = environment.apiBaseUrl + "/game";

  constructor(private httpClient: HttpClient) { }

  public getSavedGames(): void {
    this.httpClient.get(`${this.apiServerUrl}/all`);
  }
}
