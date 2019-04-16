import { Component, OnInit } from '@angular/core';
import {Cliente} from '../cliente';
import {ClienteService} from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html'
})
export class ClientesFormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo = 'Crear';

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.loadCliente();
  }

  public getCliente() {
    return this.cliente;
  }

  public setCliente(cliente: Cliente) {
    this.cliente = cliente;
  }

  public loadCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.clienteService.getCliente(params.id).subscribe(cliente => this.cliente = cliente);
      }
    });
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(cliente => {
      this.toastr.success(`Cliente ${cliente.nombre} creado`);
      this.router.navigate(['/clientes']);
    });
  }

  public update(): void {
    this.clienteService.updateCliente(this.cliente).subscribe( cliente => {
      this.toastr.success(`Cliente actualizado`);
      this.cliente = cliente;
    });
  }
}
