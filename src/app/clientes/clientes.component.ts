import {Component, OnInit, TemplateRef} from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  paginador: any;
  pagina: number;
  clientes: Cliente[];
  modalRef: BsModalRef;

  constructor(private clienteService: ClienteService, private toastr: ToastrService,
              private modalService: BsModalService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pagina = params.get('pagina') as unknown as number;
      if (!this.pagina) {
        this.pagina = 0;
      }
      this.clienteService.getClientes(this.pagina).subscribe(
        response => {
          this.clientes = response.content;
          this.paginador = response;
        }
      );
    });
  }

  delete(cliente: Cliente): void {
    this.clienteService.deleteCliente(cliente.id).subscribe(noresponse => {
      this.toastr.success(`Cliente eliminado`);
      this.clientes = this.clientes.filter(c => c !== cliente);
      if (this.clientes.length === 0) {
        this.router.navigate(['/clientes/pagina/0']);
      }
    });
  }

  confirmDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
}
