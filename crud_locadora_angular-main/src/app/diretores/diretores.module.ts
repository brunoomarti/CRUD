import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiretoresComponent} from "./containers/diretores/diretores.component";
import {DiretoresRoutingModule} from "./diretores-routing.module";
import {AppMaterialModule} from "../compartilhado/app-material/app-material.module";
import {CompartilhadoModule} from "../compartilhado/compartilhado.module";
import {DiretorFormComponent} from './diretor-form/diretor-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DiretoresListComponent } from './atores-list/diretores-list.component';
import {ngModule} from "../compartilhado/ng/ng.module";


@NgModule({
  declarations: [
    DiretoresComponent,
    DiretorFormComponent,
    DiretoresListComponent,
  ],
  imports: [
    CommonModule,
    ngModule,
    DiretoresRoutingModule,
    AppMaterialModule,
    CompartilhadoModule,
    ReactiveFormsModule
  ]
})
export class DiretoresModule { }

