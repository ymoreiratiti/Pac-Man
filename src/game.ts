import { Color, DisplayMode, Engine } from "excalibur";
import { Config } from "./config";

export const game = new Engine({
  width: 28 * Config.GridSize,
  height: 31 * Config.GridSize,
  backgroundColor: Color.Black,
  displayMode: DisplayMode.FitScreen,
  pixelArt: true,
  pixelRatio: 10,
});
