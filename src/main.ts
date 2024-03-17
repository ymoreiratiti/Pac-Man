import { game } from "./game";
import { loader } from "./loader";
import { Map001Scene } from "./scenes/map-001";

async function bootstrap() {
  await game.start(loader);

  game.addScene(Map001Scene.name, new Map001Scene());

  game.goToScene(Map001Scene.name);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void bootstrap();
