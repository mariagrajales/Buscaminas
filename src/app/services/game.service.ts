// src/app/services/game.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private startTime: number;
  private gameOver: boolean = false;
  private score: number = 0;

  constructor() {
    this.startTime = Date.now();
  }

  startGame(): void {
    this.startTime = Date.now();
    this.gameOver = false;
    this.score = 0;
  }

  endGame(): void {
    this.gameOver = true;
    this.calculateScore();
  }

  calculateScore(): void {
    const endTime = Date.now();
    const timeElapsed = Math.floor((endTime - this.startTime) / 1000);
    // Aquí puedes ajustar la lógica de cálculo de puntuación
    this.score = Math.max(0, 1000 - timeElapsed * 10);
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  getScore(): number {
    return this.score;
  }
}
