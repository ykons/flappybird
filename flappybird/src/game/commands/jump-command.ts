import { Jumper } from "../core/interfaces/jumper";

export class JumpCommand {
  constructor(private readonly gameObject: Jumper) {}

  run() {
    this.gameObject.jump();
  }
}
