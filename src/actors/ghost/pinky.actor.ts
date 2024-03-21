import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Collider, Color, Side } from "excalibur";
import { PinkyAnimation } from "../../animations/ghost/pinky.animation";
import { GhostActor } from "./ghost.actor";
import { GhostState } from "./type";

export class PinkyActor extends GhostActor {
  protected readonly animation = new PinkyAnimation();

  constructor(properties: Partial<FactoryProps> = {}) {
    super(properties, { color: Color.Magenta, name: PinkyActor.name });
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