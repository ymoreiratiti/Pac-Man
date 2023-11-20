import Phaser from 'phaser'
import { GameScene } from './scenes/game.scene'

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '00000',
  scene: [GameScene],
  scale: {
    width: 28 * 8,
    height: 31 * 8,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
}
