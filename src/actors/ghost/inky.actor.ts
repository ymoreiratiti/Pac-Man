import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Collider, Color, Side } from "excalibur";
import { InkyAnimation } from "../../animations/ghost/inky.animation";
import { GhostActor } from "./ghost.actor";
import { GhostState } from "./type";

export class InkyActor extends GhostActor {
  protected readonly animation = new InkyAnimation();

  constructor(properties: Partial<FactoryProps> = {}) {
    super(properties, { color: Color.Cyan, name: InkyActor.name });
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
