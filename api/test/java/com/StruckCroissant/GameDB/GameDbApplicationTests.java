package com.StruckCroissant.GameDB;

import com.StruckCroissant.GameDB.core.game.GameControllerTest;
import com.StruckCroissant.GameDB.core.game.GameDAOImplTest;
import com.StruckCroissant.GameDB.core.game.GameServiceTest;
import com.StruckCroissant.GameDB.core.user.UserControllerTest;
import com.StruckCroissant.GameDB.core.user.UserServiceTest;
import com.StruckCroissant.GameDB.login.LoginControllerTest;
import com.StruckCroissant.GameDB.login.LoginServiceTest;
import com.StruckCroissant.GameDB.registration.RegistrationControllerTest;
import com.StruckCroissant.GameDB.registration.RegistrationServiceTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.springframework.boot.test.context.SpringBootTest;

@RunWith(Suite.class)
@SpringBootTest
@Suite.SuiteClasses({
  GameControllerTest.class,
  GameServiceTest.class,
  GameDAOImplTest.class,
  UserControllerTest.class,
  UserServiceTest.class,
  LoginControllerTest.class,
  LoginServiceTest.class,
  RegistrationControllerTest.class,
  RegistrationServiceTest.class
})
public class GameDbApplicationTests {
  public GameDbApplicationTests() {}

  @Test
  public void contextLoads() {}
}
