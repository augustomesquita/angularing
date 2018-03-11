package com.augustomesquita.angularingbackend.controller;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author Augusto Mesquita
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
