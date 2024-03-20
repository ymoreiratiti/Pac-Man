import { TiledResource } from "@excaliburjs/plugin-tiled";
import { Dot } from "../actors/dot";
import { Player } from "../actors/player";
import { SpecialDot } from "../actors/special-dot";
import { filePath } from "./file-path";

export const map001Resource = new TiledResource(filePath.maps[1].tmx, {
  entityClassNameFactories: {
    [Player.name]: (properties) => new Player(properties),
    [SpecialDot.name]: (properties) => new SpecialDot(properties),
    [Dot.name]: (properties) => new Dot(properties),
  },
  pathMap: [
    { path: "map-001.tmx", output: filePath.maps[1].tmx },
    { path: "maze.png", output: filePath.spritesheet.maze.png },
    { path: "maze.tsx", output: filePath.spritesheet.maze.tsx },
  ],
});
