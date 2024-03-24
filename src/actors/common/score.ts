import { FactoryProps } from "@excaliburjs/plugin-tiled";
import { Actor, Color, Font, Text, Vector } from "excalibur";

export class Score extends Actor {
  private totalScore = 0;

  private readonly text = new Text({
    text: "Score:",
    font: new Font({ size: 8 }),
    color: Color.Yellow,
  });

  constructor(public readonly properties: Partial<FactoryProps> = {}) {
    super({
      name: Score.name,
      pos: new Vector(100, 10),
    });

    this.drawScore();
  }

  drawScore() {
    this.text.text = "Score: " + this.totalScore.toString().padStart(6);
    this.graphics.use(this.text);
  }

  increasePoints(points: number) {
    this.totalScore += points;
    this.drawScore();
  }
}
