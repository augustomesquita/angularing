/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.controller;

import com.augustomesquita.angularingbackend.teste.JUser;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author augus
 */
public class JUserControllerTest {
    
    public JUserControllerTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of login method, of class JUserController.
     */
    @Test
    public void testLogin() {
        System.out.println("login");
        String userEmail = "";
        String userToken = "";
        JLoginController instance = new JLoginController();
        Boolean result = instance.login(userEmail, userToken);
        System.out.println("login result: " + result);
    }
    
}
