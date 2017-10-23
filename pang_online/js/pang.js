$(document).ready(function(){
            var game = new Phaser.Game(600, 600, Phaser.AUTO, 'prueba', { preload: preload, create: create, update: update });
            var platforms;
            var player;
            var bulletTime = 0;
            function preload(){
            game.load.image('sky', 'assets/sky.png');
            game.load.image('ground', 'assets/platform.png');
            game.load.image('star', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            game.load.image('bullet', 'assets/laser_bullet.png');
            game.load.image('long_bullet', 'assets/long_bullet.png');
            }

            function create(){
                game.physics.startSystem(Phaser.Physics.ARCADE);
                sky = game.add.sprite(0, 0, 'sky');
                sky.scale.setTo(2, 2);
                platforms = game.add.group();
                platforms.enableBody = true;

                var ground = platforms.create(0, game.world.height - 64, 'ground');
                ground.scale.setTo(4, 2);

                ground.body.immovable = true;

                //BALAS

                bullets = game.add.group();
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

                long_bullet = game.add.group();


                
                //PLAYER

                player = game.add.sprite(32, game.world.height-150, 'dude');
                game.physics.arcade.enable(player);

                player.body.bounce.y = 0.1;
                player.body.gravity.y = 300;
                player.body.collideWorldBounds = true;

                player.animations.add('left', [0, 1, 2, 3], 10, true);
                player.animations.add('right', [5, 6,7, 8], 10, true);

                long_bullet_instance = long_bullet.create(player.x, player.y, 'long_bullet', 1);
                long_bullet_instance.exists = false;
                long_bullet_instance.visible = false;

                //MOVIMIENTO

                cursors = game.input.keyboard.createCursorKeys();   
                
                
                spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                spacebar.onDown.add(fireLongBullet, this);
                game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);           
                
            }

            function update(){
                var hitPlatform = game.physics.arcade.collide(player, platforms);


                player.body.velocity.x = 0;
                if(cursors.left.isDown){
                    player.body.velocity.x = -150;
                    player.animations.play('left');
                    if(player.position.x == 0 ){
                        player.position.x = game.world.width;
                    }
                }
                else if(cursors.right.isDown){
                    player.body.velocity.x = 150;
                    player.animations.play('right');
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

        });

       