import { TiledResource } from "@excaliburjs/plugin-tiled";
import { Player } from "../actors/player";
import { pathMap } from "./file-path";

export const map001Resource = new TiledResource(pathMap["map-001.tmx"], {
  entityClassNameFactories: {
    player: (properties) => new Player(properties),
  },
  pathMap: [
    { path: "map-001.tmx", output: pathMap["map-001.tmx"] },
    { path: "wall.png", output: pathMap["wall.png"] },
    { path: "wall.tsx", output: pathMap["wall.tsx"] },
    { path: "maze.png", output: pathMap.spritesheet.maze.png },
    { path: "maze.tsx", output: pathMap.spritesheet.maze.tsx },
  ],
});
