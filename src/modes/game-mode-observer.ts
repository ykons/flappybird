export interface GameModeObserver {
  notifyGetReady();
  notifyStartGame();
  notifyGameOver();
}
