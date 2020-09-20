import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';
import {equationsAndGraphs, drawCanvas} from './simultaneous_equations_exercises';

class ex01_identify_graphs extends React.Component {
    constructor(props) {
        super(props);
        this.x = 1;
        this.Ans = 1;
        this.mc1 = this.mc2 = this.mc3 = 1;
        this.userAns = 1;
        this.numCorrect = 0;
        this.numQuestions = 0;
        this.userScore = 1;
        this.x_int = 1;     
        this.y_int = 1;
        this.question_string = "";
    }
    
    componentDidMount(){
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Simultaneous equations";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask you to match the equation with the chart. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(2); // true false == 2        
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //chooseQuestion = numQuestionTypes;
        let correctAns, result;
        if (chooseQuestion === 1) {
            result = equationsAndGraphs();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        this.question_string = result[0];
		document.getElementById("questionStringID").innerHTML = result[0];
        correctAns = result[1];
        this.x_int = result[2];
        this.y_int = result[3];
        //document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value)};
        document.querySelectorAll(".trueFalseBtn")[0].onclick = () => {this.checkTrueFalseAnswer(correctAns, document.querySelectorAll(".trueFalseBtn")[0].innerHTML)};
        document.querySelectorAll(".trueFalseBtn")[1].onclick = () => {this.checkTrueFalseAnswer(correctAns, document.querySelectorAll(".trueFalseBtn")[1].innerHTML)};
        this.writeFormula();
        this.writeExample();
    }

    checkTrueFalseAnswer = (correctAns, userAns) => {
        if (correctAns !== userAns) {
            drawCanvas(this.x_int, this.y_int, "answer");
        }
        checkAns(correctAns, userAns, this.question_string, "simultaneous equations ex01");
        
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

export default ex01_identify_graphs;