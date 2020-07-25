import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkUserInputAns, getPronumeral} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex04_pronumerals extends React.Component {
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
            correctAns = this.pronumeralOperations();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value, this.question_string, "algebra ex04")};
        
        this.writeFormula();
        this.writeExample();

    }

    pronumeralOperations = () => {
        let x = getRandomNumber(2, 20, 0, 1);
        let y = getRandomNumber(2, 20, 0, 1);        
        let pronum = getPronumeral();
        //get pronum value
        let p = pronum.split(">")[1].split("<")[0];
        let type = getRandomNumber(1, 4, 0, 0);
        let ans, questionText;
        if (type === 1) {
            ans = x + y + p;
            questionText = "Solve " + x + pronum + " + " + y + pronum;            
        } else if (type === 2) {
            ans = (x - y) + p;
            questionText = "Solve " + x + pronum + " - " + y + pronum;
        } else if (type === 3) {
            ans = (x * y) + p;
            questionText = "Solve " + x + pronum + " &#215; " + y;
        } else {            
            x = y * getRandomNumber(2, 12, 0, 1);
            ans = (x / y) + p;            
            questionText = "Solve " + x + pronum + " &#247; " + y;
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
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

export default ex04_pronumerals;