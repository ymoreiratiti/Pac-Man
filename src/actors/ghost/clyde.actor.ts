import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Collider, Color, Side } from "excalibur";
import { ClydeAnimation } from "../../animations/ghost/clyde.animation";
import { GhostActor } from "./ghost.actor";
import { GhostState } from "./type";

export class ClydeActor extends GhostActor {
  protected readonly animation = new ClydeAnimation();

  constructor(properties: Partial<FactoryProps> = {}) {
    super(properties, { color: Color.Orange, name: ClydeActor.name });
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
