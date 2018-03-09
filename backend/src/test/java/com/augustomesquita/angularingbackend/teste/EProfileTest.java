/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.teste;

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
public class EProfileTest {
    
    public EProfileTest() {
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
     * Test of getByValue method, of class EProfile.
     */
    @Test
    public void testGetAdminByValue() {
        System.out.println("getByValue");
        int value = 1;
        EProfile instance = EProfile.ROLE_USER;
        EProfile expResult = EProfile.ROLE_ADMIN;
        EProfile result = instance.getByValue(value);
        assertEquals(expResult, result);
    }
    
}
