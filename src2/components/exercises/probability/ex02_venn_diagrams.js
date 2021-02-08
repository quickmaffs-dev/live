import React from 'react';
import {getRandomNumber, printTest, reset, answerType, checkAns, checkUserInputAns} from '../MathFunctions';
import Workspace from '../../Workspace';
import {twoWayTables, vennDual, vennTriple} from './probability_exercises';

class ex02_venn_diagrams extends React.Component {
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
        this.type = this.a = this.b = this.c = this.correctAns = 0;
        this.scores = [];
    }    

    
    componentDidMount(){
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Probability";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on venn diagrams. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};

        document.getElementById("userInputStringID").addEventListener("keydown", this.btnCheckTest);
        
    }

    btnCheckTest = (event) => {       
        if (event.key !== undefined) {            
            this.btnCheckTrigger(event.key);
        }  
        if (event.keyCode !== undefined) {
            this.btnCheckTrigger(event.keyCode);            
        }
    }

    btnCheckTrigger = (e) => {
        if (e === 13 && document.getElementById("nextQuesBtnID").style.display === "none") {
            if (this.qType <= 2) {
                this.showAns(this.type, this.a, this.b, this.c, this.scores, this.correctAns, document.getElementById("userInputStringID").value, this.question_string, "probability ex02");            
            } else {
                checkUserInputAns(this.correctAns, document.getElementById("userInputStringID").value, this.question_string, "probability ex02");
            }
        }
    }
    
    makeQuestion = () => { 
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(3); // user input string == 3
        
        this.numQuestions += 1;
        let numQuestionTypes = 3;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //let correctAns;
        let result;
        //let a, b, c = 0, scores;
        chooseQuestion = numQuestionTypes;
        this.qType = chooseQuestion;
        if (chooseQuestion === 1) {
            result = vennDual();
            this.c = 0;
            this.scores = result.slice(5, result.length);
        } else if (chooseQuestion === 2) {
            result = vennTriple();
            this.c = result[5];
            this.scores = result.slice(6, result.length);
        } else if (chooseQuestion === 3) {
            result = twoWayTables();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }

        this.question_string = result[0];
        document.getElementById("questionStringID").innerHTML = result[0];
        this.correctAns = result[1];
        
        if (chooseQuestion <= 2) {
            this.a = result[3];
            this.b = result[4];            
            this.type = result[2];
            //document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value, this.question_string, "algebra ex01")};
            //document.getElementById("userInputBtnID").onclick = () => {this.showAns(type, a, b, c, scores, correctAns, document.getElementById("userInputStringID").value, this.question_string, "probability ex02")};
            document.getElementById("userInputBtnID").onclick = () => {this.showAns(this.type, this.a, this.b, this.c, this.scores, this.correctAns, document.getElementById("userInputStringID").value, this.question_string, "probability ex02")};
        } else {
            document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(this.correctAns, document.getElementById("userInputStringID").value, this.question_string, "probability ex02")};
        }
        this.writeFormula();
        this.writeExample();

    }

    showAns(type, a, b, c, scores, cA, uA, q, ex) {
        if (c === 0) {
            this.drawCanvasVennDualHighlight(type, a, b, scores);
        } else {
            this.drawCanvasVennTripleHighlight(type, a, b, c, scores);
        }
        checkAns(cA, uA, q, ex)
    }

    drawCanvasVennDualHighlight(type, a, b, scores) {
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 300;
        canvas.width = 400;
        let ctx = canvas.getContext("2d");
        ctx.save();

        let w = 400, h = 300;
        ctx.fillStyle = 'green';
        if (type === 1) {
            //total surveyed
            ctx.fillRect(0, 0, w, h);
        } else if (type === 2) {
            // a 
            ctx.arc(w/3, h/2, w/4, 0, 2 * Math.PI);
            ctx.fill();
        } else if (type === 3) {
            // a only
            ctx.arc(w/3, h/2, w/4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(2*w/3, h/2, w/4, 0, 2 * Math.PI);
            ctx.fill();            
        } else if (type === 4) {
            // b only
            ctx.arc(2*w/3, h/2, w/4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(w/3, h/2, w/4, 0, 2 * Math.PI);
            ctx.fill();            
        } else if (type === 5) {
            // b
            ctx.arc(2*w/3, h/2, w/4, 0, 2 * Math.PI);
            ctx.fill();
        } else if (type === 6) {
            // middle
            /*
            ctx.fillStyle = "green";
            ctx.arc(w/3, h/2, w/4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.globalCompositeOperation = "destination-in";
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(2*w/3, h/2, w/4, 0, 2 * Math.PI);
            ctx.fill();       
            ctx.save();    
            */
            let w = 400;
            let x1 = (1/6)*w;
            let r = 3*(1/12)*w;
            ctx.beginPath();
            for (let i = 0; i < canvas.width; i++) {
                for (let j = 0; j < canvas.height; j++) {
                    let x = i - canvas.width/2;
                    let y = canvas.height/2 - j;
                    
                    ctx.fillStyle = "green";
                    if ((x - x1)**2 + y**2 < r**2 && (x + x1)**2 + y**2 < r**2) {
                        ctx.fillRect(i, j, 1, 1);
                    }         
                }
            } 
        }  else {
            // nill
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = 'white';
            ctx.arc(w/3, h/2, w/4, 0, 2 * Math.PI);
            ctx.arc(2*w/3, h/2, w/4, 0, 2 * Math.PI);
            ctx.fill();          
        }
        ctx.fillStyle = 'black';        
        ctx.beginPath();
        ctx.arc(w/3, h/2, w/4, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(2*w/3, h/2, w/4, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = "20px CMSY10";
        ctx.fillText(scores[0], 20, 30); // nil scores
        ctx.fillText(a, w/4, 40); // a heading
        ctx.fillText(b, 3*w/5, 40); // b heading
        ctx.fillText(scores[1], w/4, h/2); // a scores
        ctx.fillText(scores[2], w/2, h/2); // a n b scores
        ctx.fillText(scores[3], 3*w/4, h/2); // b scores
    }

    drawCanvasVennTripleHighlight(type, a, b, c, scores) {
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 400;
        canvas.width = 400;
        let ctx = canvas.getContext("2d");
        ctx.save();

        let w = 400, h = 400, r = w/4;
        ctx.fillStyle = 'green';

        if (type === 1) {
            // total
            ctx.fillRect(0, 0, w, h);
        } else if (type === 2) {
            // a 
            ctx.arc(w/3, h/3, r, 0, 2 * Math.PI);
            ctx.fill();
        } else if (type === 3) {
            // a only
            ctx.arc(w/3, h/3, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(2*w/3, h/3, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.arc(w/2, Math.sqrt(3) * (w/6) + h/3, r, 0, 2 * Math.PI);
            ctx.fill();
        } else if (type === 4) {
            // b only
            ctx.arc(2*w/3, h/3, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(w/3, h/3, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.arc(w/2, Math.sqrt(3) * (w/6) + h/3, r, 0, 2 * Math.PI);
            ctx.fill();
        } else if (type === 5) {
            // b 
            ctx.arc(2*w/3, h/3, r, 0, 2 * Math.PI);
            ctx.fill();
        } else if (type === 6) {
            // a n b
            let x1 = (1/6)*w;
            let y1 = (1/6)*w;
            ctx.beginPath();
            for (let i = 0; i < canvas.width; i++) {
                for (let j = 0; j < canvas.height; j++) {
                    let x = i - canvas.width/2;
                    let y = canvas.height/2 - j;
                    
                    ctx.fillStyle = "green";
                    if ((x - x1)**2 + (y - y1)**2 < r**2 && (x + x1)**2 + (y - y1)**2 < r**2) {
                        ctx.fillRect(i, j, 1, 1);
                    }         
                }
            } 
        } else if (type === 7) {
            // a n c
            let x1 = w/3 - w/2;
            let y1 = h/2 - h/3;
            let y2 = h/2 - (Math.sqrt(3) * (w/6) + h/3);
            ctx.beginPath();
            for (let i = 0; i < canvas.width; i++) {
                for (let j = 0; j < canvas.height; j++) {
                    let x = i - canvas.width/2;
                    let y = canvas.height/2 - j;
                    
                    ctx.fillStyle = "green";
                    if ((x - x1)**2 + (y - y1)**2 < r**2 && (x)**2 + (y - y2)**2 < r**2) {
                        ctx.fillRect(i, j, 1, 1);
                    }         
                }
            } 
        } else if (type === 8) {
            // b n c
            let x1 = 2*w/3 - w/2;
            let y1 = h/2 - h/3;
            let y2 = h/2 - (Math.sqrt(3) * (w/6) + h/3);
            ctx.beginPath();
            for (let i = 0; i < canvas.width; i++) {
                for (let j = 0; j < canvas.height; j++) {
                    let x = i - canvas.width/2;
                    let y = canvas.height/2 - j;
                    
                    ctx.fillStyle = "green";
                    if ((x - x1)**2 + (y - y1)**2 < r**2 && (x)**2 + (y - y2)**2 < r**2) {
                        ctx.fillRect(i, j, 1, 1);
                    }         
                }
            } 
        } else if (type === 9) {
            // c only
            ctx.arc(w/2, Math.sqrt(3) * (w/6) + h/3, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(w/3, h/3, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.arc(2*w/3, h/3, r, 0, 2 * Math.PI);
            ctx.fill();
        } else if (type === 10) {
            // c 
            ctx.arc(w/2, Math.sqrt(3) * (w/6) + h/3, r, 0, 2 * Math.PI);
            ctx.fill();
        } else if (type === 11) {
            // a n b n c
            let x1 = w/3 - w/2;
            let x2 = 2*w/3 - w/2;
            let y1 = h/2 - h/3;
            let y3 = h/2 - (Math.sqrt(3) * (w/6) + h/3);
            ctx.beginPath();
            for (let i = 0; i < canvas.width; i++) {
                for (let j = 0; j < canvas.height; j++) {
                    let x = i - canvas.width/2;
                    let y = canvas.height/2 - j;
                    
                    ctx.fillStyle = "green";
                    if ((x - x1)**2 + (y - y1)**2 < r**2 && (x - x2)**2 + (y - y1)**2 < r**2 && x**2 + (y - y3)**2 < r**2) {
                        ctx.fillRect(i, j, 1, 1);
                    }         
                }
            } 
        } else {
            //nill
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = 'white';
            ctx.arc(w/3, h/3, r, 0, 2 * Math.PI);
            ctx.arc(2*w/3, h/3, r, 0, 2 * Math.PI);
            ctx.arc(w/2, Math.sqrt(3) * (w/6) + h/3, r, 0, 2 * Math.PI);
            ctx.fill();   
        }
        ctx.fillStyle = 'black';        
        ctx.beginPath();
        ctx.arc(w/3, h/3, r, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(2*w/3, h/3, r, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(w/2, Math.sqrt(3) * (w/6) + h/3, r, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.font = "20px CMSY10";
        ctx.fillText(scores[0], 20, 30); // nil scores
        ctx.fillText(a, 80, 25); // a heading
        ctx.fillText(b, 240, 25); // b heading
        ctx.fillText(c, 180, 370); // c heading
        ctx.fillText(scores[1], 100, 100); // a scores
        ctx.fillText(scores[2], 200, 100); // a n b scores
        ctx.fillText(scores[3], 300, 100); // b scores
        ctx.fillText(scores[4], 145, 200); // a n c scores
        ctx.fillText(scores[5], 200, 180); // a n b n c scores
        ctx.fillText(scores[6], 245, 200); // b n c scores
        ctx.fillText(scores[7], 200, 300); // c scores
    }
    
    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `        
        `;
    }

    writeExample = () => {
        document.getElementById("exampleTextID").innerHTML = `
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

export default ex02_venn_diagrams;