import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../models/cell.model';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-cell',
  standalone: true,
  templateUrl: './cell.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
  @Input() cell!: Cell;
  @Output() cellClicked = new EventEmitter<Cell>();

  onClick(): void {
    if (!this.cell.revealed) {
      this.cellClicked.emit(this.cell);
    }
  }
}
