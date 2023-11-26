import { Dependente } from './../modelo/Dependente';
import { Cliente } from '../modelo/Cliente';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css', '../../shared/global-css.scss']
})
export class ClienteListComponent {
  @Input() cliente: Cliente[] = [];
  @Input() dependente: Dependente[] = [];

  @Output() add = new EventEmitter(false);

  @Output() edit = new EventEmitter(false);

  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'telefone', 'sexo', 'cpf', 'dataNasc', 'endereco', 'actions'];
  readonly displayedColumnsDep = ['id', 'nome', 'sexo', 'dataNasc'];

  constructor() { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(cliente: Cliente){
    this.edit.emit(cliente);
  }

  onDelete(cliente: Cliente){
    this.remove.emit(cliente);
  }

  onEditDep(dependente: Dependente){
    this.edit.emit(dependente);
  }

  onDeleteDep(dependente: Dependente){
    this.remove.emit(dependente);
  }
}
