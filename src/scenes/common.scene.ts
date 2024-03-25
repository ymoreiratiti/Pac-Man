import { TiledResource } from "@excaliburjs/plugin-tiled";
import { EventEmitter, Scene, SceneEvents, Timer } from "excalibur";
import { Score } from "../actors/common/score";
import { GhostState } from "../actors/ghost/common/type";
import { map001Resource } from "../resources/map-001";

interface ScatterChaseInterval {
  intervalRule: { mode: GhostState; duration: number }[];
  timer: Timer;
}

interface CommonSceneEvents {
  scatterchaseinterval: GhostState;
}

export class CommonScene extends Scene {
  public events = new EventEmitter<SceneEvents & CommonSceneEvents>();

  private readonly score = new Score();
  protected currentLevel = 1;
  protected scatterChaseInterval: ScatterChaseInterval = {
    intervalRule: [],
    timer: new Timer({ interval: 0, fcn: () => this.scatterChaseIntervalFcn(), repeats: true }),
  };

  scatterChaseIntervalFcn() {
    const intervalRule = this.scatterChaseInterval.intervalRule.shift()!;
    this.scatterChaseInterval.timer.interval = intervalRule.duration * 1000;

    this.events.emit("scatterchaseinterval", intervalRule.mode);
  }

  /**
   * SETUPS
   */
  protected setupScene(): void {
    this.setupScatterChaseInterval(map001Resource);
    this.setupScore();
  }

  private setupScore() {
    this.add(this.score);

    for (const actor of this.actors) {
      (actor.events as unknown as EventEmitter<{ eated: number }>).once("eated", (points: number) => {
        this.score.increasePoints(points);
      });
    }
  }

  private setupScatterChaseInterval(map001Resource: TiledResource) {
    const scatterChaseIntervalProperty = JSON.parse(
      map001Resource.map.properties!.find((item) => item.name === "ScatterChaseInterval")!.value.toString(),
    );
    this.scatterChaseInterval.intervalRule =
      scatterChaseIntervalProperty[this.currentLevel - 1] ?? scatterChaseIntervalProperty.pop();

    this.scatterChaseInterval.timer.maxNumberOfRepeats = this.scatterChaseInterval.intervalRule.length;
    this.scatterChaseInterval.timer.start();
    this.addTimer(this.scatterChaseInterval.timer);
  }
}
