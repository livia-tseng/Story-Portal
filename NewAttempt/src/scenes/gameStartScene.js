import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';

export class GameStartScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.GAME_START_SCENE,
            }
        );
    }

    preload() {
        
    }

    create(){
        //Background
        this.add.image(0,0,'background').setOrigin(0).setScale(0.92592592592, 1.08499095841).setDepth(0);

        this.add.text(400, 120, 'In Game Start Scene', {
            fontFamily: 'BadComic-Regular',
            color: '#0000FF',
            fontSize: '70px'
        }).setOrigin(0.5, 0.5).setDepth(1);

        //Cancel Button to go back to main menu
        let cancelBtn = this.add.image(0,600, 'cancelButton').setOrigin(0, 1).setDepth(1);
        cancelBtn.setInteractive();
        cancelBtn.on("pointerup", ()=>{
            console.log("Cancel Button Pressed");
            this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
        })

        //Emitter of stars for mouse click
        const emitterStars = this.add.particles(0, 0, 'star', {
            lifespan: 400,
            speed: { min: 150, max: 200 },
            alpha: { start: 1, end: 0.1},
            rotate: { start: 0, end: 360 },
            emitting: false
        });
        emitterStars.setDepth(2);

        //On click, emit 25 stars at mouse position
        this.input.on('pointerdown', pointer => {
            emitterStars.emitParticleAt(pointer.worldX, pointer.worldY, 25);
        });
    }
}
