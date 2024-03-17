import { Actor, CollisionType, Color, Engine, Keys, Vector } from "excalibur";
import { Config } from "../config";
import { game } from "../game";

export class Player extends Actor {
    constructor() {
        super({
            x: 150,
            y: game.drawHeight - 40,
            width: 8,
            height: 8,
            color: Color.Yellow,
        });

        this.body.collisionType = CollisionType.Fixed;
    }

    onPreUpdate(engine: Engine): void {
        this.changeDirection(engine);

    }

    private changeDirection(engine: Engine<any>) {
        if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
            this.vel = new Vector(Config.PlayerSpeed, 0);
        }
        if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
            this.vel = new Vector(-Config.PlayerSpeed, 0);
        }
        if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
            this.vel = new Vector(0, -Config.PlayerSpeed);
        }
        if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
            this.vel = new Vector(0, Config.PlayerSpeed);
        }
    }
}