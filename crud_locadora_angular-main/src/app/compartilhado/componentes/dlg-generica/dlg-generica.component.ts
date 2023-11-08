import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dlg-generica',
  templateUrl: './dlg-generica.html',
  styleUrls: ['./dlg-generica.css']
})
export class DlgGenericaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private location: Location) {

  }

  voltar() {
      this.location.back();
  }
}
