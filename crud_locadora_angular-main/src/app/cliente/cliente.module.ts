import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './containers/cliente/cliente.component';
import { AppMaterialModule } from '../compartilhado/app-material/app-material.module';
import { CompartilhadoModule } from '../compartilhado/compartilhado.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteRoutingModule } from './cliente.routing';


@NgModule({
  declarations: [
    ClienteComponent,
    ClienteFormComponent,
    ClienteListComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    AppMaterialModule,
    CompartilhadoModule,
    ReactiveFormsModule
  ]
})
export class ClienteModule { }
