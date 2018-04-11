import './style.less';
import test from './test.js';

let canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;

console.info("111");

document.body.appendChild(canvas);

if (module.hot) {
	module.hot.accept('./test.js', function () {
		console.log('Accepting the updated printMe module!');
	})
}