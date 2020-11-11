import { RocketGun } from "./RocketGun";
import { Scene } from "./Scene";

export class MandalorianWeapons {
    
    rocketGun: RocketGun;

    private constructor({rocketGun}: {rocketGun: RocketGun}) {
        this.rocketGun = rocketGun;
    }

    public static addToScene({rocketGun}: {scene: Scene, rocketGun: RocketGun}) : MandalorianWeapons {
        return new MandalorianWeapons({rocketGun})
    }

    public activate(time: number, x1: number, y1: number, x2: number, y2: number) {
        this.rocketGun.activate(time, x1, y1, x2, y2);
    }
}


