import { Injectable } from '@angular/core';
import { AuthenticateUser } from 'app/model/entity/authenticate-user.model';
import { StompConfig } from '@stomp/ng2-stompjs';
import { AuthenticationService } from '../../control/authentication/authentication.service';
import * as SockJS from 'sockjs-client';
import { SettingsService } from '../../control/settings/settings.service';


export class CustomStompConfig {

    private static userIdentification: string;

    public static stompConfig(): StompConfig {

        this.userIdentification = 'guest';

        if (this.getValidUserAtLocalStorage() != null && this.getValidUserAtLocalStorage().user != null) {
            this.userIdentification = this.getValidUserAtLocalStorage().user.email;
        }

        if (this.userIdentification === null
            || this.userIdentification === undefined
            || this.userIdentification.length == 0) {
            this.userIdentification = 'guest';
        }

        return {
            // Which server?
            url: 'ws://localhost:8080/chat',

            // Headers
            // Typical keys: login, passcode, host
            headers: {
                login: this.userIdentification,
                passcode: this.userIdentification
            },

            // How often to heartbeat?
            // Interval in milliseconds, set to 0 to disable
            heartbeat_in: 0, // Typical value 0 - disabled
            heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

            // Wait in milliseconds before attempting auto reconnect
            // Set to 0 to disable
            // Typical value 5000 (5 seconds)
            reconnect_delay: 5000,

            // Will log diagnostics on console
            debug: true
        }
    }

    private static getValidUserAtLocalStorage(): AuthenticateUser {
        return JSON.parse(localStorage.getItem(SettingsService.LOGGED_USER)) as AuthenticateUser;
    }
}
