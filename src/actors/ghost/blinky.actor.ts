import { BlinkyAnimation } from "../../animations/ghost/blinky.animation";
import { GhostActor } from "./ghost.actor";

export class BlinkyActor extends GhostActor {
  protected readonly animation = new BlinkyAnimation();
}
