import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGamesPageComponent } from './search-games-page.component';

describe('SearchGamesPageComponent', () => {
  let component: SearchGamesPageComponent;
  let fixture: ComponentFixture<SearchGamesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchGamesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
