import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex01_soh_cah_toa extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions regarding the sin, cos and tan rules. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 3;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //chooseQuestion = numQuestionTypes;
        let mcOptions;
        
        if (chooseQuestion === 1) {
            mcOptions = this.findRatio();
        } else if (chooseQuestion === 2) {
            mcOptions = this.findTheta();
        } else if (chooseQuestion === 3) {
            mcOptions = this.findSide();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "trigonometry ex01")};
        }

        this.writeFormula();
        this.writeExample();

    }

    drawRightTriangle = (opp, adj, hyp, theta) => {
        document.getElementById("questionDiagramID").style.display = "block";
        document.getElementById("questionDiagramID").innerHTML = "";

        // hypotenuse side        
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 100px;
            left: 230px;
        ">
        ` + hyp + "</div>";

        // opposite side        
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 130px;
            left: 510px;
        ">
        ` + opp + "</div>";

        // adjacent side        
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 250px;
            left: 250px;
        ">
        ` + adj + "</div>";

        // theta
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 220px;
            left: 70px;
            font-style: italic;
        ">
        ` + theta + "</div>";
        
        document.getElementById("questionDiagramID").innerHTML += `
            <br /><br />
            <div style="                
                width:0;
                height: 0;
                border-left: 500px solid transparent;
                border-right: 0px solid transparent;
                border-bottom: 200px solid #555;                
            "></div>
            <br />
        `;

        // right angle
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 230px;
            left: 476px;
        ">
            <div style="                
            position: relative;
            bottom: 0;
            right: 0;            
            height: 20px;
            width: 20px;
            border: solid black 2px;
            "></div>
        </div>`;
    }
    
    findRatio = () => {        
        let trigOption = getRandomNumber(1, 3, 0, 0);
        let opp = "";
        let adj = "";
        let hyp = "";
        let trig = "";
        let a = "";
        let b = "";
        let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];

        if (trigOption === 1) {
            // sin
            trig = "sin";
            opp = getRandomNumber(10, 50, 0, 0);
            hyp = opp + getRandomNumber(10, 50, 0, 0);
            a = opp;
            b = hyp;
            opp += unit;
            hyp += unit;
        } else if (trigOption === 2) {
            // cos
            trig = "cos";
            adj = getRandomNumber(10, 50, 0, 0);
            hyp = adj + getRandomNumber(10, 50, 0, 0);
            a = adj;
            b = hyp;
            hyp += unit;
            adj += unit;
        } else {
            // tan
            trig = "tan";
            opp = getRandomNumber(10, 50, 0, 0);
            adj = getRandomNumber(10, 50, 0, 0);
            a = opp;
            b = adj;
            opp += unit;
            adj += unit;
        }

        //this.Ans = "<sup>" + a + "</sup>&frasl;<sub>" + b + "</sub>";
        this.Ans = "<sup>" + a + "</sup>/<sub>" + b + "</sub>";
        this.mc1 = "<sup>" + (a + getRandomNumber(1, 5, 0, 1)) + "</sup>/<sub>" + b + "</sub>";
        this.mc2 = "<sup>" + (a + getRandomNumber(1, 5, 0, 1)) + "</sup>/<sub>" + b + "</sub>";
        this.mc3 = "<sup>" + (a + getRandomNumber(1, 5, 0, 1)) + "</sup>/<sub>" + b + "</sub>";
        
        let questionText = "What is " + trig + "&#x3B8";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        this.drawRightTriangle(opp, adj, hyp, "&#x3B8");

        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    findTheta = () => {
        let trigOption = getRandomNumber(1, 3, 0, 0);
        let opp = "";
        let adj = "";
        let hyp = "";
        let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
        let r, ans;
        if (trigOption === 1) {
            // sin
            opp = getRandomNumber(10, 50, 0, 0);
            hyp = opp + getRandomNumber(10, 50, 0, 0);
            r = opp / hyp;
            ans = Math.asin(r);
            opp += unit;
            hyp += unit;            
        } else if (trigOption === 2) {
            // cos
            adj = getRandomNumber(10, 50, 0, 0);
            hyp = adj + getRandomNumber(10, 50, 0, 0);
            r = adj / hyp;
            ans = Math.acos(r);
            hyp += unit;
            adj += unit;
        } else {
            // tan
            opp = getRandomNumber(10, 50, 0, 0);
            adj = getRandomNumber(10, 50, 0, 0);
            r = opp / adj;
            ans = Math.atan(r);
            opp += unit;
            adj += unit;
        }
        ans *=  (180 / Math.PI);        
        
        this.Ans = ans.toFixed(0) + "<sup>O</sup>";
        this.mc1 = (ans + getRandomNumber(1, 10, 0, 1)).toFixed(0) + "<sup>O</sup>";
        this.mc2 = (ans + getRandomNumber(1, 10, 0, 1)).toFixed(0) + "<sup>O</sup>";
        this.mc3 = (ans + getRandomNumber(1, 10, 0, 1)).toFixed(0) + "<sup>O</sup>";
        
        let questionText = "What is &#x3B8";        
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        this.drawRightTriangle(opp, adj, hyp, "&#x3B8");

        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    findSide = () => {
        let trigOption = getRandomNumber(1, 3, 0, 0);
        let opp = "";
        let adj = "";
        let hyp = "";
        let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
        let ans;
        let theta = getRandomNumber(5, 80, 0, 0);
        if (trigOption === 1) {
            // sin            
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                opp = getRandomNumber(10, 50, 0, 0);
                hyp = "x";
                ans = opp / Math.sin(theta * Math.PI / 180);
                opp += unit;
            } else {
                hyp = getRandomNumber(10, 50, 0, 0);
                opp = "x";
                ans = hyp * Math.sin(theta * Math.PI / 180);
                hyp += unit;
            }
        } else if (trigOption === 2) {
            // cos
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                adj = getRandomNumber(10, 50, 0, 0);
                hyp = "x";
                ans = adj / Math.cos(theta * Math.PI / 180);
                adj += unit;
            } else {
                hyp = getRandomNumber(10, 50, 0, 0);
                adj = "x";
                ans = hyp * Math.cos(theta * Math.PI / 180);
                hyp += unit;
            }
        } else {
            // tan
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                opp = getRandomNumber(10, 50, 0, 0);
                adj = "x";
                ans = opp / Math.tan(theta * Math.PI / 180);
                opp += unit;
            } else {
                adj = getRandomNumber(10, 50, 0, 0);
                opp = "x";
                ans = adj * Math.tan(theta * Math.PI / 180);
                adj += unit;
            }
        }        
        
        this.Ans = ans.toFixed(1) + unit;
        this.mc1 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(1) + unit;
        this.mc2 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(1) + unit;
        this.mc3 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(1) + unit;
        
        let questionText = "Find x";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        theta += "<sup>O</sup>";
        this.drawRightTriangle(opp, adj, hyp, theta);

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

export default ex01_soh_cah_toa;