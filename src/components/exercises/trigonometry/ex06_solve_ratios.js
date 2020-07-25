import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkUserInputAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex06_solve_ratios extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Trigonometry";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions solving trig ratios. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(3); // user input string == 3
        
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns;
        if (chooseQuestion === 1) {
            correctAns = this.solveRatio();
        } else if (chooseQuestion === 2) {
            correctAns = this.evaluateTrig();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value, this.question_string, "trigonometry ex06")};
        
        this.writeFormula();
        this.writeExample();

    }

    solveRatio = () => {
        let x = getRandomNumber(1, 3, 0, 0);
        //let m = getRandomNumber(1, 10 ** x, 0, 1) / (10 ** x);
        let m = getRandomNumber(0, 1, x, 1); // getRand is inclusive and adds dp so 
        let n = m.toFixed(x);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            let a = getRandomNumber(1, 20, 0, 0);
            let b = a + getRandomNumber(1, 20, 0, 0);
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                a += -1;
            }
            m = a / b;
            n = "<sup>" + a + "</sup> / <sub>" + b + "</sub>";
        }
        
        let type = getRandomNumber(1, 3, 0, 0);
        let ans, trig;
        if (type === 1) {
            trig = "sin";
            ans = Math.asin(m) * 180 / Math.PI;
        } else if (type === 2) {
            trig = "cos";
            ans = Math.acos(m) * 180 / Math.PI;
        } else {
            trig = "tan";
            ans = Math.atan(m) * 180 / Math.PI;
        }
        ans = ans.toFixed(x);
        ans = ans.toString(); // converts 1.200 to 1.2
        let questionText = "Solve for " + trig + "&#x3B8 = " + n + " to " + x + " decimal places please";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        return ans;
    }

    evaluateTrig = () => {
        let theta = getRandomNumber(5, 355, 0, 0);
        let min = 0;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            min = getRandomNumber(5, 55, 0, 0);
        }

        let k = 1;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            k = getRandomNumber(2, 20, 0, 0);
        }
        let trig, ans;
        let type = getRandomNumber(1, 3, 0, 0);
        let sign = (-1) ** getRandomNumber(1, 2, 0, 0);
        if (type === 1) {
            trig = "sin";
            ans = k * Math.sin(sign * (theta + min / 60) * Math.PI / 180);
        } else if (type === 2) {
            trig = "cos";
            ans = k * Math.cos(sign * (theta + min / 60) * Math.PI / 180);
        } else {
            trig = "tan";
            ans = k * Math.tan(sign * (theta + min / 60) * Math.PI / 180);
        }
        let dp = getRandomNumber(1, 3, 0, 0);
        ans = ans.toFixed(dp);
        ans = ans.toString(); // converts 1.200 to 1.2
        let kStr = k.toString();
        let minStr = min.toString() + "'";
        if (k === 1) {
            kStr = "";
        }
        if (min === 0) {
            minStr = "";
        }
        let questionText = "What is " + kStr + trig + "(" + (sign * theta) + "<sup>O</sup>" + minStr + ") to " + dp + " decimal places please";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        return ans;
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

export default ex06_solve_ratios;