import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, CollisionType, Color, Engine, Keys, Vector } from "excalibur";
import { Config } from "../config";

export class Player extends Actor {
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
    this.changeDirection(engine);
  }

  private changeDirection(engine: Engine) {
    if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
      this.vel = new Vector(Config.PlayerSpeed, 0);
    }
    if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
      this.vel = new Vector(-Config.PlayerSpeed, 0);
    }
    if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
      this.vel = new Vector(0, -Config.PlayerSpeed);
    }
    if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
      this.vel = new Vector(0, Config.PlayerSpeed);
    }
  }
}
