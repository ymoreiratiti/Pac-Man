import { TiledResource } from "@excaliburjs/plugin-tiled";
import tmxPath from "../../assets/maps/map-001.tmx";
import pngPath from "../../assets/tilesets/wall/wall.png";
import tsxPath from "../../assets/tilesets/wall/wall.tsx";
import { Player } from "../actors/player";

export const map001Resource = new TiledResource(tmxPath, {
  entityClassNameFactories: {
    player: (properties) => {
      return new Player(properties);
    },
  },
  pathMap: [
    { path: "map-001.tmx", output: tmxPath },
    { path: "wall.png", output: pngPath },
    { path: "wall.tsx", output: tsxPath },
  ],
});
