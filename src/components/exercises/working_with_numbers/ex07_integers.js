import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';
import {bodmas, inequalities, integerAddition, integerDivision, integerMultiplication, temperatureChange} from './working_with_numbers_exercises';

class ex07_integers extends React.Component {
    constructor(props) {
        super(props);
        this.x = 1;
        this.Ans = 1;
        this.mc1 = this.mc2 = this.mc3 = 1;
        this.userAns = 1;
        this.numCorrect = 0;
        this.numQuestions = 0;
        this.userScore = 1;        
        this.question_string = "";
    }    

    
    componentDidMount(){
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Working with Numbers";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on integers. Click the Start button below to begin...";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 6;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns, result;  
        chooseQuestion = numQuestionTypes;      
        if (chooseQuestion === 1) {
            result = integerAddition();
        } else if (chooseQuestion === 2) {
            result = inequalities();
        } else if (chooseQuestion === 3) {
            result = integerMultiplication();
        } else if (chooseQuestion === 4) {
            result = integerDivision();
        } else if (chooseQuestion === 5) {
            result = bodmas();
        } else if (chooseQuestion === 6) {
            result = temperatureChange();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        this.question_string = result[0];
		document.getElementById("questionStringID").innerHTML = result[0];
		correctAns = result[1];
		let mcOptions = result.slice(1, result.length);        
		correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "working with numbers ex07")};
        }

        this.writeFormula();
        this.writeExample();

    }
    
    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
        n squared is n x n        
        `;
    }

    writeExample = () => {
        document.getElementById("exampleTextID").innerHTML = `
        If Mac earns a wage of $16 an hour and he works 30 hours a week, he earns a total of $16 &#215; 30 hours = $480 a week.
        `;
    }

    render() {
        return (
            <div>
                <Workspace />
            </div>
            
        );
    }
}  

export default ex07_integers;