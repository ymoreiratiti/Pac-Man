import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, Collider, CollisionType, Color, EventEmitter, ImageFiltering, Rectangle } from "excalibur";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { Config } from "../config";
import { Player } from "./player";

interface DotEvents {
  eated: number;
}

const SCORE_POINT = 10;

export class Dot extends Actor {
  public events = new EventEmitter<ActorEvents & DotEvents>();

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

  onCollisionStart(_self: Collider, other: Collider): void {
    if (other.owner.name !== Player.name) return;

    this.events.emit("eated", SCORE_POINT);
    this.kill();
  }
}
