import { TitulosService } from './../../titulos/services/titulos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemsService } from '../servicos/items.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../modelo/item';
import { Location } from "@angular/common";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.css', '../../shared/global-css.scss']
})
export class ItemsFormComponent implements OnInit {

  form: FormGroup;
  listaDeTitulos: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private servico: ItemsService,
              public dialog: MatDialog,
              private location: Location,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private titulosService: TitulosService,
              private datePipe: DatePipe
  ) {

  this.form = this.formBuilder.group({
      _id: [],
      titulo: '',
      dataAquisicao: '',
      tipo: ''
    });
  }

  ngOnInit(): void {
    const item: Item = this.route.snapshot.data['item'];

    const dataAtual = new Date();
    const dataFormatada = dataAtual.toISOString().split('T')[0];

    this.form.setValue({_id: item._id,
                        titulo: item.titulo,
                        dataAquisicao: dataFormatada,
                        tipo: item.tipo
                      });

    this.titulosService.listar().subscribe(titulos => this.listaDeTitulos = titulos);
  }

  onSubmit() {
    this.servico.save(this.form.value).subscribe(result => this.onSucess(), error => this.onFailed());
  }

  onFailed() {
    this.snackBar.open('Erro ao cadastrar item.', '', { duration: 5000, panelClass: ['custom-snackbar'] });
  }

  onSucess() {
    this.snackBar.open('Item cadastrado com sucesso.', '', { duration: 5000, panelClass: ['custom-snackbar'] });
    this.location.back();
  }

  onBack() {
    this.location.back();
  }

}
