import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkUserInputAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex03_average_and_standard_deviation extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Normal distribution";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding the normal distribution. Click the Start button below to begin...";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(3); // user input string == 3
        
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns;
        if (chooseQuestion === 1) {
            correctAns = this.average();
        } else if (chooseQuestion === 2) {
            correctAns = this.standardDeviation();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        
        document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value, this.question_string, "normal distribution ex03")};
        
        this.writeFormula();
        this.writeExample();
    }

    average = () => {
        let scores = new Array(getRandomNumber(5, 10, 0, 0));
        let questionText = "What is the average of ";
        let sum = 0;
        for (let i = 0; i < scores.length; i++) {
            scores[i] = getRandomNumber(1, 30, 1, 0);
            if (i < scores.length - 1) {
                questionText += scores[i] + ", ";
            }
            sum += scores[i];
        }
        questionText += " and " + scores[scores.length - 1] + " to 2 decimal places?";        
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        let ans = (sum / scores.length).toFixed(2);
        return ans;
    }

    standardDeviation = () => {
        let scores = new Array(getRandomNumber(5, 10, 0, 0));
        let questionText = "What is the standard deviation of ";
        let sum = 0;
        for (let i = 0; i < scores.length; i++) {
            scores[i] = getRandomNumber(1, 30, 1, 0);
            if (i < scores.length - 1) {
                questionText += scores[i] + ", ";
            }
            sum += scores[i];
        }
        questionText += " and " + scores[scores.length - 1] + " to 3 decimal places?";        
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        console.log(scores);
        let mean = (sum / scores.length).toFixed(2);
        let s = 0;
        for (let i = 0; i < scores.length; i++) {
            s += (scores[i] - mean) ** 2;
        }
        let ans = Math.sqrt(s / scores.length).toFixed(3);
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

export default ex03_average_and_standard_deviation;