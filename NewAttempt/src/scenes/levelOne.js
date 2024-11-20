import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';

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
        const screenWidth = this.scale.width / this.textures.get('polarkidsleeping').getSourceImage().width;
        const screenHeight = this.scale.height / this.textures.get('polarkidsleeping').getSourceImage().height;
        
        this.add.image(0,0,'polarkidsleeping').setOrigin(0).setScale(screenWidth,screenHeight).setDepth(0);

        const sleep = this.add.text(400,100,'level one', {
                fontFamily: 'BadComic-Regular',
                color: 'white',
                fontSize: '50px',
        }).setOrigin(0.5).setDepth(2);

        const leveloneText = this.add.renderTexture(500,100,400,200).setOrigin(0.5).setDepth(2);
        leveloneText.draw(this.add.text(0,0, 'Level One', {
            fontFamily: 'BadComic-Regular',
            color: 'white',
            fontSize: '50px'
        }));

        leveloneText.setAngle(-30); // rotate angle
        leveloneText.setScale(2,1); // skew

        //answer buttons
        let buttonA = this.add.image(160, 500, 'samuelf').setOrigin(0.5,0.5).setScale(0.3,0.3).setDepth(1);
        buttonA.setInteractive();
        buttonA.on("pointerup", ()=> {
            buttonA.setTint(0xFF0000).setAlpha(0.5)
        })
        let buttonB = this.add.image(320, 500, 'samuelf').setOrigin(0.5,0.5).setScale(0.3,0.3).setDepth(1);
        buttonB.setInteractive();
        buttonB.on("pointerup", ()=> {
            buttonB.setTint(0x00FF00).setAlpha(0.5)
            let correctText = this.add.text(400,300,"Correct!", {
                fontSize: "64px",
                color:"#00ff00",
                fontFamily: 'BadComic-Regular',
            }).setOrigin(0.5);
            this.time.delayedCall(1500, ()=> {
                correctText.destroy();
                this.scene.start(SCENE_KEYS.LEVELTWO_SCENE);
            })

        })
        let buttonC = this.add.image(480, 500, 'samuelf').setOrigin(0.5,0.5).setScale(0.3,0.3).setDepth(1);
        buttonC.setInteractive();
        buttonC.on("pointerup", ()=> {
            buttonC.setTint(0xFF0000).setAlpha(0.5)
        })
        let buttonD = this.add.image(640, 500, 'samuelf').setOrigin(0.5,0.5).setScale(0.3,0.3).setDepth(1);
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
        })

        //this.input.on("pointerdown", () => {
        //    this.cameras.main.shake(2000, 0.05);
        //});
        
}
    
}

