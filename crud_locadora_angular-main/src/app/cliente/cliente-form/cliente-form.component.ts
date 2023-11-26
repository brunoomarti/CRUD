import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../servicos/cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../modelo/Cliente';
import { Location } from "@angular/common";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css', '../../shared/global-css.scss']
})
export class ClienteFormComponent implements OnInit {
  form: FormGroup;
  modoEdicao: boolean = false;
  mensagemSnackbarAcerto: string = 'Cliente cadastrado com sucesso.';
  mensagemSnackbarErro: string = 'Erro ao cadastrar cliente.';

  constructor(private formBuilder: FormBuilder,
    private servico: ClienteService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private  snackBar: MatSnackBar
  ) {

  this.form = this.formBuilder.group({
    _id: [],
    nome: '',
    telefone: '',
    sexo: '',
    cpf: '',
    dataNasc: '',
    rua: '',
    numero: 0,
    bairro: '',
    cidade: '',
    estado: ''
    });
  }

  ngOnInit(): void {
    const cliente: Cliente = this.route.snapshot.data['cliente'];

    this.form.setValue({_id: cliente._id,
                        nome: cliente.nome,
                        telefone: cliente.telefone,
                        sexo: cliente.sexo,
                        cpf: cliente.cpf,
                        dataNasc: cliente.dataNasc,
                        rua: cliente.rua,
                        numero: cliente.numero,
                        bairro: cliente.bairro,
                        cidade: cliente.cidade,
                        estado: cliente.estado
                      });

    this.route.params.subscribe(params => {
      this.modoEdicao = !!params['id'];
      this.mensagemSnackbarAcerto = this.modoEdicao ? 'Cliente editado com sucesso.' : 'Cliente cadastrado com sucesso.';
      this.mensagemSnackbarErro = this.modoEdicao ? 'Erro ao editar cliente.' : 'Erro ao cadastrar cliente.';
    });
  }

  onSubmit() {
    this.servico.save(this.form.value).subscribe(result => this.onSucess(), error => this.onFailed());
  }

  onFailed() {
    this.snackBar.open(this.mensagemSnackbarErro, '', { duration: 5000, panelClass: ['errorSnackbar'] });
  }

  onSucess() {
    this.snackBar.open(this.mensagemSnackbarAcerto, '', { duration: 5000, panelClass: ['successSnackbar'] });
    this.location.back();
  }

  onBack() {
    this.location.back();
  }

}
