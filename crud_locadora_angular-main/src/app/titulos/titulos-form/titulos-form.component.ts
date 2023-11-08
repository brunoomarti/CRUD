import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Location } from "@angular/common";
import { TitulosService } from '../services/titulos.service';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Titulo } from '../modelo/titulo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtoresService } from 'src/app/atores/servicos/atores.service';
import { DiretoresService } from 'src/app/diretores/servicos/diretores.service';
import { ClassesService } from 'src/app/classes/servicos/classes.service';

@Component({
  selector: 'app-titulos-form',
  templateUrl: './titulos-form.component.html',
  styleUrls: ['./titulos-form.component.css', '../../shared/global-css.scss']
})
export class TitulosFormComponent implements OnInit{

  form: FormGroup;
  listaDeAtores: any[] = [];
  listaDeDiretores: any[] = [];
  listaDeClasses: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private servico: TitulosService,
              public dialog: MatDialog,
              private location: Location,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private atorService: AtoresService,
              private diretorService: DiretoresService,
              private classeService: ClassesService
) {

  this.form = this.formBuilder.group({
    _id: [0],
    nome: '',
    atores: [],
    diretor: '',
    ano: [0],
    sinopse: '',
    categoria: '',
    classe: ''
  });
}

  ngOnInit(): void {
    const titulo: Titulo = this.route.snapshot.data['titulo'];
    this.form.setValue({_id: titulo._id,
                        nome: titulo.nome,
                        atores: titulo.atores.map(ator => ator._id),
                        diretor: titulo.diretor,
                        ano: new Date().getFullYear(),
                        sinopse: titulo.sinopse,
                        categoria: titulo.categoria,
                        classe: titulo.classe
                      });

    this.atorService.listar().subscribe(atores => this.listaDeAtores = atores);
    this.diretorService.listar().subscribe(diretores => this.listaDeDiretores = diretores);
    this.classeService.listar().subscribe(classes => this.listaDeClasses = classes);
  }

  onSubmit() {
    console.log(this.form)
    this.servico.save(this.form.value).subscribe(result => this.onSucess(), error => this.onFailed());
  }

  onFailed() {
    this.snackBar.open('Erro ao cadastrar titulo.', '', { duration: 5000, panelClass: ['custom-snackbar'] });
  }

  onSucess() {
    this.snackBar.open('Titulo cadastrado com sucesso.', '', { duration: 5000, panelClass: ['custom-snackbar'] });
    this.location.back();
  }

  onBack() {
    this.location.back();
  }

}
