(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
game.setCanvas(new canvasClass('canvas_ppg'));
//var backgroundCanvas = new canvasClass('canvas_ppg_bkg');
//var canvasInfo = new canvasClass('canvas_info');
game.addObject(new object(null,true, new game.canvas.vector(0,game.canvas.container.height-40),game.canvas.container.width*3,30,{ethereal:false, movable:false, floor:true}));
game.addObject(new object(null,true, new game.canvas.vector(0,0),1,game.canvas.container.height,{ethereal:false, movable:false, floor:true, limitWall:true}));
game.addObject(new object(null,true, new game.canvas.vector(game.canvas.container.width,0),1,game.canvas.container.height,{ethereal:false, movable:false, floor:true, limitWall:true}));
//game.addObject(new object('C1',true, new canvas.vector(350,-150),120,20,{ethereal:false, movable:true}));
/*game.addCreature(new object('Enemy',true, new canvas.vector(290,-550),40,40,
                                                {ethereal:false, movable:true, creature:true, life:500, enemyVelocity:1}));
//game.addCreature(new object('Enemy #2',true, new canvas.vector(150,-550),30,40,{ethereal:false, movable:true, creature:true, life:500}));
*/
var fondo = new Image();
fondo.src = 'img/bckground_mbros.jpg';
fondo.onload = function() {
    game.addObject(new background({image:fondo,
                                  position:new game.canvas.vector(0,0),
                                  width:fondo.width,
                                  height: game.canvas.container.height,
                                  ethereal:true,
                                  movable:false,
                                  visible:true,
                                  background:true})
                   );
    game.addObject(new object(null,true, new game.canvas.vector(492,410),100,80,{ethereal:false, movable:false, visible:false}));
    game.addObject(new object(null,true, new game.canvas.vector(592,435),55,25,{ethereal:false, movable:false, visible:false}));
    game.addObject(new object(null,true, new game.canvas.vector(2470,0),20,game.canvas.container.height,{ethereal:false, movable:false, visible:false}));

    colwidth= 52;
    colHeight= 25;
    pointWidth = 647;
    for(var i=1; i < 8; i++) {
        game.addObject(new object(null,true, new game.canvas.vector(pointWidth,435-colHeight*i),colwidth,colHeight*i,{ethereal:false, movable:false, visible:false}));
        pointWidth+=colwidth;
    }
    game.addObject(new object(null,true, new game.canvas.vector(pointWidth,435-colHeight*7),colwidth,colHeight*i,{ethereal:false, movable:false, visible:false}));

//OBJECTIVES
    game.addObjective(new objective(null,true, new game.canvas.vector(1000,135),
                            300,425,{ethereal:true, movable:false,
                            visible:false,
                            objectives: function(){
                                  game.canvas.drawText('Bueno, pasaste a los malos, ya fue ;)', {color:"#FFFFFF", x:120, y:170, font:'bolder 20px Courier New'});
                                        }
                            }));
    game.addObjective(new objective(null,true, new game.canvas.vector(1900,135),
                            250,425,{ethereal:true, movable:false,
                            visible:false,
                            objectives: function(){
                                  game.canvas.drawText('Te dije que era una beta cheeee', {color:"#FF0000", x:20, y:70, font:'30px Courier New'});
                                        }
                            }));
    game.addObjective(new objective(null,true, new game.canvas.vector(2200,135),
                            300,425,{ethereal:true, movable:false,
                            visible:false,
                            objectives: function(){
                                  game.canvas.drawText('BETA!!! \n BETA!!! \n BETA!!!', {color:"#FF0000", x:20, y:70, font:'bolder 30px Courier New'});
                                  setTimeout(finishGame(true), 10000);
                                        }
                            }));

}
//cargar todas las iamgenes en librerias
var charSprite = new Image();
charSprite.src = 'img/char1.png';
charSprite.onload = function() {
    game.addPlayer(new player(
                        {name:'Player 1', 
                         x:100, 
                         y:310, 
                         color:'#FF0000', 
                         width:40, 
                         height:50, 
                         life:1000, 
                         sprite: {
                                left: {
                                    img: charSprite, 
                                    spritesheet: [64, 64],
                                    idle:[14, 91, 92],
                                    go:[4, 146, 149],
                                    attack:[4, 0, 6],
                                    jump:[4, 0, 6]
                                  },
                                right: {
                                    img: charSprite, 
                                    spritesheet: [64, 64],
                                    idle:[14, 65, 66],
                                    go:[4, 120, 123],
                                    attack:[4, 0, 6],
                                    jump:[4, 0, 6],
                                }
                               }
                        })
                   );    
}

var charSprite2 = new Image();
charSprite2.src = 'img/enemy1.png';
charSprite2.onload = function() {
    addEnemy(1,1);
}

var handlerKeyDown = function(e) {
            input.onKeyDown(e);
        }
var handlerKeyUp = function(e) {
            input.onKeyUp(e);
        }

function startGame(){
        document.body.addEventListener("keydown",handlerKeyDown);
        document.body.addEventListener("keyup", handlerKeyUp);   
        window.addEventListener("load", function () {
            game.render();
        });        
}

function finishGame(win){
            game.canvas.ctx.clearRect(0, 0, game.canvas.container.width, game.canvas.container.height);    
            if(win!==true){
                game.canvas.drawText('Te moriste...',{color:'#000', x:game.canvas.container.width/3});
                game.canvas.drawText('Habia muy pocas posibilidades',{color:"#FF0000",  font:'20px Arial', x:game.canvas.container.width/3, y:game.canvas.container.height/2+50});
                game.canvas.drawText('pero lo lograste, felicitaciones ;)',{color:"#FF0000",  font:'20px Arial', x:game.canvas.container.width/3, y:game.canvas.container.height/2+70});
            }else{
                game.canvas.drawText('Finish!!',{color:'#000', x:game.canvas.container.width/3});
                game.canvas.drawText('Ganaste!!!',{color:"#00FF00", x:game.canvas.container.width/3, y:game.canvas.container.height/2+50});
            }
            document.body.removeEventListener("keydown",handlerKeyDown);
            document.body.removeEventListener("keyup",handlerKeyUp); 
           // game = null;
}

  function addEnemy(x,y){
    game.addCreature(new creature(null,
                                  true, 
                                  new game.canvas.vector(x,y),
                                  30,40,
                                {ethereal:false, 
                                 movable:true, 
                                 visible:true, 
                                 creature:true, 
                                 life:200, 
                                 enemyVelocity:2.5, 
                                 sprite: {
                                    left: {
                                        img: charSprite2, 
                                        spritesheet: [64, 64],
                                        idle:[14, 91, 92],
                                        go:[4, 143, 151],
                                        attack:[4, 196, 200],
                                        jump:[4, 0, 6]
                                      },
                                    right: {
                                        img: charSprite2, 
                                        spritesheet: [64, 64],
                                        idle:[14, 65, 66],
                                        go:[4, 120, 125],
                                        attack:[4, 170, 174],
                                        jump:[4, 0, 6],
                                    }
                               }
                           }))
                       };
                       
//Start Game!!!
startGame(); //Si llega a 607 gano.


