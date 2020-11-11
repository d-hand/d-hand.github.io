import { Rocket } from './Rocket';
import { Mandalorian } from './Mandalorian';
import { MandalorianWeapons } from './MandalorianWeapons';
import { RocketGun } from "./RocketGun";

export class Scene extends Phaser.Scene {
    rocketGun: RocketGun;
    mandalorianWeapons: MandalorianWeapons;
    mandalorian: Mandalorian;

    constructor() {
        super('mandalorianScene');
    }

    preload() {
        Rocket.load(this);
        Mandalorian.load(this);
    }

    create() {
        Rocket.addToScene({scene: this});

        this.rocketGun = RocketGun.addToScene({scene: this});

        this.mandalorianWeapons = MandalorianWeapons.addToScene({scene: this, rocketGun: this.rocketGun});

        this.mandalorian = Mandalorian.addToScene({
            scene: this,
            weapons: this.mandalorianWeapons
        });
    }

    update(time: number, delta: number) {
        this.mandalorian.update(time, delta);
    }
}