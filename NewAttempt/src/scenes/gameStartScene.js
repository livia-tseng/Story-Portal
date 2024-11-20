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
        const screenWidth = this.scale.width / this.textures.get('background').getSourceImage().width;
        const screenHeight = this.scale.height / this.textures.get('background').getSourceImage().height;
        const newScale = Math.max(screenWidth, screenHeight)
        this.add.image(0,0,'mountainBackground').setOrigin(0).setScale(newScale).setDepth(0);

        this.add.text(400, 80, 'Level Select', {
            fontFamily: 'BadComic-Regular',
            color: '#837d43',
            fontSize: '60px'
        }).setOrigin(0.5, 0.5).setDepth(1);

        let levelOneBtn = this.add.image(160, 200, 'samuelf').setOrigin(0.5,0.5).setScale(0.3,0.3).setDepth(1);

        levelOneBtn.setInteractive();

        levelOneBtn.on("pointerup", ()=>{
            console.log("Level One Button Pressed");
            this.scene.start(SCENE_KEYS.LEVELONE_SCENE);
        })
        
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
