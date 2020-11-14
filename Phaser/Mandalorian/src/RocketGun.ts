import { IMandalorianWeapon } from "./MandalorianWeapons";
import { Rocket } from "./Rocket";
import { Scene } from "./Scene";

interface IParams {
    rocketGun: Phaser.GameObjects.Sprite;
    rocketGroup: Phaser.GameObjects.Group;
}

export class RocketGun implements IMandalorianWeapon {
    static tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();

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
                const [x0, y0] = this.getAbsolutePosition();
                
                rocket.activate(x0, y0, x, y);

                this.lastFired = time + 600;
            }
        }
    }

    getAbsolutePosition() {
        this.rocketGun.getWorldTransformMatrix(RocketGun.tempMatrix);
        var d = RocketGun.tempMatrix.decomposeMatrix() as any;        
        return [d.translateX, d.translateY]
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
