import { MandalorianWeaponFactory, MandalorianWeapons } from "./MandalorianWeapons";
import { PistolFactory } from "./Pistol";
import { RocketGunFactory } from "./RocketGun";
import { Scene } from "./Scene";

interface IParams {
    mandalorian: Phaser.GameObjects.Container; 
    weapons: MandalorianWeapons;
    keyboard: Phaser.Input.Keyboard.KeyboardPlugin;
    mouse: Phaser.Input.Pointer;
}

export class Mandalorian {
    mandalorian: Phaser.GameObjects.Container;
    weapons: MandalorianWeapons;
    mouse: Phaser.Input.Pointer;

    up: Phaser.Input.Keyboard.Key[];
    left: Phaser.Input.Keyboard.Key[];
    bottom: Phaser.Input.Keyboard.Key[];
    right: Phaser.Input.Keyboard.Key[];

    speed = Phaser.Math.GetSpeed(100, 1);

    constructor({mandalorian, weapons, keyboard, mouse}: IParams) {
        this.mandalorian = mandalorian;
        this.weapons = weapons;
        this.mouse = mouse;

        this.up = [keyboard.addKey('up'), keyboard.addKey('E')];
        this.left = [keyboard.addKey('left'), keyboard.addKey('S')];
        this.bottom = [keyboard.addKey('down'), keyboard.addKey('D')];
        this.right = [keyboard.addKey('right'), keyboard.addKey('F')];
    }

    update(time: number, delta: number) {
        this.weapons.update(time, delta);

        this.mandalorian.x += delta * this.speed * (Number(this.right.some(x => x.isDown)) - Number(this.left.some(x => x.isDown)));
        this.mandalorian.y += delta * this.speed * (Number(this.bottom.some(x => x.isDown)) - Number(this.up.some(x => x.isDown)));

        if (this.mouse.x != undefined || this.mouse.x != undefined)
            this.mandalorian.setRotation(Phaser.Math.Angle.Between(this.mouse.x, this.mouse.y, this.mandalorian.x, this.mandalorian.y) - Math.PI / 2);
    }
}

export class MandalorianFactory {
    static readonly mandalorianSprite = 'mandalorianSprite'

    static load(scene: Scene) {
        PistolFactory.load(scene);
        RocketGunFactory.load(scene);
        scene.load.image(MandalorianFactory.mandalorianSprite, 'assets/mandalorian.png');
    }

    static create(scene: Scene) {
        const keyboard = scene.input.keyboard;
        const mouse = scene.input.mousePointer;
        const mandalorianSprite = scene.add.sprite(0, 0, MandalorianFactory.mandalorianSprite);
        const mandalorian = scene.add.container(400, 400, [mandalorianSprite]).setDepth(1);        
        const weapons = MandalorianWeaponFactory.create(scene, mandalorian);
        return new Mandalorian({mandalorian, weapons, keyboard, mouse});
    }
}