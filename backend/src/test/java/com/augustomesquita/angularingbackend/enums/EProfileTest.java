package com.augustomesquita.angularingbackend.enums;

import com.augustomesquita.angularingbackend.enums.EProfile;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author Augusto Mesquita
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
