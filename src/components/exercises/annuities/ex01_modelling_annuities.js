import React from 'react';
import {getRandomNumber, printTest, reset, answerType, shuffle, checkAns, getNames, numberWithCommas} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex01_modelling_annuities extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Annuities";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding modelling annuities. Click the Start button below to begin...";
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
            mcOptions = this.correctFormula();
        } else if (chooseQuestion === 2) {
            mcOptions = this.evaluateAnnuity();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "annuities ex01")};
        }
        this.writeFormula();
        this.writeExample();
    }

    correctFormula = () => {
        let name = getNames(1)[0];
        let p = 100 * getRandomNumber(1, 1000, 0, 0);
        let r = getRandomNumber(10, 20, 0, 0);
        let d = getRandomNumber(Math.floor(p/100), Math.floor(p/4), 2, 0).toFixed(2);
        let type = getRandomNumber(1, 4, 0, 0);
        let questionText;
        if (type === 1) {
            questionText = name + " borrows $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding monthly. " + name + " will repay the loan by making monthly repayments of $" + d + ". Which is the correct formula to determine how much is owed in the annuity?";
            this.Ans = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) - " + d;
            this.mc1 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) - " + d;
            this.mc2 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) + " + d;
            this.mc3 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) + " + d;
        } else if (type === 2) {
            questionText = name + " borrows $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding annually. " + name + " will repay the loan by making annual repayments of $" + d + ". Which is the correct formula to determine how much is owed in the annuity?";
            this.Ans = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) - " + d;
            this.mc1 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) - " + d;
            this.mc2 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) + " + d;
            this.mc3 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) + " + d;
        } else if (type === 3) {
            questionText = name + " invests $" + numberWithCommas(p) + " in an annuity with at an interest rate of " + r + "% p.a. compounding monthly. " + name + " further deposit $" + d + " into the annuity every month. Which is the correct formula to determine how much the annuity is worth?";
            this.Ans = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) + " + d;
            this.mc1 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) - " + d;
            this.mc2 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) + " + d;
            this.mc3 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) - " + d;        
        } else {
            questionText = name + " invests $" + numberWithCommas(p) + " in an annuity with at an interest rate of " + r + "% p.a. compounding annually. " + name + " further deposit $" + d + " into the annuity each year. Which is the correct formula to determine how much the annuity is worth?";
            this.Ans = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) + " + d;
            this.mc1 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) - " + d;
            this.mc2 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) + " + d;
            this.mc3 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) - " + d;
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    evaluateAnnuity = () => {
        let name = getNames(1)[0];
        let p = 100 * getRandomNumber(1, 1000, 0, 0);
        let r = getRandomNumber(10, 20, 0, 0);
        let n = getRandomNumber(3, 6, 0, 0);
        let d = parseFloat(getRandomNumber(Math.floor(p/100), Math.floor(p/n), 2, 0).toFixed(2));
        let type = getRandomNumber(1, 5, 0, 0);
        let period = 1;
        let total_n;
        
        let questionText;
        if (type === 1) {
            total_n = getRandomNumber(5, 30, 0, 0) * period;
            period = 12;
            d = p * ((r / 100 / period) * (1 + r / 100 / period) ** total_n) / ((1 + r / 100 / period) ** total_n - 1);
            questionText = name + " borrows $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding monthly. " + name + " will repay the loan by making monthly repayments of $" + numberWithCommas(d.toFixed(2)) + ". How much money is owed after " + n + " months?";
            d *= -1;
        } else if (type === 2) {
            total_n = getRandomNumber(5, 30, 0, 0) * period;
            period = 52;
            d = p * ((r / 100 / period) * (1 + r / 100 / period) ** total_n) / ((1 + r / 100 / period) ** total_n - 1);
            questionText = name + " borrows $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding weekly. " + name + " will repay the loan by making weekly repayments of $" + numberWithCommas(d.toFixed(2)) + ". How much money is owed after " + n + " weeks?";
            d *= -1;
        } else if (type === 3) {            
            d = parseInt((d - d % 100).toFixed(0));
            if (d < 100) {
                d = 100;
            }
            questionText = name + " invests $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding annually. " + name + " will continue to deposit annual repayments of $" + numberWithCommas(d) + ". What is the investment worth after " + n + " years?";            
            period = 1;
        } else if (type === 4) {
            questionText = name + " invests $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding monthly. " + name + " will continue to deposit monthly repayments of $" + numberWithCommas(d) + ". What is the investment worth after " + n + " months?";
            period = 12;
        } else {
            questionText = name + " invests $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding quarterly. " + name + " will continue to deposit quarterly repayments of $" + numberWithCommas(d) + ". What is the investment worth after " + n + " quarters?";
            period = 4;
        }
        
        let vn = p;
        for (let i = 0; i < n; i++) {
            vn = (vn * (1 + (r / 100)/period) + d);
            //console.log(vn);
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText; 
        this.Ans = "$" + numberWithCommas(vn.toFixed(2));
        this.mc1 = "$" + numberWithCommas((parseFloat(vn) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
        this.mc2 = "$" + numberWithCommas((parseFloat(vn) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
        this.mc3 = "$" + numberWithCommas((parseFloat(vn) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
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

export default ex01_modelling_annuities;