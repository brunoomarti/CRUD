import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AtoresComponent} from "./containers/atores/atores.component";
import {AtoresRoutingModule} from "./atores-routing.module";
import {AppMaterialModule} from "../compartilhado/app-material/app-material.module";
import {CompartilhadoModule} from "../compartilhado/compartilhado.module";
import {AtorFormComponent} from './ator-form/ator-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AtoresListComponent } from './atores-list/atores-list.component';
import {ngModule} from "../compartilhado/ng/ng.module";


@NgModule({
  declarations: [
    AtoresComponent,
    AtorFormComponent,
    AtoresListComponent,
  ],
  imports: [
    CommonModule,
    AtoresRoutingModule,
    AppMaterialModule,
    CompartilhadoModule,
    ReactiveFormsModule
  ]
})
export class AtoresModule { }

