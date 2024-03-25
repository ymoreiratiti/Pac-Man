import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Color, Side } from "excalibur";
import { GhostActor } from "../common/ghost.actor";
import { GhostState } from "../common/type";
import { BlinkyAnimation } from "./blinky.animation";

export class BlinkyActor extends GhostActor {
  protected readonly animation = new BlinkyAnimation();
  protected queueDirection: Side = Side.Right;
  protected currentState: GhostState = GhostState.SCATTER;

  constructor(properties: Partial<FactoryProps> = {}) {
    super(properties, { color: Color.Red, name: BlinkyActor.name });
  }

  onInitialize(): void {
    super.onInitialize();
    this.scene.events.on("scatterchaseinterval", (ghostState: GhostState) => {
      this.currentState = ghostState;
    });
  }

  /**
   * UPDATE
   */
  protected handleControl(): void {
    if (this.currentState === GhostState.CHASING && this.inInsideTile) return this.handleAIChasing();
    if (this.currentState === GhostState.SCATTER && this.inInsideTile) return this.handleAIScatter();

    if (this.currentState === GhostState.WAITING) return this.handleAIWaiting();
  }

  protected handleAIChasing(): void {
    this.queueDirection = this.findPath(this.playerActor.pos);
  }
}
