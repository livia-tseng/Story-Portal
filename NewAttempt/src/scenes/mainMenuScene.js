import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { effectOnClick } from '../buttonHelper.js';

//The main menu
export class MainMenuScene extends Phaser.Scene {
    constructor() { //Same setup as always
        super({
            key: SCENE_KEYS.MAIN_MENU_SCENE,
            }
        );
    }

    init() {

    }
    preload(){
        // Preload the button click sound
        this.load.audio('buttonClick', 'assets/audio/button_click.mp3');
    }
    createBlizzardEffect() {
        // Create a group for blizzard particles
        this.blizzardParticles = [];
        
        // More snowflakes for a dense blizzard
        const snowflakeCount = 200;
        
        // Create snowflakes
        for (let i = 0; i < snowflakeCount; i++) {
            // Randomize starting positions with more spread
            const x = Phaser.Math.Between(-100, this.scale.width + 100);
            const y = Phaser.Math.Between(-200, 0);
            
            // Vary snowflake sizes more dramatically
            const size = Phaser.Math.FloatBetween(0.5, 3);
            
            // Create a snowflake with varying opacity
            const snowflake = this.add.circle(x, y, size, 0xffffff, Phaser.Math.FloatBetween(0.3, 0.8));
            
            // Store additional properties for more dynamic movement
            this.blizzardParticles.push({
                sprite: snowflake,
                fallSpeed: Phaser.Math.Between(100, 300),  // Faster falling
                wobbleSpeed: Phaser.Math.FloatBetween(0.5, 2),  // Horizontal wobble intensity
                wobbleOffset: Math.random() * Math.PI * 2  // Random start point for wobble
            });
        }
    }
    
    updateBlizzardEffect(time, delta) {
        if (!this.blizzardParticles) return;
        
        this.blizzardParticles.forEach((particle) => {
            // Faster downward movement
            particle.sprite.y += particle.fallSpeed * (delta / 1000);
            
            // More chaotic horizontal movement (wobble)
            particle.wobbleOffset += particle.wobbleSpeed * 0.05;
            particle.sprite.x += Math.sin(particle.wobbleOffset) * 3;
            
            // If snowflake goes below screen, reset to top with more randomness
            if (particle.sprite.y > this.scale.height) {
                particle.sprite.y = Phaser.Math.Between(-200, -50);
                particle.sprite.x = Phaser.Math.Between(-100, this.scale.width + 100);
                
                // Randomize speed and wobble again for variety
                particle.fallSpeed = Phaser.Math.Between(100, 300);
                particle.wobbleSpeed = Phaser.Math.FloatBetween(0.5, 2);
            }
        });
    }
    update(time, delta) {
        // Your update logic here
        this.updateBlizzardEffect(time, delta);
    }
    //The create method is where you actually draw the stuff u preloaded
    create() {
        
        //Background
        //The image is not 800 by 600 so i ahve to scale it with math
        const screenWidth = this.scale.width / this.textures.get('background').getSourceImage().width;
        const screenHeight = this.scale.height / this.textures.get('background').getSourceImage().height;
        const newScale = Math.max(screenWidth, screenHeight)
        this.add.image(0,0,'background').setOrigin(0).setScale(newScale).setDepth(0);
        //This shit was like 862x560 or something outrageous

//When adding IMAGES, the x, y coords are defaulted to the middle of the image
//If (0, 0), then the center of the image will be in the top left corner!
//.setOrigin(0) makes it so the origin is now at the top left corner of the image

        //Title Text
        const titleText = this.add.text(400, 270, 'The Polar Express', {
            fontFamily: 'Gaudy',
            color: '#efe157',
            fontSize: '70px',
            stroke: '#efe157',
            strokeThickness: 2
        }).setOrigin(0.5).setDepth(1);

        // Floating/Wobble tween
        this.tweens.add({
            targets: titleText,
            y: 280,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        //Start Text
        const startText = this.add.text(310, 435, 'START',
            {
                fontFamily: 'Gaudy',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setDepth(2);

        //Start Game Button
        let startButton = this.add.image(400, 480, 'startBtn').setDepth(1);
        let buttonClick = this.sound.add('buttonClick', { volume: 2.0 });

        //Credits Button
        let creditsButton =  this.add.image(800, 0, 'creditsBtn').setOrigin(1, 0);
        //setOrigin(1,0) makes the origin the top right corner

        //Set interactive so u can click on them
        creditsButton.setInteractive();
        startButton.setInteractive();

        //"pointerup" - click and release (when button is pressed and released)
        creditsButton.on("pointerup", ()=>{
            console.log("Credits Button Pressed");
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.CREDITS_SCENE); //Calling start will automatically kill current scene and start the new one
            buttonClick.play();
           // Transition to the new scene after a brief delay to allow the sound to play
            this.time.delayedCall(100, () => {
                this.scene.start(SCENE_KEYS.GAME_START_SCENE);
                buttonClick.stop(); // Stop the sound after the scene change
            });
        })  

        //Same deal
        startButton.on("pointerup", ()=>{
            console.log("Start Button Pressed");
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
            // Button Hover Animation (pulsing effect)
            buttonClick.play();
            // Transition to the new scene after a brief delay to allow the sound to play
            this.time.delayedCall(100, () => {
                this.scene.start(SCENE_KEYS.GAME_START_SCENE);
                buttonClick.stop(); // Stop the sound after the scene change
            });

        })

        //Stars on Click!
        effectOnClick(this);

        
        let introAudio = this.sound.add('mainmenuaudio', {
            volume: 1.0,
            loop: true,
        });
        introAudio.play();
 // Add this line
 this.createBlizzardEffect();

    }

    
}