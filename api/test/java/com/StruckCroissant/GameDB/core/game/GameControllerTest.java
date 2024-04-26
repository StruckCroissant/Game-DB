package com.StruckCroissant.GameDB.core.game;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.StruckCroissant.GameDB.config.security.PasswordEncoder;
import com.StruckCroissant.GameDB.core.user.UserService;
import com.StruckCroissant.GameDB.exception.exceptions.GameNotFoundException;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(value = GameController.class)
@AutoConfigureMockMvc(addFilters = false)
public class GameControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockBean private GameService gameService;

  @MockBean private UserService userService;

  @MockBean private PasswordEncoder passwordEncoder;

  private AutoCloseable autoCloseable;

  private final String BASE_URL = "/game";
  private final String ALL_URL = BASE_URL + "/all";

  @Before
  public void setUp() {
    autoCloseable = MockitoAnnotations.openMocks(this);
  }

  @After
  public void tearDown() throws Exception {
    autoCloseable.close();
  }

  @Test
  public void whenGetAllGames_thenReturns200() throws Exception {
    mockMvc
        .perform(MockMvcRequestBuilders.get(ALL_URL).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    verify(gameService).getAllGames();
  }

  @Test
  public void whenGetGameByPresentId_thenReturns200() throws Exception {
    final String URL_WITH_PARAMS = BASE_URL + "?id=1";

    mockMvc
        .perform(MockMvcRequestBuilders.get(URL_WITH_PARAMS).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  public void whenGetGameByAbsentId_thenReturns404() throws Exception {
    final Integer GID = -1;

    final String URL_WITH_PARAMS = BASE_URL + "?id=" + GID;
    when(gameService.getGameById(GID)).thenThrow(new GameNotFoundException(GID));

    mockMvc
        .perform(MockMvcRequestBuilders.get(URL_WITH_PARAMS).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound());

    ArgumentCaptor<Integer> argumentCaptor = ArgumentCaptor.forClass(Integer.class);
    verify(gameService).getGameById(argumentCaptor.capture());
    Integer capturedValue = argumentCaptor.getValue();

    assertThat(capturedValue).isEqualTo(GID);
  }

  @Test
  public void whenGetGameById_thenMapsGameService() throws Exception {
    final String URL_WITH_PARAMS = BASE_URL + "?id=1";
    final Integer GID = 1;

    mockMvc
        .perform(MockMvcRequestBuilders.get(URL_WITH_PARAMS).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    ArgumentCaptor<Integer> argumentCaptor = ArgumentCaptor.forClass(Integer.class);
    verify(gameService).getGameById(argumentCaptor.capture());
    Integer capturedValue = argumentCaptor.getValue();

    assertThat(capturedValue).isEqualTo(GID);
  }
}
