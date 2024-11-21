import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { effectOnClick } from '../buttonHelper.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';

//NEED TO IMPORT SCENE_KEYS AND MAIN.JS
export class LevelFourScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELFOUR_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        const screenWidth = 800 / this.textures.get('bgl4').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('bgl4').getSourceImage().height;
        this.add.image(0,0, 'bgl4').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);

        let train1 = this.add.image(0,0, 'train1').setOrigin(0).setScale(screenWidth, screenHeight).setAlpha(0).setDepth(1);
        let train2 = this.add.image(0,0, 'train2').setOrigin(0).setScale(screenWidth, screenHeight).setAlpha(0).setDepth(1);
        let train3 = this.add.image(0,0, 'train3').setOrigin(0).setScale(screenWidth, screenHeight).setAlpha(0).setDepth(1);

        this.add.image(0,0, 'snow').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(1);

        let lvl4Audio = this.sound.add('lvl4audio', {
            volume: 0.2,
            loop: true,
        });
        lvl4Audio.play();

        // answer buttons
        let corrBtn = correctButton(this, 205, 100, '4a',SCENE_KEYS.GAME_START_SCENE).setDepth(2).setAlpha(0).setScale(.075);
        let wBtn1 = wrongButton(this,365,100,'4b').setDepth(2).setAlpha(0).setScale(.075);
        let wBtn2 = wrongButton(this,205,210, '4c').setDepth(2).setAlpha(0).setScale(.075);
        let wBtn3 = wrongButton(this,365,210,'4d').setDepth(2).setAlpha(0).setScale(.075);


        //Back Button Stuff
        const backButton = this.add.image(0, 0, 'mediumButton').setDepth(2).setAlpha(0);
        const backText = this.add.text(0, 0, 'BACK',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setOrigin(0.5, 0.7).setDepth(2).setAlpha(0);
        //Container!
        const containerBackButton = this.add.container(backButton.width/2, 600 - (backButton.height/2), [backButton, backText]).setDepth(2);
        containerBackButton.setSize(backButton.width, backButton.height);
        containerBackButton.setInteractive();
        containerBackButton.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        });

        let question = this.add.text(130, 0, 'What didn’t the train pass through?',
            {
                fontFamily: 'Goudy',
                color: '#D3D3D3',
                fontSize: '40px',
        }).setOrigin(0).setDepth(1).setAlpha(0);

        this.input.enabled = false;
        this.tweens.add({
            targets: train1,        // The image to tween
            alpha: 1,              // Target alpha value
            duration: 1000,         // Duration of fade-out in ms
            onComplete: () => {
                this.tweens.add({
                    targets: train2,
                    alpha: 1,      // Target alpha value
                    duration: 800,  // Duration of fade-in in ms
                    delay: 250,
                    onComplete: () => {
                        this.tweens.add({
                            targets: train1,
                            alpha: 0,      // Target alpha value
                            duration: 950,  // Duration of fade-in in ms
                            onComplete: () => {
                                this.tweens.add({
                                    targets: train3,
                                    alpha: 1,      // Target alpha value
                                    duration: 1000,  // Duration of fade-in in ms
                                    delay: 250,
                                    onComplete: () => {
                                        this.tweens.add({
                                            targets: train2,
                                            alpha: 0,
                                            duration: 1000, // Fade-out duration for the second image
                                            onComplete: () => { 
                                                this.tweens.add({
                                                    targets:[corrBtn, wBtn1, wBtn2, wBtn3, backButton, backText, question],
                                                    alpha: 1,
                                                    duration: 1000,
                                                });
                                                // Re-enable input after animations are complete
                                                this.input.enabled = true;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        
                    }
                })
            }
        });


        //Stars on Click!
        effectOnClick(this);
        
    }
}