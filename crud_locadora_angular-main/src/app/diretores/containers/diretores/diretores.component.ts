import {Component, OnInit} from '@angular/core';
import {Diretor} from "../../modelo/diretor";
import {DiretoresService} from "../../servicos/diretores.service";
import {catchError, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DlgGenericaComponent} from "../../../compartilhado/componentes/dlg-generica/dlg-generica.component";
import {ActivatedRoute, Router} from "@angular/router";
import {
  DlgConfirmacaoGenericaComponent
} from "../../../compartilhado/componentes/dlg-confirmacao-generica/dlg-confirmacao-generica.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-diretores',
  templateUrl: './diretores.component.html',
  styleUrls: ['./diretores.component.css', '../../../shared/global-css.scss']
})
export class DiretoresComponent implements OnInit {

  diretores$: Observable<Diretor[]>;

  constructor(
    private diretoresservices: DiretoresService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.diretores$ = this.diretoresservices.listar()
      .pipe(
        catchError(err => {
          this.dlgGenerica('Erro ao carregar Diretores!.');
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

  onEdit(diretor: Diretor) {
    this.router.navigate(['edit', diretor._id], {relativeTo: this.route});
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onRemove(diretor: Diretor) {
    const dialogRef = this.dialog.open(DlgConfirmacaoGenericaComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.diretoresservices.remove(diretor._id).subscribe(
          () => {
            this.snackBar.open('Diretor removido com sucesso!', '', {
              duration: 5000,
              panelClass: ['custom-snackbar'],
            });

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['diretor']);
            });
          },
          (error) => {
            this.snackBar.open('Erro ao remover diretor!', '', {
              duration: 5000,
              panelClass: ['custom-snackbar', 'error'],
            });
          }
        );
      }
    });
  }
}
