import { BackgroundLayer } from "../layer/background-layer.js";
import { FloorLayer } from "../layer/floor-layer.js";
import { PlayerLayer } from "../layer/player-layer.js";
import { GetReady } from "./ui/get-ready.js";

export class ReadyMode {
  constructor() {
    this.layers = [
      new BackgroundLayer(),
      new FloorLayer(),
      new PlayerLayer(),
      new GetReady(),
    ];
    this.observers = [];
  }

  addObserver(mode) {
    this.observers.push(mode);
  }

  processInput(event) {
    this.observers.forEach((observer) => observer.notifyStartGame());
  }

  update(deltaTime) {}

  render() {
    this.layers.forEach((layer) => layer.render());
  }
}
