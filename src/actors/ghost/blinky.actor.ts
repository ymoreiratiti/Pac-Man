import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Collider, Color, Side } from "excalibur";
import { BlinkyAnimation } from "../../animations/ghost/blinky.animation";
import { GhostActor } from "./ghost.actor";
import { GhostState } from "./type";

export class BlinkyActor extends GhostActor {
  protected readonly animation = new BlinkyAnimation();

  constructor(properties: Partial<FactoryProps> = {}) {
    super(properties, { color: Color.Red, name: BlinkyActor.name });
  }

  protected handleAI(): void {}

  onCollisionStart(_self: Collider, _other: Collider, side: Side): void {
    switch (this.currentState) {
      case GhostState.WAITING: {
        return this.handleAIWaiting({ side });
      }
    }
  }
}
