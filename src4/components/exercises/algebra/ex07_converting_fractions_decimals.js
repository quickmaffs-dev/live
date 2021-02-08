import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkAns, shuffle } from '../MathFunctions';
import Workspace from '../../Workspace';

import {convertDecimalToFraction, convertFractionToDecimal} from './algebra_exercises';

class ex07_converting_fractions_decimals extends React.Component {
    constructor(props) {
        super(props);
        this.x = 1;
        this.Ans = 1;
        this.mc1 = this.mc2 = this.mc3 = 1;
        this.userAns = 1;
        this.numCorrect = 0;
        this.numQuestions = 0;
        this.userScore = 1;
        this.x_line = 1;    
        this.y_line = 1;
        this.question_string = "";
    }
    
    componentDidMount(){
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Algebra";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding converting decimals to fractions. Click the Start button below to begin...";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(1); // multiplechoice === 1
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns, result;
        if (chooseQuestion === 1) {
            result = convertDecimalToFraction();
        } else if (chooseQuestion === 2) {
            result = convertFractionToDecimal();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        this.question_string = result[0];
        document.getElementById("questionStringID").innerHTML = result[0];
        let mcOptions = result.slice(1, result.length);        
        correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {                  
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "algebra ex05")};
        }
        document.getElementById(this.question_string);
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
        eg1, 4 ^ 2 = 4 x 4
        <br> 
        = 16
        <br>
        eg2, sqrt(9) = 3
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

export default ex07_converting_fractions_decimals;