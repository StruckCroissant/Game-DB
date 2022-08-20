import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Game} from "../../common/game";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-saved-games-page',
  templateUrl: './saved-games-page.component.html',
  styleUrls: ['./saved-games-page.component.css']
})
export class SavedGamesPageComponent implements OnInit {
  gameSearch: string = '';
  games: Array<Game> | undefined;
  user: string | null = '';

  constructor(
    private userAuthService: AuthenticationService,
    private gameService: GameService
    ) { }

  ngOnInit(): void {
    this.getSavedGames();
    this.user = JSON.parse(localStorage.getItem('user') || '{}').username;
    console.log(this.user);
  }

  searchGames() {
    console.log('searching for ' + this.gameSearch);
  }

  logSearch() {
    console.log(this.gameSearch);
  }

  getSavedGames() {
    this.gameService.getSavedGames();
  }
}
