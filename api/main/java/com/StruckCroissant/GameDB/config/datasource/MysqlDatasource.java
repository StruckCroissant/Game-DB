package com.StruckCroissant.GameDB.config.datasource;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * This class provides a hikariDataSource bean for usage throughout the API. This database houses
 * all the information that needs to be consumed.
 *
 * @author Dakota Vaughn
 * @since 2022-06-20
 */
@Configuration
public class MysqlDatasource {

  /**
   * Creates a hikari datasource configured via properties in application.yaml
   *
   * @return HikariDataSource
   * @see ../application.yaml
   */
  @Bean
  @Primary
  @ConfigurationProperties("app.datasource")
  public HikariDataSource hikariDataSource() {
    return DataSourceBuilder.create().type(HikariDataSource.class).build();
  }
}
