import { game } from "./game";
import { loader } from "./loader";
import { Map001Scene } from "./scenes/map-001";

game.start(loader).then(() => {
  game.addScene(Map001Scene.name, new Map001Scene());

  game.goToScene(Map001Scene.name);
});
