import React from 'react';
import {getRandomNumber, printTest, reset, answerType, shuffle, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';
import {associatingVariables} from './data_analysis_exercises';

class ex01_scatterplots extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Data Analysis";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding scatterplots. Click the Start button below to begin...";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(1); // multiplechoice === 1
        
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns, result;
        if (chooseQuestion === 1) {
            result = associatingVariables();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        
        this.question_string = result[0];
		document.getElementById("questionStringID").innerHTML = result[0];
		let mcOptions = result.slice(1, 5);        
        correctAns = mcOptions[0];
        this.x_line = result[5];
        this.y_line = result[6];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {this.showAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "data analysis ex01")};
        }
        this.writeFormula();
        this.writeExample();
    }

    showAns = (correctAns, userAns, qString, chp) => {     
        console.log("hello");
        let canvas = document.getElementById("canvasID");
        let ctx = canvas.getContext("2d");
        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "red";
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(this.x_line + 3, canvas.height);
        ctx.lineTo(this.x_line + 3, this.y_line);
        ctx.moveTo(0, this.y_line);
        ctx.lineTo(this.x_line, this.y_line);
        ctx.stroke();
        checkAns(correctAns, userAns, qString, chp);
        ctx.restore();
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

export default ex01_scatterplots;