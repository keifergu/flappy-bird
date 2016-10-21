import Game from './controllers/game.js';

let canvas = document.getElementById('canvas');
let game = new Game();
game.init(canvas);
game.run();