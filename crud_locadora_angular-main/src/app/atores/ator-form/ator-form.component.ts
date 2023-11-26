import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {AtoresService} from "../servicos/atores.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {Ator} from "../modelo/ator";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ator-form',
  templateUrl: './ator-form.component.html',
  styleUrls: ['./ator-form.component.css', '../../shared/global-css.scss']
})
export class AtorFormComponent implements OnInit {
  form: FormGroup;
  modoEdicao: boolean = false;
  mensagemSnackbarAcerto: string = 'Ator cadastrado com sucesso.';
  mensagemSnackbarErro: string = 'Erro ao cadastrar ator.';

  constructor(private formBuilder: FormBuilder,
              private servico: AtoresService,
              public dialog: MatDialog,
              private location: Location,
              private route: ActivatedRoute,
              private  snackBar: MatSnackBar
  ) {

    this.form = this.formBuilder.group({
      _id: [0],
      nome: [null]
    });

  }

  ngOnInit() {
    const ator: Ator = this.route.snapshot.data['ator'];
    this.form.setValue({_id: ator._id,  nome: ator.nome});

    this.route.params.subscribe(params => {
      this.modoEdicao = !!params['id'];
      this.mensagemSnackbarAcerto = this.modoEdicao ? 'Ator editado com sucesso.' : 'Ator cadastrado com sucesso.';
      this.mensagemSnackbarErro = this.modoEdicao ? 'Erro ao editar ator.' : 'Erro ao cadastrar ator.';
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
