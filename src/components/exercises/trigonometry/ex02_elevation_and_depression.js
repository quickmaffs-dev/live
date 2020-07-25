import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns, getNames} from '../MathFunctions';
import Workspace from '../../Workspace';
import trigElevation from '../../../img/trigElevation.png';
import trigDepression from '../../../img/trigDepression.png';

class ex02_elevation_and_depression extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions regarding the elevation and depression. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //chooseQuestion = numQuestionTypes;
        let mcOptions;
        
        if (chooseQuestion === 1) {
            mcOptions = this.elevation();
        } else if (chooseQuestion === 2) {
            mcOptions = this.depression();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "trigonometry ex02")};            
        }

        this.writeFormula();
        this.writeExample();

    }

    elevation = () => {     
        let name = getNames(1)[0];
        let ans, questionText;
        let d = getRandomNumber(3, 50, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            d = getRandomNumber(3, 50, 1, 0);
        }
        let x = getRandomNumber(5, 80, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText = name + " is " + d + "m away from a tree. If the angle of elevation from the ground to the top of the tree is x = " + x + "<sup>O</sup>, how tall is the tree?";
            ans = d * Math.tan(x * Math.PI / 180);
        } else {
            questionText = name + " looks up from the ground at an angle of elevation of x =" + x + "<sup>O</sup> to the top of a " + d + "m tree. How far away from the base of the tree is " + name;
            ans = d / Math.tan(x * Math.PI / 180);
        }
        document.getElementById("questionImgID").style.display = "block";
        document.getElementById("questionImgID").alt = "This is a diagram of the question";
        document.getElementById("questionImgID").src = trigElevation;
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        this.Ans = ans.toFixed(1) + "m";
        this.mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
        this.mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
        this.mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    depression = () => {     
        let ans, questionText;
        let d = getRandomNumber(3, 50, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            d = getRandomNumber(3, 50, 1, 0);
        }
        let x = getRandomNumber(5, 80, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText = "A boat is " + d + "m away from the base of a lighthouse. A man on the top of the light house looks down to the boat at an angle of depression of x = " + x + "<sup>O</sup> at the boat. How tall is the lighthouse?";
            ans = d * Math.tan(x * Math.PI / 180);
        } else {
            questionText = "A man on a boat looks up at an angle of elevation to the top of a lighthouse at x = " + x + "<sup>O</sup>. If the lighthouse is " + d + "m tall, how far away is the boat from the base of the lighthouse?";
            ans = d / Math.tan(x * Math.PI / 180);
        }
        document.getElementById("questionImgID").style.display = "block";
        document.getElementById("questionImgID").alt = "This is a diagram of the question";
        document.getElementById("questionImgID").src = trigDepression;
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        this.Ans = ans.toFixed(1) + "m";
        this.mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
        this.mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
        this.mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
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

export default ex02_elevation_and_depression;