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
public class ObserverUser implements Observer {

    ObservableUser observable;

    public ObserverUser(ObservableUser observable) {
        this.observable = observable;
    }

    @Override
    public void update(Observable o, Object arg) {
        if (o == observable) {
            String fieldUpdated = (String) arg;

            switch (fieldUpdated) {
                case "userName":
                    if (observable.getUserName() != null && !observable.getUserName().isEmpty()) {
                    System.out.println("Usuário teve seu nome modificado para "
                            + observable.getUserName());
                    }
                    break;

                case "userAge":
                    if (observable.getUserName() != null && !observable.getUserName().isEmpty()) {
                        System.out.println("O usuário " + observable.getUserName()
                                + " teve sua idade atualizada para: " + observable.getUserAge());
                    } else {
                        System.out.println("Idade de usuário sem nome foi modificada para:" + observable.getUserAge());
                    }
                    break;
            }

        }
    }

}
