import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex03_bearings extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Trigonometry";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions regarding bearings. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        chooseQuestion = numQuestionTypes;
        let mcOptions;
        
        if (chooseQuestion === 1) {
            mcOptions = this.bearings();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "trigonometry ex03")};            
        }

        this.writeFormula();
        this.writeExample();

    }

    bearings = () => {
        //let theta = getRandomNumber(5, 85, 0, 0) + 90 * getRandomNumber(0, 3, 0, 0);
        let theta = getRandomNumber(5, 85, 0, 0);
        let y = ["North", "South"][getRandomNumber(0, 1, 0, 0)];
        let x = ["East", "West"][getRandomNumber(0, 1, 0, 0)];
        let d = getRandomNumber(3, 50, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            d = getRandomNumber(3, 50, 1, 0);
        }
        let ans;
        let questionText = "I am walking for " + d + "km on a bearing of " + y.substring(0, 1) + theta + "<sup>O</sup>" + x.substring(0, 1) + ". ";
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            // east/west
            ans = d * Math.sin(theta * Math.PI / 180);
            questionText += "How far " + x.toLowerCase() + " am I from my starting point?";
        } else {
            /// north/south
            ans = d * Math.cos(theta * Math.PI / 180);
            questionText += "How far " + y.toLowerCase() + " am I from my starting point?";
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        this.Ans = ans.toFixed(1) + "km";
        this.mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "km";
        this.mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "km";
        this.mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "km";
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
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

export default ex03_bearings;