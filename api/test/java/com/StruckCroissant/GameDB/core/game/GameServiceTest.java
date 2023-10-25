package com.StruckCroissant.GameDB.core.game;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.StruckCroissant.GameDB.exception.exceptions.GameNotFoundException;
import java.util.Arrays;
import java.util.Optional;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class GameServiceTest {

  @Mock private GameDAOImpl gameDao;
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
    Game game = getTestGame();
    int gid = game.getGid();
    when(gameDao.selectGameById(game.getGid())).thenReturn(Optional.of(game));

    // when
    underTest.getGameById(gid);

    // then
    ArgumentCaptor<Integer> gidArgumentCaptor = ArgumentCaptor.forClass(Integer.class);

    verify(gameDao).selectGameById(gidArgumentCaptor.capture());
    int capturedGid = gidArgumentCaptor.getValue();

    assertThat(capturedGid).isEqualTo(gid);
  }

  @Test
  public void shouldGetRelatedGames() {
    // given
    Game game = getTestGame();
    int gid = game.getGid();
    when(gameDao.selectRelatedGames(gid)).thenReturn(Arrays.stream(new Game[] {game}).toList());
    when(gameDao.selectGameById(gid)).thenReturn(Optional.of(game));

    // when
    underTest.getRelatedGames(gid);

    // then
    ArgumentCaptor<Integer> gidArgumentCaptor = ArgumentCaptor.forClass(Integer.class);

    verify(gameDao).selectRelatedGames(gidArgumentCaptor.capture());
    int capturedGid = gidArgumentCaptor.getValue();

    assertThat(capturedGid).isEqualTo(gid);
  }

  @Test
  public void shouldThrowException_onInvalidRelatedGid() {
    // given
    int gid = -1;
    when(gameDao.selectGameById(gid)).thenReturn(Optional.empty());

    // when
    Throwable thrown = catchThrowable(() -> underTest.getRelatedGames(gid));

    // then
    assertThat(thrown).isExactlyInstanceOf(GameNotFoundException.class);
  }

  private Game getTestGame() {
    return new Game(
        1,
        "gname",
        "desc",
        "cost",
        "url",
        "Rating",
        1,
        "Desc",
        Arrays.asList("Action", "Adventure"),
        "franchise",
        "rdate",
        26890);
  }
}
