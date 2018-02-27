/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.augustomesquita.angularingbackend.teste;

import java.util.Observable;
import java.util.Observer;

/**
 *
 * @author augus
 */
public class ObserverElement implements Observer {

    ObservableElement observable;

    public ObserverElement(ObservableElement observable) {
        this.observable = observable;
    }
    
    @Override
    public void update(Observable o, Object arg) {
        if (o == observable) {
            System.out.println("Valor foi atualizado: " + observable.getMeuValor());
        }
    }
    
}
