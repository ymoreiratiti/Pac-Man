import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, Circle, Collider, CollisionType, Color, ImageFiltering } from "excalibur";
import { Config } from "../config";
import { Player } from "./player";

export class SpecialDot extends Actor {
  constructor(public readonly properties: Partial<FactoryProps> = {}) {
    super({
      collisionType: CollisionType.Passive,
      color: Color.Yellow,
      height: Config.GridSize,
      width: Config.GridSize,
      x: properties.worldPos!.x + Config.GridSize / 2,
      y: properties.worldPos!.y - Config.GridSize / 2,
      name: SpecialDot.name,
    });

    this.graphics.use(
      new Circle({
        filtering: ImageFiltering.Pixel,
        radius: Config.GridSize / 3,
        color: Color.fromHex("FFB7AE"),
      }),
    );
  }

  onCollisionStart(self: Collider, other: Collider): void {
    if (other.owner.name !== Player.name) return;
    this.kill();
  }
}
