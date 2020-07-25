import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex05_cosine_rule extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions using the cosine rule. Click the Start button below to begin...";            
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
            mcOptions = this.cosineRuleSide();
        } else if (chooseQuestion === 2) {
            mcOptions = this.cosineRuleAngle();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
        document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "trigonometry ex05")};            
        }

        this.writeFormula();
        this.writeExample();

    }

    drawTriangle = (a, b, c, alpha) => {
        document.getElementById("questionDiagramID").style.display = "block";
        document.getElementById("questionDiagramID").innerHTML = "";

        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 100px;
            left: 230px;
        ">
        ` + a + "</div>";

        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 130px;
            left: 610px;
        ">
        ` + b + "</div>";

        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 250px;
            left: 320px;
        ">
        ` + c + "</div>";
        
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 220px;
            left: 620px;
        ">
        ` + alpha + "</div>";
       
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

    cosineRuleSide = () => {
        // because we are using alpha (A) its a2 = b2 + c2 -2bc*cosA
        let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
        let c = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            c = getRandomNumber(1, 20, 1, 0);
        }
        let b = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            b = getRandomNumber(1, 20, 1, 0);
        }
        let alpha = getRandomNumber(5, 85, 0, 0);
        let a = (c ** 2) + (b ** 2) - 2 * c * b * Math.cos(alpha * Math.PI / 180);
        a = Math.sqrt(a);
        let ans;
        console.log("a is " + a);
        console.log("b is " + b);
        console.log("c is " + c);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            ans = c;
            a = a.toFixed(2) + unit;
            c = "x";
        } else {
            ans = a;
            c += unit;
            a = "x";
        }        
        b += unit;
        alpha += "<sup>0</sup>";
        let questionText = "Find x";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        
        this.drawTriangle(a, b, c, alpha);
        this.Ans = ans.toFixed(1) + unit;
        this.mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
        this.mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
        this.mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    cosineRuleAngle = () => {
        // because we are using alpha (A) its a2 = b2 + c2 -2bc*cosA
        let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
        let c = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            c = getRandomNumber(1, 20, 1, 0);
        }
        let b = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            b = getRandomNumber(1, 20, 1, 0);
        }
        let alpha = getRandomNumber(5, 85, 0, 0);
        let a = (c ** 2) + (b ** 2) - 2 * c * b * Math.cos(alpha * Math.PI / 180);
        a = Math.sqrt(a).toFixed(2);
        console.log("a is " + a);
        console.log("b is " + b);
        console.log("c is " + c);
        a += unit;
        b += unit;
        c += unit;
        let ans = alpha;
        alpha = "x";
        let questionText = "Find x";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        
        this.drawTriangle(a, b, c, alpha);
        this.Ans = ans + "<sup>0</sup>";
        this.mc1 = (ans + getRandomNumber(1, 5, 0, 1)) + "<sup>0</sup>";
        this.mc2 = (ans + getRandomNumber(1, 5, 0, 1)) + "<sup>0</sup>";
        this.mc3 = (ans + getRandomNumber(1, 5, 0, 1)) + "<sup>0</sup>";
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

export default ex05_cosine_rule;