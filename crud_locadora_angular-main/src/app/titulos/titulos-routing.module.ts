import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitulosComponent } from './containers/titulos/titulos.component';
import { TitulosFormComponent } from './titulos-form/titulos-form.component';
import { TitulosResolver } from './guards/titulos.resolver';

const routes: Routes = [
  { path: '', component: TitulosComponent},
  { path: 'new', component: TitulosFormComponent, resolve: {titulo: TitulosResolver}},
  { path: 'edit/:id', component: TitulosFormComponent, resolve: {titulo: TitulosResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TitulosRoutingModule { }
