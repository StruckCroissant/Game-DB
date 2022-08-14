package com.StruckCroissant.GameDB.core.game;

import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
public class GameControllerTest {


  private final String BASE_URL = "api/v1/game";
  private final String ALL_URL = BASE_URL + "/all";
  private final String BY_ID_URL = BASE_URL + "/byId";


  @Before
  public void setUp() throws Exception {
  }

  @After
  public void tearDown() throws Exception {
  }

  @Test
  @Ignore("Not implemented yet")
  public void getAllGames() {
  }

  @Test
  @Ignore("Not implemented yet")
  public void getGameById() {
  }
}