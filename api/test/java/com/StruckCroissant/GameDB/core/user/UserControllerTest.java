package com.StruckCroissant.GameDB.core.user;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.Assert.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.StruckCroissant.GameDB.core.game.Game;
import com.StruckCroissant.GameDB.security.PasswordEncoder;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.security.Principal;
import java.util.List;
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
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockBean private UserService userService;

  @MockBean private PasswordEncoder passwordEncoder;

  @MockBean private Principal principal;

  private AutoCloseable autoCloseable;

  private final String BASE_URL = "/api/v1/user";
  private final String ALL_URL = BASE_URL + "/all";
  private final String BY_ID_URL = BASE_URL + "/byId";

  @Before
  public void setUp() {
    autoCloseable = MockitoAnnotations.openMocks(this);
  }

  @After
  public void tearDown() throws Exception {
    autoCloseable.close();
  }

  @Test
  public void whenGetAllUsers_thenReturns200() throws Exception {
    // when
    mockMvc
        .perform(MockMvcRequestBuilders.get(ALL_URL).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    // then
    verify(userService).getAllUsers();
  }

  @Test
  public void whenGetUserByPresentUid_ThenReturns200() throws Exception {
    // given
    final String URL_WITH_PARAMS = BY_ID_URL + "?id=1";

    // when then
    mockMvc
        .perform(MockMvcRequestBuilders.get(URL_WITH_PARAMS).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  public void whenGetUserByNullUid_ThenReturns400() throws Exception {
    // when then
    mockMvc
        .perform(MockMvcRequestBuilders.get(BY_ID_URL).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest());
  }

  @Test
  public void whenGetUserByAbsentUid_ThenReturns404() throws Exception {
    // given
    final Integer UID = 1;
    String URL_WITH_PARAMS = BY_ID_URL + "?id=" + UID;
    when(userService.getUserById(UID)).thenThrow(new ResourceNotFoundException("User not found"));

    // when
    mockMvc
        .perform(MockMvcRequestBuilders.get(URL_WITH_PARAMS).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound());

    // then
    ArgumentCaptor<Integer> argumentCaptor = ArgumentCaptor.forClass(Integer.class);
    verify(userService).getUserById(argumentCaptor.capture());
    Integer capturedGid = argumentCaptor.getValue();

    assertThat(capturedGid).isEqualTo(UID);
  }

  @Test
  public void whenGetSavedGamesPresentUid_ThenReturns200() throws Exception {
    // given
    final int UID = 1;
    final String URL_WITH_PARAMS = BASE_URL + "/saved-games?id=" + UID;
    final Game GAME = new Game(1, "Test Game", "420.00", null, null, null, 1, null, null, 42069);
    when(userService.getSavedGames(UID)).thenReturn(List.of(GAME));

    // when
    mockMvc
        .perform(MockMvcRequestBuilders.get(URL_WITH_PARAMS).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    // then
    ArgumentCaptor<Integer> argumentCaptor = ArgumentCaptor.forClass(Integer.class);
    verify(userService).getSavedGames(argumentCaptor.capture());
    Integer capturedGid = argumentCaptor.getValue();

    assertThat(capturedGid).isEqualTo(1);
  }

  @Test
  public void whenGetSavedGamesNullUid_ThenReturns400() throws Exception {
    // when then
    mockMvc
        .perform(
            MockMvcRequestBuilders.get(BASE_URL + "/saved-games")
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest());
  }

  @Test
  public void whenGetSavedGamesAbsentUid_ThenReturns404() throws Exception {
    // given
    final Integer UID = 1;
    final String URL_WITH_PARAMS = BASE_URL + "/saved-games?id=" + UID;
    when(userService.getSavedGames(UID)).thenThrow(new ResourceNotFoundException("User not found"));

    // when
    mockMvc
        .perform(MockMvcRequestBuilders.get(URL_WITH_PARAMS).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound());

    // then
    ArgumentCaptor<Integer> argumentCaptor = ArgumentCaptor.forClass(Integer.class);
    verify(userService).getSavedGames(argumentCaptor.capture());
    Integer capturedGid = argumentCaptor.getValue();

    assertThat(capturedGid).isEqualTo(UID);
  }

  @Test
  public void whenGetPrincpal_ThenReturnsPrincipal() throws Exception {
    // when
    MvcResult result =
        mockMvc
            .perform(MockMvcRequestBuilders.get(BASE_URL).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andReturn();
    // TODO add tests for principal accessor
  }
}
