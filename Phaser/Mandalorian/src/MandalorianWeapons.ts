import { Pistol, PistolFactory } from "./Pistol";
import { RocketFactory } from "./Rocket";
import { RocketGun, RocketGunFactory } from "./RocketGun";
import { Scene } from "./Scene";

interface IParams {
    pistol: Pistol;
    rocketGun: RocketGun;
    input: Phaser.Input.InputPlugin;
    mouse: Phaser.Input.Pointer;
}

export class MandalorianWeapons {
    weapons: IMandalorianWeapon[];
    activated = 0;
    isAttack: boolean;
    mouse: Phaser.Input.Pointer;

    constructor({pistol, rocketGun, input, mouse} : IParams) {
        this.weapons = [pistol, rocketGun];
        this.mouse = mouse;

        this.getWeapon().setActivate(true);

        input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.isAttack = true;
        });

        input.on(Phaser.Input.Events.POINTER_UP, () => {
            this.isAttack = false;
        });

        input.keyboard.addKey('W').on(Phaser.Input.Keyboard.Events.DOWN, () => {
            this.getWeapon().setActivate(false);

            if (++this.activated >= this.weapons.length) 
                this.activated = 0;

            this.getWeapon().setActivate(true);
        });        

    }

    update(time: number, delta: number) {
        if (this.isAttack) {
            this.getWeapon().fire(time, delta, this.mouse.x, this.mouse.y)
        }
    }

    getWeapon = () => this.weapons[this.activated];
}

export class MandalorianWeaponFactory {
    static create(scene: Scene, container: Phaser.GameObjects.Container) {
        const input = scene.input;
        const mouse = scene.input.mousePointer;
        const pistol = PistolFactory.create(scene, container);
        const rocketGun = RocketGunFactory.create(scene, container);        
        return new MandalorianWeapons({pistol, rocketGun, input, mouse});
    }
}

export interface IMandalorianWeapon {
    setActivate(activated: boolean): void;
    fire(time: number, delta: number, x: number, y: number): void;
}