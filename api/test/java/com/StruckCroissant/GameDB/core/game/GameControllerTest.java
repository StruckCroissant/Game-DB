package com.StruckCroissant.GameDB.core.game;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import config.TestDbConfig;
import com.StruckCroissant.GameDB.core.user.UserService;
import com.StruckCroissant.GameDB.exception.exceptions.GameNotFoundException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Import(TestDbConfig.class)
public class GameControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockBean private GameService gameService;

  @MockBean private UserService userService;

  private final String BASE_URL = "/game";
  private final String ALL_URL = BASE_URL + "/all";

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
  public void whenGetGameByInvalidId_thenReturns400() throws Exception {
    Integer GID = -1;

    final String URL_WITH_PARAMS = String.format("%s/%s", BASE_URL, GID);
    when(gameService.getGameById(GID)).thenThrow(new GameNotFoundException(GID));

    mockMvc
        .perform(
            MockMvcRequestBuilders.get(URL_WITH_PARAMS).accept(MediaType.APPLICATION_PROBLEM_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.title").value("Requested game not found"))
        .andExpect(jsonPath("$.status").value("404"))
        .andExpect(jsonPath("$.detail").value("Game id {-1} not found"));

    ArgumentCaptor<Integer> argumentCaptor = ArgumentCaptor.forClass(Integer.class);
    verify(gameService).getGameById(argumentCaptor.capture());
    Integer capturedValue = argumentCaptor.getValue();

    assertThat(capturedValue).isEqualTo(GID);
  }

  @Test
  public void whenGetGameById_thenMapsGameService() throws Exception {
    final String URL_WITH_PARAMS = BASE_URL + "/1";
    final Integer GID = 1;

    mockMvc
        .perform(MockMvcRequestBuilders.get(URL_WITH_PARAMS).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    ArgumentCaptor<Integer> argumentCaptor = ArgumentCaptor.forClass(Integer.class);
    verify(gameService).getGameById(argumentCaptor.capture());
    Integer capturedValue = argumentCaptor.getValue();

    assertThat(capturedValue).isEqualTo(GID);
  }

  @Test
  public void whenProvideNoParamsToGameSearch_thenThrowConstraintViolationMessage()
      throws Exception {
    String expectedViolationMessage = "Search request must contain at least one search criteria";

    mockMvc
        .perform(MockMvcRequestBuilders.get(BASE_URL).accept(MediaType.APPLICATION_PROBLEM_JSON))
        .andExpect(jsonPath("$.violations[0].message").value(expectedViolationMessage))
        .andExpect(jsonPath("$.violations[0].field").value("gameSearchRequest"));
  }

  @Test
  public void whenProvideNullId_thenReturnMinimumMessage() throws Exception {
    String expectedViolationMessage = "must be greater than or equal to 1";

    mockMvc
        .perform(
            MockMvcRequestBuilders.get(BASE_URL + "?id=0")
                .accept(MediaType.APPLICATION_PROBLEM_JSON))
        .andExpect(jsonPath("$.violations[0].message").value(expectedViolationMessage))
        .andExpect(jsonPath("$.violations[0].field").value("id"));
  }

  @Test
  public void whenProvideOneParam_thenReturnOk() throws Exception {
    mockMvc
        .perform(
            MockMvcRequestBuilders.get(BASE_URL + "?id=1")
                .accept(MediaType.APPLICATION_PROBLEM_JSON))
        .andExpect(status().isOk());
  }
}
