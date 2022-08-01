package com.StruckCroissant.GameDB.registration;

import com.StruckCroissant.GameDB.core.user.User;
import com.StruckCroissant.GameDB.core.user.UserRoleEnum;
import com.StruckCroissant.GameDB.core.user.UserService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.Assert.*;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class RegistrationServiceTest {

  @Mock
  private UserService userService;
  private AutoCloseable autoCloseable;
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  private RegistrationService underTest;


  @Before
  public void setUp() {
    autoCloseable = MockitoAnnotations.openMocks(this);
    bCryptPasswordEncoder = new BCryptPasswordEncoder();
    underTest = new RegistrationService(bCryptPasswordEncoder, userService);
  }

  @After
  public void tearDown() throws Exception {
    autoCloseable.close();
  }

  private User getTestUser() {
    return new User(1, "testUsername", "testPassword", UserRoleEnum.USER, false, true);
  }

  @Test
  public void canRegisterUser() {
    // given
    User testUser = getTestUser();
    UserRegistrationRequest request =
        new UserRegistrationRequest(testUser.getUsername(), testUser.getPassword());
    when(userService.signUpUser(testUser)).thenReturn(true);

    // when
    underTest.registerUser(request);

    //then
    ArgumentCaptor<User> userRegisterCaptor =
        ArgumentCaptor.forClass(User.class);

    verify(userService).signUpUser(userRegisterCaptor.capture());
    User capturedUser = userRegisterCaptor.getValue();

    assertThat(capturedUser.getUsername()).isEqualTo(request.getUsername());
    assertThat(capturedUser.getPassword()).isEqualTo(request.getPassword());
  }
}