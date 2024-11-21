import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { effectOnClick } from '../buttonHelper.js';

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
        const newScale = Math.max(screenWidth, screenHeight);
        this.add.image(0,0,'mountainBackground').setOrigin(0).setScale(newScale).setDepth(0);

        this.add.text(400, 80, 'Level Select', {
            fontFamily: 'Goudy',
            color: '#837d43',
            fontSize: '60px'
        }).setOrigin(0.5, 0.5).setDepth(1);
        

        let mainMenuScene = this.scene.get(SCENE_KEYS.MAIN_MENU_SCENE);
        if (mainMenuScene.sound.get('mainmenuaudio').isPlaying) {
            
        } else {
            let introAudio = this.sound.add('mainmenuaudio', {
                volume: 1.0,
                loop: true,
            });
            introAudio.play();
        }

        let levelOneBtn = this.add.image(115, 200, 'samuelf').setOrigin(0.5,0.5).setScale(0.3,0.3).setDepth(1);
        let levelTwoBtn = this.add.image(305, 200, 'jayden2').setOrigin(0.5).setScale(0.3, 0.3).setDepth(1);
        let levelThreeBtn = this.add.image(495, 200, 'jayden3').setOrigin(0.5).setScale(0.3, 0.3).setDepth(1);
        let levelFourBtn = this.add.image(685, 200, 'ameen4').setOrigin(0.5).setScale(0.3, 0.3).setDepth(1);


        levelOneBtn.setInteractive();
        levelTwoBtn.setInteractive();
        levelThreeBtn.setInteractive();
        levelFourBtn.setInteractive();

        levelOneBtn.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.LEVELONE_SCENE);
        })

        levelTwoBtn.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.LEVELTWO_SCENE);
        })

        levelThreeBtn.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.LEVELTHREE_SCENE);
        })

        levelFourBtn.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.LEVELFOUR_SCENE);
        })

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
    
        const buttonTween1 = jumpTween(levelOneBtn);
        levelOneBtn.on('pointerover', () => {
            buttonTween1.resume(); // Resume the jump animation
        });
        levelOneBtn.on('pointerout', () => {
            buttonTween1.pause();  // Pause the jump animation
            buttonTween1.seek(0);  // Reset the tween to its initial state
        });
        const buttonTween2 = jumpTween(levelTwoBtn);
        levelTwoBtn.on('pointerover', () => {
            buttonTween2.resume(); // Resume the jump animation
        });
        levelTwoBtn.on('pointerout', () => {
            buttonTween2.pause();  // Pause the jump animation
            buttonTween2.seek(0);  // Reset the tween to its initial state
        });
        const buttonTween3 = jumpTween(levelThreeBtn);
        levelThreeBtn.on('pointerover', () => {
            buttonTween3.resume(); // Resume the jump animation
        });
        levelThreeBtn.on('pointerout', () => {
            buttonTween3.pause();  // Pause the jump animation
            buttonTween3.seek(0);  // Reset the tween to its initial state
        });
        const buttonTween4 = jumpTween(levelFourBtn);
        levelFourBtn.on('pointerover', () => {
            buttonTween4.resume(); // Resume the jump animation
        });
        levelFourBtn.on('pointerout', () => {
            buttonTween4.pause();  // Pause the jump animation
            buttonTween4.seek(0);  // Reset the tween to its initial state
        });
        
        //Cancel Button to go back to main menu
        let cancelBtn = this.add.image(0,600, 'cancelButton').setOrigin(0, 1).setDepth(1);
        cancelBtn.setInteractive();
        cancelBtn.on("pointerup", ()=>{
            console.log("Cancel Button Pressed");
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
        })

        effectOnClick(this);
    }
}
