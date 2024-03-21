import { Color, DisplayMode, Engine } from "excalibur";
import { Config } from "./config";
import { loader } from "./resources/loader";
import { Level1Scene } from "./scenes/level-001";

export class Game extends Engine {
  constructor() {
    super({
      width: 35 * Config.GridSize,
      height: 31 * Config.GridSize,
      backgroundColor: Color.Black,
      displayMode: DisplayMode.FitScreen,
      pixelArt: true,
      pixelRatio: 10,
      suppressPlayButton: true,
    });
  }

  public async setup(): Promise<void> {
    await this.start(loader);

    this.addScene(Level1Scene.name, new Level1Scene());

    this.goToScene(Level1Scene.name);
    this.toggleDebug();
  }
}
