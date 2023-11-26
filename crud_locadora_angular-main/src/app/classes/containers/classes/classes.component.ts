import {Component, OnInit} from '@angular/core';
import {Classe} from "../../modelo/classe";
import {ClassesService} from "../../servicos/classes.service";
import {catchError, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DlgGenericaComponent} from "../../../compartilhado/componentes/dlg-generica/dlg-generica.component";
import {ActivatedRoute, Router} from "@angular/router";
import {
  DlgConfirmacaoGenericaComponent
} from "../../../compartilhado/componentes/dlg-confirmacao-generica/dlg-confirmacao-generica.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css', '../../../shared/global-css.scss']
})
export class ClassesComponent implements OnInit {

  classes$: Observable<Classe[]>;

  constructor(
    private classesservices: ClassesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private  snackBar: MatSnackBar
  ) {
    this.classes$ = this.classesservices.listar()
      .pipe(
        catchError(err => {
          this.dlgGenerica('Erro ao carregar classes.');
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

  onEdit(classe: Classe) {
    this.router.navigate(['edit', classe._id], {relativeTo: this.route});
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onRemove(classe: Classe) {
    const dialogRef = this.dialog.open(DlgConfirmacaoGenericaComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.classesservices.remove(classe._id).subscribe(
          () => {
            this.snackBar.open('Classe removida com sucesso!', '', {
              duration: 5000,
              panelClass: ['successSnackbar'],
            });

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['classe']);
            });
          },
          (error) => {
            if (error.status === 409) {
              this.mostrarMensagemConfirmacao(error.error.message);
            } else {
              this.snackBar.open('Erro ao remover classe!', '', {
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
