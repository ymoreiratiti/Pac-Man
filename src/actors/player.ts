import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, CollisionType, Color, Engine, Keys, Vector } from "excalibur";
import { Config } from "../config";

enum DIRECTION {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export class Player extends Actor {
  private queueDirection?: DIRECTION = DIRECTION.RIGHT;

  constructor(properties: Partial<FactoryProps> = {}) {
    super({
      collisionType: CollisionType.Active,
      color: Color.Yellow,
      height: 8,
      vel: new Vector(Config.PlayerSpeed, 0),
      width: 8,
      x: properties.worldPos?.x,
      y: properties.worldPos?.y,
    });
  }

  onPreUpdate(engine: Engine): void {
    this.handleMovement(engine);
  }

  private handleMovement(engine: Engine) {
    //  Queue movement
    if (engine.input.keyboard.isHeld(Keys.ArrowRight) && !this.getTile(DIRECTION.RIGHT)!.solid) {
      this.queueDirection = DIRECTION.RIGHT;
    }

    if (engine.input.keyboard.isHeld(Keys.ArrowLeft) && !this.getTile(DIRECTION.LEFT)!.solid) {
      this.queueDirection = DIRECTION.LEFT;
    }

    if (engine.input.keyboard.isHeld(Keys.ArrowUp) && !this.getTile(DIRECTION.UP)!.solid) {
      this.queueDirection = DIRECTION.UP;
    }

    if (engine.input.keyboard.isHeld(Keys.ArrowDown) && !this.getTile(DIRECTION.DOWN)!.solid) {
      this.queueDirection = DIRECTION.DOWN;
    }

    //  Change direction
    switch (this.queueDirection) {
      case DIRECTION.RIGHT: {
        if (this.canChangeDirection()) {
          this.vel = new Vector(Config.PlayerSpeed, 0);
          this.queueDirection = undefined;
        }

        break;
      }

      case DIRECTION.LEFT: {
        if (this.canChangeDirection()) {
          this.vel = new Vector(-Config.PlayerSpeed, 0);
          this.queueDirection = undefined;
        }

        break;
      }

      case DIRECTION.UP: {
        if (this.canChangeDirection()) {
          this.vel = new Vector(0, -Config.PlayerSpeed);
          this.queueDirection = undefined;
        }

        break;
      }

      case DIRECTION.DOWN: {
        if (this.canChangeDirection()) {
          this.vel = new Vector(0, Config.PlayerSpeed);
          this.queueDirection = undefined;
        }

        break;
      }
    }
  }
  private canChangeDirection(): boolean {
    if (!this.queueDirection) return false;
    if (this.getTile(this.queueDirection)!.solid) return false;

    const nextTilePos = this.getTile(this.queueDirection)!.pos;
    const playerPosition = new Vector(Math.round(this.pos.x), Math.round(this.pos.y));
    const halfGridSize = Config.GridSize / 2;

    switch (this.queueDirection) {
      case DIRECTION.RIGHT:
      case DIRECTION.LEFT: {
        return playerPosition.y - halfGridSize === nextTilePos!.y;
      }

      case DIRECTION.UP:
      case DIRECTION.DOWN: {
        return playerPosition.x - halfGridSize === nextTilePos!.x;
      }
    }
  }

  private getTile(direction: DIRECTION) {
    const tileMap = this.scene!.tileMaps[0];

    switch (direction) {
      case DIRECTION.UP: {
        return tileMap.getTileByPoint(new Vector(this.pos.x, this.pos.y - tileMap.tileHeight));
      }
      case DIRECTION.DOWN: {
        return tileMap.getTileByPoint(new Vector(this.pos.x, this.pos.y + tileMap.tileHeight));
      }
      case DIRECTION.LEFT: {
        return tileMap.getTileByPoint(new Vector(this.pos.x - tileMap.tileWidth, this.pos.y));
      }
      case DIRECTION.RIGHT: {
        return tileMap.getTileByPoint(new Vector(this.pos.x + tileMap.tileWidth, this.pos.y));
      }
    }
  }
}
