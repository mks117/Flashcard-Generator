var fs = require('fs');
var inquirer = require('inquirer');
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCards.js');

var basicCards = [];
var clozeCards = [];

var questions = '';
var card = '';
var typeOfCard = '';

fs.readFile('./basicCards.JSON', 'utf8', function(err, data) {
    if(err) throw err;

    else {
    	questions = JSON.parse(data);

    	inquirer.prompt([
    		{
    			name: "type",
            	message: "Would you like to study basic or cloze cards?",
            	type: "list",
            	choices: ["basic", "cloze"]
    		}
    	]).then(function(answer) {
    		if(answer.type === 'basic') {
    			typeOfCard = 'basic';
    			askQuestions(questions, typeOfCard);
    		} else {
				typeOfCard = 'cloze';
				askQuestions(questions, typeOfCard);
			}
		});
    }
});

var i = 0;

var askQuestions = function(questions, typeOfCard){
    if(i < questions.length){
		if(typeOfCard === 'basic') {
        	inquirer.prompt([
				{
					name: "question",
					message: questions[i].question
				}
        	]).then(function(answers) {
        	    if(answers.question.toLowerCase() === questions[i].answer.toLowerCase()) {
					console.log('Correct, ' + questions[i].statement)
				} else {
					console.log('Incorrect, ' + questions[i].statement)
				}

        	    i++;

        	    askQuestions(questions, typeOfCard);
        	});
		} else if(typeOfCard === 'cloze') {
			console.log('But do you really want to do cloze? I don\'t.');
		} else console.log('you broke it!');
    }
}
