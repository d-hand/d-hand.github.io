import { IMandalorianWeapon } from "./MandalorianWeapons";
import { Rocket } from "./Rocket";
import { Scene } from "./Scene";

interface IParams {
    rocketGun: Phaser.GameObjects.Sprite;
    rocketGroup: Phaser.GameObjects.Group;
}

export class RocketGun implements IMandalorianWeapon {
    rocketGun: Phaser.GameObjects.Sprite;
    rocketGroup: Phaser.GameObjects.Group;
    lastFired = 0;    

    constructor({rocketGun, rocketGroup} : IParams) {
        this.rocketGun = rocketGun;
        this.rocketGroup = rocketGroup;
    }

    setActivate(activated: boolean) {
        this.rocketGun.setVisible(activated);
    }

    fire(time: number, delta: number, x: number, y: number) {
        if (time > this.lastFired) {
            var rocket = this.rocketGroup.get() as Rocket;

            if (rocket) {
                
                rocket.activate(this.rocketGun.parentContainer.x, this.rocketGun.parentContainer.y, x, y);

                this.lastFired = time + 600;
            }
        }
    }
}

export class RocketGunFactory {

    static readonly image = 'assets/rocket-gun.png';

    static load(scene: Scene) {
        scene.load.image({
            key: RocketGunFactory.image,
            url: RocketGunFactory.image,
        });        
    }

    static create(scene: Scene, container: Phaser.GameObjects.Container) {
        const rocketGroup = scene.add.group({
            classType: Rocket,
            maxSize: 20,
            runChildUpdate: true
        });

        const rocketGun = scene.add.sprite(12, -7, RocketGunFactory.image).setVisible(false);
        container.add(rocketGun);


        return new RocketGun({rocketGun, rocketGroup});
    }
}
