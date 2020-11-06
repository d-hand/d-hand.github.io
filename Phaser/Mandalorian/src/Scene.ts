import {Bullet} from './Bullet';
import { Mandalorian } from './Mandalorian';

export default class Scene extends Phaser.Scene {
    mandalorian: Mandalorian;

    constructor() {
        super('MandalorianScene');
    }

    preload() {
        this.load.image('mandalorian', 'assets/mandalorian.png');
        this.load.image('bullets', 'assets/bullets.png');
    }

    create() {

        this.mandalorian = new Mandalorian(this);

        this.input.on('pointerdown', (pointer) => {
        });

        this.input.on('pointermove', (pointer) => {
        });

        this.input.on('pointerup', (pointer) => {
        });
    }


    update(time: any, delta: any) {
        this.mandalorian.update(time, delta);
    }
}
