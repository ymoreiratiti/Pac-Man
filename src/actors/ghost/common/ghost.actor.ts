import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { ActorArgs, CollisionType, Scene, Side, Tile, Vector } from "excalibur";
import { Config } from "../../../config";
import { ghostCanCollideWith } from "../../collision-group";
import { PersonActor } from "../../common/person";
import { PlayerActor } from "../../player/player.actor";
import { GhostAnimation } from "./ghost.animation";
import { GhostState } from "./type";

export abstract class GhostActor extends PersonActor {
  public scene!: Scene;
  protected currentState: GhostState = GhostState.WAITING;
  protected queueDirection: Side = Side.Bottom;
  protected speed = (Config.PlayerSpeed / 4) * 3; // 25% slower than player
  protected abstract readonly animation: GhostAnimation;
  private startPos: Vector;
  protected scatterCorner: Vector;

  protected get playerActor(): PlayerActor {
    return this.scene.actors.find((actor) => actor.name === PlayerActor.name)! as PlayerActor;
  }

  constructor(properties: Partial<FactoryProps> = {}, actorArguments: ActorArgs = {}) {
    super({
      collisionType: CollisionType.Active,
      collisionGroup: ghostCanCollideWith,
      height: Config.Grid.tileSize,
      width: Config.Grid.tileSize,
      pos: properties.worldPos,
      ...actorArguments,
    });

    const ghostProperties = properties.properties as Map<string, string | number>;
    this.scatterCorner = new Vector(
      Number(ghostProperties.get("scatteredcornerx")),
      Number(ghostProperties.get("scatteredcornery")),
    );

    this.startPos = properties.worldPos!;
    this.setMovementDirection(this.queueDirection);
  }

  /**
   * ON INITIALIZE
   */
  protected setupAnimation(): void {
    this.graphics.add(this.animation.walkingLeft.name, this.animation.walkingLeft());
    this.graphics.add(this.animation.walkingRight.name, this.animation.walkingRight());
    this.graphics.add(this.animation.walkingUp.name, this.animation.walkingUp());
    this.graphics.add(this.animation.walkingDown.name, this.animation.walkingDown());
  }

  /**
   * UPDATE
   */
  protected handleAnimation(): void {
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

  /**
   *  HELPER METHODS
   */
  protected findPath(target: Vector): Side {
    const orderedDirection = [Side.Left, Side.Bottom, Side.Right, Side.Top].reverse();

    const sideTiles: Record<Side, Tile> = {
      [Side.Left]: this.getTileOnSide(Side.Left)!,
      [Side.Bottom]: this.getTileOnSide(Side.Bottom)!,
      [Side.Right]: this.getTileOnSide(Side.Right)!,
      [Side.Top]: this.getTileOnSide(Side.Top)!,
      [Side.None]: this.currentTile,
    };

    let nextDirection: Side = Side.None;
    let distanceToPlayer: number = 999_999_999;

    for (const direction of orderedDirection) {
      if (sideTiles[direction].solid) continue;
      if (direction === Side.getOpposite(this.currentSide)) continue;

      const distance = sideTiles[direction].pos.distance(target);
      if (distance < distanceToPlayer) {
        distanceToPlayer = distance;
        nextDirection = direction;
      }
    }

    return nextDirection;
  }

  /**
   * AI
   */

  protected handleAIWaiting(): void {
    this.pos.x = this.startPos.x;
    if (this.getTileOnSide(this.currentSide)!.solid) {
      this.setMovementDirection(Side.getOpposite(this.currentSide));
    }
  }

  protected handleAIScatter(): void {
    this.queueDirection = this.findPath(this.scatterCorner);
  }
}
