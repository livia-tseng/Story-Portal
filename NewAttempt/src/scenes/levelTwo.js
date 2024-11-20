import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';

//NEED TO IMPORT SCENE_KEYS AND MAIN.JS
export class LevelTwoScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELTWO_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        const screenWidth = 800 / this.textures.get('backgroundl2').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('backgroundl2').getSourceImage().height;
        this.add.image(0,0, 'backgroundl2').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);


        //answer buttons
        let buttonA = this.add.image(520, 80, 'jayden2').setOrigin(0.5).setScale(0.3,0.3).setDepth(1);
        buttonA.setInteractive();
        buttonA.on("pointerup", ()=> {
            buttonA.setTint(0xFF0000).setAlpha(0.5)
        })
        let buttonB = this.add.image(680, 80, 'jayden2').setOrigin(0.5).setScale(0.3,0.3).setDepth(1);
        buttonB.setInteractive();
        buttonB.on("pointerup", ()=> {
            buttonB.setTint(0xFF0000).setAlpha(0.5)
        })

        //Correct Answer
        let buttonC = this.add.image(520, 200, 'jayden2').setOrigin(0.5).setScale(0.3,0.3).setDepth(1);
        buttonC.setInteractive();
        buttonC.on("pointerup", ()=> {
            buttonC.setTint(0x00FF00).setAlpha(0.5)
            let correctText = this.add.text(400,300,"Correct!", {
                fontSize: "64px",
                color:"#00ff00",
                fontFamily: 'BadComic-Regular',
            }).setOrigin(0.5);
            this.time.delayedCall(1500, ()=> {
                correctText.destroy();
                this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
            })

        })
        

        let buttonD = this.add.image(680, 200, 'jayden2').setOrigin(0.5).setScale(0.3,0.3).setDepth(1);
        buttonD.setInteractive();
        buttonD.on("pointerup", ()=> {
            buttonD.setTint(0xFF0000).setAlpha(0.5)
        })

        //Back Button Stuff
        const backButton = this.add.image(0, 0, 'mediumButton').setDepth(1);
        const startText = this.add.text(0, 0, 'BACK',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setOrigin(0.5, 0.7).setDepth(2);

        //Container!
        const containerBackButton = this.add.container(backButton.width/2, backButton.height/2, [backButton, startText]);
        containerBackButton.setSize(backButton.width, backButton.height);
        containerBackButton.setInteractive();

        containerBackButton.on("pointerup", ()=>{
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        });
    }
}