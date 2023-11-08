import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassesComponent} from "./containers/classes/classes.component";
import {ClasseFormComponent} from "./classe-form/classe-form.component";
import {ClasseResolver} from "./guards/ClasseResolver";

const routes: Routes = [
  { path: '', component: ClassesComponent},
  { path: 'new', component: ClasseFormComponent, resolve: {classe: ClasseResolver}},
  { path: 'edit/:id', component: ClasseFormComponent, resolve: {classe: ClasseResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
