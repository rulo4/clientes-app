import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCurso: string[] = [
    'TypeScript',
    'Javascript',
    'Java SE'
  ];

  visible: boolean = true;

  constructor() { }

  cambiarVisibilidad() {
    this.visible = !this.visible;
  }

}
