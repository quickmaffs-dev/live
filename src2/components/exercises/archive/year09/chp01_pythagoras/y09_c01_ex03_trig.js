import React from 'react';
import '../../../../App.css';
import '../../../../styling/sidebar.css';
import '../../../../styling/workspace.css';
import Sidebar from '../yr09sidebar';
import SidebarRight from '../../../SidebarRight';
import {getRandomNumber, printTest, shuffle} from '../../MathFunctions';
import trigDiagram from  '../../../../img/trigDiagram.png';

class addition extends React.Component {
    constructor(props) {
        super(props);
        this.x = this.y = 1;
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
        
        let mcOptions;
        if (chooseQuestion === 1) {
            mcOptions = this.questionGetTrig();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        shuffle(mcOptions);
        this.writeFormula();
        this.writeExample();
    }

    questionGetTrig = () => {
        // draw triangle        
        // choose trig identity (sin, cos, tan)
        // label sides (only 2)
        // simplify fraction

        let trigOption = getRandomNumber(1, 3, 0, 0);
        let opp = "";
        let adj = "";
        let hyp = "";
        let trig = "";
        let a = "";
        let b = "";

        if (trigOption === 1) {
            // sin
            trig = "sin";
            opp = getRandomNumber(10, 50, 0, 0);
            hyp = opp + getRandomNumber(10, 50, 0, 0);
            a = opp;
            b = hyp;
        } else if (trigOption === 2) {
            // cos
            trig = "cos";
            adj = getRandomNumber(10, 50, 0, 0);
            hyp = adj + getRandomNumber(10, 50, 0, 0);
            a = adj;
            b = hyp;
        } else {
            // tan
            trig = "tan";
            opp = getRandomNumber(10, 50, 0, 0);
            adj = getRandomNumber(10, 50, 0, 0);
            a = opp;
            b = adj;
        }

        //this.Ans = "<sup>" + a + "</sup>&frasl;<sub>" + b + "</sub>";
        this.Ans = "<sup>" + a + "</sup>/<sub>" + b + "</sub>";
        this.mc1 = "<sup>" + (a + getRandomNumber(1, 5, 0, 1)) + "</sup>/<sub>" + b + "</sub>";
        this.mc2 = "<sup>" + (a + getRandomNumber(1, 5, 0, 1)) + "</sup>/<sub>" + b + "</sub>";
        this.mc3 = "<sup>" + (a + getRandomNumber(1, 5, 0, 1)) + "</sup>/<sub>" + b + "</sub>";
        printTest("x = " + this.x);
        printTest("Ans = " + this.Ans);
        printTest("a = " + this.mc1);
        printTest("b = " + this.mc2);
        printTest("c = " + this.mc3);
        
        let questionText = "What is " + trig + "&#x3B8";
        
        document.getElementById("questionStringID").innerHTML = questionText;

        // hypotenuse side        
        document.getElementById("questionStringID").innerHTML += `
        <div style="                
            position: absolute;
            top: 100px;
            left: 230px;
        ">
        ` + hyp + "</div>";

        // opposite side        
        document.getElementById("questionStringID").innerHTML += `
        <div style="                
            position: absolute;
            top: 130px;
            left: 510px;
        ">
        ` + opp + "</div>";

        // adjacent side        
        document.getElementById("questionStringID").innerHTML += `
        <div style="                
            position: absolute;
            top: 250px;
            left: 250px;
        ">
        ` + adj + "</div>";

        // theta
        document.getElementById("questionStringID").innerHTML += `
        <div style="                
            position: absolute;
            top: 220px;
            left: 70px;
            font-style: italic;
        ">
            &#x3B8
        </div>
        `;
        
        document.getElementById("questionStringID").innerHTML += `
            <br /><br />
            <div style="                
                width:0;
                height: 0;
                border-left: 500px solid transparent;
                border-right: 0px solid transparent;
                border-bottom: 200px solid #555;                
            "></div>
            <br />
        `;

        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
            SOH CAH TOA
            <br />
            <img src='` + trigDiagram + `'></img>
            <br /><br /><br />
        `;
    }

    writeExample = () => {
        document.getElementById("exampleTextID").innerHTML = `
            A triangle with sides a = 3 and b = 4 has 
            <br />c^2 = a^2+b^2
            <br />c^2 = 3^2 + 4^2 (subbing in our values for a=3 and b=4)
            <br />c^2 = 9 + 16 (simplifying)
            <br />c^2 = 25 (simplifying)
        `;
    }

    nextQuestion = () => {  
        document.querySelectorAll(".questionBody")[0].style.display = "block";
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
                <h1>year 9</h1>
                <p>this is the ex03 trig</p>
                <button className="NextBtn" onClick={this.nextQuestion}>Next</button>
                <br /><br />
                <div className="questionBody">
                    <p id="sessionInfoID"></p>
                    <p style={{position: "relative"}} id="questionStringID"></p>
                    <img style={{display: "none"}} id="questionImgID" src ="" alt="This is a diagram of a triangle"></img>
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

export default addition;
