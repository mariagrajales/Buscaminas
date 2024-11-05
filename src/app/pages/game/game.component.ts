import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../services/game.service';
import { BoardComponent } from '../../components/board/board.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  imports: [
    BoardComponent,
    NgIf
  ],
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild(BoardComponent) boardComponent!: BoardComponent;
  elapsedTime = 0;
  remainingMines = 15;
  private timer: any;

  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.gameService.startGame(); // Reinicia el estado del juego en el servicio
    this.elapsedTime = 0;
    this.remainingMines = 15;
    clearInterval(this.timer);
    this.startTimer();
    this.boardComponent.generateNewBoard(); // Reinicia el tablero en BoardComponent
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      if (!this.gameService.isGameOver()) {
        this.elapsedTime++;
      } else {
        clearInterval(this.timer); // Detiene el temporizador si el juego termina
      }
    }, 1000);
  }

  resetGame(): void {
    this.startNewGame(); // Llama a startNewGame para reiniciar el juego completo
  }
}
