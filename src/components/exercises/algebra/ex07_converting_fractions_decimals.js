import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkAns, shuffle, simplifyRatio, dpCheck } from '../MathFunctions';
import Workspace from '../../Workspace';

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
        reset();       
        answerType(1); // multiplechoice === 1
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let mcOptions;
        chooseQuestion = numQuestionTypes;
        if (chooseQuestion === 1) {
            mcOptions = this.convertDecimalToFraction();
        } else if (chooseQuestion === 2) {
            mcOptions = this.convertFractionToDecimal();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {                  
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "algebra ex05")};
        }
        document.getElementById(this.question_string);
        this.writeFormula();
        this.writeExample();

    }

    convertDecimalToFraction = () => {        
        let x = getRandomNumber(1, 1000, 0, 0);
        x /= 1000;
        x = dpCheck(x);
        let frac = simplifyRatio(1000 * x, 1000);

        let a = frac[0];
        let b = frac[1];
        let questionText = "Convert " + x + " to a fraction";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        this.Ans = `
            <span class="fraction">
                <span>` + a + `</span>
                <span class="fraction-line">------</span>
                <span>` + b + `</span>
            </span>
        `;
        this.mc1 = `
            <span class="fraction">
                <span>` + (a + getRandomNumber(1, a-1, 0, 1)) + `</span>
                <span class="fraction-line">------</span>
                <span>` + b + `</span>
            </span>
        `;
        this.mc2 = `
            <span class="fraction">
                <span>` + a + `</span>
                <span class="fraction-line">------</span>
                <span>` + (b + getRandomNumber(1, b-1, 0, 1)) + `</span>
            </span>
        `;
        this.mc3 = `
            <span class="fraction">
                <span>` + (a + getRandomNumber(1, a-1, 0, 1)) + `</span>
                <span class="fraction-line">------</span>
                <span>` + (b + getRandomNumber(1, b-1, 0, 1)) + `</span>
            </span>
        `;
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }
    convertFractionToDecimal = () => {
        let x = getRandomNumber(1, 1000, 0, 0);
        x /= 1000;
        x = dpCheck(x);
        let frac = simplifyRatio(1000 * x, 1000);

        let a = frac[0];
        let b = frac[1];
        let questionText = `Convert
            <span class="fraction">
                <span>` + a + `</span>
                <span class="fraction-line">------</span>
                <span>` + b + `</span>
            </span>
            to a decimal
        `;
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        this.Ans = x;
        this.mc1 = dpCheck(parseFloat(x) + getRandomNumber(0, 1, 3, 0));
        this.mc2 = dpCheck(parseFloat(x) + getRandomNumber(0, 1, 3, 0));
        this.mc3 = dpCheck(parseFloat(x) + getRandomNumber(0, 1, 3, 0));

        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
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