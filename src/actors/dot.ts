import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, Collider, CollisionType, Color, ImageFiltering, Rectangle } from "excalibur";
import { Config } from "../config";
import { Player } from "./player";

export class Dot extends Actor {
  constructor(public readonly properties: Partial<FactoryProps> = {}) {
    super({
      collisionType: CollisionType.Passive,
      color: Color.Yellow,
      height: Config.GridSize,
      width: Config.GridSize,
      x: properties.worldPos!.x + Config.GridSize / 2,
      y: properties.worldPos!.y - Config.GridSize / 2,
      name: Dot.name,
    });

    this.graphics.use(
      new Rectangle({
        filtering: ImageFiltering.Pixel,
        width: Config.GridSize / 4,
        height: Config.GridSize / 4,
        color: Color.fromHex("FFB7AE"),
      }),
    );
  }

  onCollisionStart(self: Collider, other: Collider): void {
    if (other.owner.name !== Player.name) return;
    this.kill();
  }
}
