import { Component, OnInit } from '@angular/core';
import { IGenericCustomDeactivate } from './../../../model/interface/igeneric-custom-deactivate.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, IGenericCustomDeactivate {

  constructor() { }

  ngOnInit() {
  }

  alertBeforeLeave() {
    return confirm(`Tem certeza que deseja sair desta página??? (Estou apenas testando 'canDeactivate' aqui hehe, pode sair sim xD)`);
  }

}
