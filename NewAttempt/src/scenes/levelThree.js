import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';

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

        // answer buttons

        correctButton(this, 160, 500, 'samuelf',SCENE_KEYS.LEVELFOUR_SCENE);
        wrongButton(this,320,500,'samuelf');
        wrongButton(this,480,500, 'samuelf');
        wrongButton(this,640,500,'samuelf');
        
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