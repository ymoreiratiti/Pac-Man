import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, CollisionType, Color, Vector } from "excalibur";
import { GhostAnimation } from "../../animations/ghost/ghost.animation";
import { Config } from "../../config";

export abstract class GhostActor extends Actor {
  protected abstract readonly animation: GhostAnimation;

  constructor(properties: Partial<FactoryProps> = {}) {
    super({
      collisionType: CollisionType.Active,
      color: Color.Red,
      height: 8,
      width: 8,
      vel: new Vector(-Config.PlayerSpeed, 0),
      x: properties.worldPos?.x,
      y: properties.worldPos?.y,
      name: GhostActor.name,
    });
  }

  onInitialize(): void {
    this.graphics.add(this.animation.walkingLeft.name, this.animation.walkingLeft());
    this.graphics.use(this.animation.walkingLeft.name);
  }
}
