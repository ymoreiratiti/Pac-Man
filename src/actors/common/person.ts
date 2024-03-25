import { Actor, Engine, Side, Tile, TileMap, Vector, vec } from "excalibur";
import { Config } from "../../config";
import { CommonScene } from "../../scenes/common.scene";

/**
 * Handles the common logic for movement and collision of a person.
 */
export abstract class PersonActor extends Actor {
  public scene!: CommonScene;
  protected abstract speed: number;
  protected abstract setupAnimation(): void;
  protected abstract queueDirection: Side;

  public get currentTile(): Tile {
    return this.tileMap.getTileByPoint(this.pos)!;
  }

  public get currentSide(): Side {
    const currentVel = this.vel.normalize();
    if (currentVel.equals(Vector.Up)) return Side.Top;
    if (currentVel.equals(Vector.Down)) return Side.Bottom;
    if (currentVel.equals(Vector.Left)) return Side.Left;
    if (currentVel.equals(Vector.Right)) return Side.Right;

    return Side.None;
  }

  public get tileMap(): TileMap {
    return this.scene!.tileMaps[0];
  }

  public get inInsideTile(): boolean {
    const halfTile = Config.Grid.tileSize / 2;
    const position = vec(Math.round(this.pos.x) - halfTile, Math.round(this.pos.y) - halfTile);

    return position.equals(this.currentTile.pos);
  }

  /**
   * ON INITIALIZE
   */
  onInitialize(): void {
    this.setupAnimation();
  }

  /**
   * UPDATE
   */
  update(engine: Engine): void {
    this.handleControl(engine);
    this.handleQueueDirection();
    this.handleAnimation();
  }

  protected abstract handleControl(engine: Engine): void;
  protected abstract handleAnimation(): void;

  protected handleQueueDirection(): void {
    if (this.queueDirection === Side.None) return;
    if (this.getTileOnSide(this.queueDirection)!.solid) return;

    this.setMovementDirection(this.queueDirection);
    this.pos = this.currentTile.center;
    this.queueDirection = Side.None;
  }

  /**
   * HELPERS METHODS
   */

  protected getTileByPoint(vector: Vector) {
    return this.tileMap.getTileByPoint(vector);
  }

  protected getTileOnSide(side: Side) {
    let point!: Vector;
    switch (side) {
      case Side.Top: {
        point = vec(this.pos.x, this.pos.y - this.tileMap.tileHeight);
        break;
      }
      case Side.Bottom: {
        point = vec(this.pos.x, this.pos.y + this.tileMap.tileHeight);
        break;
      }
      case Side.Left: {
        point = vec(this.pos.x - this.tileMap.tileWidth, this.pos.y);
        break;
      }
      case Side.Right: {
        point = vec(this.pos.x + this.tileMap.tileWidth, this.pos.y);
        break;
      }
    }

    return this.tileMap.getTileByPoint(point);
  }

  protected setMovementDirection(direction: Side): void {
    switch (direction) {
      case Side.Top: {
        this.vel = Vector.Up.scaleEqual(this.speed);
        break;
      }
      case Side.Bottom: {
        this.vel = Vector.Down.scaleEqual(this.speed);
        break;
      }
      case Side.Left: {
        this.vel = Vector.Left.scaleEqual(this.speed);
        break;
      }
      case Side.Right: {
        this.vel = Vector.Right.scaleEqual(this.speed);
        break;
      }
    }
  }
}
