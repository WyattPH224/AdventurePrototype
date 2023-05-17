//First room, eat breakfast
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

        let description = this.add.text(this.w * 0.1, this.w * 0.1, "You've woken up and are really hungry for pancakes. \nBetter eat before heading to school!")
            .setFontSize(this.s * 2)

        
        let pancake = this.add.text(this.w * 0.2, this.w * 0.4, "🥞")
            .setFontSize(this.s * 5)
            .setInteractive()
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
                        .on('pointerdown', () => {
                            this.showMessage("*squeak*");
                            this.gotoScene('room2');
                        })
                    this.describe(door, "Go to your room");
                }

                if(numAte > 7) {
                    description.text = "really?";
                }

            })
        this.describe(pancake,"eat the pancakes");
        
    }
}

//second room, arrive at school, choose classes: Math, English, PE

class Room2 extends AdventureScene {
    constructor() {
        super("room2", "Hallway");
    }

    onEnter() {

        //3 doors
        //if grade item for class is in inventory, dont show door
        //if all three are in inventory, show door to end
        //they can retake the class to get a better score should they want to


        //go to math room
        let mathDoor = this.add.text(this.w * 0.15, this.h * 0.25, "Math Class")
            .setFontSize(this.s * 2)
            .setColor(0xFFFFFF)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('room3');
            });
        
        if(this.hasItem("Math Pass")){
            mathDoor.visible = false;
        }

        // go to english room
        let englishDoor = this.add.text(this.w * 0.35, this.h * 0.25, "English class")
            .setFontSize(this.s * 2)
            .setColor(0xFFFFFF)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('room4');
            });

        //go to pe room
        let peDoor = this.add.text(this.w * 0.6, this.h * 0.25, "PE")
            .setFontSize(this.s * 2)
            .setColor(0xFFFFFF)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('room5');
            });
        
        if(this.hasItem("Gym Pass")){
            peDoor.visible = false;
        }
        
        this.describe(mathDoor, "Door to Math Class");
        this.describe(englishDoor, "Door to English Class");
        this.describe(peDoor, "Door to Gym Class")

    }
}

// Math room
// just actually math problems
class Room3 extends AdventureScene {
    constructor() {
        super("room3", "Math Class");
    }
    onEnter() {
        //let it be known I was attempting to make this cooler than it was but its 3 am and I just gotta get it done at this point :c Maybe revist later
        //and see if you can fix it
        let rng = Phaser.Math.RND;
        //create random equasion

        function makeStuff() {
            let equasion = `${rng.between(1, 1000)} + ${rng.between(1,1000)}`;
            console.log(equasion);
            //make sure one of them is the actual answer
            //rest are random
            //create 3 possible answers
            
            console.log(eval(equasion));
            let rightAnswer = eval(equasion);
            let wrong1 = rng.between(1, rightAnswer * 2);
            while(rightAnswer == wrong1) {
                wrong1 = rng.between(1, rightAnswer * 2);
            }
            let wrong2 = rng.between(1, rightAnswer * 2);
            while(rightAnswer == wrong2) {
                wrong2 = rng.between(1, rightAnswer * 2);
            }
            let answers = [rightAnswer, wrong1, wrong2];
            console.log(answers);

            return [equasion, answers]
        }
        

        let stuff = makeStuff();
        let equasion = stuff[0];
        let answers = stuff[1];
        let rightAnswer = eval(equasion);


        this.add.text(this.w * 0.30, this.h * 0.3, `${equasion}`)
            .setFontSize(this.s * 4);

        let choice1 = rng.shuffle(answers).pop()
        let choice1text = this.add.text(this.w * 0.25, this.h * 0.5, `${choice1}`)
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                if(choice1 == rightAnswer) {
                    this.showMessage("Correct! \n You received your math pass!");
                    choice1text.setText("✅");
                    this.gainItem("Math Pass");
                }
                else {
                    this.showMessage("Wrong!");
                    this.shake(choice1text);
                }
            });

        let choice2 = rng.shuffle(answers).pop()
        let choice2text = this.add.text(this.w * 0.35, this.h * 0.5, `${choice2}`)
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                if(choice2 == rightAnswer) {
                    this.showMessage("Correct! \n You received your math pass!");
                    choice2text.setText("✅");
                    this.gainItem("Math Pass");
                }
                else {
                    this.showMessage("Wrong!");
                    this.shake(choice2text);
                }
            });

        let choice3 = rng.shuffle(answers).pop()
        let choice3text = this.add.text(this.w * 0.45, this.h * 0.5, `${choice3}`)
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                if(choice3 == rightAnswer) {
                    this.showMessage("Correct! \n You received your math pass!");
                    choice3text.setText("✅");
                    this.gainItem("Math Pass");
                }
                else {
                    this.showMessage("Wrong!");
                    this.shake(choice3text);
                }
            });
        

        this.add.text(this.w * 0.15, this.h * 0.15, "Answer this difficult question to pass Math Class!")
            .setFontSize(this.s * 2);


        
        let finish = this.add.text(this.w * 0.5, this.w * 0.5, "Back to the hall")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('room2');
            });

        this.describe(choice1text, "Is this the right answer?");
        this.describe(choice2text, "Maybe this is the answer?");
        this.describe(choice3text, "Perhaps this is the answer?");
        this.describe(finish, "Have you passed yet?");

       
    }
}

//English room
// Crossword puzzle? 
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

// PE room
// grade based on click speed
class Room5 extends AdventureScene {
    constructor() {
        super("room5", "Gym class");
    }
    onEnter() {

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(100, 0xff4d4d, 1);    //linewidth, color, opacity
        let track = this.graphics.lineBetween(this.w * 0.1, this.w * .35, this.w * 0.55, this.w * .35); //x1, y1, x2, y2
        this.graphics.lineStyle(100, 0x660000, 1)
        this.graphics.lineBetween(this.w * 0.1, this.w * .35, this.w * 0.135, this.w * .35);

        
        let description = this.add.text(this.w * 0.35, this.w * 0.1, "Race to the end!")
        .setFontSize(this.s * 2);

        let trackLength = (this.w * 0.55) - (this.w * 0.1); 

        let leave = this.add.text(this.w * 0.5, this.w * 0.5, "Back to the hall")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.gotoScene('room2');
            });
        leave.visible = false;
        //running character
        let runner = this.add.text(this.w * 0.55, this.w * 0.3, "🏃")
            .setFontSize(this.s * 4)
            .setInteractive()
            .on('pointerdown', () => {
                runner.x = runner.x - 5;
                if(runner.x <= this.w * 0.1){
                    this.showMessage('Congrats! You win!');
                    this.gainItem("Gym Pass");
                    leave.visible = true;
                }
                if(runner.x < trackLength * .85) {
                    description.setText("Keep Going!");
                }if(runner.x < trackLength * .65) {
                    description.setText("Halfway There!");
                }if(runner.x < trackLength * .35) {
                    description.setText("So Close!");
                }
            });
        
        this.describe(runner, "Click to Run!");
        this.describe(track, 'The outside running track');
        this.describe(leave, 'Have you passed yet?');
       
        
        
        
        
    }
}

//end room

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

