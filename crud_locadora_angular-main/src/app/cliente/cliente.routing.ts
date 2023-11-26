import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClienteComponent } from './containers/cliente/cliente.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteResolver } from './guards/ClienteResolver';

const routes: Routes = [
  { path: '', component: ClienteComponent},
  { path: 'new', component: ClienteFormComponent, resolve: {classe: ClienteResolver}},
  { path: 'edit/:id', component: ClienteFormComponent, resolve: {classe: ClienteResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
