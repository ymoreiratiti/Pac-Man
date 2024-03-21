import { InkyAnimation } from "../../animations/ghost/inky.animation";
import { GhostActor } from "./ghost.actor";

export class InkyActor extends GhostActor {
  protected readonly animation = new InkyAnimation();
}
