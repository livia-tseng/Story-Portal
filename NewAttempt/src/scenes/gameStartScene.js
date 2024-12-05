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
    createSnowEffect() {
        // Create a group for snow particles
        this.snowParticles = [];
        
        // Number of snowflakes
        const snowflakeCount = 100;
        
        // Create snowflakes
        for (let i = 0; i < snowflakeCount; i++) {
            // Randomize starting positions across the screen
            const x = Phaser.Math.Between(0, this.scale.width);
            const y = Phaser.Math.Between(-100, 0);
            
            // Create a snowflake
            const snowflake = this.add.circle(x, y, Phaser.Math.Between(1, 3), 0xffffff, 0.7);
            
            // Store additional properties in an object
            this.snowParticles.push({
                sprite: snowflake,
                fallSpeed: Phaser.Math.Between(50, 200)
            });
        }
    }
    update(time, delta) {
        if (!this.snowParticles) return;
        
        this.snowParticles.forEach((particle) => {
            // Move snowflake down using the stored speed
            particle.sprite.y += particle.fallSpeed * (delta / 1000);
            
            // If snowflake goes below screen, reset to top
            if (particle.sprite.y > this.scale.height) {
                particle.sprite.y = -10;
                particle.sprite.x = Phaser.Math.Between(0, this.scale.width);
            }
            
            // Optional: Add slight horizontal movement to simulate wind
            particle.sprite.x += Math.sin(time * 0.001) * 0.5;
        });
    }

    create(){
        //Background
        const screenWidth = this.scale.width / this.textures.get('background').getSourceImage().width;
        const screenHeight = this.scale.height / this.textures.get('background').getSourceImage().height;
        const newScale = Math.max(screenWidth, screenHeight);
        this.add.image(0,0,'mountainBackground').setOrigin(0).setScale(newScale).setDepth(0);

        this.add.text(400, 60, 'Level Select', {
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

        let levelOneBtn = this.add.image(115, 180, 'samuelf').setOrigin(0.5,0.5).setScale(0.3,0.3).setDepth(1);
        let levelTwoBtn = this.add.image(305, 180, 'jayden2').setOrigin(0.5).setScale(0.3, 0.3).setDepth(1);
        let levelThreeBtn = this.add.image(495, 180, 'jayden3').setOrigin(0.5).setScale(0.3, 0.3).setDepth(1);
        let levelFourBtn = this.add.image(685, 180, 'ameen4').setOrigin(0.5).setScale(0.3, 0.3).setDepth(1);
        let levelFiveBtn = this.add.image(115, 340, 'ameen5').setOrigin(0.5).setScale(0.3).setDepth(1);
        let levelSixBtn = this.add.image(305, 340, 'ameen6').setOrigin(0.5).setScale(0.3).setDepth(1);
        let levelSevenBtn = this.add.image(495, 340, 'ameen7').setOrigin(0.5).setScale(0.3).setDepth(1);
        let levelEightBtn = this.add.image(685, 340, 'avia8').setOrigin(0.5).setScale(0.3).setDepth(1);
        let levelFinalBtn = this.add.image(400, 500, 'ameenFinal').setOrigin(0.5).setScale(0.3, 0.3).setDepth(1);


        levelOneBtn.setInteractive();
        levelTwoBtn.setInteractive();
        levelThreeBtn.setInteractive();
        levelFourBtn.setInteractive();
        levelFiveBtn.setInteractive();
        levelSixBtn.setInteractive();
        levelSevenBtn.setInteractive();
        levelEightBtn.setInteractive();
        levelFinalBtn.setInteractive();

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

        levelFiveBtn.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.LEVELFIVE_SCENE);
        })

        levelSixBtn.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.LEVELSIX_SCENE);
        })

        levelSevenBtn.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.LEVELSEVEN_SCENE);
        })

        levelEightBtn.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.LEVELEIGHT_SCENE);
        })
        
        levelFinalBtn.on("pointerup", ()=> {
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.LEVELFINAL_SCENE);
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
        const buttonTween5 = jumpTween(levelFiveBtn);
        levelFiveBtn.on('pointerover', () => {
            buttonTween5.resume(); // Resume the jump animation
        });
        levelFiveBtn.on('pointerout', () => {
            buttonTween5.pause();  // Pause the jump animation
            buttonTween5.seek(0);  // Reset the tween to its initial state
        });
        const buttonTween6 = jumpTween(levelSixBtn);
        levelSixBtn.on('pointerover', () => {
            buttonTween6.resume(); // Resume the jump animation
        });
        levelSixBtn.on('pointerout', () => {
            buttonTween6.pause();  // Pause the jump animation
            buttonTween6.seek(0);  // Reset the tween to its initial state
        });
        const buttonTween7 = jumpTween(levelSevenBtn);
        levelSevenBtn.on('pointerover', () => {
            buttonTween7.resume(); // Resume the jump animation
        });
        levelSevenBtn.on('pointerout', () => {
            buttonTween7.pause();  // Pause the jump animation
            buttonTween7.seek(0);  // Reset the tween to its initial state
        });
        const buttonTween8 = jumpTween(levelEightBtn);
        levelEightBtn.on('pointerover', () => {
            buttonTween8.resume(); // Resume the jump animation
        });
        levelEightBtn.on('pointerout', () => {
            buttonTween8.pause();  // Pause the jump animation
            buttonTween8.seek(0);  // Reset the tween to its initial state
        });
        const buttonTweenFinal = jumpTween(levelFinalBtn);
        levelFinalBtn.on('pointerover', () => {
            buttonTweenFinal.resume(); // Resume the jump animation
        });
        levelFinalBtn.on('pointerout', () => {
            buttonTweenFinal.pause();  // Pause the jump animation
            buttonTweenFinal.seek(0);  // Reset the tween to its initial state
        });

        
        //Cancel Button to go back to main menu
        let cancelBtn = this.add.image(0,600, 'cancelButton').setOrigin(0, 1).setDepth(1);
        cancelBtn.setInteractive();
        cancelBtn.on("pointerup", ()=>{
            console.log("Cancel Button Pressed");
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
        })
        // Add this line at the end of create()
        this.createSnowEffect();
        effectOnClick(this);
    }
}
