import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full'},
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  { path: 'ator', loadChildren: () => import('./atores/atores.module').then(m => m.AtoresModule) },
  { path: 'classe', loadChildren: () => import('./classes/classes.module').then(m => m.ClassesModule) },
  { path: 'diretor', loadChildren: () => import('./diretores/diretores.module').then(m => m.DiretoresModule) },
  { path: 'titulo', loadChildren: () => import('./titulos/titulos.module').then(m => m.TitulosModule) },
  { path: 'item', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
  { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
