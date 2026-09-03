import { IMandalorianWeapon } from "./MandalorianWeapons";
import { Rocket } from "./Rocket";
import { Scene } from "./Scene";

interface IParams {
    rocketGun: Phaser.GameObjects.Sprite;
    rocketGroup: Phaser.GameObjects.Group;
    mouse: Phaser.Input.Pointer;
}

export class RocketGun implements IMandalorianWeapon {
    static tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();

    mouse: Phaser.Input.Pointer;
    rocketGun: Phaser.GameObjects.Sprite;
    rocketGroup: Phaser.GameObjects.Group;
    lastFired = 0;
    isFire = false;
    isActive = false;

    constructor({rocketGun, rocketGroup, mouse} : IParams) {
        this.rocketGun = rocketGun;
        this.rocketGroup = rocketGroup;
        this.mouse = mouse;
    }

    activate = (isActive: boolean) => {
        this.isActive = isActive;
        this.rocketGun.setVisible(isActive);
    }

    fire = (isFire: boolean) => this.isFire = isFire;

    update(time: number, delta: number) {
        if (this.isActive && this.isFire && time > this.lastFired) {
            var rocket = this.rocketGroup.get() as Rocket;

            if (rocket) {
                const [x, y] = this.getAbsolutePosition();
                
                rocket.activate(x, y, this.mouse.x, this.mouse.y);

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
        const mouse = scene.input.mousePointer;

        const rocketGroup = scene.add.group({
            classType: Rocket,
            maxSize: 20,
            runChildUpdate: true
        });

        const rocketGun = scene.add.sprite(12, -7, RocketGunFactory.image).setVisible(false);
        container.add(rocketGun);


        return new RocketGun({rocketGun, rocketGroup, mouse});
    }
}
