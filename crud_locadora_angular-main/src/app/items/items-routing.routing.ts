import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './containers/items/items.component';
import { ItemsFormComponent } from './items-form/items-form.component';
import { ItemResolver } from './guards/item.resolver';

const routes: Routes = [
  { path: '', component: ItemsComponent},
  { path: 'new', component: ItemsFormComponent, resolve: {item: ItemResolver}},
  { path: 'edit/:id', component: ItemsFormComponent, resolve: {item: ItemResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ItemsRoutingRoutes {}
