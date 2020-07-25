import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex04_sine_rule extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions using the sine rule. Click the Start button below to begin...";            
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
            mcOptions = this.sineRuleSide();
        } else if (chooseQuestion === 2) {
            mcOptions = this.sineRuleAngle();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "trigonometry ex04")};            
        }

        this.writeFormula();
        this.writeExample();

    }

    drawTriangle = (a, b, alpha, beta) => {
        document.getElementById("questionDiagramID").style.display = "block";
        document.getElementById("questionDiagramID").innerHTML = "";

        // hypotenuse side        
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 100px;
            left: 230px;
        ">
        ` + a + "</div>";

        // opposite side        
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 130px;
            left: 610px;
        ">
        ` + b + "</div>";
        
        // alpha
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 220px;
            left: 620px;
        ">
        ` + alpha + "</div>";

        // beta
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 220px;
            left: 70px;
            font-style: italic;
        ">
        ` + beta + "</div>";
       
        // the triangle
        document.getElementById("questionDiagramID").innerHTML += `
            <br /><br />
            <div style="                
                width:0;
                height: 0;
                border-left: 500px solid transparent;
                border-right: 200px solid transparent;
                border-bottom: 200px solid #555;                
            "></div>
            <br />
        `;
    }

    sineRuleSide = () => {
        let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
        let b = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            b = getRandomNumber(1, 20, 1, 0);
        }
        let alpha = getRandomNumber(5, 85, 0, 0);
        let beta = getRandomNumber(5, 85, 0, 0);

        let ans = Math.sin(alpha * Math.PI / 180) * b / Math.sin(beta * Math.PI / 180);
        b += unit;
        alpha += "<sup>0</sup>";
        beta += "<sup>0</sup>";
        let questionText = "Find x";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        let a = "x";
        this.drawTriangle(a, b, alpha, beta);
        this.Ans = ans.toFixed(1) + unit;
        this.mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
        this.mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
        this.mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    sineRuleAngle = () => {
        let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
        let a = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            a = getRandomNumber(1, 20, 1, 0);
        }
        let b = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            b = getRandomNumber(1, 20, 1, 0);
        }
        let beta = getRandomNumber(5, 85, 0, 0);

        if (a * Math.sin(beta * Math.PI / 180) / b > 1) {
            // invalid
            return this.sineRuleAngle();
        }
        let ans = Math.asin(a * Math.sin(beta * Math.PI / 180)  / b) * 180 / Math.PI;
        a += unit;
        b += unit;
        beta += "<sup>0</sup>";
        let questionText = "Find x";
        this.question_string = questionText;

        document.getElementById("questionStringID").innerHTML = questionText;
        let alpha = "x";
        this.drawTriangle(a, b, alpha, beta);
        this.Ans = ans.toFixed(1) + unit;
        this.mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
        this.mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
        this.mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
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

export default ex04_sine_rule;