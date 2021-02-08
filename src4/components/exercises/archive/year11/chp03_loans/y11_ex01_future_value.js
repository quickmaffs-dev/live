import React from 'react';
import '../../../../App.css';
import '../../../../styling/sidebar.css';
import '../../../../styling/workspace.css';
import Sidebar from '../yr11sidebar';
import SidebarRight from '../../../SidebarRight';
import {getRandomNumber, printTest} from '../../MathFunctions';

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
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        document.querySelectorAll(".multipleChoice")[0].style.display = "block";
        
        if (chooseQuestion === 1) {
            // add question here
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
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
        this.a = this.b = this.c = 1;
    }

    
    render() {
        return (
            <div>
                <Sidebar />
                <SidebarRight />                
                <h1>year 11</h1>
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
