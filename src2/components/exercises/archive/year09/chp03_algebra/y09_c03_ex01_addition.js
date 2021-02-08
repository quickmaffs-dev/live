import React from 'react';
import '../../../../App.css';
import '../../../../styling/sidebar.css';
import '../../../../styling/workspace.css';
import Sidebar from '../yr09sidebar';
import SidebarRight from '../../../SidebarRight';
import {getRandomNumber, printTest, shuffle, getPronumeral} from '../../MathFunctions';

class y09_c03_ex01_addition extends React.Component {
    constructor(props) {
        super(props);
        this.x = 1;
        this.Ans = 1;
        this.mc1 = this.mc2 = this.mc3 = 1;
        this.userAns = 1;
        this.numCorrect = 0;
        this.numQuestions = 0;
        this.userScore = 1;
        this.state = {testState: 1};        
    }    

    makeQuestion = () => {
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //chooseQuestion = 2; // test
        document.querySelectorAll(".questionBody")[0].style.display = "block";
        let mcOptions;
        
        if (chooseQuestion === 1) {
            mcOptions = this.questionAlgebraAddition();
        } else if (chooseQuestion === 2) {
            mcOptions = this.questionAlgebraMultiplication();            
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        shuffle(mcOptions);        
        this.writeFormula();
        this.writeExample();

    }
    
    questionAlgebraAddition = () => {
        this.Ans = this.mc1 = this.mc2 = this.mc3 = 1;
        let pronum = getPronumeral();
        let questionText = "x";
        
        let numPronum = getRandomNumber(1, 3, 0, 0);
        //numPronum = 3; // test
        let terms = Array(2 * numPronum);        
        for (let i = 0; i < terms.length; i++) {
            terms[i] = getRandomNumber(1, 20, 0, 1);
        }        
        
        if (terms.length === 2) {
            // px = ax+bx            
            let p = terms[0] + terms[1];
            this.Ans = p + pronum;
            this.mc1 = p + getRandomNumber(1, 5, 0, 1) + pronum;
            this.mc2 = p + getRandomNumber(1, 5, 0, 1) + pronum;
            this.mc3 = p + getRandomNumber(1, 5, 0, 1) + pronum;

            questionText = "What is " + terms[0] + pronum;
            for (let i = 1; i < terms.length; i++) {
                questionText += " + " + terms[i] + pronum;
            }
        } else if (terms.length === 4) {
            let pronumType = getRandomNumber(1, 2, 0, 0);
            let pronum2 = "y";
            if (pronumType === 1) {
                // px + qy = ax + by + cx + dy
                pronum2 = getPronumeral();
                while (pronum2 === pronum) {
                    pronum2 = getPronumeral();
                }                
            } else {
                // px2 + qx = ax2 + bx + cx2 + dx
                pronum2 = pronum + "<sup> 2</sup>";
            }
            let n1 = terms[0] + terms[2];
            let n2 = terms[1] + terms[3];
            this.Ans = n1 + pronum + " + " + n2 + pronum2;
            this.mc1 = (n1 + getRandomNumber(1, 5, 0, 1)) + pronum + " + " + (n2 + getRandomNumber(1, 5, 0, 1)) + pronum2;
            this.mc2 = (n1 + getRandomNumber(1, 5, 0, 1)) + pronum + " + " + (n2 + getRandomNumber(1, 5, 0, 1)) + pronum2;
            this.mc3 = (n1 + getRandomNumber(1, 5, 0, 1)) + pronum + " + " + (n2 + getRandomNumber(1, 5, 0, 1)) + pronum2;

            questionText = "What is " + terms[0] + pronum;
            let p = pronum;
            for (let i = 1; i < terms.length; i++) {
                if (i % 2 === 0) {
                    p = pronum;
                } else {
                    p = pronum2;
                }
                questionText += " + " + terms[i] + p;
            }
        } else {
            // ax + by + cz + dx + ey + fz
            let pronum2 = getPronumeral();
            while (pronum2 === pronum) {
                pronum2 = getPronumeral();
            }
            let pronum3 = getPronumeral();
            while (pronum3 === pronum || pronum3 === pronum2) {
                pronum3 = getPronumeral();
            }
            let n1 = terms[0] + terms[3];
            let n2 = terms[1] + terms[4];
            let n3 = terms[2] + terms[5];
            this.Ans = n1 + pronum + " + " + n2 + pronum2 + " + " + n3 + pronum3;
            this.mc1 = (n1 + getRandomNumber(1, 5, 0, 1)) + pronum + " + " + (n2 + getRandomNumber(1, 5, 0, 1)) + pronum2 + " + " + (n3 + getRandomNumber(1, 5, 0, 1)) + pronum3;
            this.mc2 = (n1 + getRandomNumber(1, 5, 0, 1)) + pronum + " + " + (n2 + getRandomNumber(1, 5, 0, 1)) + pronum2 + " + " + (n3 + getRandomNumber(1, 5, 0, 1)) + pronum3;;
            this.mc3 = (n1 + getRandomNumber(1, 5, 0, 1)) + pronum + " + " + (n2 + getRandomNumber(1, 5, 0, 1)) + pronum2 + " + " + (n3 + getRandomNumber(1, 5, 0, 1)) + pronum3;;
            questionText = "What is " + terms[0] + pronum;
            let p = pronum;
            for (let i = 1; i < terms.length; i++) {
                if (i % 3 === 0) {
                    p = pronum;
                } else if (i % 3 === 1) {
                    p = pronum2;
                } else {
                    p = pronum3;
                }
                questionText += " + " + terms[i] + p;
            }
        }

        printTest("pronum = " + pronum);
        printTest("Ans = " + this.Ans);
        printTest("mc1 = " + this.mc1);
        printTest("mc2 = " + this.mc2);
        printTest("mc3 = " + this.mc3);
        
        
        //questionText = "What is " + a + " + " + b;
        document.getElementById("questionStringID").innerHTML = questionText;
        
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    questionAlgebraMultiplication = () => {
        this.Ans = this.mc1 = this.mc2 = this.mc3 = 1;
        // cx^2 = ax * bx
        let a = getRandomNumber(1, 12, 0, 1);
        let b = getRandomNumber(1, 12, 0, 1);
        let pronum = getPronumeral();
        let c = a * b;

        let questionText = "What is " + a + pronum + " &#215 " + b + pronum + "?";

        this.Ans = c + pronum + "<sup>2</sup>";
        this.mc1 = (c + getRandomNumber(1, 5, 0, 1)) + pronum + "<sup>2</sup>";
        this.mc2 = (c + getRandomNumber(1, 5, 0, 1)) + pronum + "<sup>2</sup>";
        this.mc3 = (c + getRandomNumber(1, 5, 0, 1)) + pronum + "<sup>2</sup>";
        printTest("pronum = " + pronum);
        printTest("Ans = " + this.Ans);
        printTest("mc1 = " + this.mc1);
        printTest("mc2 = " + this.mc2);
        printTest("mc3 = " + this.mc3);
        
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

    nextQuestion = () => {                
        this.reset();
        this.makeQuestion();
        
        document.getElementById("sessionInfoID").innerHTML = "Question        : " + this.numQuestions;
        document.getElementById("sessionInfoID").innerHTML += "<br>Correct Answers : " + this.numCorrect;
        this.userScore = this.numCorrect * 100;
        document.getElementById("sessionInfoID").innerHTML += "<br>User score      : " + this.userScore;
    }

    checkAns = (userSelection) => {  
        // disable the selection of buttons
        
        let userAns = document.querySelectorAll(".answerBtn")[userSelection].innerHTML;
        let correctAns = this.Ans.toString();
        let resultMsg = "";
        if (userAns === correctAns) {
            resultMsg = userAns + " THAT IS CORRECT";
            this.result(resultMsg, "Correct");
        } else {
            resultMsg = "UNLUGGY, " + userAns + " is incorrect<br>The correct answer is " + this.Ans;
            this.result(resultMsg, "Incorrect");
        }

        printTest("the user inputted userSelection [" + userSelection + "] = " + document.querySelectorAll(".answerBtn")[userSelection].innerHTML);
    }

    result = (output, result) => {
        document.getElementById("resultStringID").innerHTML = output;        
        if (result === "Correct") {
            // increment scores
            this.numCorrect += 1;
        } else {
            // decrement lives            
        }
    }


    reset = () => {
        document.getElementById("questionStringID").innerHTML = "";
        document.getElementById("resultStringID").innerHTML = "";
        //document.getElementById("sessionInfoID").innerHTML = "";
        this.x = this.y = 1;
        this.Ans = 1;
        this.mc1 = this.mc2 = this.mc3 = 1;
    }

    
    render() {
        return (
            <div>
                <Sidebar />
                <SidebarRight />                
                <h1>year 9</h1>
                <p>this is the ex01 addition</p>
                <button className="NextBtn" onClick={this.nextQuestion}>Next</button>
                <p id="sessionInfoID"></p>
                <div className="questionBody">
                    <p id="questionStringID"></p>
                    <div className="multipleChoice">
                        <button className="answerBtn" onClick={this.checkAns.bind(this, 0)}>x</button>
                        <button className="answerBtn" onClick={this.checkAns.bind(this, 1)}>x</button>
                        <button className="answerBtn" onClick={this.checkAns.bind(this, 2)}>x</button>
                        <button className="answerBtn" onClick={this.checkAns.bind(this, 3)}>x</button>                    
                    </div>
                    <p id="resultStringID"></p>
                </div>
                <div className="debugging"><p id="testID">debugging logs:</p></div>
                
            </div>
            
        );
    }
}  

export default y09_c03_ex01_addition;
