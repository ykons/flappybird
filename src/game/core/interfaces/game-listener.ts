export interface GameListener {
  requestNewGame(): void;
  requestStartGame(): void;
  notifyGameOver(): void;
}
