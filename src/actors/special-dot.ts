import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, Circle, Collider, CollisionType, Color, EventEmitter, ImageFiltering } from "excalibur";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { Config } from "../config";
import { Player } from "./player";

interface DotEvents {
  eated: number;
}

const SCORE_POINT = 1000;

export class SpecialDot extends Actor {
  public events = new EventEmitter<ActorEvents & DotEvents>();

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

  onCollisionStart(_self: Collider, other: Collider): void {
    if (other.owner.name !== Player.name) return;

    this.events.emit("eated", SCORE_POINT);
    this.kill();
  }
}
