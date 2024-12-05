import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';
import { effectOnClick } from '../buttonHelper.js';

//NEED TO IMPORT SCENE_KEYS AND MAIN.JS
export class LevelSevenScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELSEVEN_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        const screenWidth = 800 / this.textures.get('bgl7').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('bgl7').getSourceImage().height;
        this.add.image(0,0, 'bgl7').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);
        
        let trainLevel1 = this.sound.add('lvl7audio', {
            volume: 1.0,
            loop: true,
        });
        trainLevel1.play();

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
        let corrB = correctButton(this, 695, 520, '7b', SCENE_KEYS.LEVELEIGHT_SCENE, (done) => {
            const lvl7to8Scene = this.add.video(this.cameras.main.centerX,this.cameras.main.centerY,'lvl7tolvl8');
            lvl7to8Scene.setOrigin(0.5).setDepth(1).setMute(false).setVolume(1.0).play();
            const blackOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
                .setOrigin(0, 0)
                .setAlpha(1)
                .setDepth(0);
                const skipButton = this.add.image(750, 550,'samuelf').setOrigin(0.5).setScale(0.3).setDepth(3).setInteractive();

                skipButton.on('pointerup', () => {
                    skipButton.destroy();
                    if (lvl7to8Scene.isPlaying()) {
                        lvl7to8Scene.stop();
                    }
                    lvl7to8Scene.destroy();
                    done();
                })
            lvl7to8Scene.on('complete', ()=> {
                this.tweens.add({
                    targets: lvl7to8Scene,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        lvl7to8Scene.destroy();
                        done();
                    }
                })
            })
        }).setScale(.085).setAlpha(1);
        let wb1 = wrongButton(this,435,400,'7a').setScale(.085);
        let wb2 = wrongButton(this,435,520, '7c').setScale(.085);
        let wb3 = wrongButton(this,695,400,'7d').setScale(.085);
        

        //Stars on Click!
        effectOnClick(this);
    }
}