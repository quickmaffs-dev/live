import React from 'react';
import '../../../../App.css';
import '../../../../styling/sidebar.css';
import '../../../../styling/workspace.css';
import Sidebar from '../yr09sidebar';
import SidebarRight from '../../../SidebarRight';
import {getRandomNumber, printTest, shuffle} from '../../MathFunctions';

class addition extends React.Component {
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
        document.querySelectorAll(".multipleChoice")[0].style.display = "block";
        let mcOptions;
        
        if (chooseQuestion === 1) {
            mcOptions = this.questionGetSquares();
        } else if (chooseQuestion === 2) {
            mcOptions = this.questionGetSquareRoots();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        shuffle(mcOptions);
        this.writeFormula();
        this.writeExample();

    }
    
    questionGetSquares = () => {
        let decimals = getRandomNumber(0, 2, 0, 0);
        printTest("decimals = " + decimals);
        this.x = getRandomNumber(1, 12, decimals, 0);
        this.Ans = Math.pow(this.x, 2).toFixed(2 * decimals); // x^2
        this.mc1 = (parseFloat(this.Ans) + getRandomNumber(1, 5, decimals, 1)).toFixed(2 * decimals);
        this.mc2 = (parseFloat(this.Ans) + getRandomNumber(1, 5, decimals, 1)).toFixed(2 * decimals);
        this.mc3 = (parseFloat(this.Ans) + getRandomNumber(1, 5, decimals, 1)).toFixed(2 * decimals);
        printTest("x = " + this.x);
        printTest("Ans = " + this.Ans);
        printTest("a = " + this.mc1);
        printTest("b = " + this.mc2);
        printTest("c = " + this.mc3);
        
        let questionText = "What is " + this.x + "<sup>2</sup> ?";        
        document.getElementById("questionStringID").innerHTML = questionText;
        
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    questionGetSquareRoots = () => {
        let decimals = getRandomNumber(0, 2, 0, 0);
        printTest("decimals = " + decimals);
        this.Ans = getRandomNumber(1, 12, decimals, 0).toFixed(decimals);
        this.x = Math.pow(this.Ans, 2).toFixed(2 * decimals); // x^2
        this.mc1 = (parseFloat(this.Ans) + getRandomNumber(1, 5, decimals, 1)).toFixed(decimals);
        this.mc2 = (parseFloat(this.Ans) + getRandomNumber(1, 5, decimals, 1)).toFixed(decimals);
        this.mc3 = (parseFloat(this.Ans) + getRandomNumber(1, 5, decimals, 1)).toFixed(decimals);
        printTest("x = " + this.x);
        printTest("Ans = " + this.Ans);
        printTest("a = " + this.mc1);
        printTest("b = " + this.mc2);
        printTest("c = " + this.mc3);
        
        let questionText = "What is square root of " + this.x + "?";
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
                <p>this is the ex01 squares</p>
                <button className="NextBtn" onClick={this.nextQuestion}>Next</button>
                <p id="sessionInfoID"></p>
                <p id="questionStringID"></p>
                <div className="multipleChoice">
                    <button className="answerBtn" onClick={this.checkAns.bind(this, 0)}>x</button>
                    <button className="answerBtn" onClick={this.checkAns.bind(this, 1)}>x</button>
                    <button className="answerBtn" onClick={this.checkAns.bind(this, 2)}>x</button>
                    <button className="answerBtn" onClick={this.checkAns.bind(this, 3)}>x</button>                    
                </div>
                <p id="resultStringID"></p>
                <div className="debugging"><p id="testID">debugging logs:</p></div>
            </div>
            
        );
    }
}  

export default addition;
