import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';

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
        reset();       
        answerType(2); // true false == 2        
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //chooseQuestion = numQuestionTypes;
        let correctAns;
        if (chooseQuestion === 1) {
            correctAns = this.equationsAndGraphs();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        //document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value)};
        document.querySelectorAll(".trueFalseBtn")[0].onclick = () => {this.checkTrueFalseAnswer(correctAns, document.querySelectorAll(".trueFalseBtn")[0].innerHTML)};
        document.querySelectorAll(".trueFalseBtn")[1].onclick = () => {this.checkTrueFalseAnswer(correctAns, document.querySelectorAll(".trueFalseBtn")[1].innerHTML)};
        this.writeFormula();
        this.writeExample();
    }

    drawCanvas = (x_int, y_int, option) => {        
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        let ctx = canvas.getContext("2d");
        ctx.save();        
        if (option === "reset") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        // draw gridlines
        let w = 20;
        ctx.moveTo(0, 0);
        ctx.lineWidth = 0.1;
        let d = 0;
        while (d < canvas.width) {
            ctx.moveTo(d, 0);
            ctx.lineTo(d, canvas.height);
            ctx.moveTo(0, d);
            ctx.lineTo(canvas.width, d);
            d += canvas.width / w;
        }
        ctx.stroke();

        // draw axis
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, 0);
        ctx.lineTo(canvas.width/2, canvas.height);
        ctx.moveTo(0, canvas.height/2);
        ctx.lineTo(canvas.width, canvas.height/2);
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // axis arrow heads
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 - 8, 0 + 12);
        ctx.lineTo(canvas.width/2, 0);
        ctx.lineTo(canvas.width/2 + 8, 0 + 12);        
        ctx.moveTo(canvas.width/2 - 8, canvas.height - 12);
        ctx.lineTo(canvas.width/2, canvas.height);
        ctx.lineTo(canvas.width/2 + 8, canvas.height - 12);
        ctx.moveTo(0 + 12, canvas.height/2 - 8);
        ctx.lineTo(0, canvas.height/2);
        ctx.lineTo(0 + 12, canvas.height/2 + 8);
        ctx.moveTo(canvas.width - 12, canvas.height/2 - 8);
        ctx.lineTo(canvas.width, canvas.height/2);
        ctx.lineTo(canvas.width - 12, canvas.height/2 + 8);

        
        ctx.lineWidth = 0.5;
        ctx.stroke();

        if (option !== "reset") {            
            // draw chart
            // start at y int and go down y point and left x point
            let x = canvas.width/2;
            let y = canvas.height/2 - (y_int * canvas.height / w); // start at y point
            ctx.fillRect(canvas.width/2 + (x_int * canvas.width / w), canvas.height/2 - 4, 4, 8); // plot x point
            ctx.fillRect(canvas.width/2 - 4, canvas.height/2 - (y_int * canvas.height / w), 8, 4); // plot y point
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(x, y);
            let checkX, checkY, stop = 0;
            while (stop === 0) {
                checkX = x + x_int;
                checkY = y + y_int;
                if (checkX > canvas.width || checkX < 0 || checkY > canvas.height || checkY < 0) {
                    stop = 1;
                } else {
                    x += x_int;
                    y += y_int;
                }
            }
            ctx.lineTo(x, y);
            if (option === "answer") {
                ctx.lineWidth = 3;
                ctx.strokeStyle = "red";
                ctx.setLineDash([5, 3]);
            }
            ctx.stroke();


            // go back and do other line
            x = canvas.width/2;
            y = canvas.height/2 - (y_int * canvas.height / w); // start at y point
            ctx.beginPath();
            ctx.moveTo(x, y);
            stop = 0;
            while (stop === 0) {
                checkX = x - x_int;
                checkY = y - y_int;
                if (checkX > canvas.width || checkX < 0 || checkY > canvas.height || checkY < 0) {
                    stop = 1;
                } else {
                    x -= x_int;
                    y -= y_int;
                }
            }
            ctx.lineTo(x, y);
            ctx.stroke();

            // mark intercept points
            ctx.font = "30px CMSY10";
            ctx.fillText(x_int, canvas.width/2 + (x_int * canvas.width / w), canvas.height/2 - 5);
            ctx.fillText(y_int, canvas.width/2 + 5, canvas.height/2 - (y_int * canvas.height / w));
            
            // axis labels
            ctx.font = "italic 20px CMSY10";
            ctx.fillText("x", canvas.width - 25, canvas.height/2 + 15);
            ctx.fillText("y", canvas.width/2 - 15, 25);
        }
        ctx.restore();
    }

    equationsAndGraphs = () => {
        this.drawCanvas(0, 0, "reset");
        // x_int and y_int < 10
        let x_int = getRandomNumber(1, 9, 0, 1);
        let y_int = getRandomNumber(1, 9, 0, 1);
        this.x_int = x_int;
        this.y_int = y_int;
        let ans;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            // true
            this.drawCanvas(x_int, y_int, "question");            
            ans = "True";
        } else {
            // false
            if (x_int !== y_int) {
                this.drawCanvas(y_int, x_int, "question");
            } else {
                this.drawCanvas(-x_int, y_int, "question");
            }            
            ans = "False";
        }
        //let m = "<sup>" + (-y_int) + "</sup> / <sub>" + x_int + "</sub>";
        let questionText = "Is this the correct graph for " + y_int + "x + " + x_int + "y = " + (x_int * y_int) + "?";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        return ans;
    }

    checkTrueFalseAnswer = (correctAns, userAns) => {
        if (correctAns !== userAns) {
            this.drawCanvas(this.x_int, this.y_int, "answer");
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