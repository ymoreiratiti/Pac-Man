import Phaser from 'phaser'
import { PacmanActor } from '../actor/pacman.actor'

export const LOAD_KEYS = {
  ACTOR_PACMAN: 'load_keys_actor_pacman',
  MAZE_TILESET: 'load_keys_maze_tiles',
  MAZE_TILEMAP: 'load_keys_maze_tilemap',
}

enum TILED_LAYERS {
  MAZE_LAYER = 'maze_layer',
}

enum TILED_TILESETS {
  MAZE_TILESET = 'maze_tiles',
}

export class GameScene extends Phaser.Scene {
  private readonly pacmanActor = new PacmanActor()
  public player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  public map!: Phaser.Tilemaps.Tilemap

  constructor() {
    super('GameScene')
  }

  preload(): void {
    this.pacmanActor.preload(this)

    this.load.image(LOAD_KEYS.MAZE_TILESET, 'assets/tileset/maze.png')
    this.load.tilemapTiledJSON(LOAD_KEYS.MAZE_TILEMAP, 'assets/maze.json')
  }

  create(): void {
    this.cursors = this.input.keyboard!.createCursorKeys()

    // Create Map
    this.map = this.make.tilemap({ key: LOAD_KEYS.MAZE_TILEMAP })
    const tileset = this.map.addTilesetImage(
      TILED_TILESETS.MAZE_TILESET,
      LOAD_KEYS.MAZE_TILESET,
    )
    const mazeLayer = this.map.createLayer(
      TILED_LAYERS.MAZE_LAYER,
      tileset!,
      0,
      0,
    )
    this.map.setCollision([1])

    this.pacmanActor.create(this)

    this.physics.add.collider(this.player, mazeLayer!)
  }

  update(): void {
    this.pacmanActor.update(this)
  }
}
