$(document).ready(function(){
            var game = new Phaser.Game(600, 600, Phaser.AUTO, 'prueba', { preload: preload, create: create, update: update });
            var platforms;
            var player;
            var bulletTime = 0;
            function preload(){
            game.load.image('sky', 'assets/sky.png');
            game.load.image('ground', 'assets/platform.png');
            game.load.image('star', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/player.png', 32, 34);
            game.load.image('bullet', 'assets/laser_bullet.png');
            game.load.image('long_bullet', 'assets/long_bullet.png');
            game.load.image('ball', 'assets/big_red_ball.png');
            game.load.image('western', 'assets/western.png');
            game.load.image('starvader', 'assets/starvader.png');
            game.load.image('cinema', 'assets/cinema.jpg');
            }

            var scake = 1;
            var gravity = 600;

            function create(){
                game.physics.startSystem(Phaser.Physics.ARCADE);
                sky = game.add.sprite(0, 0, 'western');
                sky.scale.setTo(0.5, 0.5);
                bullets = game.add.group();
                platforms = game.add.group();
                platforms.enableBody = true;

                var ground = platforms.create(0, game.world.height - 64, 'ground', 3);
                ground.scale.setTo(4, 2);

                ground.body.immovable = true;

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
                spacebar.onDown.add(fireBullet, this);
                game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

                //BOLAS
                
                balls = game.add.group();
                ball = game.add.sprite(400, 200, 'ball');

                game.physics.enable(ball, Phaser.Physics.ARCADE);


                //  This gets it moving
                //ball.body.velocity.setTo(200, 200);

                //  This makes the game world bounce-able
                ball.body.collideWorldBounds = true;

                //  This sets the image bounce energy for the horizontal 
                //  and vertical vectors (as an x,y point). "1" is 100% energy return
                ball.body.bounce.setTo(1, 1);
                //balls.createMultiple(250, 'bullets', 0, false);

                ball.scale.setTo(scake, scake);
                ball.body.collideWorldBounds = true;
                player.body.collideWorldBounds = true;
                //ball.body.collide('platforms');
                ball.body.bounce.setTo(1, 1);
                ball.body.velocity.setTo(100, 100);
                ball.body.gravity.setTo(0, gravity);
                
            }

            function update(){
                var hitPlatform = game.physics.arcade.collide(player, platforms);
                game.physics.arcade.collide(ball, platforms);
                game.physics.arcade.overlap(ball, bullets, collisionBall);

                    
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

            function collectStar(player, star){
                star.kill();
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
                long_bullet_instance.reset(player.x, player.y);
                long_bullet_instance.body.velocity.y = -200;
            }

            function collisionBall(){
                ball.kill();
            }

        });

       