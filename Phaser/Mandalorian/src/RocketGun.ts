import { Rocket } from "./Rocket";
import { Scene } from "./Scene";

export class RocketGun {
    rocketGroup: Phaser.GameObjects.Group;
    lastRocketFired = 0;

    private constructor({ scene, rocketGroup }: { scene: Scene, rocketGroup: Phaser.GameObjects.Group }) {
        this.rocketGroup = rocketGroup;        
    }

    public static addToScene({ scene }: { scene: Scene }): RocketGun {
        const rocketGroup = scene.add.group({
            classType: Rocket,
            maxSize: 20,
            runChildUpdate: true
        });
        return new RocketGun({ scene, rocketGroup });
    }

    public activate(time: number, x1: number, y1: number, x2: number, y2: number) {
        if (time > this.lastRocketFired) {
            var rocket = this.rocketGroup.get() as Rocket;

            if (rocket) {
                rocket.activate(x1, y1, x2, y2);

                this.lastRocketFired = time + 600;
            }
        }
    }
}
