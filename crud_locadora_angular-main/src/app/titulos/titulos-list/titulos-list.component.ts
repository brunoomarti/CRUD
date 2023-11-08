import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Titulo} from "../modelo/titulo";

@Component({
  selector: 'app-titulos-list',
  templateUrl: './titulos-list.component.html',
  styleUrls: ['./titulos-list.component.css', '../../shared/global-css.scss']
})
export class TitulosListComponent {

  @Input() titulos: Titulo[] = [];

  @Output() add = new EventEmitter(false);

  @Output() edit = new EventEmitter(false);

  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'ator', 'diretor', 'ano', 'sinopse', 'categoria', 'classe', 'actions'];

  onAdd() {
    this.add.emit(true);
  }

  onEdit(titulo: Titulo){
    this.edit.emit(titulo);
  }

  onDelete(titulo: Titulo){
    this.remove.emit(titulo);
  }

}
