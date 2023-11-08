import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../modelo/item';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css', '../../shared/global-css.scss']
})
export class ItemsListComponent {

  @Input() items: Item[] = [];

  @Output() add = new EventEmitter(false);

  @Output() edit = new EventEmitter(false);

  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'titulo', 'dataAquisicao', 'tipo', 'actions'];

  onAdd() {
    this.add.emit(true);
  }

  onEdit(item: Item){
    this.edit.emit(item);
  }

  onDelete(item: Item){
    this.remove.emit(item);
  }

}
