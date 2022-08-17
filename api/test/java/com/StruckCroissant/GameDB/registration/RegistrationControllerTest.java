package com.StruckCroissant.GameDB.registration;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.StruckCroissant.GameDB.core.user.UserService;
import com.StruckCroissant.GameDB.security.PasswordEncoder;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(value = RegistrationController.class)
@AutoConfigureMockMvc(addFilters = false)
public class RegistrationControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockBean private RegistrationService registrationService;

  @MockBean private UserService userService;

  @MockBean private PasswordEncoder passwordEncoder;

  public static final String URL = "/api/v1/register";

  private AutoCloseable autoCloseable;

  @Before
  public void setUp() {
    autoCloseable = MockitoAnnotations.openMocks(this);
  }

  @After
  public void tearDown() throws Exception {
    autoCloseable.close();
  }

  @Test
  public void whenValidRegister_thenReturns200() throws Exception {
    // given
    UserRegistrationRequest req = new UserRegistrationRequest("testUsername", "testPassword");

    mockMvc
        .perform(
            MockMvcRequestBuilders.post(URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
        .andExpect(status().isOk());
  }

  @Test
  public void whenNullValueRegister_thenReturns400() throws Exception {
    // given
    UserRegistrationRequest req = new UserRegistrationRequest(null, "testPassword");

    // when then
    mockMvc
        .perform(
            MockMvcRequestBuilders.post(URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
        .andExpect(status().isBadRequest());
  }

  @Test
  public void whenBlankValueRegister_thenReturns400() throws Exception {
    // given
    UserRegistrationRequest req = new UserRegistrationRequest("", "testPassword");

    // when then
    mockMvc
        .perform(
            MockMvcRequestBuilders.post(URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
        .andExpect(status().isBadRequest());
  }

  @Test
  public void whenValidInput_thenMapsRegisterService() throws Exception {
    // given
    UserRegistrationRequest req = new UserRegistrationRequest("testUsername", "testPassword");

    // when
    mockMvc
        .perform(
            MockMvcRequestBuilders.post(URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
        .andExpect(status().isOk());

    // then
    ArgumentCaptor<UserRegistrationRequest> userArgumentCaptor =
        ArgumentCaptor.forClass(UserRegistrationRequest.class);
    verify(registrationService).registerUser(userArgumentCaptor.capture());
    UserRegistrationRequest capturedUser = userArgumentCaptor.getValue();

    assertThat(capturedUser).isEqualTo(req);
  }

  @Test
  public void whenValidInput_thenReturnsTrue() throws Exception {
    // given
    UserRegistrationRequest req = new UserRegistrationRequest("testUsername", "testPassword");
    given(registrationService.registerUser(req)).willReturn(true);

    // when
    MvcResult mvcResult =
        mockMvc
            .perform(
                MockMvcRequestBuilders.post(URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(req)))
            .andExpect(status().isOk())
            .andReturn();

    // then
    assertThat(mvcResult.getResponse().getContentAsString()).isEqualToIgnoringWhitespace("true");
  }
}
