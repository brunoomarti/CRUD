import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassesComponent} from "./containers/classes/classes.component";
import {ClassesRoutingModule} from "./classes-routing.module";
import {AppMaterialModule} from "../compartilhado/app-material/app-material.module";
import {CompartilhadoModule} from "../compartilhado/compartilhado.module";
import {ClasseFormComponent} from './classe-form/classe-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ClassesListComponent } from './classes-list/classes-list.component';


@NgModule({
  declarations: [
    ClassesComponent,
    ClasseFormComponent,
    ClassesListComponent,
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    AppMaterialModule,
    CompartilhadoModule,
    ReactiveFormsModule
  ]
})
export class ClassesModule { }

