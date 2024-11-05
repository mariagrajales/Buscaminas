// src/app/models/cell.model.ts
export interface Cell {
  row: number;
  col: number;
  mine: boolean;
  revealed: boolean;
  adjacentMines: number;
}
