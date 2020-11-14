import { Pistol, PistolFactory } from "./Pistol";
import { RocketGun, RocketGunFactory } from "./RocketGun";
import { Scene } from "./Scene";

interface IParams {
    pistol: Pistol;
    rocketGun: RocketGun;
    input: Phaser.Input.InputPlugin;    
}

export class MandalorianWeapons {
    weapons: IMandalorianWeapon[];
    activeIndex = 0;
    isAttack: boolean;
    mouse: Phaser.Input.Pointer;

    constructor({pistol, rocketGun, input} : IParams) {
        this.weapons = [pistol, rocketGun];    

        input.keyboard.addKey('W').on(Phaser.Input.Keyboard.Events.DOWN, this.switchWeapons);
        input.keyboard.addKey('CTRL').on(Phaser.Input.Keyboard.Events.DOWN, this.switchWeapons);
        input.on(Phaser.Input.Events.POINTER_DOWN, () => this.fire(true));
        input.on(Phaser.Input.Events.POINTER_UP, () => this.fire(false));

        this.getWeapon().activate(true);
    }

    update(time: number, delta: number) {
        this.weapons.forEach(w => w.update(time, delta));
    }

    fire(isFire) {
        this.getWeapon().fire(isFire);
    }

    getWeapon = () => this.weapons[this.activeIndex];

    switchWeapons = () => {
        this.getWeapon().activate(false);
        this.switchIndex();
        this.getWeapon().activate(true);
    }

    switchIndex() {
        if (++this.activeIndex >= this.weapons.length) 
            this.activeIndex = 0;
    }
}

export class MandalorianWeaponFactory {
    static create(scene: Scene, container: Phaser.GameObjects.Container) {
        const input = scene.input;
        
        const pistol = PistolFactory.create(scene, container);
        const rocketGun = RocketGunFactory.create(scene, container);        
        return new MandalorianWeapons({pistol, rocketGun, input});
    }
}

export interface IMandalorianWeapon {
    activate(isActivate: boolean): void;
    fire(isFire): void;
    update(time: number, delta: number): void;
}