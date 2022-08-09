package com.StruckCroissant.GameDB.core.user;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static org.junit.Assert.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserServiceTest {

  @Mock private UserDAOImpl userDao;
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  private AutoCloseable autoCloseable;
  private UserService underTest;

  @Before
  public void setUp() {
    autoCloseable = MockitoAnnotations.openMocks(this);
    bCryptPasswordEncoder = new BCryptPasswordEncoder();
    underTest = new UserService(userDao, bCryptPasswordEncoder);
  }

  @After
  public void tearDown() throws Exception {
    autoCloseable.close();
  }

  private User getTestUser() {
    return new User(1, "testUsername", "testPassword", UserRoleEnum.USER, false, true);
  }

  @Test
  public void shouldGetAllUsers() {
    // when
    underTest.getAllUsers();
    // then
    verify(userDao).selectAllUsers();
  }

  @Test
  public void canLoadUserByUsername() {
    // given
    String testUsername = "testUsername";
    User user = getTestUser();
    when(userDao.selectUserByUsername(user.getUsername())).thenReturn(Optional.of(user));

    // when
    underTest.loadUserByUsername(testUsername);

    // then
    ArgumentCaptor<String> usernameCaptor = ArgumentCaptor.forClass(String.class);

    verify(userDao).selectUserByUsername(usernameCaptor.capture());
    String capturedUsername = usernameCaptor.getValue();

    assertThat(capturedUsername).isEqualTo(testUsername);
  }

  @Test
  public void willThrowExceptionIfUserNotFound() {
    // given
    String testUsername = "testUsername";
    when(userDao.selectUserByUsername(testUsername)).thenReturn(Optional.empty());

    // when
    Throwable thrown = catchThrowable(() -> underTest.loadUserByUsername(testUsername));

    // then
    assertThat(thrown).isInstanceOf(UsernameNotFoundException.class);
  }

  @Test
  public void canSignUpUser() {
    // given
    User user = getTestUser();
    when(userDao.insertUser(user)).thenReturn(true);

    // when
    underTest.signUpUser(user);

    // then
    ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
    verify(userDao).insertUser(userCaptor.capture());

    User capturedUser = userCaptor.getValue();
    assertThat(capturedUser).isEqualTo(user);
  }

  @Test
  public void willThrowOnNonUniqueUser() {
    // given
    User user = getTestUser();
    when(userDao.selectUserByUsername(user.getUsername())).thenReturn(Optional.of(user));

    // when
    Throwable thrown = catchThrowable(() -> underTest.signUpUser(user));

    // then
    assertThat(thrown).isExactlyInstanceOf(RuntimeException.class);
  }

  @Test
  public void canGetSavedGames() {
    // given
    int testUid = 1;

    // when
    underTest.getSavedGames(testUid);

    // then
    verify(userDao).selectSavedGames(testUid);
  }

  @Test
  public void getUserById() {
    // given
    Integer testUid = 1;
    when(userDao.selectUserById(testUid)).thenReturn(Optional.of(getTestUser()));

    // when
    underTest.getUserById(testUid);

    // then
    ArgumentCaptor<Integer> integerCaptor = ArgumentCaptor.forClass(Integer.class);

    verify(userDao).selectUserById(integerCaptor.capture());
    Integer capturedUid = integerCaptor.getValue();

    assertThat(capturedUid).isEqualTo(testUid);
  }

  @Test
  public void willThrowExceptionIfUserNotFoundById() {
    // given
    int testUid = 1;
    when(userDao.selectUserById(testUid)).thenReturn(Optional.empty());

    // when
    Throwable thrown = catchThrowable(() -> underTest.getUserById(testUid));

    // then
    assertThat(thrown).isExactlyInstanceOf(ResourceNotFoundException.class);
  }
}
