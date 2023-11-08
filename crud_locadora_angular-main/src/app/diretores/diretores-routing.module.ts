import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiretoresComponent} from "./containers/diretores/diretores.component";
import {DiretorFormComponent} from "./diretor-form/diretor-form.component";
import {DiretorResolver} from "./guards/diretor-resolver.service";

const routes: Routes = [
  { path: '', component: DiretoresComponent},
  { path: 'new', component: DiretorFormComponent, resolve: {diretor: DiretorResolver}},
  { path: 'edit/:id', component: DiretorFormComponent, resolve: {diretor: DiretorResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiretoresRoutingModule { }
