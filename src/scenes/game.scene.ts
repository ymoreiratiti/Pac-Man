import Phaser from 'phaser';

const LOAD_KEYS = {
  MAZE_TILESET: "load_keys_maze_tiles",
  MAZE_TILEMAP: "load_keys_maze_tilemap",
}

const TILED = {
  TILESETS: {
    MAZE: {
      NAME: "maze_tiles",
    }
  }
}

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image(LOAD_KEYS.MAZE_TILESET, 'assets/tileset/maze.png')
    this.load.tilemapTiledJSON(LOAD_KEYS.MAZE_TILEMAP, 'assets/maze.json')
  }

  create() {
    const map = this.make.tilemap({ key: LOAD_KEYS.MAZE_TILEMAP })

    const tileset = map.addTilesetImage(TILED.TILESETS.MAZE.NAME, LOAD_KEYS.MAZE_TILESET)

    map.createLayer("Maze", tileset!, 0, 0)
  }
}
