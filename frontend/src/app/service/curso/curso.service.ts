import { Injectable } from '@angular/core';

@Injectable()
export class CursoService {

  private cursos: ICurso[]

  constructor() {
    this.cursos = [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'Java' },
      { id: 3, name: 'SpringBoot' }
    ]
  }

  getCursos(): ICurso[] {
    return this.cursos
  }

  getCurso(id: number): ICurso {
    return this.cursos.find(curso => curso.id == id);
  }
}

interface ICurso {
  id: number,
  name: string
}
