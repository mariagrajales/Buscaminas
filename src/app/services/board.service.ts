// src/app/services/board.service.ts
import { Injectable } from '@angular/core';
import { Cell } from '../models/cell.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  rows = 10;
  cols = 10;
  mines = 15;
  cells: Cell[][] = [];

  generateBoard(): Cell[][] {
    this.initializeCells();
    this.placeMines();
    this.calculateAdjacentMines();
    return this.cells;
  }

  private initializeCells(): void {
    this.cells = Array.from({ length: this.rows }, (_, row) =>
      Array.from({ length: this.cols }, (_, col) => ({
        row,
        col,
        mine: false,
        revealed: false,
        adjacentMines: 0
      }))
    );
  }

  private placeMines(): void {
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      if (!this.cells[row][col].mine) {
        this.cells[row][col].mine = true;
        minesPlaced++;
      }
    }
  }

  private calculateAdjacentMines(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (!this.cells[row][col].mine) {
          this.cells[row][col].adjacentMines = this.countMinesAround(row, col);
        }
      }
    }
  }

  private countMinesAround(row: number, col: number): number {
    let mineCount = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (this.isValidCell(newRow, newCol) && this.cells[newRow][newCol].mine) {
          mineCount++;
        }
      }
    }
    return mineCount;
  }

  private isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }
}
