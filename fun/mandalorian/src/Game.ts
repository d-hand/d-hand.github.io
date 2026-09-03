import 'phaser';
import {Scene} from './Scene';

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: Scene
};

const game = new Phaser.Game(config);
