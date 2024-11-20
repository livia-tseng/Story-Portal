import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { effectOnClick } from '../buttonHelper.js';

export class CreditsScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.CREDITS_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        //Background
        const screenWidth = 800 / this.textures.get('creditsBackground').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('creditsBackground').getSourceImage().height;
        this.add.image(0,0,'creditsBackground').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);

        //Credits!!!
        this.add.text(400, 80, 'CREDITS', {
            fontFamily: 'BadComic-Regular',
            color: 'white',
            fontSize: '70px'
        }).setOrigin(0.5, 0.5).setDepth(1);

        //Hexcode colors
        let projectLead = this.add.text(400, 170, 'Project Lead - Livia!', {
            fontFamily: 'BadComic-Regular',
            color: '#89CFF0',
            fontSize: '40px'
        }).setOrigin(0.5,0.5).setDepth(1);

        let evelynName = this.add.text(300, 230, 'Evelyn!', {
            fontFamily: 'BadComic-Regular',
            color: '#89CFF0',
            fontSize: '35px'
        }).setOrigin(0.5).setDepth(1);

        let jaydenName = this.add.text(500, 230, 'Jayden!', {
            fontFamily: 'BadComic-Regular',
            color: '#89CFF0',
            fontSize: '35px'
        }).setOrigin(0.5).setDepth(1);

        let karlaName = this.add.text(300, 280, 'Karla!', {
            fontFamily: 'BadComic-Regular',
            color: '#89CFF0',
            fontSize: '35px'
        }).setOrigin(0.5).setDepth(1);

        let kelaniName = this.add.text(500, 280, 'Kelani!', {
            fontFamily: 'BadComic-Regular',
            color: '#89CFF0',
            fontSize: '35px'
        }).setOrigin(0.5).setDepth(1);

        let oliName = this.add.text(300, 330, 'Oli!', {
            fontFamily: 'BadComic-Regular',
            color: '#89CFF0',
            fontSize: '35px'
        }).setOrigin(0.5).setDepth(1);

        let samuelName = this.add.text(500, 330, 'Sammy!', {
            fontFamily: 'BadComic-Regular',
            color: '#89CFF0',
            fontSize: '35px'
        }).setOrigin(0.5).setDepth(1);

        this.add.text(400, 500, 'Thank you for playing!', {
            fontFamily: 'BadComic-Regular',
            color: 'white',
            fontSize: '70px'
        }).setOrigin(0.5).setDepth(1);

        //Emitters purely for research purposes
        const emitter1 = this.add.particles(750, 440, 'heart', {
            speed: { min: 200, max: 300 },
            lifespan: 1000,
            scale: { start: 0.5, end: 0.25 },
            alpha: { start: 0.8, end: 0.7 },
            gravityY: -500
        });

        const emitter2 = this.add.particles(750, 440, 'heart', {
            speed: { min: 200, max: 300 },
            lifespan: 1000,
            scale: { start: 0.5, end: 0.25 },
            alpha: { start: 0.8, end: 0.7 },
            gravityY: -500
        });

        const emitter3 = this.add.particles(750, 440, 'heart', {
            speed: { min: 200, max: 300 },
            lifespan: 1000,
            scale: { start: 0.5, end: 0.25 },
            alpha: { start: 0.8, end: 0.7 },
            gravityY: -500
        });

        const emitter4 = this.add.particles(50, 440, 'heart', {
            speed: { min: 200, max: 300 },
            lifespan: 1000,
            scale: { start: 0.5, end: 0.25 },
            alpha: { start: 0.8, end: 0.7 },
            gravityY: -500
        });

        const emitter5 = this.add.particles(50, 440, 'heart', {
            speed: { min: 200, max: 300 },
            lifespan: 1000,
            scale: { start: 0.5, end: 0.25 },
            alpha: { start: 0.8, end: 0.7 },
            gravityY: -500
        });

        const emitter6 = this.add.particles(50, 440, 'heart', {
            speed: { min: 200, max: 300 },
            lifespan: 1000,
            scale: { start: 0.5, end: 0.25 },
            alpha: { start: 0.8, end: 0.7 },
            gravityY: -500
        });

        //Exit button
        let exitBtn = this.add.image(0, 0, 'exitButton').setOrigin(0).setDepth(1);

        exitBtn.setInteractive();
        exitBtn.on("pointerup", ()=>{
            console.log("Exit Button Pressed");
            this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
        })

        //Stars on Click!
        effectOnClick(this);
    }
}