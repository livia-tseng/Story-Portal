import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';
import { effectOnClick } from '../buttonHelper.js';

//NEED TO IMPORT SCENE_KEYS AND MAIN.JS
export class LevelSixScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELSIX_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        const screenWidth = 800 / this.textures.get('bgl6').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('bgl6').getSourceImage().height;
        this.add.image(0,0, 'bgl6').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);

        let question = this.add.image(0, 0, 'question6').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(1);
        
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
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        });
        
        // answer buttons
        let corrB = correctButton(this, 435, 520, '6c', SCENE_KEYS.LEVELSEVEN_SCENE, (done) => {
            const lvl6to7Scene = this.add.video(this.cameras.main.centerX,this.cameras.main.centerY,'lvl6tolvl7');
            lvl6to7Scene.setOrigin(0.5).setDepth(1).setMute(false).setVolume(1.0).play();
            const blackOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
                .setOrigin(0, 0)
                .setAlpha(1)
                .setDepth(0);
                const skipButton = this.add.image(750, 550,'samuelf').setOrigin(0.5).setScale(0.3).setDepth(3).setInteractive();

                skipButton.on('pointerup', () => {
                    skipButton.destroy();
                    if (lvl6to7Scene.isPlaying()) {
                        lvl6to7Scene.stop();
                    }
                    lvl6to7Scene.destroy();
                    done();
                })
            lvl6to7Scene.on('complete', ()=> {
                this.tweens.add({
                    targets: lvl6to7Scene,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        lvl6to7Scene.destroy();
                        done();
                    }
                })
            })
        }).setScale(.075).setAlpha(0);
        let wb1 = wrongButton(this,695,400,'6b').setScale(.075);
        let wb2 = wrongButton(this,435,400, '6a').setScale(.075);
        let wb3 = wrongButton(this,695,520,'6d').setScale(.075);

        

        //Stars on Click!
        effectOnClick(this);
    }
}