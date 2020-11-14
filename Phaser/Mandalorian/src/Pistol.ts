import { PairFactory } from "matter";
import { IMandalorianWeapon } from "./MandalorianWeapons";
import { Scene } from "./Scene";

interface IParams {
    pistol: Phaser.GameObjects.Sprite;
    objectFactory: Phaser.GameObjects.GameObjectFactory;
}

export class Pistol implements IMandalorianWeapon {
    pistol: Phaser.GameObjects.Sprite;
    objectFactory: Phaser.GameObjects.GameObjectFactory;
    lastFired = 0;

    constructor({pistol, objectFactory} : IParams) {
        this.pistol = pistol;
        this.objectFactory = objectFactory;
    }

    setActivate(activated: boolean) {
        this.pistol.setVisible(activated);
    }

    fire(time: number, delta: number, x: number, y: number) {
        if (time > this.lastFired) {
            const spriteName = PistolFactory.shotSprites[Math.floor(Math.random() * 5)];
            
            const shotSprite = this.objectFactory.sprite(x, y, spriteName);
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
        PistolFactory.shotSprites.map(sprite => scene.createAnimation({
            key: sprite,
            frames: scene.anims.generateFrameNames(sprite),
            hideOnComplete: true,
        }));

        const pistol = scene.add.sprite(12, -10, PistolFactory.pistol).setVisible(false);
        container.add(pistol);

        return new Pistol({objectFactory: scene.add, pistol});
    }
}
