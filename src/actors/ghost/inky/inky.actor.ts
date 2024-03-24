import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Color } from "excalibur";
import { GhostActor } from "../common/ghost.actor";
import { GhostState } from "../common/type";
import { InkyAnimation } from "./inky.animation";

export class InkyActor extends GhostActor {
  protected readonly animation = new InkyAnimation();

  constructor(properties: Partial<FactoryProps> = {}) {
    super(properties, { color: Color.Cyan, name: InkyActor.name });
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
