import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { effectOnClick } from '../buttonHelper.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';

//NEED TO IMPORT SCENE_KEYS AND MAIN.JS
export class LevelFinalScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELFINAL_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        const screenWidth = 800 / this.textures.get('bglf').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('bglf').getSourceImage().height;
        this.add.image(0,0, 'bglf').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);

        let lid = this.add.image(550, 380, 'giftLid').setOrigin(0.5).setScale(0.23).setDepth(1);
        let box = this.add.image(550, 422, 'giftBox').setOrigin(0.5).setScale(0.23).setDepth(0);
        let bell = this.add.image(550, 422, 'bell').setOrigin(0.5).setScale(0.23).setDepth(2).setAlpha(0);

        //Back Button Stuff
        const backButton = this.add.image(0, 0, 'mediumButton').setDepth(2);
        const backText = this.add.text(0, 0, 'BACK',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setOrigin(0.5, 0.7).setDepth(2);
        //Container!
        const containerBackButton = this.add.container(backButton.width/2, 600 - (backButton.height/2), [backButton, backText]).setDepth(2);
        containerBackButton.setSize(backButton.width, backButton.height);
        containerBackButton.setInteractive();
        containerBackButton.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        });

        let question = this.add.text(400, 40, 'Open the present!',
            {
                fontFamily: 'Goudy',
                color: 'black',
                fontSize: '50px',
        }).setOrigin(0.5).setDepth(1);


        //Stars on Click!
        effectOnClick(this);

        lid.setInteractive({ draggable:true });
        lid.on('pointerover', () => {
            lid.setTint(0xD3D3D3);
        })
        lid.on('pointerout', () => {
            lid.clearTint();
        })


        const dropZoneRadius = 80; // Radius of the drop zone
        const dropZone = this.add.zone(550, 275, dropZoneRadius, dropZoneRadius)
        .setCircleDropZone(dropZoneRadius) // Make it a circular drop zone
        .setInteractive();

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            dragY = Phaser.Math.Clamp(dragY, 0, 380);
            gameObject.y = dragY;
        });

        this.input.on('drop', (pointer, lid, dropZone) => {
            lid.setTint(0x00ff00); // Change tint to indicate successful drop
            lid.x = dropZone.x;
            lid.y = dropZone.y;
            lid.disableInteractive();

            this.tweens.add({
                targets: [lid, box],      // The object to fade out
                alpha: 0,                 // Target alpha value
                duration: 1000,           // Fade-out duration in milliseconds
                onComplete: () => {
                    lid.destroy(); // Remove the object from the scene after fading
                }
            });

            this.tweens.add({
                targets: bell,
                alpha: 1,                 // Target alpha value
                duration: 1000,           // Fade-in duration
                onComplete: () => {
                    this.tweens.add({
                        targets: question,
                        alpha: 0,
                        duration: 3000
                    });

                    // Bounce the new image after it fades in
                    this.tweens.add({
                        targets: bell,
                        y: bell.y - 30, // Move the image up for the bounce
                        duration: 1000,      // Bounce up duration
                        ease: 'Power2',     // Ease for a smoother bounce
                        yoyo: true,         // Make the image come back to its original position
                        repeat: 1,           // Bounce once (up and down)
                        onComplete: () => {
                            this.tweens.add({
                                targets: text,
                                alpha: 1,
                                duration: 3000,
                                onComplete: () => {
                                    this.time.delayedCall(3000, () => {
                                        // Change to the desired scene
                                        this.scene.start(SCENE_KEYS.MAIN_MENU_SCENE); // Replace with your scene key
                                    });
                                }
                            });
                        }
                    });
                }
            });

        });

        let text = this.add.text(400, 40, 'Thank you for playing!',
            {
                fontFamily: 'Goudy',
                color: 'white',
                fontSize: '50px',
        }).setOrigin(0.5).setDepth(1).setAlpha(0);




    }
}