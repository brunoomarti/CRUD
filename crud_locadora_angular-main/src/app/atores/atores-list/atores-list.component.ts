import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ator} from "../modelo/ator";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-atores-list',
  templateUrl: './atores-list.component.html',
  styleUrls: ['./atores-list.component.css', '../../shared/global-css.scss']
})
export class AtoresListComponent {
  @Input() atores: Ator[] = [];

  @Output() add = new EventEmitter(false);

  @Output() edit = new EventEmitter(false);

  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nome', 'actions'];

  constructor() { }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(ator: Ator){
    this.edit.emit(ator);
  }

  onDelete(ator: Ator){
    this.remove.emit(ator);
  }

}
