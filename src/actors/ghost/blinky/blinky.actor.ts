import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Color, Side } from "excalibur";
import { GhostActor } from "../common/ghost.actor";
import { GhostState } from "../common/type";
import { BlinkyAnimation } from "./blinky.animation";

export class BlinkyActor extends GhostActor {
  protected readonly animation = new BlinkyAnimation();
  protected queueDirection: Side = Side.Right;
  protected currentState: GhostState = GhostState.CHASING;

  constructor(properties: Partial<FactoryProps> = {}) {
    super(properties, { color: Color.Red, name: BlinkyActor.name });
  }

  /**
   * UPDATE
   */
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

  protected handleAIChasing(): void {
    this.queueDirection = this.findPath(this.playerActor.pos);
  }
}
