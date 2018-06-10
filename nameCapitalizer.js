/*
Obj-nameCapitalizer:
--------------
This simple tool takes an objects containing `.txt` file (as an arg) and converts the `name` keys to be properly capitalized.
Outputs a new converted .txt file.

Built to be used with my randsGenerator tool (but can be used without it with minor code tweaking).
--------------
Author: Samuel Poplovitch
*/

const readline = require('readline');
const fs = require('fs');
const fileName = process.argv[2];

if (fileName) {
	const rl = readline.createInterface({
		input: fs.createReadStream(fileName)
	});

	rl.on('line', function (line) {
		// uses 'name' as the key to the value to be changed (assuming objects containing lines of this structure: `name: 'john doe',`)
		if (line.indexOf('name') !== -1) {
			let vStart = line.indexOf("'");
			//splits the line to the key and values
			let value = line.substr(vStart + 1);
			let key = line.substr(0, line.length - value.length);
			let vConverted = capitalizeFirstLetter(value);
			writeOut(key + vConverted);
		} else writeOut(line);
	});
} else console.log("Please enter file name as an arg");

function capitalizeFirstLetter(str) {
	var cArr = [];
	var splitStr = str.split(" ");
	for (var i = 0; i < splitStr.length; i++) {
		cArr.push(splitStr[i][0].toUpperCase() + splitStr[i].slice(1));
	}
	return cArr.join(" ");
}

function writeOut(line) {
	fs.appendFileSync("./converted_" + fileName, line + '\r\n', (error) => {
		if (error) throw error;
	});
}

if (fileName)
	console.log("Converting: " + fileName);