import { TiledResource } from "@excaliburjs/plugin-tiled";
import { Dot } from "../actors/food/dot";
import { SpecialDot } from "../actors/food/special-dot";
import { BlinkyActor } from "../actors/ghost/blinky/blinky.actor";
import { ClydeActor } from "../actors/ghost/clyde/clyde.actor";
import { InkyActor } from "../actors/ghost/inky/inky.actor";
import { PinkyActor } from "../actors/ghost/pinky/pinky.actor";
import { PlayerActor } from "../actors/player/player.actor";
import { filePath } from "./file-path";

export const map001Resource = new TiledResource(filePath.maps[1].tmx, {
  entityClassNameFactories: {
    [BlinkyActor.name]: (properties) => new BlinkyActor(properties),
    [InkyActor.name]: (properties) => new InkyActor(properties),
    [PinkyActor.name]: (properties) => new PinkyActor(properties),
    [ClydeActor.name]: (properties) => new ClydeActor(properties),
    [Dot.name]: (properties) => new Dot(properties),
    [PlayerActor.name]: (properties) => new PlayerActor(properties),
    [SpecialDot.name]: (properties) => new SpecialDot(properties),
  },
  pathMap: [
    { path: "map-001.tmx", output: filePath.maps[1].tmx },
    { path: "maze.png", output: filePath.spritesheet.maze.png },
    { path: "maze.tsx", output: filePath.spritesheet.maze.tsx },
  ],
});
