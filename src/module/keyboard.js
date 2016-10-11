document.onkeydown = (event) => {
	keydown(event);	
}
//存放订阅事件的对象，每个事件值为订阅者的函数组成的数组
let subscribe = {};

let keydown = function(event) {
	let key = event.keyCode || event.which;
	let keychar = String.fromCharCode(key);
	if (subscribe.hasOwnProperty(keychar)) {
		subscribe[keychar].forEach((value, index) => {
			value(keychar);
		})
	}
}
let keyMap = {
	"A": 65,
	"B": 66,
	"C": 67,
	"D": 68,
	"E": 69,
	"F": 70,
	"G": 71,
	"H": 72,
	"I": 73,
	"J": 74,
	"K": 75,
	"L": 76,
	"M": 77,
	"N": 78,
	"O": 79,
	"P": 80,
	"Q": 81,
	"R": 82,
	"S": 83,
	"T": 84,
	"U": 85,
	"V": 86,
	"W": 87,
	"X": 88,
	"Y": 89,
	"Z": 90,
	"0": 48,
	"1": 49,
	"2": 50,
	"3": 51,
	"4": 52,
	"5": 53,
	"6": 54,
	"7": 55,
	"8": 56,
	"9": 57
}

export let key = {
	on: (bindKey, callback) => {
		if (typeof bindKey !== "string") {
			console.log(typeof bindKey);
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