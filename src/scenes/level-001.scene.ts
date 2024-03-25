import { map001Resource } from "../resources/map-001";
import { CommonScene } from "./common.scene";

export class Level1Scene extends CommonScene {
  onInitialize(): void {
    map001Resource.addToScene(this);
    this.setupScene();
  }
}
