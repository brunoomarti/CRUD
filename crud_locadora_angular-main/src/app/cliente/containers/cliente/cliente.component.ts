import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../modelo/Cliente';
import { Observable, catchError, of } from 'rxjs';
import { ClienteService } from '../../servicos/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { DlgGenericaComponent } from "../../../compartilhado/componentes/dlg-generica/dlg-generica.component";
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DlgConfirmacaoGenericaComponent
} from "../../../compartilhado/componentes/dlg-confirmacao-generica/dlg-confirmacao-generica.component";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css', '../../../shared/global-css.scss']
})
export class ClienteComponent implements OnInit {

  cliente$: Observable<Cliente[]>;

  constructor(
    private clienteservice: ClienteService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private  snackBar: MatSnackBar
  ) {
    this.cliente$ = this.clienteservice.list()
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

  onEdit(cliente: Cliente) {
    this.router.navigate(['edit', cliente._id], {relativeTo: this.route});
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onRemove(cliente: Cliente) {
    const dialogRef = this.dialog.open(DlgConfirmacaoGenericaComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clienteservice.remove(cliente._id.toString()).subscribe(
          () => {
            this.snackBar.open('Cliente removido com sucesso!', '', {
              duration: 5000,
              panelClass: ['successSnackbar'],
            });

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['cliente']);
            });
          },
          (error) => {
            if (error.status === 409) {
              this.mostrarMensagemConfirmacao(error.error.message);
            } else {
              this.snackBar.open('Erro ao remover cliente!', '', {
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
