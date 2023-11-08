import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {ClassesService} from "../servicos/classes.service";
import {MatDialog} from "@angular/material/dialog";
import {DlgGenericaComponent} from "../../compartilhado/componentes/dlg-generica/dlg-generica.component";
import {ActivatedRoute} from "@angular/router";
import {Classe} from "../modelo/classe";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-classe-form',
  templateUrl: './classe-form.component.html',
  styleUrls: ['./classe-form.component.css', '../../shared/global-css.scss']
})
export class ClasseFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private servico: ClassesService,
              public dialog: MatDialog,
              private location: Location,
              private route: ActivatedRoute,
              private  snackBar: MatSnackBar
  ) {

    this.form = this.formBuilder.group({
      _id: [0],
      nome: [null],
      prazoDias: [0],
      valor: [0]

    });

  }

  ngOnInit() {
    const classe: Classe = this.route.snapshot.data['classe'];
    this.form.setValue({_id: classe._id,  nome: classe.nome, prazoDias: classe.prazoDias, valor: classe.valor });
  }

  onSubmit() {
    this.servico.save(this.form.value).subscribe(result => this.onSucess(), error => this.onFailed());
  }

  onFailed() {
    this.snackBar.open('Erro ao cadastrar classe.', '', { duration: 5000, panelClass: ['custom-snackbar'] });
  }

  onSucess() {
    this.snackBar.open('Classe cadastrada com sucesso.', '', { duration: 5000, panelClass: ['custom-snackbar'] });
    this.location.back();
  }

  onBack() {
    this.location.back();
  }
}
