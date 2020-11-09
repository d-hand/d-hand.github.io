import { timeStamp } from 'console';
import {Rocket} from './Rocket';
import { Mandalorian } from './Mandalorian';
import { MandalorianWeapons } from './MandalorianWeapons';

export class Scene extends Phaser.Scene  {
    mandalorian: Mandalorian;

    constructor() {
        super('mandalorianScene');
    }

    preload() {
        Mandalorian.load(this);
    }

    create() {
        this.mandalorian = new Mandalorian(this);

        this.mandalorian.addToScene(this);
    }

    update(time: number, delta: number) {        
        this.mandalorian.update(time, delta);
    }
}