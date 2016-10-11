document.onkeydown = (event) => {
	keydown(event);	
}
//存放订阅事件的对象，每个事件值为订阅者的函数组成的数组
let subscribe = {};

let keydown = function(event) {
	let key = event.keyCode || event.which;
	let keychar = keyMap[key];
	if (subscribe.hasOwnProperty(keychar)) {
		subscribe[keychar].forEach((value, index) => {
			value(keychar);
		})
	}
}
let keyMap = {
	"65": "A",
	"66": "B",
	"67": "C",
	"68": "D",
	"69": "E",
	"70": "F",
	"71": "G",
	"72": "H",
	"73": "I",
	"74": "J",
	"75": "K",
	"76": "L",
	"77": "M",
	"78": "N",
	"79": "O",
	"80": "P",
	"81": "Q",
	"82": "R",
	"83": "S",
	"84": "T",
	"85": "U",
	"86": "V",
	"87": "W",
	"88": "X",
	"89": "Y",
	"90": "Z",
	"48": "0",
	"49": "1",
	"50": "2",
	"51": "3",
	"52": "4",
	"53": "5",
	"54": "6",
	"55": "7",
	"56": "8",
	"57": "9",
  "96": "0",
  "97": "1",
  "98": "2",
  "99": "3",
	"100": "4",
	"101": "5",
	"102": "6",
	"103": "7",
	"104": "8",
	"105": "9",
	"106": "*",
	"107": "+",
	"109": "-",
	"110": ".",
	"111": "/",
	"39":"RIGHT",
	"37":"LEFT",
	"40":"DOWN",
	"38":"UP",
	"32":"SPACE",
	"13":"ENTER",
}

export let key = {
	on: (bindKey, callback) => {
		if (typeof bindKey !== "string") {
			throw "please input a string";
		}
		bindKey = bindKey.toUpperCase();
		if (subscribe.hasOwnProperty(bindKey)) {
	  	//当订阅数组中存在这个事件时，向其值中添加订阅函数
			subscribe[bindKey].push(callback);
		} else {
			subscribe[bindKey] = [callback];
		}
	}
};