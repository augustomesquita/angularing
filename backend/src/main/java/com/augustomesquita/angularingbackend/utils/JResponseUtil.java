package com.augustomesquita.angularingbackend.utils;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Augusto Mesquita
 * @param <T>
 */
public class JResponseUtil<T> {
    
    private T data;
    private List<String> errors;

    public JResponseUtil() {
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public List<String> getErrors() {
        if (this.errors == null) {
            this.errors = new ArrayList<>();
        }
        return errors;
    }

    public void setErrors(List<String> erros) {
        this.errors = erros;
    } 
    
}
