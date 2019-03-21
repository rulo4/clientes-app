import {Component, OnInit, TemplateRef} from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  modalRef: BsModalRef;

  constructor(private clienteService: ClienteService, private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void {
    this.clienteService.deleteCliente(cliente.id).subscribe(noresponse => {
      this.toastr.success(`Cliente eliminado`);
      this.clientes = this.clientes.filter(c => c !== cliente);
    });
  }

  confirmDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

}
