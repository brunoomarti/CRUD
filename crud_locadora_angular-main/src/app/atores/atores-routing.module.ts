import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AtoresComponent} from "./containers/atores/atores.component";
import {AtorFormComponent} from "./ator-form/ator-form.component";
import {AtorResolver} from "./guards/AtorResolver";

const routes: Routes = [
  { path: '', component: AtoresComponent},
  { path: 'new', component: AtorFormComponent, resolve: {ator: AtorResolver}},
  { path: 'edit/:id', component: AtorFormComponent, resolve: {ator: AtorResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtoresRoutingModule { }
