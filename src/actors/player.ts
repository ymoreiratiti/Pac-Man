import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, Animation, CollisionType, Color, Engine, Keys, Vector } from "excalibur";
import { PlayerAnimation } from "../animations/player.animation";
import { Config } from "../config";
import { ANIMATION, DIRECTION } from "./types";

export class Player extends Actor {
  private queueDirection?: DIRECTION = DIRECTION.RIGHT;
  private walkingAnimation!: Animation;

  constructor(properties: Partial<FactoryProps> = {}) {
    super({
      collisionType: CollisionType.Active,
      color: Color.Yellow,
      height: 8,
      vel: new Vector(Config.PlayerSpeed, 0),
      width: 8,
      x: properties.worldPos?.x,
      y: properties.worldPos?.y,
      name: "player",
    });
  }

  onInitialize(): void {
    const playerAnimation = new PlayerAnimation();

    this.walkingAnimation = playerAnimation.walking();

    this.graphics.add(ANIMATION.WALKING, this.walkingAnimation);
    this.graphics.use(ANIMATION.WALKING);
  }

  update(engine: Engine): void {
    this.handleControl(engine);
    this.handlePlayerDirection();
    this.handleAnimation();
  }

  private handleAnimation() {
    if (this.vel.x || this.vel.y) {
      this.walkingAnimation.play();
    } else {
      this.walkingAnimation.pause();
    }
  }

  private handleControl(engine: Engine) {
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
  }

  private handlePlayerDirection(): void {
    if (!this.queueDirection) return;
    if (this.getTile(this.queueDirection)!.solid) return;

    //  Check if the player is in the middle of the tile
    const playerPosition = new Vector(Math.round(this.pos.x), Math.round(this.pos.y));
    const halfGridSize = Config.GridSize / 2;
    const nextTilePos = this.getTile(this.queueDirection)!.pos;

    let isInMiddleOfTile: boolean;
    switch (this.queueDirection) {
      case DIRECTION.RIGHT:
      case DIRECTION.LEFT: {
        isInMiddleOfTile = playerPosition.y - halfGridSize === nextTilePos!.y;
        break;
      }

      case DIRECTION.UP:
      case DIRECTION.DOWN: {
        isInMiddleOfTile = playerPosition.x - halfGridSize === nextTilePos!.x;
        break;
      }
    }

    if (!isInMiddleOfTile) return;

    switch (this.queueDirection!) {
      case DIRECTION.RIGHT: {
        this.vel = new Vector(Config.PlayerSpeed, 0);
        this.walkingAnimation.rotation = Math.PI * 0;
        break;
      }

      case DIRECTION.LEFT: {
        this.vel = new Vector(-Config.PlayerSpeed, 0);
        this.walkingAnimation.rotation = Math.PI * 1;
        break;
      }

      case DIRECTION.UP: {
        this.vel = new Vector(0, -Config.PlayerSpeed);
        this.walkingAnimation.rotation = Math.PI * 1.5;
        break;
      }

      case DIRECTION.DOWN: {
        this.vel = new Vector(0, Config.PlayerSpeed);
        this.walkingAnimation.rotation = Math.PI * 0.5;
        break;
      }
    }

    this.queueDirection = undefined;
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
