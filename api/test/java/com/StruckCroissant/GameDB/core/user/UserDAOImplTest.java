package com.StruckCroissant.GameDB.core.user;

import com.StruckCroissant.GameDB.testDbConfig;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@TestPropertySource(locations = "classpath:test.properties")
@ContextConfiguration(classes = {testDbConfig.class, UserDAOImpl.class})
class UserDAOImplTest {

  @Qualifier("db-user")
  @Autowired
  private UserDAOImpl underTest;

  @Test
  void shouldSignupNewUser() {
    // given
      String test_username = "new_account_420";
      String test_password = "password";
      User user = new User(test_username, test_password, UserRoleEnum.USER, false, true);
      underTest.updateUser(user);

    // when
      boolean userExists = underTest.selectUserByUsername(test_username).isPresent();

    // then
      assertThat(userExists).isTrue();
  }

  @Test
  void shouldDeleteUser() {
    // given
      String test_username = "delete_me";
      String test_password = "password";
      User user = new User(test_username, test_password, UserRoleEnum.USER, false, true);
      underTest.updateUser(user);
      User userToDelete = underTest.selectUserByUsername(test_username).get();

    // when
      underTest.deleteUserById(userToDelete.getId().get());
      boolean userExists = underTest.selectUserByUsername(test_username).isPresent();

    // then
      assertThat(userExists).isFalse();
  }
}