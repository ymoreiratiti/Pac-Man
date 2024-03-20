import tmxMap001 from "../../assets/maps/map-001.tmx";
import pngSpriteSheetActors from "../../assets/tilesets/spritesheet/actors.png";
import tsxSpriteSheetActors from "../../assets/tilesets/spritesheet/actors.tsx";
import pngSpriteSheetMaze from "../../assets/tilesets/spritesheet/maze.png";
import tsxSpriteSheetMaze from "../../assets/tilesets/spritesheet/maze.tsx";

export const filePath = {
  maps: {
    1: {
      tmx: tmxMap001,
    },
  },
  spritesheet: {
    maze: {
      png: pngSpriteSheetMaze,
      tsx: tsxSpriteSheetMaze,
    },
    actors: {
      png: pngSpriteSheetActors,
      tsx: tsxSpriteSheetActors,
    },
  },
};
