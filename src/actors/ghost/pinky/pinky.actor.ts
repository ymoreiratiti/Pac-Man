import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Color } from "excalibur";
import { GhostActor } from "../common/ghost.actor";
import { GhostState } from "../common/type";
import { PinkyAnimation } from "./pinky.animation";

export class PinkyActor extends GhostActor {
  protected readonly animation = new PinkyAnimation();

  constructor(properties: Partial<FactoryProps> = {}) {
    super(properties, { color: Color.Magenta, name: PinkyActor.name });
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
