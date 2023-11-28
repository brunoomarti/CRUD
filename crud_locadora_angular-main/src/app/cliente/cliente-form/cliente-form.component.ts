import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../servicos/cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../modelo/Cliente';
import { Location } from "@angular/common";
import { Socio } from '../modelo/Socio';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css', '../../shared/global-css.scss']
})
export class ClienteFormComponent implements OnInit {
  // form: FormGroup;
  // modoEdicao: boolean = false;
  // mensagemSnackbarAcerto: string = 'Cliente cadastrado com sucesso.';
  // mensagemSnackbarErro: string = 'Erro ao cadastrar cliente.';

  // constructor(private formBuilder: FormBuilder,
  //   private servico: ClienteService,
  //   public dialog: MatDialog,
  //   private location: Location,
  //   private route: ActivatedRoute,
  //   private  snackBar: MatSnackBar
  // ) {

  // this.form = this.formBuilder.group({
  //   _id: [],
  //   nome: '',
  //   telefone: '',
  //   sexo: '',
  //   cpf: '',
  //   dataNasc: '',
  //   rua: '',
  //   numero: 0,
  //   bairro: '',
  //   cidade: '',
  //   estado: ''
  //   });
  // }

  // ngOnInit(): void {
  //   const cliente: Cliente = this.route.snapshot.data['cliente'];

  //   this.form.setValue({_id: cliente._id,
  //                       nome: cliente.nome,
  //                       telefone: cliente.telefone,
  //                       sexo: cliente.sexo,
  //                       cpf: cliente.cpf,
  //                       dataNasc: cliente.dataNasc,
  //                       rua: cliente.rua,
  //                       numero: cliente.numero,
  //                       bairro: cliente.bairro,
  //                       cidade: cliente.cidade,
  //                       estado: cliente.estado
  //                     });

  //   this.route.params.subscribe(params => {
  //     this.modoEdicao = !!params['id'];
  //     this.mensagemSnackbarAcerto = this.modoEdicao ? 'Cliente editado com sucesso.' : 'Cliente cadastrado com sucesso.';
  //     this.mensagemSnackbarErro = this.modoEdicao ? 'Erro ao editar cliente.' : 'Erro ao cadastrar cliente.';
  //   });
  // }

  // onSubmit() {
  //   this.servico.save(this.form.value).subscribe(result => this.onSucess(), error => this.onFailed());
  // }

  // onFailed() {
  //   this.snackBar.open(this.mensagemSnackbarErro, '', { duration: 5000, panelClass: ['errorSnackbar'] });
  // }

  // onSucess() {
  //   this.snackBar.open(this.mensagemSnackbarAcerto, '', { duration: 5000, panelClass: ['successSnackbar'] });
  //   this.location.back();
  // }

  // onBack() {
  //   this.location.back();
  // }

  form: FormGroup
  selectedContent: string | null = null;
  modoEdicao: boolean = false;

  socios: Socio[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private servicoCliente: ClienteService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route2: ActivatedRoute,
    private location: Location
    ){
    this.form = this.formBuilder.group({
      _id: [null],
      nome:[null],
      cpf:[null],
      numInscricao:[null],
      dataNascimento:[null],
      telefone:[null],
      sexo:[null],
      numero:[null],
      rua:[null],
      bairro:[null],
      cidade:[null],
      estado:[null],
      status:[null],
      tipoCliente: 'socio'
    });
  }

  showContent(content: string) {
    this.selectedContent = content;
  }

  getContent(){
    return this.selectedContent;
  }

  ngOnInit(): void {
    this.route2.params.subscribe((params: any) => {
      const id = params['id'];
      let socio: Socio | null = null;
      this.servicoCliente.loadById(id).subscribe(cliente => {
        socio = cliente as Socio;
        if (socio !== null) {
          this.updateFormForSocio(socio);
        }
      });
    });
  }

  updateFormForSocio(cliente: Socio ){
    this.form.patchValue({
      _id: cliente._id,
      nome:cliente.nome,
      numInscricao:cliente.numInscricao,
      dtNascimento:cliente.dataNascimento,
      sexo:cliente.sexo,
      isAtivo:cliente.status,
      tipoCliente:cliente.tipoCliente,
      cpf:cliente.cpf,
      endereco:cliente.endereco,
      telefone:cliente.telefone
    });
    //console.log(cliente);
  }

  onSubmit() {
    const formData = this.form.value;

    console.log(formData);
    this.servicoCliente.save(formData).subscribe(
      () => {
        this.form.reset();
        this.mostrarMensagemDeSucesso('Cliente salvo com sucesso!');
      },
      () => {
        this.mostrarMensagemDeErro('Ocorreu um erro ao salvar o cliente.');
      }
    );
    this.onBack();
  }

  onBack() {
    this.location.back();
  }


  mostrarMensagemDeSucesso(mensagem: string) {
    this._snackBar.open(mensagem, 'Fechar', {
      duration: 2000,
    });
  }

  mostrarMensagemDeErro(mensagem: string) {
    this._snackBar.open(mensagem, 'Fechar', {
      duration: 2000,
    });
  }

  cancelar(){
    this.router.navigate(['principal/adm']);
  }

}
