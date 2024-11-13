import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';

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
//.setOrigin(0) makes it so the origin is now at thetop left corner of the image

        //Title Text
        const titleText = this.add.text(120, 200, 'The Polar Express', {
            fontFamily: 'BadComic-Regular',
            color: 'white',
            fontSize: '70px'
        }).setDepth(1);
        
        //Start Text
        const startText = this.add.text(305, 405, 'START',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setDepth(2);

        //Start Game Button
        let startButton = this.add.image(400, 450, 'startBtn').setDepth(1);

        //Credits Button
        let creditsButton =  this.add.image(800, 0, 'creditsBtn').setOrigin(1, 0);
        //setOrigin(1,0) makes the origin the top right corner

        //Set interactive so u can click on them
        creditsButton.setInteractive();
        startButton.setInteractive();

        //"pointerup" - click and release (when button is pressed and released)
        creditsButton.on("pointerup", ()=>{
            console.log("Credits Button Pressed");
            this.scene.start(SCENE_KEYS.CREDITS_SCENE); //Calling start will automatically kill current scene and start the new one
        })  

        //Same deal
        startButton.on("pointerup", ()=>{
            console.log("Start Button Pressed");
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        })

        //Emitter of stars for mouse click
        const emitter = this.add.particles(0, 0, 'star', {
            lifespan: 400,
            speed: { min: 150, max: 200 },
            alpha: { start: 1, end: 0.1},
            rotate: { start: 0, end: 360 },
            emitting: false
        });

        //On click, emit 25 stars at mouse position
        this.input.on('pointerdown', pointer => {
            emitter.emitParticleAt(pointer.worldX, pointer.worldY, 25);
        });
    }

    
}