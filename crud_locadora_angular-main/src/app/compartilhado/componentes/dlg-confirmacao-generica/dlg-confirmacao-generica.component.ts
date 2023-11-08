import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dlg-confirmacao-generica',
  templateUrl: './dlg-confirmacao-generica.component.html',
  styleUrls: ['./dlg-confirmacao-generica.component.css']
})
export class DlgConfirmacaoGenericaComponent {
  constructor(public dialogRef: MatDialogRef<DlgConfirmacaoGenericaComponent>) {}
  onConfirm(result: boolean){
    this.dialogRef.close(result);
  }
}
