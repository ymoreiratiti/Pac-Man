import { game } from "./game";
import { loader } from "./loader";
import { map001 } from "./resources/map-001";

game.start(loader).then(() => {
  map001.addToScene(game.currentScene);
});
