import { Mandalorian, MandalorianFactory } from './Mandalorian';
import { RocketFactory } from './Rocket';

export class Scene extends Phaser.Scene {    
    mandalorian: Mandalorian;

    preload() {        
        RocketFactory.load(this);
        MandalorianFactory.load(this);
    }

    create() {
        RocketFactory.addAnimationToScene(this);
        this.mandalorian = MandalorianFactory.create(this);
    }

    update(time: number, delta: number) {
        this.mandalorian.update(time, delta);
    }

    createAnimation(config: Phaser.Types.Animations.Animation) {
        var result = this.anims.create(config);
        if (result === false)
            throw new Error(`Не удалось созать анимацию ${config.key}`)

        return result;
    }
}