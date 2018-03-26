import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICurso } from 'app/model/interface/curso.interface';
import { CursoService } from 'app/control/curso/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  private id: number
  private curso: ICurso

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursoService
  ) { }

  ngOnInit() {
    // Resgata id que está sendo passado como parâmetro
    this.activatedRoute.params.subscribe((params) => this.id = params['id'])

    // Loga no console
    this.curso = this.cursoService.getCurso(this.id)
    console.log('CURSO LOGADO: ' + this.curso)
  }

}
