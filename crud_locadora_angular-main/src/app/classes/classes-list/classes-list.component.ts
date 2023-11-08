import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Classe} from "../modelo/classe";

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css', '../../shared/global-css.scss']
})
export class ClassesListComponent {
  @Input() classes: Classe[] = [];

  @Output() add = new EventEmitter(false);

  @Output() edit = new EventEmitter(false);

  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'prazoDias', 'valor', 'actions'];

  constructor() { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(classe: Classe){
    this.edit.emit(classe);
  }

  onDelete(classe: Classe){
    this.remove.emit(classe);
  }

}
