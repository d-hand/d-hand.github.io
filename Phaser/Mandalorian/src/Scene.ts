import { Rocket, RocketFactory } from './Rocket';
import { Mandalorian, MandalorianFactory } from './Mandalorian';
import { MandalorianWeapons } from './MandalorianWeapons';
import { RocketGun, RocketGunFactory } from "./RocketGun";

export class Scene extends Phaser.Scene {
    rocketAnimation: Phaser.Animations.Animation;
    rocketGun: RocketGun;
    rocketGroup: Phaser.GameObjects.Group;    
    mandalorianWeapons: MandalorianWeapons;    
    mandalorianSprite: Phaser.GameObjects.Sprite;
    mandalorian: Mandalorian;

    preload() {
        RocketFactory.load(this);
        MandalorianFactory.load(this);
    }

    create() {
        this.rocketAnimation = RocketFactory.addAnimationToScene(this);
        this.rocketGroup = RocketGunFactory.addRocketGroupToScene(this);
        this.rocketGun = new RocketGun(this);
        this.mandalorianWeapons = new MandalorianWeapons(this);
        this.mandalorianSprite = MandalorianFactory.addMandalorianSpriteToScene(this);
        this.mandalorian = new Mandalorian(this);
    }

    update(time: number, delta: number) {
        this.mandalorian.update(time, delta);
    }
}