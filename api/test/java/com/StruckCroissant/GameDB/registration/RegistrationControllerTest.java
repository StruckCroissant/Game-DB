package com.StruckCroissant.GameDB.registration;

import com.StruckCroissant.GameDB.core.user.UserDAOImpl;
import com.StruckCroissant.GameDB.core.user.UserService;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
    controllers = RegistrationController.class
)
@RunWith(SpringRunner.class)
public class RegistrationControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  @Ignore("TODO: finish class setup for method. Currently this fails because mockMvc is null.")
  public void shouldRegisterUser() throws Exception {
    // given
    String username = "test_username";
    String password = "test_password";
    String url = "/api/v1/register";
    String body = "{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}";

    // when
    MvcResult result = this.mockMvc.perform( MockMvcRequestBuilders
            .post(url).content(body)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andReturn();
    String content = result.getResponse().getContentAsString();

    // then
    assertThat(content).isEqualTo("true");
  }
}