import { Rocket } from "./Rocket";
import { Scene } from "./Scene";

export class RocketGun {
    scene: Scene;
    lastFired = 0;    

    constructor(scene: Scene) {
        this.scene = scene;
    }

    activate(time: number, x1: number, y1: number, x2: number, y2: number) {
        if (time > this.lastFired) {
            var rocket = this.scene.rocketGroup.get() as Rocket;

            if (rocket) {
                rocket.activate(x1, y1, x2, y2);

                this.lastFired = time + 600;
            }
        }
    }
}

export class RocketGunFactory {
    static addRocketGroupToScene(scene: Scene) {
        return scene.add.group({
            classType: Rocket,
            maxSize: 20,
            runChildUpdate: true
        });
    }
}
