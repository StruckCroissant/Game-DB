package com.StruckCroissant.GameDB.core.game;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

public class GameServiceTest {

  @Mock
  private GameDAOImpl gameDao;
  private AutoCloseable autoCloseable;
  private GameService underTest;

  @Before
  public void setUp() {
    autoCloseable = MockitoAnnotations.openMocks(this);
    underTest = new GameService(gameDao);
  }

  @After
  public void tearDown() throws Exception {
    autoCloseable.close();
  }

  @Test
  public void canGetAllGames() {
    // when
    underTest.getAllGames();
    // then
    verify(gameDao).selectAllGames();
  }

  @Test
  public void canGetGameById() {
    // given
    int expectedId = 1;
    Game game = new Game(
        1,
        "gname",
        "desc",
        "cost",
        "url",
        "Rating",
        1,
        "Desc",
        "rdate",
        26890
    );
    when(gameDao.selectGameById(expectedId)).thenReturn(Optional.of(game));

    // when
    underTest.getGameById(expectedId);

    // then
    verify(gameDao).selectGameById(expectedId);
  }
}