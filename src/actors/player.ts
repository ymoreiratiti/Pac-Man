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
  private colisionWall: Record<DIRECTION, boolean> = {
    [DIRECTION.UP]: false,
    [DIRECTION.DOWN]: false,
    [DIRECTION.LEFT]: false,
    [DIRECTION.RIGHT]: false,
  };

  constructor(props: Partial<FactoryProps> = {}) {
    super({
      x: props.worldPos?.x,
      y: props.worldPos?.y,
      width: 8,
      height: 8,
      color: Color.Yellow,
      collisionType: CollisionType.Active,
    });
  }

  onPreUpdate(engine: Engine): void {
    this.updateCollisionWall();
    this.changeDirection(engine);
  }

  private updateCollisionWall() {
    const tileMap = this.scene!.tileMaps[0];
    const currentPos = new Vector(
      Math.floor(this.pos.x),
      Math.floor(this.pos.y),
    );

    const isInsideTileX =
      (currentPos.x + tileMap.tileWidth / 2) % tileMap.tileWidth === 0;
    const isInsideTileY =
      (currentPos.y + tileMap.tileHeight / 2) % tileMap.tileWidth === 0;
    if (!isInsideTileX || !isInsideTileY) return;

    this.colisionWall = {
      [DIRECTION.UP]: tileMap.getTileByPoint(
        new Vector(currentPos.x, currentPos.y - tileMap.tileHeight),
      )!.solid,
      [DIRECTION.DOWN]: tileMap.getTileByPoint(
        new Vector(currentPos.x, currentPos.y + tileMap.tileHeight),
      )!.solid,
      [DIRECTION.LEFT]: tileMap.getTileByPoint(
        new Vector(currentPos.x - tileMap.tileWidth, currentPos.y),
      )!.solid,
      [DIRECTION.RIGHT]: tileMap.getTileByPoint(
        new Vector(currentPos.x + tileMap.tileWidth, currentPos.y),
      )!.solid,
    };

    console.log(this.colisionWall);
  }

  private changeDirection(engine: Engine) {
    if (
      engine.input.keyboard.isHeld(Keys.ArrowRight) &&
      !this.colisionWall[DIRECTION.RIGHT]
    ) {
      this.vel = new Vector(Config.PlayerSpeed, 0);
    }
    if (
      engine.input.keyboard.isHeld(Keys.ArrowLeft) &&
      !this.colisionWall[DIRECTION.LEFT]
    ) {
      this.vel = new Vector(-Config.PlayerSpeed, 0);
    }
    if (
      engine.input.keyboard.isHeld(Keys.ArrowUp) &&
      !this.colisionWall[DIRECTION.UP]
    ) {
      this.vel = new Vector(0, -Config.PlayerSpeed);
    }
    if (
      engine.input.keyboard.isHeld(Keys.ArrowDown) &&
      !this.colisionWall[DIRECTION.DOWN]
    ) {
      this.vel = new Vector(0, Config.PlayerSpeed);
    }
  }
}
