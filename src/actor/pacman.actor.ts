import { Tilemaps } from 'phaser';
import { GameScene, LOAD_KEYS } from '../scenes/game.scene';

enum DIRECTION {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}

export class PacmanActor {
    private readonly gridSize = 8
    private readonly playerSpeed = 60
    private readonly playerStartPosition = {
        x: this.gridSize * 14,
        y: (this.gridSize * 23) + 4,
    }
    private colisionWall: Record<DIRECTION, Boolean> = {
        [DIRECTION.UP]: false,
        [DIRECTION.DOWN]: false,
        [DIRECTION.LEFT]: false,
        [DIRECTION.RIGHT]: false,
    }

    preload(scene: GameScene) {
        scene.load.image(LOAD_KEYS.ACTOR_PACMAN, 'assets/actors/pacman.png');
    }

    create(scene: GameScene) {
        scene.player = scene.physics.add.image(this.playerStartPosition.x, this.playerStartPosition.y, LOAD_KEYS.ACTOR_PACMAN);
        scene.player.setCollideWorldBounds(true);
    }


    update(scene: GameScene) {
        //  Detect colision with wall
        this.updateColisionWall(scene);

        if (scene.cursors.down.isDown && !this.colisionWall[DIRECTION.DOWN]) { scene.player.setVelocity(0, this.playerSpeed); }
        if (scene.cursors.up.isDown && !this.colisionWall[DIRECTION.UP]) { scene.player.setVelocity(0, -this.playerSpeed); }
        if (scene.cursors.left.isDown && !this.colisionWall[DIRECTION.LEFT]) { scene.player.setVelocity(-this.playerSpeed, 0); }
        if (scene.cursors.right.isDown && !this.colisionWall[DIRECTION.RIGHT]) { scene.player.setVelocity(this.playerSpeed, 0); }
    }

    private updateColisionWall(scene: GameScene) {
        //  If not full inside a tile, do not check for wall colision
        const isInsideTileX = !((Math.floor(scene.player.x) + (this.gridSize / 2)) % this.gridSize)
        const isInsideTileY = !((Math.floor(scene.player.y) + (this.gridSize / 2)) % this.gridSize)
        if (!isInsideTileX || !isInsideTileY) return

        this.colisionWall[DIRECTION.UP] = !!scene.map.getTileAtWorldXY(scene.player.x, scene.player.y - this.gridSize);
        this.colisionWall[DIRECTION.DOWN] = !!scene.map.getTileAtWorldXY(scene.player.x, scene.player.y + this.gridSize);
        this.colisionWall[DIRECTION.LEFT] = !!scene.map.getTileAtWorldXY(scene.player.x - this.gridSize, scene.player.y);
        this.colisionWall[DIRECTION.RIGHT] = !!scene.map.getTileAtWorldXY(scene.player.x + this.gridSize, scene.player.y);
    }
}
