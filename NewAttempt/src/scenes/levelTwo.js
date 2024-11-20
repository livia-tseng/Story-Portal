import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';
import { effectOnClick } from '../buttonHelper.js';

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
        
        wrongButton(this, 520, 80, 'jayden2');
        correctButton(this,520,200,'jayden2',SCENE_KEYS.LEVELTHREE_SCENE);
        wrongButton(this,680,80, 'jayden2');
        wrongButton(this,680,200,'jayden2');
        
        
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

        //Stars on Click!
        effectOnClick(this);
    }
}