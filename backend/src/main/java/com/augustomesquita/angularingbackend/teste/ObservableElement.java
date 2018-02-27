/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.teste;

import java.util.Observable;

/**
 *
 * @author augus
 */
public class ObservableElement extends Observable {

    private static final ObservableElement INSTANCE = new ObservableElement();
   
    public static ObservableElement getInstance(){
        return INSTANCE;
    }

    public ObservableElement() {}
    
    private Integer meuValor;

    public Integer getMeuValor() {
        return meuValor;
    }

    public void setMeuValor(Integer meuValor) {
        this.meuValor = meuValor;
        setChanged();
        notifyObservers();
    }
}
