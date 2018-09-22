import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { IGenericCustomDeactivate } from '../../model/interface/igeneric-custom-deactivate.interface';

@Injectable()
export class CustomDeactivateGuard implements CanDeactivate<IGenericCustomDeactivate> {
    canDeactivate(
        component: IGenericCustomDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return component.alertBeforeLeave();
    }
}
