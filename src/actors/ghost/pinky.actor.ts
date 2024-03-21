import { PinkyAnimation } from "../../animations/ghost/pinky.animation";
import { GhostActor } from "./ghost.actor";

export class PinkyActor extends GhostActor {
  protected readonly animation = new PinkyAnimation();
}
