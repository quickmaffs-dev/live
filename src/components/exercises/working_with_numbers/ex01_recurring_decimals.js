import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';
import {isRecurring} from './working_with_numbers_exercises';

class ex01_recurring_decimals extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on recurring decimals. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(2); // true false == 2        
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //chooseQuestion = numQuestionTypes;
        let correctAns, result;
        if (chooseQuestion === 1) {
            result = isRecurring();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        this.question_string = result[0];
		document.getElementById("questionStringID").innerHTML = result[0];
        correctAns = result[1];
        //document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value)};
        document.querySelectorAll(".trueFalseBtn")[0].innerHTML = "Recurring";
        document.querySelectorAll(".trueFalseBtn")[1].innerHTML = "Terminating";
        document.querySelectorAll(".trueFalseBtn")[0].onclick = () => {checkAns(correctAns, document.querySelectorAll(".trueFalseBtn")[0].innerHTML, this.question_string, "working with numbers ex05")};
        document.querySelectorAll(".trueFalseBtn")[1].onclick = () => {checkAns(correctAns, document.querySelectorAll(".trueFalseBtn")[1].innerHTML, this.question_string, "working with numbers ex05")};
        this.writeFormula();
        this.writeExample();
    }

    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
        Net pay = gross pay - tax - other deductions
        `;
    }

    writeExample = () => {
        document.getElementById("exampleTextID").innerHTML = `
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

export default ex01_recurring_decimals;