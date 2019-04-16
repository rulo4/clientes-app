import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {BsModalService, ComponentLoaderFactory, ModalBackdropComponent, PositioningService} from 'ngx-bootstrap';
import {ModalContainerComponent} from 'ngx-bootstrap/modal';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/es-MX';

registerLocaleData(locale);

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/form', component: ClientesFormComponent },
  { path: 'clientes/form/:id', component: ClientesFormComponent }
];

@NgModule({
  entryComponents: [
    ModalBackdropComponent,
    ModalContainerComponent
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    ClientesFormComponent,
    ModalBackdropComponent,
    ModalContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      enableHtml: true
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [
    ClienteService,
    BsModalService,
    ComponentLoaderFactory,
    PositioningService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
