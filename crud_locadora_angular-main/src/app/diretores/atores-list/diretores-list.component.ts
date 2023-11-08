import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Diretor} from "../modelo/diretor";

@Component({
  selector: 'app-diretores-list',
  templateUrl: './diretores-list.component.html',
  styleUrls: ['./diretores-list.component.css', '../../shared/global-css.scss']
})
export class DiretoresListComponent {
  @Input() diretores: Diretor[] = [];

  @Output() add = new EventEmitter(false);

  @Output() edit = new EventEmitter(false);

  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'actions'];

  constructor() { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(ator: Diretor){
    this.edit.emit(ator);
  }

  onDelete(ator: Diretor){
    this.remove.emit(ator);
  }

}
