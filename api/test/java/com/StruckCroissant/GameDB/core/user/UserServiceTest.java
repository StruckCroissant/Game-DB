package com.StruckCroissant.GameDB.core.user;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserServiceTest {

  @Mock private UserDAOImpl userDao;
  private AutoCloseable autoCloseable;
  private UserService underTest;
  private User testUser;

  @Before
  public void setUp() {
    autoCloseable = MockitoAnnotations.openMocks(this);
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    underTest = new UserService(userDao, bCryptPasswordEncoder);

    this.testUser = new User(1, "testUsername", "testPassword", UserRoleEnum.USER, false, true);

  }

  @After
  public void tearDown() throws Exception {
    autoCloseable.close();
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
    when(userDao.selectUserByUsernameOrThrow(this.testUser.getUsername())).thenReturn(this.testUser);

    // when
    underTest.loadUserByUsername(testUsername);

    // then
    ArgumentCaptor<String> usernameCaptor = ArgumentCaptor.forClass(String.class);

    verify(userDao).selectUserByUsernameOrThrow(usernameCaptor.capture());
    String capturedUsername = usernameCaptor.getValue();

    assertThat(capturedUsername).isEqualTo(testUsername);
  }

  @Test
  public void canSignUpUser() {
    // given
    when(userDao.insertUser(this.testUser)).thenReturn(true);

    // when
    underTest.signUpUser(this.testUser);

    // then
    ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
    verify(userDao).insertUser(userCaptor.capture());

    User capturedUser = userCaptor.getValue();
    assertThat(capturedUser).isEqualTo(this.testUser);
  }

  @Test
  public void willThrowOnNonUniqueUser() {
    // given
    when(userDao.selectUserByUsername(this.testUser .getUsername())).thenReturn(Optional.of(this.testUser ));

    // when
    Throwable thrown = catchThrowable(() -> underTest.signUpUser(this.testUser ));

    // then
    assertThat(thrown).isExactlyInstanceOf(RuntimeException.class);
  }

  @Test
  public void canGetSavedGames() {
    // given
    when(userDao.selectUserById(this.testUser.getId().get())).thenReturn(Optional.of(this.testUser));

    // when
    underTest.getSavedGames(this.testUser.getId().get());

    // then
    verify(userDao).selectSavedGames(this.testUser.getId().get());
  }

  @Test
  public void getUserById() {
    // given
    Integer testUid = 1;
    when(userDao.selectUserById(testUid)).thenReturn(Optional.of(this.testUser));

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
