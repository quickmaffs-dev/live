import React from 'react';
import '../../../../App.css';
import '../../../../styling/sidebar.css';
import '../../../../styling/workspace.css';
import Sidebar from '../yr09sidebar';
import SidebarRight from '../../../SidebarRight';
import {getRandomNumber, printTest, shuffle} from '../../MathFunctions';
import triangleDiagram from  '../../../../img/triangleDiagram.png';
import pythagoras_theorem from  '../../../../img/pythagoras-theorem.png';

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
            mcOptions = this.questionGetHypotenuse();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        shuffle(mcOptions);
        this.writeFormula();
        this.writeExample();
    }

    questionGetHypotenuse = () => {
        let decimals = getRandomNumber(0, 1, 0, 0);        
        this.x = getRandomNumber(1, 20, decimals, 0); // a
        this.y = getRandomNumber(1, 20, decimals, 0); // b
        this.Ans = (Math.pow(this.x, 2) + Math.pow(this.y, 2)).toFixed(2 * decimals); // c^2
        this.mc1 = (parseFloat(this.Ans) + getRandomNumber(1, 5, decimals, 1)).toFixed(2 * decimals);
        this.mc2 = (parseFloat(this.Ans) + getRandomNumber(1, 5, decimals, 1)).toFixed(2 * decimals);
        this.mc3 = (parseFloat(this.Ans) + getRandomNumber(1, 5, decimals, 1)).toFixed(2 * decimals);
        printTest("x = " + this.x);
        printTest("y = " + this.y);
        printTest("Ans = " + this.Ans);
        printTest("a = " + this.mc1);
        printTest("b = " + this.mc2);
        printTest("c = " + this.mc3);
        
        let questionText = "A right angled triangle has a = " + this.x + " and b = " + this.y + ". What is c<sup>2</sup> ?";
        document.getElementById("questionStringID").innerHTML = questionText;                
        document.getElementById("questionImgID").src = triangleDiagram;
        document.getElementById("questionImgID").style.display = "block";
        
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        
        return arr;
    }

    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
            The sides of a right-angled triangle:
            <br />
            <img src='` + triangleDiagram + `'></img>
            <br /><br /><br />
            Pythagoras' theorem:
            <br /><br />
            <img src='` + pythagoras_theorem + `'></img>
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
        document.getElementById("questionImgID").style.display = "none";
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
                <p>this is the ex02 triangles</p>
                <button className="NextBtn" onClick={this.nextQuestion}>Next</button>
                <br /><br />
                <div className="questionBody">
                    <p id="sessionInfoID"></p>
                    <p id="questionStringID"></p>
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
