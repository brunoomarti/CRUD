import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsRoutingRoutes } from './items-routing.routing';
import { ItemsFormComponent } from './items-form/items-form.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { AppMaterialModule } from "../compartilhado/app-material/app-material.module";
import { CompartilhadoModule } from "../compartilhado/compartilhado.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ItemsComponent } from './containers/items/items.component';
import {ngModule} from "../compartilhado/ng/ng.module";

@NgModule({
  declarations: [
    ItemsFormComponent,
    ItemsListComponent,
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    ngModule,
    ItemsRoutingRoutes,
    AppMaterialModule,
    CompartilhadoModule,
    ReactiveFormsModule
  ]
})
export class ItemsModule { }
