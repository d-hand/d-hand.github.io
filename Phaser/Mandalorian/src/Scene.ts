import { Rocket, RocketFactory } from './Rocket';
import { Mandalorian, MandalorianFactory } from './Mandalorian';
import { MandalorianWeapons } from './MandalorianWeapons';
import { RocketGun, RocketGunFactory } from "./RocketGun";
import { Pistol, PistolFactory } from './Pistol';

export class Scene extends Phaser.Scene {
    rocketAnimation: Phaser.Animations.Animation;
    rocketGun: RocketGun;
    rocketGroup: Phaser.GameObjects.Group;

    pistolAnimations: Phaser.Animations.Animation[];
    pistol: Pistol;

    mandalorianWeapons: MandalorianWeapons;

    mandalorianSprite: Phaser.GameObjects.Sprite;
    mandalorian: Mandalorian;

    mouseX: number;
    mouseY: number;

    preload() {
        PistolFactory.load(this);
        RocketFactory.load(this);
        MandalorianFactory.load(this);
    }

    create() {
        this.rocketAnimation = RocketFactory.addAnimationToScene(this);
        this.rocketGroup = RocketGunFactory.addRocketGroupToScene(this);
        this.rocketGun = new RocketGun(this);
        this.pistolAnimations = PistolFactory.addAnimationsToScene(this);
        this.pistol = new Pistol(this);
        this.mandalorianWeapons = new MandalorianWeapons(this);
        this.mandalorianSprite = MandalorianFactory.addMandalorianSpriteToScene(this);
        this.mandalorian = new Mandalorian(this);

        this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer: any) => {
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
        });
    }

    update(time: number, delta: number) {
        this.mandalorian.update(time, delta);   
        this.mandalorianWeapons.update(time, delta);   
    }
}