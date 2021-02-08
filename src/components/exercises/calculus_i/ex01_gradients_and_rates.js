import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns, resetCanvas} from '../MathFunctions';
import Workspace from '../../Workspace';
import {gradient, gradientSigns, limitEvaluation} from './calculus_i_exercises';

class ex01_gradients_and_rates extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Calculus I";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This is an introduciton to calculus. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
        this.makeQuestion(); // debugging
    }
    
    makeQuestion = () => { 
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(3, numQuestionTypes, 0, 0);
        //chooseQuestion = numQuestionTypes;
        let correctAns, result;        
        if (chooseQuestion === 1) {
            result = gradient();
        } else if (chooseQuestion === 2) {
            result = gradientSigns();
        } else if (chooseQuestion === 3) {
            result = limitEvaluation();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        this.question_string = result[0];
		document.getElementById("questionStringID").innerHTML = result[0];
		correctAns = result[1];
        //let mcOptions = result.slice(1, result.length);
        let mcOptions = result.slice(1, 5);
        correctAns = mcOptions[0];
        let review = [""];
        if (result.length > 4) {
            review = result.slice(5, result.mcOptions);

        }
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {this.checkAnsReview(review, correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "calculus i ex01")};
        }

        this.writeFormula();
        this.writeExample();

    }

    checkAnsReview = (review, cA, uA, qs, t) => {
        if (review[0] === "gradientSigns") {
            let sign = review[1];
            let xValues = review[2];
            resetCanvas();
            let canvas = document.getElementById("canvasID");
            canvas.style.backgroundColor = "white";
            canvas.style.display = "block";
            canvas.style.marginLeft = "auto";
            canvas.style.marginRight = "auto";
            let ctx = canvas.getContext("2d");
            ctx.save();
            
            // draw axis
            ctx.lineWidth = 2;
            ctx.moveTo(canvas.width/2, 10);
            ctx.lineTo(canvas.width/2, canvas.height - 10);
            ctx.moveTo(10, canvas.height/2);
            ctx.lineTo(canvas.width - 10, canvas.height/2);

            // draw arrows
            ctx.moveTo(canvas.width/2-5, 20);
            ctx.lineTo(canvas.width/2, 10);
            ctx.lineTo(canvas.width/2+5, 20);
            ctx.moveTo(canvas.width/2-5, canvas.height - 20);
            ctx.lineTo(canvas.width/2, canvas.height - 10);
            ctx.lineTo(canvas.width/2+5, canvas.height - 20);
            ctx.moveTo(20, canvas.height/2-5);
            ctx.lineTo(10, canvas.height/2);
            ctx.lineTo(20, canvas.height/2+5);
            ctx.moveTo(canvas.width-20, canvas.height/2-5);
            ctx.lineTo(canvas.width-10, canvas.height/2);
            ctx.lineTo(canvas.width-20, canvas.height/2+5);

            ctx.stroke();
            ctx.restore();

            if (xValues.length === 1) {
                // quadratic
                let xp = 50;
                let k = 5;
                //let yp = (Math.floor(-k * sign * ((xp-canvas.width/2)/k - k*xValues[0]) * ((xp-canvas.width/2)/k + k*2*xValues[0])) + canvas.height/2)/10;        
                let yp = Math.floor(-k * sign * ((xp-canvas.width/2)/k - k*xValues[0]) * ((xp-canvas.width/2)/k + k*(1/2)*xValues[0])/30  + canvas.height/2);
                ctx.moveTo(xp, yp);
                while (xp < 450) {
                    xp += 1;
                    yp = Math.floor(-k * sign * ((xp-canvas.width/2)/k - k*xValues[0]) * ((xp-canvas.width/2)/k + k*(1/2)*xValues[0])/30  + canvas.height/2);
                    ctx.lineTo(xp, yp);
                    if (xp % 20 === 0) {
                        ctx.font = "20px CMSY10";
                        if (sign > 0) {
                            if (xp < canvas.width/2 + k*xValues[0]) {
                                ctx.fillText("-", xp, yp + 20);
                            } else {
                                ctx.fillText("+", xp, yp + 20);
                            }
                        } else {
                            if (xp < canvas.width/2 + k*xValues[0]) {
                                ctx.fillText("+", xp, yp - 20);
                            } else {
                                ctx.fillText("-", xp, yp - 20);
                            }
                        }
                    }
                }

                ctx.moveTo(canvas.width/2 + k*xValues[0], canvas.height/2-10);
                ctx.lineTo(canvas.width/2 + k*xValues[0], canvas.height/2+10);
                ctx.font = "20px CMSY10";
                ctx.fillText(xValues[0], canvas.width/2 + k*xValues[0] -10, canvas.height/2+30);
                ctx.stroke();

            }
        }
        checkAns(cA, uA, qs, t);
    }
    
    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
        gradient = rise / run
        `;
    }

    writeExample = () => {
        document.getElementById("exampleTextID").innerHTML = `
        gradient = rise / run
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

export default ex01_gradients_and_rates;