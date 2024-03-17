import { Color, DisplayMode, Engine } from "excalibur";

export const game = new Engine({
  width: 28 * 8,
  height: 31 * 8,
  backgroundColor: Color.Black,
  displayMode: DisplayMode.FitScreen,
});
