import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkUserInputAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex03_bidmas extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Algebra";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask addition questions. Click the Start button below to begin...";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(3); // user input string == 3
        
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns;
        if (chooseQuestion === 1) {
            correctAns = this.bidmas();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value, this.question_string, "algebra ex03")};
        
        this.writeFormula();
        this.writeExample();

    }

    bidmas = () => {
        let operations_n = getRandomNumber(2, 5, 0, 0);
        let eqn = new Array(2 * operations_n + 1);
        let divCheck = 1;
        for (let i = 0; i < eqn.length; i++) {
            if (i % 2 === 0) { // number
                eqn[i] = getRandomNumber(1, 20, 0, 0); // positive numbers only
            } else { // operation                
                eqn[i] = getRandomNumber(divCheck, 4, 0, 0);
                // division check (we only want 1 division per q to avoid any complications)
                if (eqn[i] === 1) {
                    divCheck += 1;
                    eqn[i + 1] = getRandomNumber(1, 12, 0, 0);
                    eqn[i - 1] = getRandomNumber(1, 12, 0, 0) * eqn[i + 1];
                    i += 1;
                }
            }
        }
        //eqn = [1, 4, 2, 4, 3];
        let questionText = "Solve ";
        for (let i = 0; i < eqn.length; i++) {
            if (i % 2 === 0) {
                questionText += eqn[i]    
            } else {
                if (eqn[i] === 1) {
                    questionText += " &#247 ";
                } else if (eqn[i] === 2) {
                    questionText += " &#215; ";
                } else if (eqn[i] === 3) {
                    questionText += " + ";
                } else {
                    questionText += " - ";
                }
            }
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        let answer = this.solveEquation(eqn);

        return answer;
    }

    solveEquation = (eqn) => {
        let op;        
        for(let operation = 1; operation <= 4; operation++) {
            for (let i = 1; i < eqn.length; i+=2) {
                if (eqn[i] === operation) {
                    op = i;
                    i = eqn.length;
                    operation = 4;
                }
            }
        }

        let newEqn = new Array(eqn.length - 2);
        let ans;
        if (eqn[op] === 1) {
            ans = eqn[op-1] / eqn[op+1];
        } else if (eqn[op] === 2) {
            ans = eqn[op-1] * eqn[op+1];
        } else if (eqn[op] === 3) {
            ans = eqn[op-1] + eqn[op+1];
        } else {
            ans = eqn[op-1] - eqn[op+1];
        }

        let j = 0;
        for (let i = 0; i < newEqn.length; i++) {
            if (i !== op - 1) {
                newEqn[i] = eqn[j]
            } else {
                newEqn[i] = ans;
                j += 2;
            }
            j += 1;

        }        
        
        if (newEqn.length > 1) {
            return this.solveEquation(newEqn);
        }
        return newEqn[0];
        
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

export default ex03_bidmas;