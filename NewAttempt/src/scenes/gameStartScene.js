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
            fontFamily: 'BadComic-Regular',
            color: '#837d43',
            fontSize: '60px'
        }).setOrigin(0.5, 0.5).setDepth(1);

        let levelOneBtn = this.add.image(115, 200, 'samuelf').setOrigin(0.5,0.5).setScale(0.3,0.3).setDepth(1);
        let levelTwoBtn = this.add.image(305, 200, 'jayden2').setOrigin(0.5).setScale(0.3, 0.3).setDepth(1);
        let levelThreeBtn = this.add.image(495, 200, 'jayden3').setOrigin(0.5).setScale(0.3, 0.3).setDepth(1);
        let levelFourBtn = this.add.image(685, 200, 'ameen4').setOrigin(0.5).setScale(0.3, 0.3).setDepth(1);


        levelOneBtn.setInteractive();
        levelTwoBtn.setInteractive();
        levelThreeBtn.setInteractive();
        levelFourBtn.setInteractive();

        levelOneBtn.on("pointerup", ()=>{
            this.scene.start(SCENE_KEYS.LEVELONE_SCENE);
        })

        levelTwoBtn.on("pointerup", ()=>{
            this.scene.start(SCENE_KEYS.LEVELTWO_SCENE);
        })

        levelThreeBtn.on("pointerup", ()=>{
            this.scene.start(SCENE_KEYS.LEVELTHREE_SCENE);
        })

        levelFourBtn.on("pointerup", ()=>{
            this.scene.start(SCENE_KEYS.LEVELFOUR_SCENE);
        })
        
        //Cancel Button to go back to main menu
        let cancelBtn = this.add.image(0,600, 'cancelButton').setOrigin(0, 1).setDepth(1);
        cancelBtn.setInteractive();
        cancelBtn.on("pointerup", ()=>{
            console.log("Cancel Button Pressed");
            this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE);
        })

        effectOnClick(this);
    }
}
