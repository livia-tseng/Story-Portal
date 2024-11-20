import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';
import { effectOnClick } from '../buttonHelper.js';

//NEED TO IMPORT SCENE_KEYS AND MAIN.JS
export class LevelThreeScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELTHREE_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        const screenWidth = 800 / this.textures.get('bgl3').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('bgl3').getSourceImage().height;
        this.add.image(0,0, 'bgl3').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);

        //audio
        let trainAudio = this.sound.add('lvl3audio', {
            volume: 1.0,
            loop: true,
        });
        trainAudio.play();

        // answer buttons

        correctButton(this, 525, 200, 'jayden3',SCENE_KEYS.LEVELFOUR_SCENE, (done) => {
            const tokyoDrift = this.add.video(this.cameras.main.centerX,this.cameras.main.centerY,'tokyodrift');
            tokyoDrift.setOrigin(0.5).setDepth(1).setMute(false).setVolume(1.0).play();
            const blackOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
                .setOrigin(0, 0)
                .setAlpha(1)
                .setDepth(0);    
            tokyoDrift.on('complete', ()=> {
                this.tweens.add({
                    targets: tokyoDrift,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        tokyoDrift.destroy();
                        done();
                    }
                })
            })
        });

        wrongButton(this,645,200,'jayden3');
        wrongButton(this,525,320, 'jayden3');
        wrongButton(this,645,320,'jayden3');
        
        //Back Button Stuff
        const backButton = this.add.image(0, 0, 'mediumButton').setDepth(1);
        const startText = this.add.text(0, 0, 'BACK',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setOrigin(0.5, 0.7).setDepth(2);

        //Container!
        const containerBackButton = this.add.container(backButton.width/2, backButton.height/2, [backButton, startText]);
        containerBackButton.setSize(backButton.width, backButton.height);
        containerBackButton.setInteractive();

        containerBackButton.on("pointerup", ()=>{
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        });

        //Stars on Click!
        effectOnClick(this);
    }
}