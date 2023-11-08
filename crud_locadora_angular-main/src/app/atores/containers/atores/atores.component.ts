import {Component, OnInit} from '@angular/core';
import {Ator} from "../../modelo/ator";
import {AtoresService} from "../../servicos/atores.service";
import {catchError, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DlgGenericaComponent} from "../../../compartilhado/componentes/dlg-generica/dlg-generica.component";
import {ActivatedRoute, Router} from "@angular/router";
import {
  DlgConfirmacaoGenericaComponent
} from "../../../compartilhado/componentes/dlg-confirmacao-generica/dlg-confirmacao-generica.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-atores',
  templateUrl: './atores.component.html',
  styleUrls: ['./atores.component.css', '../../../shared/global-css.scss']
})
export class AtoresComponent implements OnInit {

  atores$: Observable<Ator[]>;


  constructor(
    private atoresservices: AtoresService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private  snackBar: MatSnackBar
  ) {
    this.atores$ = this.atoresservices.listar()
      .pipe(
        catchError(err => {
          this.dlgGenerica('Erro ao carregar atores.');
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

  onEdit(ator: Ator) {
    this.router.navigate(['edit', ator._id], {relativeTo: this.route});
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onRemove(ator: Ator) {
    const dialogRef = this.dialog.open(DlgConfirmacaoGenericaComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.atoresservices.remove(ator._id).subscribe(
          () => {
            this.snackBar.open('Ator removido com sucesso!', '', {
              duration: 5000,
              panelClass: ['custom-snackbar'],
            });

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['ator']);
            });
          },
          (error) => {
            this.snackBar.open('Erro ao remover ator!', '', {
              duration: 5000,
              panelClass: ['custom-snackbar', 'error'],
            });
          }
        );
      }
    });
  }
}
