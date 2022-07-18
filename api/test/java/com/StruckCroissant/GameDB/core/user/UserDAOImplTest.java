package com.StruckCroissant.GameDB.core.user;

import com.StruckCroissant.GameDB.core.game.Game;
import com.StruckCroissant.GameDB.TestDbConfig;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.jdbc.JdbcTestUtils;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@TestPropertySource(locations = "classpath:test.properties")
@ContextConfiguration(classes = {TestDbConfig.class, UserDAOImpl.class})
class UserDAOImplTest {
  // TODO - add tests for exception handling


  @Qualifier("db-user")
  @Autowired
  private UserDAOImpl underTest;

  @Qualifier("testTemplate")
  @Autowired
  private JdbcTemplate jdbcTemplate;

  @AfterEach
  void tearDown(){
    JdbcTestUtils.deleteFromTables(jdbcTemplate, "user");
  }

  @NotNull
  private String insertDefaultUserDb() {
    User user = new User("test_username", "test_password", UserRoleEnum.USER, false, true);
    underTest.insertUser(user);
    return "test_username";
  }

  @NotNull
  private String insertUserDb(String username) {
    User user = new User(username, "test_password", UserRoleEnum.USER, false, true);
    underTest.insertUser(user);
    return username;
  }

  @NotNull
  private Integer getUidFromUserObj(User userFromDb) {
    return userFromDb.getId().orElseThrow();
  }

  @NotNull
  private Integer getTestUidFromUsernameDb(String test_username) {
    return underTest.selectUserByUsername(test_username).flatMap(User::getId)
        .orElseThrow(
            () -> new IllegalStateException("User not found in DB")
        );
  }

  @Test
  @Order(1)
  void shouldInsertAndSelectNewUser() {
    // given
    String test_username = insertDefaultUserDb();

    // when
    boolean userExists = underTest.selectUserByUsername(test_username).isPresent();

    // then
    assertThat(userExists).isTrue();
  }

  @Test
  void shouldGetUidFromuser() {
    // given
      String test_username = insertDefaultUserDb();

    // when
      int uid = underTest.selectUserByUsername(test_username).flatMap(User::getId).orElse(0);

    // then
      assertThat(uid).isNotEqualTo(0);
  }


  @Test
  void shouldUpdateUser(){
    // given
      // Init user
      String test_username = insertDefaultUserDb();
      int initUidDb = getTestUidFromUsernameDb(test_username);

      // Updated user
      String new_username = "new_account_420_updated";
      String new_password = "password_updated";
      User updatedUser = new User(new_username, new_password, UserRoleEnum.USER, false, true);

      // Updated user
      underTest.updateUserById(initUidDb, updatedUser);
      User updatedUserDb = getTestUserFromUidDb(initUidDb);
      int updatedUidDb = getUidFromUserObj(updatedUserDb);

    // then
      assertThat(updatedUidDb).isEqualTo(initUidDb);
      assertThat(updatedUserDb.getUsername()).isEqualTo(new_username);
      assertThat(updatedUserDb.getPassword()).isEqualTo(new_password);
  }

  private User getTestUserFromUidDb(int initUidDb) {
    return underTest.selectUserById(initUidDb).orElseThrow(
        () -> new RuntimeException("User not found in database")
    );
  }

  @Test
  void shouldDeleteUser() {
    // given
      String test_username = insertDefaultUserDb();
      User userFromDb = underTest.selectUserByUsername(test_username).get();
      int uidFromDb = getUidFromUserObj(userFromDb);

    // when
      underTest.deleteUserById(uidFromDb);
      boolean userExists = underTest.selectUserByUsername(test_username).isPresent();

    // then
      assertThat(userExists).isFalse();
  }

  @Test
  void shouldGetSavedGames() {
    // given
      int[] games = {1, 2, 3}; // Test games

      String test_username = insertDefaultUserDb();
      User userFromDb = underTest.selectUserByUsername(test_username).orElseThrow();
      int uid = getUidFromUserObj(userFromDb);

    // when
      for(int gid: games){
        underTest.insertSavedGame(uid, gid);
      }

    //then
      assertThat(underTest.selectSavedGames(uid).size()).isNotEqualTo(0);
      underTest.selectSavedGames(uid).forEach(
          g -> assertThat(g).isExactlyInstanceOf(Game.class)
      );
  }

  @Test
  void shouldDeleteSavedGame() {
    // given
      int[] games = {1, 2, 3}; // Test games

      String test_username = insertDefaultUserDb();
      User userFromDb = underTest.selectUserByUsername(test_username).orElseThrow();
      int uid = getUidFromUserObj(userFromDb);

    // when
      for(int gid: games){
        underTest.insertSavedGame(uid, gid);
      }
      underTest.deleteSavedGame(uid, games[0]);
      underTest.deleteSavedGame(uid, games[1]);
      underTest.deleteSavedGame(uid, games[2]);

    //then
      assertThat(underTest.selectSavedGames(uid).size()).isEqualTo(0);
  }

  @Test
  void shouldDetectNonUniqueUser() {
    // given
      String test_username = insertDefaultUserDb();
      User userFromDb = underTest.selectUserByUsername(test_username).orElseThrow();

    // when
      boolean userIsUnique = underTest.userIsUnique(userFromDb);

    // then
      assertThat(userIsUnique).isFalse();
  }

  @Test
  void shouldSelectAllUsers(){
    // given
      String test_username = insertUserDb("test_username1");
      String test_username2 = insertUserDb("test_username2");
      String test_username3 = insertUserDb("test_username3");

    // when
      List<User> users = underTest.selectAllUsers();

    // then
      assertThat(users.size()).isEqualTo(3);
      users.forEach(
        (User u) -> {
          assertThat(u).isExactlyInstanceOf(User.class);
          assertThat(u.getUsername()).isIn(test_username, test_username2, test_username3);
        }
      );
  }
}