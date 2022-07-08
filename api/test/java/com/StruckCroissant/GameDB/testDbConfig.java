package com.StruckCroissant.GameDB;

import ch.vorburger.exec.ManagedProcessException;
import ch.vorburger.mariadb4j.DBConfigurationBuilder;
import ch.vorburger.mariadb4j.springframework.MariaDB4jSpringService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
@PropertySource("classpath:test.properties")
public class testDbConfig {

  @Bean(name = "testDbService")
  public MariaDB4jSpringService mariaDB4jSpringService() {
    return new MariaDB4jSpringService();
  }

  @Bean(name = "testDbDatasource")
  public DataSource dataSource(
      @Qualifier("testDbService") MariaDB4jSpringService mariaDB4jSpringService,
      @Value("${app.datasource.name}") String databaseName,
      @Value("${app.datasource.username}") String datasourcePassword,
      @Value("${app.datasource.driver-class-name}") String datasourceDriver
  ) throws ManagedProcessException {
    mariaDB4jSpringService.getDB().createDB(databaseName);
    mariaDB4jSpringService.getDB().source("db/init/gamedb_seed.sql", databaseName);


    DBConfigurationBuilder dbConfigurationBuilder = mariaDB4jSpringService.getConfiguration();

    return DataSourceBuilder.create()
        .driverClassName(datasourceDriver)
        .url(dbConfigurationBuilder.getURL(databaseName))
        .username(datasourcePassword)
        .password(datasourcePassword)
        .build();
  }

  @Bean
  public JdbcTemplate jdbcTemplate(DataSource dataSource) {
    return new JdbcTemplate(dataSource);
  }
}
