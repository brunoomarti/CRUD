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
  }

  onSubmit() {
    this.servico.save(this.form.value).subscribe(result => this.onSucess(), error => this.onFailed());
  }

  onFailed() {
    this.snackBar.open('Erro ao cadastrar ator.', '', { duration: 5000, panelClass: ['custom-snackbar'] });
  }

  onSucess() {
    this.snackBar.open('Ator cadastrado com sucesso.', '', { duration: 5000, panelClass: ['custom-snackbar'] });
    this.location.back();
  }

  onBack() {
    this.location.back();
  }
}
