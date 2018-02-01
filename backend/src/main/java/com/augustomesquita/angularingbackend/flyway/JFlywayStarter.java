/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.flyway;

import org.apache.commons.dbcp.BasicDataSource;
import org.flywaydb.core.Flyway;

/**
 *
 * @author augusto
 */
public class JFlywayStarter {

    public static void starter() {
        
        // Prepara configuraçoes para o Flyway
        BasicDataSource ds = new BasicDataSource();
        ds.setDriverClassName(EFlywaySettings.DRIVER.getValue());
        ds.setUsername(EFlywaySettings.USER.getValue());
        ds.setPassword(EFlywaySettings.PASSWORD.getValue());
        ds.setUrl(EFlywaySettings.URL.getValue());
        ds.setInitialSize(1);
        ds.setMaxActive(5);

        // Flyway
        Flyway flyway = new Flyway();
        flyway.setDataSource(ds);
        flyway.setBaselineOnMigrate(true);
        flyway.setValidateOnMigrate(false);

        // Realiza migração do banco de dados
        flyway.migrate();
    }

}
