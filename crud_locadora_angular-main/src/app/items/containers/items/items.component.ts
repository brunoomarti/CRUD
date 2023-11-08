import { Component, OnInit } from '@angular/core';
import { Item } from '../../modelo/item';
import { catchError, Observable, of } from 'rxjs';
import { ItemsService } from '../../servicos/items.service';
import {MatDialog} from "@angular/material/dialog";
import {DlgGenericaComponent} from "../../../compartilhado/componentes/dlg-generica/dlg-generica.component";
import {ActivatedRoute, Router} from "@angular/router";
import {
  DlgConfirmacaoGenericaComponent
} from "../../../compartilhado/componentes/dlg-confirmacao-generica/dlg-confirmacao-generica.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css', '../../../shared/global-css.scss']
})
export class ItemsComponent implements OnInit {

  items$: Observable<Item[]>;

  constructor(
    private itemsservice: ItemsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.items$ = this.itemsservice.listar()
      .pipe(
        catchError(err => {
          this.dlgGenerica('Erro ao carregar Items!.');
          return of([])
        })
      );
  }

  dlgGenerica(msgErro: string) {
    this.dialog.open(DlgGenericaComponent, {
      data: msgErro
    });
  }

  ngOnInit(): void {
  }

  onEdit(item: Item) {
    this.router.navigate(['edit', item._id], {relativeTo: this.route});
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onRemove(item: Item) {
    const dialogRef = this.dialog.open(DlgConfirmacaoGenericaComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.itemsservice.remove(item._id).subscribe(
          () => {
            this.snackBar.open('Item removido com sucesso!', '', {
              duration: 5000,
              panelClass: ['custom-snackbar'],
            });

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['item']);
            });
          },
          () => {
            this.snackBar.open('Erro ao remover item!', '', {
              duration: 5000,
              panelClass: ['custom-snackbar', 'error'],
            });
          }
        );
      }
    });
  }

}
