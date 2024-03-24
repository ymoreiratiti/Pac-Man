import { Animation, AnimationStrategy, SpriteSheet } from "excalibur";
import { ActorSpriteSheet } from "../../spritesheets/actor.spritesheet";

export class PlayerAnimation {
  private readonly actorSpriteSheet: SpriteSheet;
  constructor() {
    this.actorSpriteSheet = ActorSpriteSheet.setup();
  }

  walking(): Animation {
    return Animation.fromSpriteSheetCoordinates({
      spriteSheet: this.actorSpriteSheet,
      frameCoordinates: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      strategy: AnimationStrategy.PingPong,
    });
  }
}
