export class JumpCommand {
  constructor(gameState, gameObject) {
    this.gameState = gameState;
    this.gameObject = gameObject;
  }

  run() {
    this.gameObject.jump();
  }
}
