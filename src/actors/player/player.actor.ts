import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Animation, CollisionType, Color, Engine, Keys, Side } from "excalibur";
import { Config } from "../../config";
import { PersonActor } from "../common/person";
import { PlayerAnimation } from "./player.animation";

export class PlayerActor extends PersonActor {
  protected speed = Config.PlayerSpeed;

  private readonly animation = new PlayerAnimation();
  protected queueDirection: Side = Side.Right;

  constructor(properties: Partial<FactoryProps> = {}) {
    super({
      collisionType: CollisionType.Active,
      color: Color.Yellow,
      height: Config.Grid.tileSize,
      width: Config.Grid.tileSize,
      pos: properties.worldPos,
      name: PlayerActor.name,
    });
  }

  /**
   * ON INITIALIZE
   */

  protected setupAnimation(): void {
    this.graphics.add(this.animation.walking.name, this.animation.walking());
    this.graphics.use(this.animation.walking.name);
  }

  /**
   * UPDATE
   */

  protected handleAnimation() {
    const walkingAnimation = this.graphics.getGraphic(this.animation.walking.name) as Animation;

    if ((this.vel.x || this.vel.y) && !walkingAnimation.isPlaying) {
      walkingAnimation.play();
      walkingAnimation.rotation = this.vel.toAngle();
    } else {
      walkingAnimation.pause();
    }
  }

  protected handleControl(engine: Engine) {
    if (engine.input.keyboard.wasPressed(Keys.ArrowRight)) {
      this.queueDirection = Side.Right;
      return;
    }

    if (engine.input.keyboard.wasPressed(Keys.ArrowLeft)) {
      this.queueDirection = Side.Left;
      return;
    }

    if (engine.input.keyboard.wasPressed(Keys.ArrowUp)) {
      this.queueDirection = Side.Top;
      return;
    }

    if (engine.input.keyboard.wasPressed(Keys.ArrowDown)) {
      this.queueDirection = Side.Bottom;
      return;
    }
  }
}
