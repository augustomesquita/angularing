import { Injectable } from '@angular/core';

@Injectable()
export class MeuServicoService {

  private strings: string[]

  constructor() { 
    this.strings = ['Angularing', 'Typescrip', 'Serviço']
  }

  getAllStrings(): string[] {
    return this.strings
  }

  putString(string: string): void {
    this.strings.push(string)
    string = ''
  }

}
