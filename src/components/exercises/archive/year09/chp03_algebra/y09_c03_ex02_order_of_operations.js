import React from 'react';
import '../../../../App.css';
import '../../../../styling/sidebar.css';
import '../../../../styling/workspace.css';
import Sidebar from '../yr09sidebar';
import SidebarRight from '../../../SidebarRight';
import {getRandomNumber, printTest, shuffle} from '../../MathFunctions';

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
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //chooseQuestion = 2; // test
        document.querySelectorAll(".questionBody")[0].style.display = "block";
        let mcOptions;
        
        if (chooseQuestion === 1) {
            mcOptions = this.questionOrderOfOperations();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        shuffle(mcOptions);
        this.writeFormula();
        this.writeExample();

    }
    
    questionOrderOfOperations = () => {
        let size = 2 * getRandomNumber(1, 2, 0, 0) + 1; // = 3, 5, 7
        let equation = Array(size);
        for (let i = 0;  i < equation.length; i++) {
            if (i % 2 === 0) {
                equation[i] = getRandomNumber(1, 20, 0, 1); // number                
            } else {
                equation[i] = getRandomNumber(1, 4, 0, 0); // operations		
            }            
        }    

        // division check
        for(let i = 1;  i < equation.length; i += 2) {
            if (equation[i] === 1) {
                equation[i-1] = equation[i+1] * getRandomNumber(1, 12, 0, 1); // number
            }
        }

        //equation = [1440, 1, 10, 1, 12]; // testing

        let questionText = "";
        for(let i = 0; i < equation.length; i++) {
            if (i % 2 === 0) {
                if (equation[i] === 4 || equation[i] === 9 || equation[i] === 16) {
                    questionText += Math.sqrt(equation[i]) + "<sup>2</sup>";
                } else {
                    questionText += equation[i];
                }
            } else {
                if (equation[i] === 1) {
                    questionText += " / ";
                } else if (equation[i] === 2) {
                    questionText += " x ";
                } else if (equation[i] === 3) {
                    questionText += " + ";
                } else {
                    questionText += " - ";
                }
            }
        }

        equation = this.orderOfOperations(equation);
        let correctAnswer = equation[0];

        let addOptions = getRandomNumber(1, 4, 0, 0);

        if (addOptions === 1) {
            // add brackets
            // (equation) *+- n
            let n = getRandomNumber(1, 12, 0, 1);	
            let operation = getRandomNumber(1, 3, 0, 0) + 1; // = 2, 3, 4
            if (operation === 2) { // multiplication
                correctAnswer *= n;
                questionText = "(" + questionText + ") x " + n;
            } else if (operation === 3) { // addition
                correctAnswer += n;
                questionText = "(" + questionText + ") + " + n;
            } else { // subtraction
                correctAnswer -= n;
                questionText = "(" + questionText + ") - " + n;
            }	
        } else if (addOptions === 2) {
            // fraction
            // (equation) / n            
            let n = 12;
            while (n > 1) {
                if (correctAnswer % n === 0) {
                    correctAnswer /= n;
                    questionText = "(" + questionText + ") / " + n;
                    n = 1;
                }
                n--;
            }
        }

        this.Ans = correctAnswer;
        this.mc1 = this.Ans + getRandomNumber(1, 10, 0, 1);
        this.mc2 = this.Ans + getRandomNumber(1, 10, 0, 1);
        this.mc3 = this.Ans + getRandomNumber(1, 10, 0, 1);        

        printTest("Ans = " + this.Ans);
        printTest("mc1 = " + this.mc1);
        printTest("mc2 = " + this.mc2);
        printTest("mc3 = " + this.mc3);        
        
        questionText = "What is " + questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    orderOfOperations = (equation) => {
        // check for division first	        
        for(let i = 1; i < equation.length; i += 2) {
            if(equation[i] === 1) {
                equation[i-1] /= equation[i+1];
                equation[i] = 0;
                equation[i+1] = 0;
                equation = this.shift(equation);
                i = -1; // -1+= 2 = 1
            }
        }

        // multiplication
        for(let i = 1; i < equation.length; i += 2) {
            if(equation[i] === 2) {
                equation[i-1] *= equation[i+1];
                equation[i] = 0;
                equation[i+1] = 0;
                equation = this.shift(equation);
                i = -1; // -1+= 2 = 1
            }
        }

        // addition
        for(let i = 1; i < equation.length; i += 2) {
            if(equation[i] === 3) {
                equation[i-1] += equation[i+1];
                equation[i] = 0;
                equation[i+1] = 0;
                equation = this.shift(equation);
                i = -1; // -1+= 2 = 1
            }
        }

        // subtraction
        for(let i = 1; i < equation.length; i += 2) {
            if(equation[i] === 4) {
                equation[i-1] -= equation[i+1];
                equation[i] = 0;
                equation[i+1] = 0;
                equation = this.shift(equation);
                i = -1; // -1+= 2 = 1
            }
        }

        return equation;
    }

    shift = (equation) => {	
        for(let i = 0; i < equation.length-2; i++) {
            if (equation[i] === 0) {
                equation[i] = equation[i+2];
                equation[i+1] = equation[i+3];
                equation[i+2] = 0;
                equation[i+3] = 0;
            }
        }
        equation[equation.length-1] = 0;
        return equation;
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
