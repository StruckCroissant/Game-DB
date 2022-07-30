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
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
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
    verify(userDao).selectUserByUsername(testUsername);
  }

  @Test
  public void canSignUpUser() {
    // given
    User user = getTestUser();
    when(userDao.insertUser(user)).thenReturn(true);

    // when
    underTest.signUpUser(user);

    // then
    verify(userDao).insertUser(user);
  }

  @Test
  public void canDetectNonUniqueUser() {
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
    int testUid = 1;
    when(userDao.selectUserById(testUid)).thenReturn(Optional.of(getTestUser()));

    // when
    underTest.getUserById(testUid);

    // then
    verify(userDao).selectUserById(testUid);
  }
}
