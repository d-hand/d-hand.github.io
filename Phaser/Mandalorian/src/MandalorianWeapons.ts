import { Rocket } from "./Rocket";
import { Scene } from "./Scene";

export class MandalorianWeapons {
    lastRocketFired = 0;
    rockets: Phaser.GameObjects.Group;

    constructor(scene: Scene) {
        //
    }

    public addToScene(scene) {
        this.rockets = scene.add.group({
            classType: Rocket,
            maxSize: 20,
            runChildUpdate: true
        });
    }

    public static load(scene: Scene) {        
        Rocket.load(scene);
    }

    public activate(time: number, x1: number, y1: number, x2: number, y2: number) {
        if (time > this.lastRocketFired) {
            var rocket = this.rockets.get() as Rocket;

            if (rocket) {
                rocket.activate(x1, y1, x2, y2);

                this.lastRocketFired = time + 600;
            }
        }
    }    
}