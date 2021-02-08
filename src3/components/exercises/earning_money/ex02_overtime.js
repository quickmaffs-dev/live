import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';
import {overtimeBasic, calculateOvertime} from './earning_money_exercises';

class ex02_overtime extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Earning Money";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on overtime. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns, result;    
        if (chooseQuestion === 1) {
            result = overtimeBasic();
        } else if (chooseQuestion === 2) {
            result = calculateOvertime();
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
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "earning money ex02")};            
        }

        this.writeFormula();
        this.writeExample();

    }
    
    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
        Time-and-a-half is 1.5 &#215; normal pay
        <br>Double-time is 2 &#215; normal pay
        `;
    }

    writeExample = () => {
        document.getElementById("exampleTextID").innerHTML = `
        If Sarah earns $15 an hour and works 30 hours at normal pay, 5 hours at time-and-a-half and 3 hours at double-time, the total amount of money she makes is 30 hours &#215; $15 + 5 &#215; $15 &#215; 1.5 + 3 &#215; $15 &#215; 2 = $652.50
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

export default ex02_overtime;