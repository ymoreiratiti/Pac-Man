import { ClydeAnimation } from "../../animations/ghost/clyde.animation";
import { GhostActor } from "./ghost.actor";

export class ClydeActor extends GhostActor {
  protected readonly animation = new ClydeAnimation();
}
