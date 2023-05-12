class Room1 extends AdventureScene {
    constructor() {
        super("room1", "Breakfast");
    }

    onEnter() {

        /*
        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                }); 
            });
            */
        /*
        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })
        */

        let numAte = 0;

        let description = this.add.text(this.w * 0.1, this.w * 0.1, "You've woken up and are really hungry for pancakes.")
            .setFontSize(this.s * 2)

        
        let pancake = this.add.text(this.w * 0.2, this.w * 0.4, "🥞")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("eat the pancakes");
            })
            .on('pointerdown', () => {
                numAte++;
                this.showMessage("Pancakes eaten: " + numAte);
                this.tweens.add({
                    targets: pancake,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    //ease: 'Sine.inOut',
                    duration: 50
                });

                if(numAte > 3){
                    description.text = "Thats probably enough";
                    let door = this.add.text(this.w * 0.5, this.w * 0.2, "🚪")
                        .setFontSize(this.s * 20)
                        .setInteractive()
                        .on('pointerover', () => {
                            this.showMessage("Go to your room");
                        })
                        .on('pointerdown', () => {
                            this.showMessage("*squeak*");
                            this.gotoScene('room2');
                        })
                }

                if(numAte > 7) {
                    description.text = "really?";
                }

            })
    }
}

class Room2 extends AdventureScene {
    constructor() {
        super("room2", "Chill time");
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('paths', 'two-paths.jpg');
    }

    onEnter() {
        this.imageObject = this.add.image(
            this.w * .375,//x
            this.h * .5,//y
            'paths',//imagename
        )
        this.imageObject.setScale(3) //resize

        this.add.text(this.w * 0.15, this.h * 0.25, "Bright room")
            .setFontSize(this.s * 2)
            .setColor(0xFFFFFF)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("The Bright Path");
            })
            .on('pointerdown', () => {
                this.gotoScene('room3');
            });

        this.add.text(this.w * 0.5, this.h * 0.25, "Dark room")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("The Dark Path");
            })
            .on('pointerdown', () => {
                this.gotoScene('room4');
            });

    }
}

class Room3 extends AdventureScene {
    constructor() {
        super("room3", "Dinner");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });
        
        this.add.text(this.w * 0.5, this.w * 0.5, "next room")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("The other choice");
            })
            .on('pointerdown', () => {
                this.gotoScene('room4');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

//GAMEPLAY ROOM

class Room4 extends AdventureScene {  
    constructor() {
        super("room4", "Dark Room 1");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        this.add.text(this.w * 0.5, this.w * 0.5, "next room")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("The other choice");
            })
            .on('pointerdown', () => {
                this.gotoScene('room5');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

// PUZZLE ROOM
class Room5 extends AdventureScene {
    constructor() {
        super("room5", "Dark Room 2");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        this.add.text(this.w * 0.5, this.w * 0.5, "next room")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("The other choice");
            })
            .on('pointerdown', () => {
                this.gotoScene('room6');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Room6 extends AdventureScene {
    constructor() {
        super("room6", "Escape Room");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('room1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Room1, Room2, Room3, Room4, Room5, Room6, Outro],
    title: "Adventure Game",
});

