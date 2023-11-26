import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {DiretoresService} from "../servicos/diretores.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {Diretor} from "../modelo/diretor";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-diretor-form',
  templateUrl: './diretor-form.component.html',
  styleUrls: ['./diretor-form.component.css', '../../shared/global-css.scss']
})
export class DiretorFormComponent implements OnInit {
  form: FormGroup;
  modoEdicao: boolean = false;
  mensagemSnackbarAcerto: string = 'Diretor cadastrado com sucesso.';
  mensagemSnackbarErro: string = 'Erro ao cadastrar diretor.';

  constructor(private formBuilder: FormBuilder,
              private servico: DiretoresService,
              public dialog: MatDialog,
              private location: Location,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar
  ) {

    this.form = this.formBuilder.group({
      _id: [0],
      nome: [null]
    });

  }

  ngOnInit() {
    const diretor: Diretor = this.route.snapshot.data['diretor'];
    this.form.setValue({_id: diretor._id,  nome: diretor.nome});

    this.route.params.subscribe(params => {
      this.modoEdicao = !!params['id'];
      this.mensagemSnackbarAcerto = this.modoEdicao ? 'Diretor editado com sucesso.' : 'Diretor cadastrado com sucesso.';
      this.mensagemSnackbarErro = this.modoEdicao ? 'Erro ao editar diretor.' : 'Erro ao cadastrar diretor.';
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
