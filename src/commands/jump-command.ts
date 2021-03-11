export class JumpCommand {
  constructor(private readonly gameObject) {}

  run() {
    this.gameObject.jump();
  }
}
