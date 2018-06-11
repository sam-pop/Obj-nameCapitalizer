/*
Obj-nameCapitalizer:
--------------
This simple tool takes a `.txt` file that contains objects and properly capitalize names in it. 
Outputs a new converted `.txt` file.

Built to be used with my randsGenerator tool (but can be used without it with minor code tweaking).
--------------
Author: Samuel Poplovitch
*/

// Dependencies
const readline = require('readline');
const fs = require('fs');

const fileName = process.argv[2];

if (fileName) {
	const rl = readline.createInterface({
		input: fs.createReadStream(fileName)
	});

	// read line
	rl.on('line', function (line) {
		// uses 'name' as the key to the value to be changed (assuming objects containing lines of this structure: `name: 'john doe',`)
		if (line.indexOf('name') !== -1) {
			let vStart;
			if (line.indexOf("\"") !== -1)
				vStart = line.indexOf("\"");
			if (line.indexOf("'") !== -1)
				vStart = line.indexOf("'");
			//splits the line to the key and values
			let value = line.substr(vStart + 1);
			let key = line.substr(0, line.length - value.length);
			// capitalize first letters of value string
			let vConverted = capitalizeFirstLetter(value);
			// write to file
			writeOut(key + vConverted);
		} else writeOut(line);
	});
} else console.log("Please enter file name as an arg");

// splits the string and capitalize the first letter of each word
function capitalizeFirstLetter(str) {
	str = str.toLowerCase();
	var cArr = [];
	var splitStr = str.split(" ");
	for (var i = 0; i < splitStr.length; i++) {
		cArr.push(splitStr[i][0].toUpperCase() + splitStr[i].slice(1));
	}
	return cArr.join(" ");
}

// write the line to the file
function writeOut(line) {
	fs.appendFileSync("./converted_" + fileName, line + '\r\n', (error) => {
		if (error) throw error;
	});
}

if (fileName)
	console.log("Converting: " + fileName);