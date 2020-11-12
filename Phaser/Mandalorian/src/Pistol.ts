import { Scene } from "phaser";

export class Pistol {
    lastFired = 0;
    scene: Scene;

    constructor(scene: Scene) {        
        this.scene = scene;
    }

    activate(time: number, x1: number, y1: number, x2: number, y2: number) {
        if (time > this.lastFired) {
            const shotSprite = this.scene.add.sprite(x2, y2, PistolFactory.shotImage);            
            shotSprite.play(PistolFactory.shotAnimation);
            shotSprite.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => shotSprite.destroy());

            this.lastFired = time + 800;
        }
    }
}

export class PistolFactory {    
    static readonly shotImage = 'pistolShot';
    static readonly shotAnimation = 'pistolShotAnimation';

    static load(scene: Scene) {
        scene.load.spritesheet(PistolFactory.shotImage, 'assets/pistol-shot.png', { frameWidth: 32, frameHeight: 32, endFrame: 7 });
    }

    static addAnimationToScene(scene: Scene) {
        var result = scene.anims.create({
            key: PistolFactory.shotAnimation,
            frames: scene.anims.generateFrameNames(PistolFactory.shotImage),
            hideOnComplete: true,
        });

        if (result === false)
            throw new Error();

        return result;
    }
}
