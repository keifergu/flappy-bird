import {game} from './controllers/game.js';

let canvas = document.getElementById('canvas');
game.init(canvas);
game.run();