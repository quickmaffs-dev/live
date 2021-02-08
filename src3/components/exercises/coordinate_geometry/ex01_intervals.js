import React from 'react';
import {getRandomNumber, printTest, reset, answerType, shuffle, checkAns, setupCanvas } from '../MathFunctions';
import Workspace from '../../Workspace';
import {lineMidpoint, lineDistance, lineGradient} from  './coordinate_geometry_exercises';

class ex01_intervals extends React.Component {
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
        this.points = [];
        this.qType = "";
    }
    
    componentDidMount(){
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Coordinate Geometry";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding coordinate geometry. Click the Start button below to begin...";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => {
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(1); // multiplechoice === 1
        
        this.numQuestions += 1;
        let numQuestionTypes = 3;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns, result;
        //chooseQuestion = numQuestionTypes; // testing
        if (chooseQuestion === 1) {
            this.qType = "midpoint";
            result = lineMidpoint();
        } else if (chooseQuestion === 2) {
            this.qType = "distance";
            result = lineDistance();
        } else if (chooseQuestion === 3) {
            this.qType = "gradient";
            result = lineGradient();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        
        this.question_string = result[0];
		document.getElementById("questionStringID").innerHTML = result[0];
		correctAns = result[1];
        //let mcOptions = result.slice(1, result.length);
        let mcOptions = result.slice(1, 5);        
        correctAns = mcOptions[0];
        this.points = result.slice(5, result.length);
        shuffle(mcOptions);
        // for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
        //     document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "coordinate geometry ex01")};
        // }
        
        document.querySelectorAll(".mcAnsBtn")[0].onclick = () => {this.checkAnsWait(correctAns, document.querySelectorAll(".mcAnsBtn")[0].innerHTML);}
        document.querySelectorAll(".mcAnsBtn")[1].onclick = () => {this.checkAnsWait(correctAns, document.querySelectorAll(".mcAnsBtn")[1].innerHTML);}
        document.querySelectorAll(".mcAnsBtn")[2].onclick = () => {this.checkAnsWait(correctAns, document.querySelectorAll(".mcAnsBtn")[2].innerHTML);}
        document.querySelectorAll(".mcAnsBtn")[3].onclick = () => {this.checkAnsWait(correctAns, document.querySelectorAll(".mcAnsBtn")[3].innerHTML);}
        this.writeFormula();
        this.writeExample();
    }

    checkAnsWait = (correctAns, userAns) => {
        if (this.qType === "midpoint") {
            let canvas = setupCanvas();
            let ctx = canvas.getContext("2d");
                    
            let x1 = this.points[0];
            let y1 = this.points[1];
            let x2 = this.points[2];
            let y2 = this.points[3];
            
            let w = 16;
            
            let x0 = (x1 + x2) / 2;
            let y0 = (y1 + y2) / 2;
            x0 = x0 * canvas.width/w + canvas.width/2;
            y0 = -y0 * canvas.height/w + canvas.height/2;
    
            ctx.beginPath();
            ctx.moveTo(x0, canvas.height/2);
            ctx.lineTo(x0, y0);
            ctx.lineTo(canvas.width/2, y0);
            ctx.strokeStyle = "red";
            ctx.setLineDash([5, 3]);
            ctx.stroke();
        } else if (this.qType === "distance") {
            // we need to see if the answer is a surd
            if (correctAns.includes("&radic;")) {
                console.log("its a surd");
                let uA = userAns.slice(41, userAns.length);
                userAns = "&radic;<span style='text-decoration: overline'>" + uA;
            }
        }
        checkAns(correctAns, userAns, this.question_string, "coordinate geometry ex01");
    }
    
    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
        For points P(x<sub>1</sub>, y<sub>1</sub>) and Q(x<sub>2</sub>, y<sub>2</sub>),
        <br> <span>Distance = &radic;<span style="text-decoration: overline">(x<sub>2</sub> - x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub> - y<sub>1</sub>)<sup>2</sup></span> </span>
        <br> <span>Midpoint = ( (x<sub>1</sub> + x<sub>2</sub>) / 2 , (y<sub>1</sub> + y<sub>2</sub>) / 2 ) </span>
        <br> <span>Gradient m = (y<sub>2</sub> - y<sub>1</sub>) / (x<sub>2</sub> - x<sub>1</sub>) </span>
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

export default ex01_intervals;