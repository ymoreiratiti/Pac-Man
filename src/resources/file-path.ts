import tmxMap001 from "../../assets/maps/map-001.tmx";
import pngSpriteSheetActors from "../../assets/tilesets/spritesheet/actors.png";
import tsxSpriteSheetActors from "../../assets/tilesets/spritesheet/actors.tsx";
import pngSpriteSheetMaze from "../../assets/tilesets/spritesheet/maze.png";
import tsxSpriteSheetMaze from "../../assets/tilesets/spritesheet/maze.tsx";
import pngWall from "../../assets/tilesets/wall/wall.png";
import tsxWall from "../../assets/tilesets/wall/wall.tsx";

export const pathMap = {
  "map-001.tmx": tmxMap001,
  "wall.png": pngWall,
  "wall.tsx": tsxWall,
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
