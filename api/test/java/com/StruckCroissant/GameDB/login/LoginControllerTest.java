package com.StruckCroissant.GameDB.login;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.StruckCroissant.GameDB.config.security.PasswordEncoder;
import com.StruckCroissant.GameDB.core.user.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
@WebMvcTest(value = LoginController.class)
@AutoConfigureMockMvc(addFilters = false)
public class LoginControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockBean private LoginService loginService;

  @MockBean private UserService userService;

  @MockBean private PasswordEncoder passwordEncoder;

  public static final String URL = "/api/v1/login";

  private AutoCloseable autoCloseable;

  @Before
  public void setUp() throws Exception {
    autoCloseable = MockitoAnnotations.openMocks(this);
  }

  @After
  public void tearDown() throws Exception {
    autoCloseable.close();
  }

  @Test
  public void whenValidLogin_thenReturns200() throws Exception {
    // given
    UserLoginRequest req = new UserLoginRequest("testUsername", "testPassword");

    // when
    mockMvc
        .perform(
            MockMvcRequestBuilders.post(URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
        .andExpect(status().isOk());
  }

  @Test
  public void whenBlankValueLogin_thenReturns401() throws Exception {
    // given
    UserLoginRequest req = new UserLoginRequest("", "testPassword");

    // when
    mockMvc
        .perform(
            MockMvcRequestBuilders.post(URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
        .andExpect(status().isBadRequest());
  }

  @Test
  public void whenNullValueLogin_thenReturns401() throws Exception {
    // given
    UserLoginRequest req = new UserLoginRequest(null, "testPassword");

    // when
    mockMvc
        .perform(
            MockMvcRequestBuilders.post(URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
        .andExpect(status().isBadRequest());
  }

  @Test
  public void whenValidInput_thenMapsLoginService() throws Exception {
    // given
    UserLoginRequest req = new UserLoginRequest("testUsername", "testPassword");

    // when
    mockMvc
        .perform(
            MockMvcRequestBuilders.post(URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
        .andExpect(status().isOk());

    // then
    ArgumentCaptor<UserLoginRequest> userArgumentCaptor =
        ArgumentCaptor.forClass(UserLoginRequest.class);
    verify(loginService).login(userArgumentCaptor.capture());
    UserLoginRequest userLoginRequest = userArgumentCaptor.getValue();

    assertThat(userLoginRequest).isEqualTo(req);
  }
}
