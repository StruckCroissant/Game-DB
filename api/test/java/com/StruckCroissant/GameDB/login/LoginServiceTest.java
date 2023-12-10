package com.StruckCroissant.GameDB.login;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.StruckCroissant.GameDB.core.user.User;
import com.StruckCroissant.GameDB.core.user.UserDAOImpl;
import com.StruckCroissant.GameDB.core.user.UserRoleEnum;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class LoginServiceTest {

  @Mock private UserDAOImpl userDao;
  private AutoCloseable autoCloseable;
  private LoginService underTest;

  private User testUser;

  @Before
  public void setUp() {
    autoCloseable = MockitoAnnotations.openMocks(this);
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    underTest = new LoginService(userDao, bCryptPasswordEncoder);

    String encodedPass = bCryptPasswordEncoder.encode("testPassword");
    this.testUser = new User(1, "testUsername", encodedPass, UserRoleEnum.USER, false, true);
  }

  @After
  public void tearDown() throws Exception {
    autoCloseable.close();
  }

  @Test
  public void shouldLogin() {
    // given
    String testUsername = "testUsername";
    String testPassword = "testPassword";
    UserLoginRequest req = new UserLoginRequest(testUsername, testPassword);

    when(userDao.selectUserByUsernameOrThrow(this.testUser.getUsername()))
        .thenReturn(this.testUser);

    // when
    boolean loginSuccess = underTest.login(req);

    // then
    ArgumentCaptor<String> usernameCaptor = ArgumentCaptor.forClass(String.class);

    verify(userDao).selectUserByUsernameOrThrow(usernameCaptor.capture());
    String capturedUsername = usernameCaptor.getValue();

    assertThat(loginSuccess).isTrue();
    assertThat(capturedUsername).isEqualTo(testUsername);
  }

  @Test
  public void shouldFailLogin() {
    // given
    String testUsername = "testUsername";
    String incorrectTestPassword = "incorrectTestPassword";
    UserLoginRequest req = new UserLoginRequest(testUsername, incorrectTestPassword);

    when(userDao.selectUserByUsernameOrThrow(this.testUser.getUsername()))
        .thenReturn(this.testUser);

    // when
    boolean loginSuccess = underTest.login(req);

    // then
    ArgumentCaptor<String> usernameCaptor = ArgumentCaptor.forClass(String.class);

    verify(userDao).selectUserByUsernameOrThrow(usernameCaptor.capture());
    String capturedUsername = usernameCaptor.getValue();

    assertThat(loginSuccess).isFalse();
    assertThat(capturedUsername).isEqualTo(testUsername);
  }

  @Test
  public void shouldThrowOnIncorrectUser() {
    // given
    String incorrectTestUsername = "incorrectTestUsername";
    String testPassword = "testPassword";
    UserLoginRequest request = new UserLoginRequest(incorrectTestUsername, testPassword);

    when(userDao.selectUserByUsernameOrThrow(incorrectTestUsername))
        .thenThrow(UsernameNotFoundException.class);

    // when
    Throwable thrown = catchThrowable(() -> underTest.login(request));

    // then
    ArgumentCaptor<String> usernameCaptor = ArgumentCaptor.forClass(String.class);

    verify(userDao).selectUserByUsernameOrThrow(usernameCaptor.capture());
    String capturedIncorrectUsername = usernameCaptor.getValue();

    assertThat(thrown).isExactlyInstanceOf(UsernameNotFoundException.class);
    assertThat(capturedIncorrectUsername).isEqualTo(incorrectTestUsername);
  }
}
