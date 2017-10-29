$(document).ready(function(){
            var game = new Phaser.Game(600, 600, Phaser.AUTO, 'prueba', { preload: preload, create: create, update: update });
            var platforms;
            var player;
            var firing = false;
            var score = 0;
            function preload(){
            game.load.image('sky', 'assets/sky.png');
            game.load.image('ground', 'assets/platform.png');
            game.load.image('star', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/player.png', 32, 34);
            game.load.image('bullet', 'assets/laser_bullet.png');
            game.load.image('long_bullet', 'assets/superlong_bullet.png');
            game.load.image('ball', 'assets/big_red_ball.png');
            game.load.image('ball3', 'assets/medium_red_ball.png');
            game.load.image('ball2', 'assets/small_red_ball.png');
            game.load.image('ball1', 'assets/small_small_red_ball.png');
            }

            var scake = 3;
            var gravity = 600;


            function create(){
                game.physics.startSystem(Phaser.Physics.ARCADE);
                sky = game.add.sprite(0, 0, 'sky');
                sky.scale.setTo(2, 2);
                bullets = game.add.group();
                platforms = game.add.group();
                platforms.enableBody = true;

                var ground = platforms.create(0, game.world.height - 64, 'ground', 3);
                var ceil = platforms.create(0, 0, 'ground');
                ground.scale.setTo(4, 2);
                ceil.scale.setTo(4,2);

                generatePlatforms();

 
                ground.body.immovable = true;
                ceil.body.immovable = true;

                //BALAS

                bullets.enableBody = true;
                bullets.physicsBodyType = Phaser.Physics.ARCADE;

                for (var i = 0; i<20; i++){
                    var b = bullets.create(0,0, 'bullet');
                    b.name = 'bullet'+i;
                    b.exists = false;
                    b.visible = false;
                    b.checkWorldBounds = true;
                    b.events.onOutOfBounds.add(resetBullet, this);
                    b.scale.setTo(0.04, 0.04);
                }

                
                //PLAYER

                player = game.add.sprite(32, game.world.height-150, 'dude');
                game.physics.arcade.enable(player);

                player.body.bounce.y = 0.1;
                player.body.gravity.y = 300;
                player.body.collideWorldBounds = true;

                player.animations.add('moveleft', [0, 1, 2, 3], 10, true);
                player.animations.add('moveright', [13, 14, 15, 16], 10, true);

                long_bullet_instance = bullets.create(player.x, player.y, 'long_bullet');
                long_bullet_instance.exists = false;
                long_bullet_instance.visible = false;
                game.world.sendToBack(long_bullet_instance);
               
                

                //MOVIMIENTO

                cursors = game.input.keyboard.createCursorKeys();   
                
                spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                spacebar.onDown.add(fireLongBullet, this);
                game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

                //BOLAS
                
                balls = game.add.group();
                //ball = game.add.sprite(400, 200, 'ball');
                ball = balls.create(400,200, 'ball');
                game.physics.enable(balls, Phaser.Physics.ARCADE);


                //  This gets it moving
                //ball.body.velocity.setTo(200, 200);

                //  This makes the game world bounce-able
                ball.body.collideWorldBounds = true;

                //  This sets the image bounce energy for the horizontal 
                //  and vertical vectors (as an x,y point). "1" is 100% energy return
                ball.body.bounce.setTo(1, 1);
                //balls.createMultiple(250, 'bullets', 0, false);

                ball.scale.setTo(scake, scake);
                //ball.body.collideWorldBounds = true;
                player.body.collideWorldBounds = true;
                //ball.body.collide('platforms');
                ball.body.bounce.setTo(1, 1);
                ball.body.velocity.setTo(100, 100);
                ball.body.gravity.setTo(0, gravity);
                ball.size = 4;

                //Score
                scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
                
            }

            function dividirBolas(ball){
                if (ball.size > 1){
                    var newball1 = balls.create(ball.position.x-5,ball.position.y, 'ball'+(ball.size-1));
                    var newball2 = balls.create(ball.position.x+5,ball.position.y, 'ball'+(ball.size-1));
                    game.physics.enable(newball1, Phaser.Physics.ARCADE);
                    game.physics.enable(newball2, Phaser.Physics.ARCADE);
                    newball1.body.collideWorldBounds = true;
                    newball1.body.bounce.setTo(1, 1);
                    newball1.scale.setTo(scake, scake);
                    newball1.body.collideWorldBounds = true;
                    newball1.body.velocity.setTo(-100, -100);
                    newball1.body.gravity.setTo(0, gravity);
                    newball2.body.collideWorldBounds = true;
                    newball2.body.bounce.setTo(1, 1);
                    newball2.scale.setTo(scake, scake);
                    newball2.body.collideWorldBounds = true;
                    newball2.body.velocity.setTo(100, 100);
                    newball2.body.gravity.setTo(0, gravity);
                    newball1.size = ball.size -1;
                    newball2.size = ball.size -1;
                }
                score += 10;
                scoreText.text = 'Score: ' + score;
            }

            function update(){
                var hitPlatform = game.physics.arcade.collide(player, platforms);
                game.physics.arcade.collide(balls, platforms);
                game.physics.arcade.collide(bullets, platforms, killLongBullet, null, this);
                game.physics.arcade.overlap(balls, bullets, collisionBall, null, this);

                    
                player.body.velocity.x = 0;
                if(cursors.left.isDown){
                    player.body.velocity.x = -150;
                    player.animations.play('moveleft');
                    if(player.position.x == 0 ){
                        player.position.x = game.world.width;
                    }
                }
                else if(cursors.right.isDown){
                    player.body.velocity.x = 150;
                    player.animations.play('moveright');
                    if(player.position.x >= game.world.width-40){
                        player.position.x = 0;
                    }   
                }
                
                else{
                    player.animations.stop();
                    player.frame = 4;
                } 

                
            }


            function fireBullet(){
                    bullet = bullets.getFirstExists(false);
                    if(bullet){
                        bullet.reset(player.x, player.y);
                        bullet.body.velocity.y = -300;
                    }
            }
    
            function resetBullet(bullet){
                bullet.kill();
            }

            function fireLongBullet(){
                if(!firing){
                    firing = true;
                    long_bullet_instance.reset(player.x, player.y);
                    long_bullet_instance.body.velocity.y = -200;
                }
            }

            function collisionBall(ball1, bullet){
                bullet.kill();
                firing = false;
                dividirBolas(ball1);
                ball1.kill();
            }

            function killLongBullet(bullet, platform){
                if(platform.y<game.world.height-100){
                    bullet.kill();
                    firing = false;
                }
            }

            function generatePlatforms(){
                var numberOfPlatforms = Math.floor(Math.random()* 3) +1;
                var ledge;
                var positions = [];


                for(var i = 0; i<numberOfPlatforms; i++){
     
                    var position = new worldPosition();

                    if(positions.length<=0){
                        positions.push(position);
                    }
                    else{
                        var tooClose = true;
                        while(tooClose){
                            tooClose = false;
                            for(var j = 0; j<positions.length; j++){
                                var funcRet = position.checkPosition(positions[j]);
                                if(!tooClose){
                                    tooClose = funcRet;
                                }
                            }
                            console.log("a");
                        }
                        positions.push(position);
                    }

                    var scaleX = Math.random() * ((0.7 - 0.5) + 0.3).toFixed(2);

                    ledge = platforms.create(position.x, position.y, 'ground');
                    ledge.scale.setTo(scaleX, 1);
                    ledge.body.immovable = true;

                }

            }

            function worldPosition (){
                this.x = Math.floor(Math.random() *  game.world.width);
                this.y =Math.floor(Math.random() * (game.world.height - game.world.height/2)) + game.world.height/4;
                this.checkPosition = function(pos){
                    if(this.y<(pos.y+50) && this.y>(pos.y-50) && this.x<(pos.x+200) && this.x>(pos.x-200)){
                        this.x =  Math.floor(Math.random() *  game.world.width);
                        this.y = Math.floor(Math.random() * (game.world.height - game.world.height/2)) + game.world.height/4;
                       return true;
                    }
                    else{
                        return false;
                    }
                }
            }

        });

       