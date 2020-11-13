import { PairFactory } from "matter";
import { Scene } from "phaser";

export class Pistol {
    lastFired = 0;
    scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    activate(time: number, x1: number, y1: number, x2: number, y2: number) {
        if (time > this.lastFired) {
            const spriteName = PistolFactory.shotSprites[Math.floor(Math.random() * 5)];
            console.log(spriteName)
            const shotSprite = this.scene.add.sprite(x2, y2, spriteName);
            shotSprite.play(spriteName);
            shotSprite.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => shotSprite.destroy());


            this.lastFired = time + 800;
        }
    }
}

export class PistolFactory {

    static readonly shotSprites = [
        'pistol-shot.png',
        'pistol-shot-up.png',
        'pistol-shot-right.png',
        'pistol-shot-bottom.png',
        'pistol-shot-left.png'
    ];

    static load(scene: Scene) {
        for(var sprite of PistolFactory.shotSprites)
            scene.load.spritesheet(sprite, `assets/${sprite}`, {frameWidth: 32, frameHeight: 32, endFrame: 3 });
    }

    static addAnimationsToScene(scene: Scene) {
        let result = [];
        for(var sprite of PistolFactory.shotSprites) {
            var huj = scene.anims.create({
                key: sprite,
                frames: scene.anims.generateFrameNames(sprite),
                hideOnComplete: true,
            });

            if (huj === false)
                throw new Error('Не удалось');

            result.push(huj);
        }

        return result;
    }
}
