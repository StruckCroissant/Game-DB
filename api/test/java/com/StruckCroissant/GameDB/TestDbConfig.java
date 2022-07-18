package com.StruckCroissant.GameDB;

import ch.vorburger.exec.ManagedProcessException;
import ch.vorburger.mariadb4j.DB;
import ch.vorburger.mariadb4j.DBConfiguration;
import ch.vorburger.mariadb4j.DBConfigurationBuilder;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Configuration
@PropertySource("classpath:test.properties")
public class TestDbConfig {

  @Bean
  public DBConfiguration dbConfig(@Value("${test.datasource.port}") int datasourcePort) {
    DBConfigurationBuilder config = DBConfigurationBuilder.newBuilder();
    config.setPort(datasourcePort);
    config.setSecurityDisabled(true);
    return config.build();
  }

  @Bean
  public DataSource dataSource(
      @Autowired DBConfiguration dbConfig,
      @Value("${test.datasource.name}") String databaseName,
      @Value("${test.datasource.username}") String datasourceUsername,
      @Value("${test.datasource.username}") String datasourcePassword,
      @Value("${test.datasource.driver-class-name}") String datasourceDriver)
      throws ManagedProcessException {
    DB db = DB.newEmbeddedDB(dbConfig);
    db.start();
    db.createDB(databaseName, "root", "");
    db.source("db/init/schema.sql", databaseName);

    DBConfiguration dbConfiguration = db.getConfiguration();

    return DataSourceBuilder.create()
        .driverClassName(datasourceDriver)
        .url(dbConfiguration.getURL(databaseName))
        .username(datasourceUsername)
        .password(datasourcePassword)
        .build();
  }

  @Bean("testTemplate")
  public JdbcTemplate jdbcTemplate(DataSource dataSource) {
    return new JdbcTemplate(dataSource);
  }
}
