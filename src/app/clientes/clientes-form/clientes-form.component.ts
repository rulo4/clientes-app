import { Component, OnInit } from '@angular/core';
import {Cliente} from '../cliente';
import {ClienteService} from '../cliente.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html'
})
export class ClientesFormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo: string = 'Crear';

  constructor(private clienteService: ClienteService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }
  public create(): void {
    this.clienteService.create(this.cliente).subscribe(response => {

      if (response) {
        this.toastr.success(`Cliente ${response.nombre} creado`);
        this.router.navigate(['/clientes']);
      } else {
        this.toastr.error(`Error al intentar crear cliente`);
      }
    });
  }

}
