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
        let corrBtn = correctButton(this, 215, 100, 'ameen4',SCENE_KEYS.GAME_START_SCENE).setDepth(2).setAlpha(0);
        let wBtn1 = wrongButton(this,335,100,'ameen4').setDepth(2).setAlpha(0);
        let wBtn2 = wrongButton(this,215,210, 'ameen4').setDepth(2).setAlpha(0);
        let wBtn3 = wrongButton(this,335,210,'ameen4').setDepth(2).setAlpha(0);

        // Tween parameters
        const jumpTween = (target) => {
            return this.tweens.add({
                targets: target,
                y: target.y - 10,       // Move up by 10 pixels
                duration: 400,          // Duration of the jump
                yoyo: true,             // Return to original position
                repeat: -1,             // Repeat indefinitely
                ease: 'Sine.easeInOut', // Smooth easing
                paused: true            // Start paused
            });
            };
    
            const buttonTween1 = jumpTween(wBtn1);
            wBtn1.on('pointerover', () => {
                buttonTween1.resume(); // Resume the jump animation
            });
            wBtn1.on('pointerout', () => {
                buttonTween1.pause();  // Pause the jump animation
                buttonTween1.seek(0);  // Reset the tween to its initial state
            });
            const buttonTween2 = jumpTween(corrBtn);
            corrBtn.on('pointerover', () => {
                buttonTween2.resume(); // Resume the jump animation
            });
            corrBtn.on('pointerout', () => {
                buttonTween2.pause();  // Pause the jump animation
                buttonTween2.seek(0);  // Reset the tween to its initial state
            });
            const buttonTween3 = jumpTween(wBtn2);
            wBtn2.on('pointerover', () => {
                buttonTween3.resume(); // Resume the jump animation
            });
            wBtn2.on('pointerout', () => {
                buttonTween3.pause();  // Pause the jump animation
                buttonTween3.seek(0);  // Reset the tween to its initial state
            });
            const buttonTween4 = jumpTween(wBtn3);
            wBtn3.on('pointerover', () => {
                buttonTween4.resume(); // Resume the jump animation
            });
            wBtn3.on('pointerout', () => {
                buttonTween4.pause();  // Pause the jump animation
                buttonTween4.seek(0);  // Reset the tween to its initial state
            });

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

        let question = this.add.text(130, 0, 'Question Here!',
            {
                fontFamily: 'BadComic-Regular',
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