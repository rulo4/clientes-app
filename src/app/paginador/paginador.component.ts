import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-paginador',
  templateUrl: './paginador.component.html'
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() paginador: any;
  paginas: number[];
  primeroHabilitado: boolean;
  ultimoHabilitado: boolean;
  inicio: number;
  fin: number;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    // console.log('paginador actualizado')
    this.primeroHabilitado = this.paginador.number > 0;
    this.ultimoHabilitado = this.paginador.number < (this.paginador.totalPages - 1);
    if (this.paginador.totalPages <= 11) {
      this.paginas = Array.from(new Array(this.paginador.totalPages), (val, idx) => idx);
    } else {
      this.inicio = Math.max(this.paginador.number - 5, 0);
      this.fin = Math.min(this.paginador.number + 5, this.paginador.totalPages);
      const len = this.fin - this.inicio;
      this.paginas = Array.from(new Array(len), (val, idx) => idx + this.inicio);
    }
  }
}
