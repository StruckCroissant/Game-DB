package com.StruckCroissant.GameDB.core.user;

import ch.vorburger.exec.ManagedProcessException;
import ch.vorburger.mariadb4j.springboot.autoconfigure.DataSourceAutoConfiguration;
import ch.vorburger.mariadb4j.springframework.MariaDB4jSpringService;
import com.StruckCroissant.GameDB.testDbConfig;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

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
  void shouldInsertNewUser() {
    // given
      User user = new User("username", "password", UserRoleEnum.USER, false, true);
      underTest.insertUser(user);

    // when
      boolean userExists = underTest.selectUserByUsername("username").isPresent();

    // then
      assertThat(userExists).isTrue();
  }
}