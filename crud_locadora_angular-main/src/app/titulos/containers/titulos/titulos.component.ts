import { TitulosService } from './../../services/titulos.service';
import { Titulo } from './../../modelo/titulo';
import {Component, OnInit} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DlgGenericaComponent} from "../../../compartilhado/componentes/dlg-generica/dlg-generica.component";
import {ActivatedRoute, Router} from "@angular/router";
import {
  DlgConfirmacaoGenericaComponent
} from "../../../compartilhado/componentes/dlg-confirmacao-generica/dlg-confirmacao-generica.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css', '../../../shared/global-css.scss']
})
export class TitulosComponent implements OnInit {

  titulos$: Observable<Titulo[]>;

  constructor(
    private titulosservice: TitulosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.titulos$ = this.titulosservice.listar()
      .pipe(
        catchError(err => {
          this.dlgGenerica('Erro ao carregar Titulos!.');
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

  onEdit(titulo: Titulo) {
    this.router.navigate(['edit', titulo._id], {relativeTo: this.route});
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onRemove(titulo: Titulo) {
    const dialogRef = this.dialog.open(DlgConfirmacaoGenericaComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.titulosservice.remove(titulo._id).subscribe(
          () => {
            this.snackBar.open('Titulo removido com sucesso!', '', {
              duration: 5000,
              panelClass: ['successSnackbar'],
            });

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['titulo']);
            });
          },
          (error) => {
            if (error.status === 409) {
              this.mostrarMensagemConfirmacao(error.error.message);
            } else {
              this.snackBar.open('Erro ao remover titulo!', '', {
                duration: 5000,
                panelClass: ['errorSnackbar', 'error'],
              });
            }
          }
        );
      }
    });
  }

  mostrarMensagemConfirmacao(mensagem: string) {
    this.dialog.open(DlgGenericaComponent, {
      data: { mensagemHtml: mensagem }
    });
  }
}
