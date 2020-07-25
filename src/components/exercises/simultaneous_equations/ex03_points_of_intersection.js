import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex02_linear_relationships extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Simultaneous Equations";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions regarding points of intersection. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //chooseQuestion = numQuestionTypes;
        let mcOptions;
        if (chooseQuestion === 1) {
            mcOptions = this.pointsOfIntersection();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "simultaneous equations ex03")};            
        }

        this.writeFormula();
        this.writeExample();

    }

    pointsOfIntersection = () => {
        // y = ax + b
        // y = cx + d
        // ax + b = cx + d
        // d = ax + b - cx
        let x = getRandomNumber(1, 10, 0, 1);        
        let a = getRandomNumber(1, 10, 0, 1);
        let b = getRandomNumber(1, 10, 0, 1);
        let c = getRandomNumber(1, 10, 0, 1);
        let d = a * x + b - c * x;
        let y = a * x + b;

        let questionText = "What is the point of intersection of the lines <span>y</span> = " + a + "<span>x</span> + " + b + "</span> and <span>y</span> = " + c + "<span>x</span> + " + d + "</span>?";
        let ans = "(" + x + ", " + y + ")";
        this.Ans = ans;
        this.mc1 = "(" + -x + ", " + y + ")";
        this.mc2 = "(" + x + ", " + -y + ")";
        this.mc3 = "(" + -x + ", " + -y + ")";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
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

export default ex02_linear_relationships;