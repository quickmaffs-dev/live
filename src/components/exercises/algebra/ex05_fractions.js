import React from 'react';
import {getRandomNumber, printTest, reset, answerType, shuffle, checkAns, simplifyRatio} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex05_fractions extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding fractions. Click the Start button below to begin...";
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
        if (chooseQuestion === 1) {
            mcOptions = this.fractions();
        } else if (chooseQuestion === 2) {
            mcOptions = this.mixedFractions();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {                  
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "algebra ex05")};
        }
        this.writeFormula();
        this.writeExample();
    }

    fractions = () => {
        let questionText = "Simplify  ";
        let num1 = getRandomNumber(1, 12, 0, 0);
        let den1 = getRandomNumber(1, 12, 0, 0);
        let num2 = getRandomNumber(1, 12, 0, 0);
        let den2 = getRandomNumber(1, 12, 0, 0);
        questionText += `
        <span class="fraction">
            <span>` + num1 + `</span>
            <span class="fraction-line">------</span>
            <span>` + den1 + `</span>
        </span>
        `;
        let a, b, operation = getRandomNumber(1, 4, 0, 0);
        if (operation === 1) {
            questionText += `
            <span class="fraction"><span> </span><span class="fraction-line">&#247;</span><span> </span></span>
            <span class="fraction">
                <span>` + num2 + `</span>
                <span class="fraction-line">------</span>
                <span>` + den2 + `</span>
            </span>
            `;
            a = num1 * den2;
            b = den1 * num2;
        } else if (operation === 2) {
            questionText += `
            <span class="fraction"><span> </span><span class="fraction-line">&#215;</span><span> </span></span>
            <span class="fraction">
                <span>` + num2 + `</span>
                <span class="fraction-line">------</span>
                <span>` + den2 + `</span>
            </span>
            `;
            a = num1 * num2;
            b = den1 * den2;
        } else if (operation === 3) {
            questionText += `
            <span class="fraction"><span> </span><span class="fraction-line">+</span><span> </span></span>
            <span class="fraction">
                <span>` + num2 + `</span>
                <span class="fraction-line">------</span>
                <span>` + den2 + `</span>
            </span>
            `;
            a = num1 * den2 + den1 * num2;
            b = den1 * den2;
        } else {
            questionText += `
            <span class="fraction"><span> </span><span class="fraction-line">-</span><span> </span></span>
            <span class="fraction">
                <span>` + num2 + `</span>
                <span class="fraction-line">------</span>
                <span>` + den2 + `</span>
            </span>
            `;
            a = num1 * den2 - den1 * num2;
            b = den1 * den2;
        }
        let ans
        if (a < 1) {
            ans = simplifyRatio(-a, b);
            a = -ans[0];
        } else {
            ans = simplifyRatio(a, b);
            a = ans[0];
        }
        b = ans[1];
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

    mixedFractions = () => {
        let questionText = "Simplify  ";
        let c1 = getRandomNumber(1, 12, 0, 0);
        let num1 = getRandomNumber(1, 12, 0, 0);
        let den1 = num1 + getRandomNumber(1, 12, 0, 0);
        let c2 = getRandomNumber(1, 12, 0, 0);
        let num2 = getRandomNumber(1, 12, 0, 0);
        let den2 = num2 + getRandomNumber(1, 12, 0, 0);
        questionText += ` 
        <span class="fraction"><span> </span><span class="fraction-line">` + c1 + `</span><span> </span></span>       
        <span class="fraction">
            <span>` + num1 + `</span>
            <span class="fraction-line">------</span>
            <span>` + den1 + `</span>
        </span>
        `;
        let a, b, operation = getRandomNumber(1, 4, 0, 0);
        if (operation === 1) {
            questionText += `
            <span class="fraction"><span> </span><span class="fraction-line">&#247;</span><span> </span></span>
            <span class="fraction"><span> </span><span class="fraction-line">` + c2 + `</span><span> </span></span>
            <span class="fraction">
                <span>` + num2 + `</span>
                <span class="fraction-line">------</span>
                <span>` + den2 + `</span>
            </span>
            `;
            num1 = c1 * den1 + num1;
            num2 = c2 * den2 + num2;
            a = num1 * den2;
            b = den1 * num2;
        } else if (operation === 2) {
            questionText += `
            <span class="fraction"><span> </span><span class="fraction-line">&#215;</span><span> </span></span>
            <span class="fraction"><span> </span><span class="fraction-line">` + c2 + `</span><span> </span></span>
            <span class="fraction">
                <span>` + num2 + `</span>
                <span class="fraction-line">------</span>
                <span>` + den2 + `</span>
            </span>
            `;
            num1 = c1 * den1 + num1;
            num2 = c2 * den2 + num2;
            a = num1 * num2;
            b = den1 * den2;
        } else if (operation === 3) {
            questionText += `
            <span class="fraction"><span> </span><span class="fraction-line">+</span><span> </span></span>
            <span class="fraction"><span> </span><span class="fraction-line">` + c2 + `</span><span> </span></span>
            <span class="fraction">
                <span>` + num2 + `</span>
                <span class="fraction-line">------</span>
                <span>` + den2 + `</span>
            </span>
            `;
            num1 = c1 * den1 + num1;
            num2 = c2 * den2 + num2;
            a = num1 * den2 + den1 * num2;
            b = den1 * den2;
        } else {
            questionText += `
            <span class="fraction"><span> </span><span class="fraction-line">-</span><span> </span></span>
            <span class="fraction"><span> </span><span class="fraction-line">` + c2 + `</span><span> </span></span>
            <span class="fraction">
                <span>` + num2 + `</span>
                <span class="fraction-line">------</span>
                <span>` + den2 + `</span>
            </span>
            `;
            num1 = c1 * den1 + num1;
            num2 = c2 * den2 + num2;
            a = num1 * den2 - den1 * num2;
            b = den1 * den2;
        }
        let ans
        if (a < 1) {
            ans = simplifyRatio(-a, b);
            a = -ans[0];
        } else {
            ans = simplifyRatio(a, b);
            a = ans[0];
        }
        b = ans[1];
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        let c = "";
        if (a > b) {
            c = Math.floor(a / b);
            a = a % b;
        }
        this.Ans = `
            <span class="fraction"><span> </span><span class="fraction-line">` + c + `</span><span> </span></span>
            <span class="fraction">
                <span>` + a + `</span>
                <span class="fraction-line">------</span>
                <span>` + b + `</span>
            </span>
        `;
        this.mc1 = `
            <span class="fraction"><span> </span><span class="fraction-line">` + c + `</span><span> </span></span>
            <span class="fraction">
                <span>` + (a + getRandomNumber(1, a-1, 0, 1)) + `</span>
                <span class="fraction-line">------</span>
                <span>` + b + `</span>
            </span>
        `;
        this.mc2 = `
            <span class="fraction"><span> </span><span class="fraction-line">` + c + `</span><span> </span></span>
            <span class="fraction">
                <span>` + a + `</span>
                <span class="fraction-line">------</span>
                <span>` + (b + getRandomNumber(1, b-1, 0, 1)) + `</span>
            </span>
        `;
        this.mc3 = `
            <span class="fraction"><span> </span><span class="fraction-line">` + c + `</span><span> </span></span>
            <span class="fraction">
                <span>` + (a + getRandomNumber(1, a-1, 0, 1)) + `</span>
                <span class="fraction-line">------</span>
                <span>` + (b + getRandomNumber(1, b-1, 0, 1)) + `</span>
            </span>
        `;
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

export default ex05_fractions;