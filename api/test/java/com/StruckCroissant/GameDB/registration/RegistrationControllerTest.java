package com.StruckCroissant.GameDB.registration;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@WebMvcTest(controllers = RegistrationController.class)
@RunWith(SpringRunner.class)
public class RegistrationControllerTest {

  @Autowired private MockMvc mockMvc;

  @Test
  @Ignore("TODO: finish class setup for method. Currently this fails because mockMvc is null.")
  public void shouldRegisterUser() throws Exception {
    // given
    String username = "test_username";
    String password = "test_password";
    String url = "/api/v1/register";
    String body = "{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}";

    // when
    MvcResult result =
        this.mockMvc
            .perform(
                MockMvcRequestBuilders.post(url)
                    .content(body)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andReturn();
    String content = result.getResponse().getContentAsString();

    // then
    assertThat(content).isEqualTo("true");
  }
}
