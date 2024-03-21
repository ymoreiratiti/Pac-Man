import { Animation, AnimationStrategy, SpriteSheet } from "excalibur";
import { ActorSpriteSheet } from "../../spritesheets/actor.spritesheet";

export abstract class GhostAnimation {
  protected abstract readonly spriteSheetCoordinatesY: number;
  private readonly actorSpriteSheet: SpriteSheet;

  constructor() {
    this.actorSpriteSheet = ActorSpriteSheet.setup();
  }

  walkingRight(): Animation {
    return Animation.fromSpriteSheetCoordinates({
      spriteSheet: this.actorSpriteSheet,
      strategy: AnimationStrategy.PingPong,
      frameCoordinates: [
        { x: 0, y: this.spriteSheetCoordinatesY },
        { x: 1, y: this.spriteSheetCoordinatesY },
      ],
    });
  }

  walkingLeft(): Animation {
    return Animation.fromSpriteSheetCoordinates({
      spriteSheet: this.actorSpriteSheet,
      strategy: AnimationStrategy.PingPong,
      frameCoordinates: [
        { x: 2, y: this.spriteSheetCoordinatesY },
        { x: 3, y: this.spriteSheetCoordinatesY },
      ],
    });
  }

  walkingUp(): Animation {
    return Animation.fromSpriteSheetCoordinates({
      spriteSheet: this.actorSpriteSheet,
      strategy: AnimationStrategy.PingPong,
      frameCoordinates: [
        { x: 4, y: this.spriteSheetCoordinatesY },
        { x: 5, y: this.spriteSheetCoordinatesY },
      ],
    });
  }

  walkingDown(): Animation {
    return Animation.fromSpriteSheetCoordinates({
      spriteSheet: this.actorSpriteSheet,
      strategy: AnimationStrategy.PingPong,
      frameCoordinates: [
        { x: 6, y: this.spriteSheetCoordinatesY },
        { x: 7, y: this.spriteSheetCoordinatesY },
      ],
    });
  }
}
