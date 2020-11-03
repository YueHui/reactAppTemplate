import './style.less';
import test from './test';

let canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;

test();

document.body.appendChild(canvas);