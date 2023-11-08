import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitulosRoutingModule } from './titulos-routing.module';
import {AppMaterialModule} from "../compartilhado/app-material/app-material.module";
import {CompartilhadoModule} from "../compartilhado/compartilhado.module";
import {ReactiveFormsModule} from "@angular/forms";
import { TitulosListComponent } from './titulos-list/titulos-list.component';
import { TitulosFormComponent } from './titulos-form/titulos-form.component';
import { TitulosComponent } from './containers/titulos/titulos.component';
import {ngModule} from "../compartilhado/ng/ng.module";
import {NgFor} from '@angular/common';


@NgModule({
  declarations: [
    TitulosListComponent,
    TitulosFormComponent,
    TitulosComponent,
  ],
  imports: [
    CommonModule,
    ngModule,
    TitulosRoutingModule,
    AppMaterialModule,
    CompartilhadoModule,
    ReactiveFormsModule,
    NgFor
  ]
})
export class TitulosModule { }
