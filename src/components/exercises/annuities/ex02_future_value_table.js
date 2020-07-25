import React from 'react';
import {getRandomNumber, printTest, reset, answerType, shuffle, checkAns, numberWithCommas} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex02_future_value_table extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding future value tables. Click the Start button below to begin...";
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
            mcOptions = this.futureValueTable();
        } else if (chooseQuestion === 2) {
            mcOptions = this.presentValueTable();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "annuities ex02")};
        }
        this.writeFormula();
        this.writeExample();
    }

    futureValueTable = () => {
        let xItems = 6; // change to percent
        let yItems = 6; // change to n terms
        let fvt = [];
        let row;
        let vn = 0;
        for (let j = 0; j < yItems; j++) {
            row = new Array(xItems);
            for (let i = 0; i < xItems; i++) {
                if (j > 0) {
                    vn = fvt[j-1][i];
                }
                row[i] = vn * (1 + (i+1) / 100) + 1;
            }
            fvt.push(row);
        }
        console.log(fvt);
        let questionText = "<table><tr><td>Period</td>";
        for (let i = 0; i < xItems; i++) {
            questionText += "<td>" + (i + 1) + "%</td>";
        }
        questionText += "</tr>";
        for (let j = 0; j < yItems; j++) {
            questionText += "<tr><td>" + (j + 1) + "</td>"
            row = new Array(xItems);
            for (let i = 0; i < xItems; i++) {
                questionText += "<td>" + fvt[j][i].toFixed(4) + "</td>";
            }
            questionText += "</tr>"
        }
        questionText += "</table>";
        let p = 100 * getRandomNumber(10, 1000, 0, 0);
        let ans;
        let r = getRandomNumber(1, xItems, 0, 0);
        let n = getRandomNumber(2, yItems, 0, 0);
        let type = getRandomNumber(1, 3, 0, 0);
        if (type === 1) {
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                questionText += "<br>Using the table, calculate the future value of an annuity for investing $" + numberWithCommas(p) + " at " + r + "% p.a. for " + n + " years compounded annually";
            } else {
                r = getRandomNumber(1, xItems / 2, 0, 0);
                n = 2 * getRandomNumber(2, yItems/2, 0, 0);
                questionText += "<br>Using the table, calculate the future value of an annuity for investing $" + numberWithCommas(p) + " at " + (2 * r) + "% p.a. for " + (n / 2) + " years compounded six-monthly";
            }
            ans = p * parseFloat(fvt[n-1][r-1].toFixed(4));        
            this.Ans = "$" + numberWithCommas(ans.toFixed(2));
            this.mc1 = "$" + numberWithCommas((parseFloat(ans) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
            this.mc2 = "$" + numberWithCommas((parseFloat(ans) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
            this.mc3 = "$" + numberWithCommas((parseFloat(ans) + getRandomNumber(1, 100, 2, 1)).toFixed(2));            
        } else if (type === 2) {
            let a = numberWithCommas((p * parseFloat(fvt[n-1][r-1].toFixed(4))).toFixed(2));
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                questionText += "<br>Using the table, find the payment amount of an annuity whose future value is $" + numberWithCommas(a) + " at " + r + "% p.a. for " + n + " years compounded annually";
            } else {
                r = getRandomNumber(1, xItems / 2, 0, 0);
                n = 2 * getRandomNumber(2, yItems/2, 0, 0);
                a = numberWithCommas((p * parseFloat(fvt[n-1][r-1].toFixed(4))).toFixed(2));
                questionText += "<br>Using the table, find the payment amount of an annuity whose future value is $" + numberWithCommas(a) + " at " + (2 * r) + "% p.a. for " + (n / 2) + " years compounded six-monthly";
            }
            ans = p;
            this.Ans = "$" + numberWithCommas(ans);
            this.mc1 = "$" + numberWithCommas(parseFloat(ans) + 100 * getRandomNumber(1, 10, 0, 1));
            this.mc2 = "$" + numberWithCommas(parseFloat(ans) + 100 * getRandomNumber(1, 10, 0, 1));
            this.mc3 = "$" + numberWithCommas(parseFloat(ans) + 100 * getRandomNumber(1, 10, 0, 1));
        } else {
            let a = numberWithCommas((p * parseFloat(fvt[n-1][r-1].toFixed(4))).toFixed(2));
            questionText += "<br>Using the table, find the interest rate of an annuity whose future value is $" + numberWithCommas(a) + " when $" + numberWithCommas(p) + " is invested at the end of each year for " + n + " years";
            ans = r;
            this.Ans = r + "%";
            this.mc1 = (r + getRandomNumber(1, 3, 0, 1)) + "%";
            this.mc2 = (r + getRandomNumber(1, 3, 0, 1)) + "%";
            this.mc3 = (r + getRandomNumber(1, 3, 0, 1)) + "%";
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    presentValueTable = () => {
        let xItems = 6; // change to percent
        let yItems = 6; // change to n terms
        let fvt = [];
        let row;
        for (let j = 0; j < yItems; j++) {
            row = new Array(xItems);            
            for (let i = 0; i < xItems; i++) {
                if (j === 0) {
                    row[i] = 1 / (1 + (i+1) / 100);
                } else {
                    row[i] = (1 + fvt[j-1][i]) / (1 + (i+1) / 100);
                }
            }
            fvt.push(row);
        }
        console.log(fvt);
        let questionText = "<table><tr><td>Period</td>";
        for (let i = 0; i < xItems; i++) {
            questionText += "<td>" + (i + 1) + "%</td>";
        }
        questionText += "</tr>";
        for (let j = 0; j < yItems; j++) {
            questionText += "<tr><td>" + (j + 1) + "</td>"
            row = new Array(xItems);
            for (let i = 0; i < xItems; i++) {
                questionText += "<td>" + fvt[j][i].toFixed(4) + "</td>";
            }
            questionText += "</tr>"
        }
        questionText += "</table>";
        let p = 100 * getRandomNumber(10, 1000, 0, 0);
        let ans;
        let r = getRandomNumber(1, xItems, 0, 0);
        let n = getRandomNumber(2, yItems, 0, 0);
        let type = getRandomNumber(1, 3, 0, 0);
        type = 1;
        if (type === 1) {
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                questionText += "<br>Using the table, calculate the present value of an annuity for investing $" + numberWithCommas(p) + " at " + r + "% p.a. for " + n + " years compounded annually";
            } else {
                r = getRandomNumber(1, xItems / 2, 0, 0);
                n = 2 * getRandomNumber(2, yItems/2, 0, 0);
                questionText += "<br>Using the table, calculate the present value of an annuity for investing $" + numberWithCommas(p) + " at " + (2 * r) + "% p.a. for " + (n / 2) + " years compounded six-monthly";
            }
            ans = p * parseFloat(fvt[n-1][r-1].toFixed(4));        
            this.Ans = "$" + numberWithCommas(ans.toFixed(2));
            this.mc1 = "$" + numberWithCommas((parseFloat(ans) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
            this.mc2 = "$" + numberWithCommas((parseFloat(ans) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
            this.mc3 = "$" + numberWithCommas((parseFloat(ans) + getRandomNumber(1, 100, 2, 1)).toFixed(2));            
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
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

export default ex02_future_value_table;