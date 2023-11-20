package com.StruckCroissant.GameDB.core.game;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.StruckCroissant.GameDB.TestDbConfig;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@TestPropertySource(locations = "classpath:test.properties")
@ContextConfiguration(classes = {TestDbConfig.class, GameDAOImpl.class})
@SpringBootTest
public class GameDAOImplTest {

  @Qualifier("db-game")
  @Autowired
  private GameDAOImpl underTest;

  @Qualifier("testTemplate")
  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Test
  public void shouldGetAllGames() {
    // given
    // nothing
    // when
    List<Game> allGames = underTest.selectAllGames();

    // then
    allGames.forEach((game) -> assertThat(game).isInstanceOf(Game.class));
    assertThat(allGames.size()).isGreaterThanOrEqualTo(30250);
  }

  @Test
  public void shouldGetGameById() {
    // given
    int[] validGames = {1, 2, 3, 4, 5};
    int[] invalidGames = {-4, -56, -3, 879627};
    List<Optional<Game>> validResult = new ArrayList<>();
    List<Optional<Game>> invalidResult = new ArrayList<>();

    // when
    for (int gameInt : validGames) {
      Optional<Game> currentGameOpt = underTest.selectGameById(gameInt);
      validResult.add(currentGameOpt);
    }
    for (int gameInt : invalidGames) {
      Optional<Game> currentGameOpt = underTest.selectGameById(gameInt);
      invalidResult.add(currentGameOpt);
    }

    // then
    validResult.forEach((gameOpt) -> assertThat(gameOpt).get().isInstanceOf(Game.class));
    invalidResult.forEach((gameOpt) -> assertThat(gameOpt).isEmpty());
  }

  @Test
  public void shouldGetRelatedGames() {
    // given
    int id = 40;

    // when
    List<Game> result = underTest.selectRelatedGames(id);

    // then
    assertThat(result.size()).isGreaterThan(0);
    result.forEach((game) -> assertThat(game).isInstanceOf(Game.class));
  }
}
