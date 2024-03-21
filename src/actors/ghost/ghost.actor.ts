import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, ActorArgs, CollisionType, Side, Vector } from "excalibur";
import { GhostAnimation } from "../../animations/ghost/ghost.animation";
import { Config } from "../../config";
import { GhostState } from "./type";

export abstract class GhostActor extends Actor {
  protected currentState: GhostState = GhostState.WAITING;
  protected speed = (Config.PlayerSpeed / 4) * 3; // 25% slower than player

  protected abstract readonly animation: GhostAnimation;
  protected abstract handleAI(): void;

  constructor(properties: Partial<FactoryProps> = {}, actorArguments: ActorArgs = {}) {
    super({
      collisionType: CollisionType.Active,
      height: 8,
      width: 8,
      x: properties.worldPos?.x,
      y: properties.worldPos?.y,
      ...actorArguments,
    });
  }

  onInitialize(): void {
    this.vel = new Vector(0, this.speed);
    this.graphics.add(this.animation.walkingLeft.name, this.animation.walkingLeft());
    this.graphics.add(this.animation.walkingRight.name, this.animation.walkingRight());
    this.graphics.add(this.animation.walkingUp.name, this.animation.walkingUp());
    this.graphics.add(this.animation.walkingDown.name, this.animation.walkingDown());
  }

  update(): void {
    this.handleAnimation();
    this.handleAI();
  }

  private handleAnimation(): void {
    const vectorNormalized = this.vel.normalize();

    if (vectorNormalized.equals(Vector.Up)) {
      this.graphics.use(this.animation.walkingUp.name);
      return;
    }

    if (vectorNormalized.equals(Vector.Down)) {
      this.graphics.use(this.animation.walkingDown.name);
      return;
    }

    if (vectorNormalized.equals(Vector.Left)) {
      this.graphics.use(this.animation.walkingLeft.name);
      return;
    }

    if (vectorNormalized.equals(Vector.Right)) {
      this.graphics.use(this.animation.walkingRight.name);
      return;
    }
  }

  //  Default AI for Waiting
  protected handleAIWaiting({ side }: { side: Side }): void {
    this.vel.setTo(0, side === Side.Bottom ? -this.speed : this.speed);
  }
}
