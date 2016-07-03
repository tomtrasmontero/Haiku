//This is a module

var fs = require('fs');
// console.log(fs);
// console.log(fs.readFileSync('./cmudict.txt'));
var wordArr = [];

//Takes varied forms of Haiku in a single array.  Ex [2,2,1,7,2,2,1] = 3 words 1 word 3 word haiku in a 5,7,5 form
function createHaiku(structure,form){
	var haiku = [], counter = 0;
	var haikuForm = form;
	

	for( var i = 0; i < structure.length; i++){
		//find the array with the corresponding syllabels an randomly choose a word in the array length
		var newWord = wordArr[structure[i]][Math.floor(Math.random() * wordArr[structure[i]].length)];
		counter += structure[i];

		if(counter === haikuForm[0]){
			haiku.push(newWord, "\n");
			haikuForm.shift();
			counter = 0;
		}else{
			haiku.push(newWord, " ");
		}
	}
	console.log(haiku.join(""));
}


module.exports = {
	createHaiku: createHaiku,
};




// Open and parse CMU Dictionary
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
	return fs.readFileSync(file).toString();
}

function formatData(data){
	var lines = data.toString().split("\n"),
		lineSplit

	lines.forEach(function(line){
		lineSplit = line.split("  ");
		var wordCount = lineSplit[1].replace(/[^0-9]/g,"").length;
		// take out everything that is not a word or '
		var word = lineSplit[0].replace(/[^a-zA-Z]/g,"")

		if(wordArr[wordCount] === undefined){
			wordArr[wordCount] = [];
			wordArr[wordCount].push(word)
		}else{
			wordArr[wordCount].push(word)
		}

		// console.log(WordObj[wordCount]);
		// console.log("the word " + lineSplit[0] + " has this phoneme layout: " + lineSplit[1].replace(/[^0-9]/g,"").length);

	});	
}

formatData(cmudictFile);
