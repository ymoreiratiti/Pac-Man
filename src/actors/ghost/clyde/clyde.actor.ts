import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Color } from "excalibur";
import { GhostActor } from "../common/ghost.actor";
import { GhostState } from "../common/type";
import { ClydeAnimation } from "./clyde.animation";

export class ClydeActor extends GhostActor {
  protected readonly animation = new ClydeAnimation();

  constructor(properties: Partial<FactoryProps> = {}) {
    super(properties, { color: Color.Orange, name: ClydeActor.name });
  }

  protected handleControl(): void {
    switch (this.currentState) {
      case GhostState.CHASING: {
        if (!this.inInsideTile) return;
        this.handleAIChasing();
        break;
      }

      case GhostState.WAITING: {
        this.handleAIWaiting();
        break;
      }
    }
  }

  handleAIChasing() {}
}
