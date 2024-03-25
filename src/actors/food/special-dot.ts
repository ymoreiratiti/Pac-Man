import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, Circle, Collider, CollisionType, Color, EventEmitter, ImageFiltering } from "excalibur";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { Config } from "../../config";
import { PlayerActor } from "../player/player.actor";

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
      height: Config.Grid.tileSize,
      width: Config.Grid.tileSize,
      x: properties.worldPos!.x + Config.Grid.tileSize / 2,
      y: properties.worldPos!.y - Config.Grid.tileSize / 2,
      name: SpecialDot.name,
    });
  }

  onInitialize(): void {
    this.actions.blink(200, 200, 5000);
    this.graphics.use(
      new Circle({
        filtering: ImageFiltering.Pixel,
        radius: Config.Grid.tileSize / 3,
        color: Color.fromHex("FFB7AE"),
      }),
    );
  }

  onCollisionStart(_self: Collider, other: Collider): void {
    if (other.owner.name !== PlayerActor.name) return;

    this.events.emit("eated", SCORE_POINT);
    this.kill();
  }
}
