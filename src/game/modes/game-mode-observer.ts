export interface GameModeObserver {
  notifyGetReady(): void;
  notifyStartGame(): void;
  notifyGameOver(): void;
}
