export interface GameListener {
  notifyGetReady(): void;
  notifyNewGame(): void;
  notifyGameOver(): void;
}
