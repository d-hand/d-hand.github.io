import { RocketGun } from "./RocketGun";
import { Scene } from "./Scene";

export class MandalorianWeapons {
    
    rocketGun: RocketGun;

    constructor(scene: Scene) {
        this.rocketGun = scene.rocketGun;
    }


    activate(time: number, x1: number, y1: number, x2: number, y2: number) {
        this.rocketGun.activate(time, x1, y1, x2, y2);
    }
}


