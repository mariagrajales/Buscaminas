import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { GameService } from '../../services/game.service';
import { Cell } from '../../models/cell.model';
import {NgForOf} from '@angular/common';
import {CellComponent} from '../cell/cell.component';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  imports: [
    NgForOf,
    CellComponent
  ],
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  cells: Cell[][] = [];
  gameOver: boolean = false;

  constructor(private boardService: BoardService, private gameService: GameService) {}

  ngOnInit(): void {
    this.generateNewBoard();
  }

  generateNewBoard(): void {
    this.cells = this.boardService.generateBoard();
    this.gameOver = false; // Asegúrate de que el estado de fin de juego se restablezca
  }

  handleCellClick(cell: Cell): void {
    if (!cell.revealed && !this.gameOver) {
      cell.revealed = true;
      if (cell.mine) {
        this.gameOver = true;
        this.gameService.endGame();
      } else if (cell.adjacentMines === 0) {
        this.revealAdjacentCells(cell.row, cell.col);
      }
    }
  }

  revealAdjacentCells(row: number, col: number): void {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (this.isValidCell(newRow, newCol)) {
          const adjacentCell = this.cells[newRow][newCol];
          if (!adjacentCell.revealed && !adjacentCell.mine) {
            adjacentCell.revealed = true;
            if (adjacentCell.adjacentMines === 0) {
              this.revealAdjacentCells(newRow, newCol);
            }
          }
        }
      }
    }
  }

  isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.cells.length && col >= 0 && col < this.cells[0].length;
  }
}
