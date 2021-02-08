import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkUserInputAns} from '../MathFunctions';
import Workspace from '../../Workspace';
import {bidmas} from './algebra_exercises';

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
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(3); // user input string == 3
        
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns, result;
        if (chooseQuestion === 1) {
            result = bidmas();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        this.question_string = result[0];
        document.getElementById("questionStringID").innerHTML = result[0];
        correctAns = result[1];


        document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value, this.question_string, "algebra ex03")};
        
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

    render() {
        return (
            <div>
                <Workspace />
            </div>
            
        );
    }
}  

export default ex03_bidmas;