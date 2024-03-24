import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, Collider, CollisionType, Color, EventEmitter, ImageFiltering, Rectangle } from "excalibur";
import { ActorEvents } from "excalibur/build/dist/Actor";
import { Config } from "../../config";
import { DotCollisionGroup } from "../collision-group";
import { PlayerActor } from "../player/player.actor";

interface DotEvents {
  eated: number;
}

const SCORE_POINT = 10;

export class Dot extends Actor {
  public events = new EventEmitter<ActorEvents & DotEvents>();

  constructor(public readonly properties: Partial<FactoryProps> = {}) {
    super({
      collisionType: CollisionType.Passive,
      collisionGroup: DotCollisionGroup,
      color: Color.Yellow,
      height: Config.Grid.tileSize,
      width: Config.Grid.tileSize,
      x: properties.worldPos!.x + Config.Grid.tileSize / 2,
      y: properties.worldPos!.y - Config.Grid.tileSize / 2,
      name: Dot.name,
    });

    this.graphics.use(
      new Rectangle({
        filtering: ImageFiltering.Pixel,
        width: Config.Grid.tileSize / 4,
        height: Config.Grid.tileSize / 4,
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
