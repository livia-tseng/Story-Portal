import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';
import { effectOnClick } from '../buttonHelper.js';

//NEED TO IMPORT SCENE_KEYS AND MAIN.JS
export class LevelTwoScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELTWO_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        const screenWidth = 800 / this.textures.get('backgroundl2').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('backgroundl2').getSourceImage().height;
        this.add.image(0,0, 'backgroundl2').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);

        //Snow!
        const snow = this.add.particles(0, 0, 'snowflake', {
            x: [100, 200, 300, 400, 500, 600, 700, 800],
            lifespan: 4000,
            speed: { min: 50, max: 80 },
            alpha: { start: 0.3, end: 0.3 },
            rotate: { start: 0, end: 180 },
            angle: {min: 0, max: 180},
            scale: { start: 0.6, end: 0.4},
            gravityY: 40,
            frequency: 10,
            blendMode: 'ADD',
            emitting: true
        });
        snow.setDepth(0);
    


        //answer buttons
        wrongButton(this, 100, 100, 'jayden2');
        correctButton(this,240,100,'jayden2',SCENE_KEYS.LEVELTHREE_SCENE, (done) => {
            const getOnTrain = this.add.video(this.cameras.main.centerX,this.cameras.main.centerY,'gettingontrain');
            getOnTrain.setOrigin(0.5).setDepth(1).setMute(false).setVolume(1.0).play();
            const blackOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
                .setOrigin(0, 0)
                .setAlpha(1)
                .setDepth(0);    
            getOnTrain.on('complete', ()=> {
                this.tweens.add({
                    targets: getOnTrain,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        getOnTrain.destroy();
                        done();
                    }
                })
            })
        });
        ;
        wrongButton(this,380,100, 'jayden2');
        wrongButton(this,520,100,'jayden2');

        
        //Back Button Stuff
        const backButton = this.add.image(0, 0, 'mediumButton').setDepth(2);
        const backText = this.add.text(0, 0, 'BACK',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setOrigin(0.5, 0.7).setDepth(2);
        //Container!
        const containerBackButton = this.add.container(backButton.width/2, 600 - (backButton.height/2), [backButton, backText]).setDepth(2);
        containerBackButton.setSize(backButton.width, backButton.height);
        containerBackButton.setInteractive();
        containerBackButton.on("pointerup", ()=>{
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        });

        let question = this.add.text(680, 210, 'Question Here!',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '30px',
        }).setOrigin(1, 0).setDepth(1);
        question.setAngle(-40);
        question.setScale(0.8,1);

        //Stars on Click!
        effectOnClick(this);
    }
}