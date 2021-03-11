export class JumpCommand {
  constructor(gameObject) {
    this.gameObject = gameObject;
  }

  run() {
    this.gameObject.jump();
  }
}
