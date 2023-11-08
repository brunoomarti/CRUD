import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DlgGenericaComponent} from './componentes/dlg-generica/dlg-generica.component';
import {AppMaterialModule} from "./app-material/app-material.module";
import {
  DlgConfirmacaoGenericaComponent
} from "./componentes/dlg-confirmacao-generica/dlg-confirmacao-generica.component";


@NgModule({
  declarations: [
    DlgGenericaComponent,
    DlgConfirmacaoGenericaComponent

  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [DlgGenericaComponent, DlgConfirmacaoGenericaComponent]
})
export class CompartilhadoModule { }
