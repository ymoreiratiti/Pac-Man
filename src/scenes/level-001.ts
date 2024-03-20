import { Scene } from "excalibur";
import { map001Resource } from "../resources/map-001";

export class Level1Scene extends Scene {
  constructor() {
    super();
    map001Resource.addToScene(this);
  }
}
