import { PairFactory } from "matter";
import { IMandalorianWeapon } from "./MandalorianWeapons";
import { Scene } from "./Scene";

interface IParams {
    pistol: Phaser.GameObjects.Sprite;
    objectFactory: Phaser.GameObjects.GameObjectFactory;
    mouse: Phaser.Input.Pointer;
}

export class Pistol implements IMandalorianWeapon {
    pistol: Phaser.GameObjects.Sprite;
    objectFactory: Phaser.GameObjects.GameObjectFactory;
    mouse: Phaser.Input.Pointer;
    lastFired = 0;
    isFire = false;
    isActive = false;

    constructor({pistol, objectFactory, mouse} : IParams) {
        this.pistol = pistol;
        this.objectFactory = objectFactory;
        this.mouse = mouse;
    }

    activate = (isActive: boolean) => {
        this.isActive = isActive;
        this.pistol.setVisible(isActive);        
    }


    fire = (isFire: boolean) => this.isFire = isFire;

    update(time: number, delta: number) {
        if (this.isActive && this.isFire && time > this.lastFired) {
            const spriteName = PistolFactory.shotSprites[Math.floor(Math.random() * 5)];
            
            const shotSprite = this.objectFactory.sprite(this.mouse.x, this.mouse.y, spriteName);
            shotSprite.play(spriteName);
            shotSprite.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => shotSprite.destroy());

            this.lastFired = time + 800;
        }
    }
}

export class PistolFactory {
    static readonly pistol = 'assets/pistol.png';

    static readonly shotSprites = [
        'assets/pistol-shot.png',
        'assets/pistol-shot-up.png',
        'assets/pistol-shot-right.png',
        'assets/pistol-shot-bottom.png',
        'assets/pistol-shot-left.png'
    ];

    static load(scene: Scene) {
        scene.load.image(PistolFactory.pistol, PistolFactory.pistol);

        for (var sprite of PistolFactory.shotSprites)
            scene.load.spritesheet(sprite, sprite, { frameWidth: 32, frameHeight: 32, endFrame: 3 });
    }

    static create(scene: Scene, container: Phaser.GameObjects.Container) {
        const mouse = scene.input.mousePointer;

        PistolFactory.shotSprites.map(sprite => scene.createAnimation({
            key: sprite,
            frames: scene.anims.generateFrameNames(sprite),
            hideOnComplete: true,
        }));

        const pistol = scene.add.sprite(12, -10, PistolFactory.pistol).setVisible(false);
        container.add(pistol);

        return new Pistol({objectFactory: scene.add, pistol, mouse});
    }
}
