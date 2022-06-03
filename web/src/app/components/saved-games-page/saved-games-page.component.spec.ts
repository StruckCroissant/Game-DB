import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedGamesPageComponent } from './saved-games-page.component';

describe('SavedGamesPageComponent', () => {
  let component: SavedGamesPageComponent;
  let fixture: ComponentFixture<SavedGamesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedGamesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
