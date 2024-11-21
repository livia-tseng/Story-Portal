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

        let question = this.add.text(240, 90, 'Question Here!',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '40px',
        }).setOrigin(0.5).setDepth(1);
        question.setAngle(-1);
        question.setScale(0.8,1);
        
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

        let corrB = correctButton(this, 525, 120, 'jayden3',SCENE_KEYS.LEVELFOUR_SCENE, (done) => {
            containerBackButton.destroy();
            question.destroy();
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

        let wb1 = wrongButton(this,645,120,'jayden3');
        let wb2 = wrongButton(this,525,240, 'jayden3');
        let wb3 = wrongButton(this,645,240,'jayden3');

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
    
            const buttonTween1 = jumpTween(wb1);
            wb1.on('pointerover', () => {
                buttonTween1.resume(); // Resume the jump animation
            });
            wb1.on('pointerout', () => {
                buttonTween1.pause();  // Pause the jump animation
                buttonTween1.seek(0);  // Reset the tween to its initial state
            });
            const buttonTween2 = jumpTween(corrB);
            corrB.on('pointerover', () => {
                buttonTween2.resume(); // Resume the jump animation
            });
            corrB.on('pointerout', () => {
                buttonTween2.pause();  // Pause the jump animation
                buttonTween2.seek(0);  // Reset the tween to its initial state
            });
            const buttonTween3 = jumpTween(wb2);
            wb2.on('pointerover', () => {
                buttonTween3.resume(); // Resume the jump animation
            });
            wb2.on('pointerout', () => {
                buttonTween3.pause();  // Pause the jump animation
                buttonTween3.seek(0);  // Reset the tween to its initial state
            });
            const buttonTween4 = jumpTween(wb3);
            wb3.on('pointerover', () => {
                buttonTween4.resume(); // Resume the jump animation
            });
            wb3.on('pointerout', () => {
                buttonTween4.pause();  // Pause the jump animation
                buttonTween4.seek(0);  // Reset the tween to its initial state
            });

        //Stars on Click!
        effectOnClick(this);
    }
}