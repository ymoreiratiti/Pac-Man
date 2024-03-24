import { EventEmitter, Scene } from "excalibur";
import { Score } from "../actors/common/score";
import { map001Resource } from "../resources/map-001";

export class Level1Scene extends Scene {
  private readonly score = new Score();

  onInitialize(): void {
    map001Resource.addToScene(this);

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
}
