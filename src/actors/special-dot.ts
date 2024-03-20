import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, Circle, Collider, CollisionType, Color, ImageFiltering } from "excalibur";
import { Config } from "../config";

export class SpecialDot extends Actor {
  constructor(public readonly properties: Partial<FactoryProps> = {}) {
    super({
      collisionType: CollisionType.Passive,
      color: Color.Yellow,
      height: Config.GridSize,
      width: Config.GridSize,
      x: properties.worldPos!.x + Config.GridSize / 2,
      y: properties.worldPos!.y - Config.GridSize / 2,
      name: "specialdot",
    });

    this.graphics.use(
      new Circle({
        filtering: ImageFiltering.Pixel,
        radius: Config.GridSize / 2,
        color: Color.Yellow,
      }),
    );
  }

  onCollisionStart(self: Collider, other: Collider): void {
    if (other.owner.name !== "player") return;
    this.kill();
  }
}
