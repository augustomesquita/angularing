package com.augustomesquita.angularingbackend.utils;

import com.augustomesquita.angularingbackend.model.JUser;
import com.augustomesquita.angularingbackend.springsecurity.dto.JUserDTO;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author augusto
 */
public class JConvertToDtoUtil {

    public static JUserDTO convertUser(JUser user) {
        return new JUserDTO(user.getName(), user.getEmail(), user.getPhotoUrl());
    }
}
