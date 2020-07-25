import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkUserInputAns, dpCheck} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex06_decimals extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Algebra";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding decimals. Click the Start button below to begin...";
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
            correctAns = this.decimals();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value, this.question_string, "algebra ex06")};
        
        this.writeFormula();
        this.writeExample();

    }

    decimals = () => {
        let a = getRandomNumber(1, 10, getRandomNumber(0, 2, 0, 0), 0);
        let b = getRandomNumber(1, 10, getRandomNumber(0, 2, 0, 0), 0);
        let type = getRandomNumber(1, 4, 0, 0);
        let ans, questionText;     
        a = parseFloat(dpCheck(a));
        b = parseFloat(dpCheck(b));
        if (type === 1) {
            questionText = "Simplify " + a + " + " + b;
            ans = a + b;
        } else if (type === 2) {
            questionText = "Simplify " + a + " - " + b;
            ans = a - b;
        } else if (type === 3) {
            questionText = "Simplify " + a + " &#215; " + b;
            ans = a * b;
        } else {
            a = b * getRandomNumber(1, 12, 0, 0);
            a = parseFloat(dpCheck(a));
            questionText = "Simplify " + a + " &#247; " + b;
            ans = a / b;
        }
        
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;        
        ans = dpCheck(ans);
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

export default ex06_decimals;