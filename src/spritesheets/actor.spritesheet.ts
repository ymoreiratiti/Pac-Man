import { SpriteSheet } from "excalibur";
import { Images } from "../resources/resources";

export const ActorSpriteSheet = {
  setup: () =>
    SpriteSheet.fromImageSource({
      image: Images.SpriteSheetActors,
      grid: {
        spriteWidth: 16,
        spriteHeight: 16,
        rows: 15,
        columns: 14,
      },
    }),
};
