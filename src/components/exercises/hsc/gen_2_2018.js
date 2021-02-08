import React from 'react';
import {getRandomNumber, reset, answerType, shuffle, checkAns, getNames, resetCanvas} from '../MathFunctions';
import WorkspaceHsc from '../../WorkspaceHsc';

class gen_2_2018 extends React.Component {
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
    }
    
    componentDidMount(){
        document.querySelectorAll(".topicHeading")[0].innerHTML = "HSC Past Papers - 2018 Math General";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
        //document.getElementById("nextQuesBtnID").click(); // debugging
    }
    
    makeQuestion = () => {         
        document.getElementById("sideBarRightID").style.display = "block";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "";
        reset();
        answerType(1); // multiplechoice === 1
        document.getElementById("exampleVidID").style.display = "none";
        this.numQuestions += 1;
        let numQuestionTypes = 11;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let mcOptions;
        chooseQuestion = this.numQuestions;
        chooseQuestion = numQuestionTypes;
        let q = true;
        this.writeFormula();
        this.writeExample();
        if (chooseQuestion === 1) {
            mcOptions = this.fiveNumberSummary();
        } else if (chooseQuestion === 2) {
            mcOptions = this.indexAlgebra();
        } else if (chooseQuestion === 3) {
            mcOptions = this.fuelConsumption();
        } else if (chooseQuestion === 4) {
            mcOptions = this.townBearings();
        } else if (chooseQuestion === 5) {
            mcOptions = this.nannyRates();
        } else if (chooseQuestion === 6) {
            mcOptions = this.experimentalOutcomes();
        } else if (chooseQuestion === 7) {
            mcOptions = this.captureRecapture();
        } else if (chooseQuestion === 8) {
            mcOptions = this.dataTable();
        } else if (chooseQuestion === 9) {
            mcOptions = this.cosineRule();
        } else if (chooseQuestion === 10) {
            mcOptions = this.pyramidVolume();
        } else if (chooseQuestion === 11) {
            mcOptions = this.salePrice();
        } else {
            q = false;
            this.numQuestions = 0;
            document.querySelectorAll(".questionBody")[0].style.display = "none";
            document.querySelectorAll(".topicSubHeading")[0].innerHTML = "You scored " + this.numCorrect + " out of " + (this.numQuestions - 1) + " (" + (100 * this.numCorrect / (this.numQuestions - 1)).toFixed(0) + "%)";
            document.querySelectorAll(".topicSubHeading")[0].innerHTML += "<br />Press the button to start again";
            document.getElementById("startSessionBtnID").style.display = "block";
        }
        
        if (q === true) {
            document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + this.question_string;
            let correctAns = mcOptions[0];
            shuffle(mcOptions);
            let userAnswers = mcOptions;
            for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {
                document.querySelectorAll(".mcAnsBtn")[i].innerHTML = "<b>&#" + (i + 65) + ".</b>&emsp;" + document.querySelectorAll(".mcAnsBtn")[i].innerHTML;
                document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, userAnswers[i], this.question_string, "HSC Gen 2018")};
            }
            
        }
    }

    fiveNumberSummary = () => {
        let l = getRandomNumber(1, 10, 0, 0);
        let q1 = getRandomNumber(l + 1, l + 10, 0, 0);
        let q2 = getRandomNumber(q1 + 1, q1 + 10, 0, 0);
        let q3 = getRandomNumber(q2 + 1, q2 + 10, 0, 0);
        let h = getRandomNumber(q3 + 1, q3 + 10, 0, 0);
        let questionText = "A set of scores has the following five-number summary.";
        questionText += "<br><br>lower extreme = " + l;
        questionText += "<br>lower quartile = " + q1;
        questionText += "<br>median = " + q2;
        questionText += "<br>upper quartile = " + q3;
        questionText += "<br>upper extreme = " + h;
        questionText += "<br><br>What is the range?";
        this.question_string = questionText;

        this.Ans = h - l;
        this.mc1 = q3 - q1;
        this.mc2 = h;
        this.mc3 = h - l + 1;
        
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    indexAlgebra = () => {
        // ax0 + b
        // (ax)0 + b
        let a = getRandomNumber(1, 10, 0, 1);
        let b = getRandomNumber(1, 10, 0, 0);
        let ans, questionText = "What is the value of ";
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText += a + "<span>x</span><sup>0</sup> + " + b;
            ans = a + b;
        } else {
            questionText += "(" + a + "<span>x</span>)<sup>0</sup> + " + b;
            ans = 1 + b;
        }
        this.question_string = questionText;
        document.getElementById("formulaTextID").innerHTML = "1 = <sup>0</sup> (5x)<br>5x<sup>0</sup> = 5";
        this.Ans = ans;
        this.mc1 = (ans + getRandomNumber(1, 5, 0, 1));
        this.mc2 = (ans + getRandomNumber(1, 5, 0, 1));
        this.mc3 = (ans + getRandomNumber(1, 5, 0, 1));
        
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    fuelConsumption = () => {
        let d = getRandomNumber(10, 50, 0, 0);
        let n = getRandomNumber(3, 5, 0, 0);
        let l = getRandomNumber(5, 12, 0, 0);
        let name = getNames(1)[0];
        
        let questionText = "The driving distance from " + name + "'s home to work is " + d + " km. " + name + " drives to and from work " + n + " times each week. " + name + "'s car uses fuel at the rate of " + l + " L /100 km.";
        questionText += "<br><br>How much fuel does " + name + " use driving to and from work each week?";
        this.question_string = questionText;

        let ans = d * 2 * n * l / 100;
        this.Ans = (ans).toFixed(1) + " L";
        this.mc1 = (ans + getRandomNumber(3, 10, 1, 1)).toFixed(1) + " L";
        this.mc2 = (ans + getRandomNumber(3, 10, 1, 1)).toFixed(1) + " L";
        this.mc3 = (ans + getRandomNumber(3, 10, 1, 1)).toFixed(1) + " L";
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    drawCanvas = (theta) => {
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 300;
        canvas.width = 300;
        let ctx = canvas.getContext("2d");
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;

        let a_start = getRandomNumber(10, 30, 0, 0) / 100;
        ctx.moveTo(0.6 * canvas.width, a_start * canvas.height); // A point start 
        ctx.lineTo(0.2 * canvas.width, 0.6 * canvas.height); // AC line
        ctx.lineTo(0.6 * canvas.width, 0.9 * canvas.height); // CB line
        ctx.lineTo(0.6 * canvas.width, 0.1 * canvas.height); // BN line
        ctx.moveTo(0.6 * canvas.width - 6, 0.1 * canvas.height + 10); // N arrow
        ctx.lineTo(0.6 * canvas.width, 0.1 * canvas.height); // N arrow
        ctx.lineTo(0.6 * canvas.width + 6, 0.1 * canvas.height + 10); // N arrow



        ctx.font = "italic 20px CMSY10";
        ctx.fillText("N", 0.6 * canvas.width, 0.1 * canvas.height - 10); // "N"
        ctx.fillText("A", 0.6 * canvas.width + 10, a_start * canvas.height); // "A"
        ctx.fillText("B", 0.6 * canvas.width + 10, 0.9 * canvas.height); // "B"
        ctx.fillText("C", 0.2 * canvas.width - 15, 0.6 * canvas.height); // "C"
        ctx.fillText(theta, 0.6 * canvas.width - 25, a_start * canvas.height + 45); // theta
        ctx.fillRect(0.6 * canvas.width - 2, a_start * canvas.height - 2, 4, 4); // A point
        ctx.fillRect(0.6 * canvas.width - 2, 0.9 * canvas.height - 2, 4, 4); // B point
        ctx.fillRect(0.2 * canvas.width - 2, 0.6 * canvas.height - 2, 4, 4); // C point
        ctx.stroke();
        
    }

    townBearings = () => {
        let theta = getRandomNumber(10, 80, 0, 0);
        let questionText = "The diagram shows the positions of towns A, B and C. Town A is due north of town B and CAB = " + theta + "<sup>O</sup>.";
        questionText += "<br>What is the bearing of town C from town A?";
        this.question_string = questionText;

        resetCanvas();
        this.drawCanvas(theta);
        
        this.Ans = 180 + theta + "<sup>O</sup>";
        this.mc1 = 180 - theta + "<sup>O</sup>";
        this.mc2 = 90 + theta + "<sup>O</sup>";
        this.mc3 = 270 - theta + "<sup>O</sup>";
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    nannyRates = () => {
        let rate = 3 * getRandomNumber(4, 8, 0, 0);
        let start = getRandomNumber(7, 15, 0, 0);
        let end = getRandomNumber(start + 1, 22, 0, 0);
        let part = getRandomNumber(1, 2, 0, 0);
        let startTime = start + " am", endTime = end + ":" + 20 * part + "am";
        if (start >= 12) {
            startTime = (start - 12) + " pm";
        }
        if (end >= 12) {
            endTime = (end - 12) + ":" + 20 * part + " pm";
        }
        let questionText = "A nanny charges $" + rate + " per hour, or part thereof, for looking after a child. What does the nanny charge for looking after a child from " + startTime + " until " + endTime + " on a particular day?";
        this.question_string = questionText;
        let ans = rate * (end - start + part / 3);
        this.Ans = "$" + (ans.toFixed(0));
        this.mc1 = "$" + ((ans + getRandomNumber(1, 5, 0, 1)).toFixed(0));
        this.mc2 = "$" + ((ans + getRandomNumber(1, 5, 0, 1)).toFixed(0));
        this.mc3 = "$" + ((ans + getRandomNumber(1, 5, 0, 1)).toFixed(0));
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    experimentalOutcomes = () => {
        let a = getRandomNumber(1, 49, 0, 0);
        let b = getRandomNumber(1, 49, 0, 0);
        let c = 100 - a - b;
        let n = 100 * getRandomNumber(2, 6, 0, 0);
        let questionText = "An experiment has three distinct outcomes, A, B and C. Outcome A occurs " + a + "% of the time. Outcome B occurs " + b + "% of the time.";
        questionText += "<br><br>What is the expected number of times outcome C would occur if the experiment is conducted " + n + " times?";
        this.question_string = questionText;
        this.Ans = (c * n / 100).toFixed(0);
        this.mc1 = (getRandomNumber(3, 20, 0, 0) + c * n / 100).toFixed(0);
        this.mc2 = (getRandomNumber(3, 20, 0, 0) + c * n / 100).toFixed(0);
        this.mc3 = (getRandomNumber(3, 20, 0, 0) + c * n / 100).toFixed(0);
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    captureRecapture = () => {
        let a = getRandomNumber(50, 100, 0, 0);        
        let c = getRandomNumber(20, a - 5, 0, 0);
        let b = getRandomNumber(c + 5, 100, 0, 0);
        document.getElementById("exampleVidID").style.display = "block";
        document.getElementById("exampleVidID").src = "https://www.youtube.com/embed/IgYrPnA14tM";
        let questionText = "A biologist caught a random sample of " + a + " parrots in a national park. She tagged them and then released them. She later returned to the park and caught a random sample of " + b + " parrots. In this sample " + c + " had been tagged.";
        questionText += "<br><br>Using the capture/recapture technique, what is the estimated number of parrots in the park?";
        this.question_string = questionText;

        this.Ans = (a * b / c).toFixed(0);
        this.mc1 = (getRandomNumber(1, 10, 0, 1) + a * b / c).toFixed(0);
        this.mc2 = (getRandomNumber(1, 10, 0, 1) + a * b / c).toFixed(0);
        this.mc3 = (getRandomNumber(1, 10, 0, 1) + a * b / c).toFixed(0);
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    dataTable = () => {
        let questionText = "A set of data is summarised in this frequency distribution table.";
        questionText += "<br><br><table><tbody><tr><th>Score</th><th>Freq</th></tr>";
        let rows = getRandomNumber(3, 6, 0, 0);
        let start = getRandomNumber(1, 100, 0, 0);
        let scores = [];
        let freqs = [];
        for (let i = 0; i < rows; i++) {
            scores[i] = start + i;
            freqs[i] = getRandomNumber(1, 7, 0, 0);
        }

        let n = getRandomNumber(0, rows-1, 0, 0);
        freqs[n] = getRandomNumber(8, 10, 0, 0);
        let mode = scores[n];
        let sum = 0;

        for (let i = 0; i < rows; i++) {
            sum += freqs[i];
            questionText += "<tr><td>" + scores[i] + "</td><td>" + freqs[i] + "</td></tr>";
        }
        questionText += "<tr><td>Total</td><td>" + sum + "</td></tr>";
        this.question_string = questionText;
        
        let median, med = 0;
        if (sum % 2 === 0) {
            for (let i = 0; i < rows; i++) {
                console.log(med);
                if (med + freqs[i] === sum / 2) {
                    median = (scores[i] + scores[i+1]) / 2;
                    i = rows;
                }
                if (med + freqs[i] > (sum / 2)) {
                    median = scores[i];
                    i = rows;
                }
                med += freqs[i];
            }
        } else {
            for (let i = 0; i < rows; i++) {
                if (med + freqs[i] > (sum / 2)) {
                    median = scores[i];
                    i = rows;
                }
                med += freqs[i];

            }
        }

        let modeX = (-1) ** getRandomNumber(1, 2, 0, 0);
        let medX = (-1) ** getRandomNumber(1, 2, 0, 0);
        this.Ans = "Mode = " + mode + ", median = " + median;
        this.mc1 = "Mode = " + mode + ", median = " + (median + medX);
        this.mc2 = "Mode = " + (mode + modeX) + ", median = " + median;
        this.mc3 = "Mode = " + (mode + modeX) + ", median = " + (median + medX);
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;       
    }

    
    drawCanvasCosine = (a, b, c) => {
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 300;
        canvas.width = 300;
        let ctx = canvas.getContext("2d");
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;

        let start_x = getRandomNumber(40, 60, 0, 0) / 100;
        ctx.moveTo(start_x * canvas.width, 0.1 * canvas.height); // triangle point start
        ctx.lineTo(getRandomNumber(10, 30, 0, 0) * canvas.width / 100, 0.8 * canvas.height); // triangle point left
        ctx.lineTo(getRandomNumber(70, 90, 0, 0) * canvas.width / 100, 0.8 * canvas.height); // triangle point right
        ctx.lineTo(start_x * canvas.width, 0.1 * canvas.height); // triangle point start

        ctx.font = "20px CMSY10";
        ctx.fillText(a + " m", 0.15 * canvas.width, 0.5 * canvas.height); // a
        ctx.fillText(b + " m", 0.75 * canvas.width, 0.5 * canvas.height); // b
        ctx.fillText(c + " m", 0.4 * canvas.width, 0.9 * canvas.height); // c
        ctx.fillText("\u03b8", start_x * canvas.width - 7, 0.2 * canvas.height); // c
        ctx.stroke();
        
    }


    cosineRule = () => {
        document.getElementById("formulaTextID").innerHTML = "cos C = (a<sup>2</sup> + b<sup>2</sup> - c<sup>2</sup>)/2ab";
        let a = getRandomNumber(7, 12, 0, 0);
        let b = getRandomNumber(7, 12, 0, 0);
        let c = getRandomNumber(7, 12, 0, 0);
        resetCanvas();
        this.drawCanvasCosine(a, b, c);
        
        let questionText = "What is the value of <span>&#952;</span>, marked on the diagram, to the nearest degree?";
        this.question_string = questionText;
        
        let ans = Math.acos(((a**2) + (b**2) - (c**2))/(2*a*b)) * 180 / Math.PI;
        this.Ans = ans.toFixed(0) + "<sup>O</sup>";
        this.mc1 = (ans + getRandomNumber(5, 15, 0, 1)).toFixed(0) + "<sup>O</sup>";
        this.mc2 = (ans + getRandomNumber(5, 15, 0, 1)).toFixed(0) + "<sup>O</sup>";
        this.mc3 = (ans + getRandomNumber(5, 15, 0, 1)).toFixed(0) + "<sup>O</sup>";
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;   
    }

    drawCanvasPyramid = (b, l, h) => {
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 300;
        canvas.width = 500;
        let ctx = canvas.getContext("2d");
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;

        let btmLft = getRandomNumber(10, 25, 0, 0) / 100;
        let btmRt = getRandomNumber(60, 70, 0, 0) / 100;
        let midRt = getRandomNumber(80, 90, 0, 0) / 100;
        ctx.moveTo(0.5 * canvas.width, 0.1 * canvas.height); // triangle point start
        ctx.lineTo(btmLft * canvas.width, 0.8 * canvas.height); // triangle point bottom left
        ctx.lineTo(btmRt * canvas.width, 0.8 * canvas.height); // triangle point bottom right
        ctx.lineTo(0.5 * canvas.width, 0.1 * canvas.height); // triangle point start
        ctx.lineTo(midRt * canvas.width, 0.5 * canvas.height); // triangle point mid right
        ctx.lineTo(btmRt * canvas.width, 0.8 * canvas.height); // triangle point bottom right
        ctx.stroke();
        
        ctx.font = "italic 20px CMSY10";
        ctx.fillText(b + "x", 0.35 * canvas.width, 0.9 * canvas.height); // b
        ctx.fillText(l + "x", 0.8 * canvas.width, 0.7 * canvas.height); // l
        ctx.fillText(h + "x", 0.45 * canvas.width, 0.45 * canvas.height); // h
        ctx.stroke();

        let midLft = getRandomNumber(35, 40, 0, 0) / 100;
        ctx.setLineDash([5, 3]);
        ctx.moveTo(0.5 * canvas.width, 0.6 * canvas.height); // triangle point mid bottom
        ctx.lineTo(0.5 * canvas.width, 0.1 * canvas.height); // triangle point start
        ctx.lineTo(midLft * canvas.width, 0.5 * canvas.height); // triangle point mid left
        ctx.lineTo(btmLft * canvas.width, 0.8 * canvas.height); // triangle point bottom left
        ctx.moveTo(midLft * canvas.width, 0.5 * canvas.height); // triangle point mid left
        ctx.lineTo(midRt * canvas.width, 0.5 * canvas.height); // triangle point mid right
        ctx.stroke();

    }

    pyramidVolume = () => {
        document.getElementById("formulaTextID").innerHTML = "V = Ah/3";
        let n = [getRandomNumber(2, 10, 0, 0), getRandomNumber(2, 10, 0, 0), getRandomNumber(2, 9, 0, 0)];
        if (n[0] % 3 !== 0 && n[1] % 3 !== 0 && n[2] % 3 !== 0) {
            n[getRandomNumber(0, 2, 0, 0)] = 3;
        }
        
        resetCanvas();
        this.drawCanvasPyramid(n[0], n[1], n[2]);

        let questionText = "What is the volume of the pyramid?";
        this.question_string = questionText;

        let ans = n[0] * n[1] * n[2] / 3;
        this.Ans = ans.toFixed(0) + "<span>x</span><sup>3</sup>";
        this.mc1 = (ans + getRandomNumber(5, 15, 0, 1)).toFixed(0) + "<span>x</span><sup>3</sup>";
        this.mc2 = (ans + getRandomNumber(5, 15, 0, 1)).toFixed(0) + "<span>x</span><sup>3</sup>";
        this.mc3 = (ans + getRandomNumber(5, 15, 0, 1)).toFixed(0) + "<span>x</span><sup>3</sup>";
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;   
    }

    salePrice = () => {        
        let questionText = "To determine the retail price of an item, a shop owner increases its cost price by 30%. In a sale, the retail price is reduced by 30% to give the sale price.";
        questionText += "<br><br>How does the sale price compare to the cost price?";
        this.question_string = questionText;

        this.Ans = "The sale price is less than the cost price.";
        this.mc1 = "The sale price is the same as the cost price";
        this.mc2 = "The sale price is more than the cost price";
        this.mc3 = "It is impossible to compare without knowing the cost price";
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
                <WorkspaceHsc />
            </div>
            
        );
    }
}  

export default gen_2_2018;