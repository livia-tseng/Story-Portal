import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';
import { effectOnClick } from '../buttonHelper.js';

export class LevelOneScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELONE_SCENE,
            }
        );
    }

    init() {

    }


    create(){
        const screenWidth = 800 / this.textures.get('bgl1').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('bgl1').getSourceImage().height;
        this.add.image(0,0,'bgl1').setOrigin(0).setScale(screenWidth,screenHeight).setDepth(0);

        //Dark window
        let windowDark = this.add.image(400,300, 'windowDark').setOrigin(0.5).setScale(screenWidth, screenHeight).setDepth(0);
        //Light window
        let windowLight = this.add.image(0,0, 'windowLight').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0).setAlpha(0);


        //Back Button Stuff
        const backButton = this.add.image(0, 0, 'mediumButton').setDepth(2);
        const startText = this.add.text(0, 0, 'BACK',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setOrigin(0.5, 0.7).setDepth(3);
        //Container!
        const containerBackButton = this.add.container(backButton.width/2, backButton.height/2, [backButton, startText]);
        containerBackButton.setSize(backButton.width, backButton.height);
        containerBackButton.setInteractive();
        containerBackButton.on("pointerup", ()=>{
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        })

        //Stars on Click!
        effectOnClick(this);
        this.cameraShakeTimer = this.time.addEvent({
            delay: 500, // Shake every 100ms
            callback: this.shakeCamera,
            callbackScope: this,
            loop: true // Repeat indefinitely until stopped
        });

        //Audio
        let trainLevel1 = this.sound.add('lvl1audio1', {
            volume: 1.0,
            loop: true,
        });
        trainLevel1.play();


        this.input.once("pointerdown", () => {
            this.cameraShakeTimer.remove();
            this.cameras.main.shake(2000, 0.05);
            this.input.enabled = false;
            this.tweens.add({
                targets: windowDark,        // The image to tween
                alpha: 1,              // Target alpha value
                duration: 1000,         // Duration of fade-out in ms
                onComplete: () => {
                    this.tweens.add({
                        targets: windowLight,
                        alpha: 1,      // Target alpha value
                        duration: 1000,  // Duration of fade-in in ms
                        onComplete: () => {
                            // Re-enable input after animations are complete
                            this.input.enabled = true;
                        }
                    });
                }
            });
        });

        //answer buttons
        wrongButton(this, 160, 500, 'samuelf');
        correctButton(this,320,500,'samuelf', SCENE_KEYS.LEVELTWO_SCENE, (done) => {
            const trainarrive = this.add.video(this.cameras.main.centerX,this.cameras.main.centerY,'trainarriving');
            trainarrive.setOrigin(0.5).setDepth(1).setMute(false).setVolume(1.0).play();
            const blackOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
                .setOrigin(0, 0)
                .setAlpha(1)
                .setDepth(0);    
            trainarrive.on('complete', ()=> {
                this.tweens.add({
                    targets: trainarrive,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        trainarrive.destroy();
                        done();
                    }
                })
            })
        });
        wrongButton(this,480,500, 'samuelf');
        wrongButton(this,640,500,'samuelf');
    }

    shakeCamera() {
        // Camera shake with light intensity
        this.cameras.main.shake(100, 0.008);
    }
    
}

