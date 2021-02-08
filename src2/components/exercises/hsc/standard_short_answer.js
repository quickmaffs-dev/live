import React from 'react';
import {getRandomNumber, reset, answerType,  resetCanvas, getNames, dpCheck, numberWithCommas, simplifyRatio} from '../MathFunctions';
import WorkspaceHsc from '../../WorkspaceHsc';

class standard_short_answer extends React.Component {
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
        this.numMarks = 0;
        this.originalQuestionSrc = "";
        this.correctAns = "";
        this.correctAnsWorking = "";
    }
    
    componentDidMount(){
        document.querySelectorAll(".topicHeading")[0].innerHTML = "HSC Past Papers - 2019 Math Standard";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
        document.getElementById("nextQuesBtnID").click(); // debugging
    }
    
    makeQuestion = () => {         
        document.getElementById("startSessionBtnID").style.display = "none";
        document.getElementById("sideBarRightID").style.display = "block";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "";
        reset();
        answerType(4); // show ans === 1
        document.getElementById("exampleVidID").style.display = "none";
        this.numQuestions += 1;
        let numQuestionTypes = 13;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        chooseQuestion = this.numQuestions;
        chooseQuestion = numQuestionTypes;        
        let q = true;
        if (chooseQuestion === 1) {
            this.wageProblem();
        } else if (chooseQuestion === 2) {
            this.surferTrig();
        } else if (chooseQuestion === 3) {
            this.interestProblem();
        } else if (chooseQuestion === 4) {
            this.interestProblem2();
        } else if (chooseQuestion === 5) {
            this.hemisphereVolume();
        } else if (chooseQuestion === 6) {
            this.cosineRule();
        } else if (chooseQuestion === 7) {
            this.dividendYield();
        } else if (chooseQuestion === 8) {
            this.twoRightAngledTriangles();
        } else if (chooseQuestion === 9) {
            this.kilocalories();
        } else if (chooseQuestion === 10) {
            this.appleConditionalProbabilty();
        } else if (chooseQuestion === 11) {
            this.creditCardStatement();
        } else if (chooseQuestion === 12) {
            this.bloodAlcoholContent();
        } else if (chooseQuestion === 13) {
            this.incomeTax();
        } else {
            q = false;
            this.numQuestions = 0;
            document.querySelectorAll(".questionBody")[0].style.display = "none";
            document.querySelectorAll(".topicSubHeading")[0].innerHTML = "You scored " + this.numCorrect + " out of " + (this.numQuestions - 1) + " (" + (100 * this.numCorrect / (this.numQuestions - 1)).toFixed(0) + "%)";
            document.querySelectorAll(".topicSubHeading")[0].innerHTML += "<br />Press the button to start again";
            document.getElementById("startSessionBtnID").style.display = "block";
        }
        
        if (q === true) {
            document.getElementById("questionStringID").innerHTML = "<p style='font-style:italic; font-size:16px'>This is " + this.originalQuestionSrc;
            document.getElementById("questionStringID").innerHTML += "<br><b>Question " + this.numQuestions + "</b>&emsp; (" + this.numMarks + " marks)<br>";
            document.getElementById("questionStringID").innerHTML += "<br>" + this.question_string;
            document.getElementById("showAnsBtn").style.display = "block";
            document.getElementById("showAnsBtn").onclick = () => {this.revealCorrectAnswer()};
            
            this.writeFormula();
            this.writeExample();
        }
    }

    revealCorrectAnswer = () => {
        document.getElementById("showAnsBtn").style.display = "none";
        document.getElementById("showCorrectWorkBtn").style.display = "block";
        document.getElementById("correctWork").innerHTML = "<b>Correct answer:</b><br>" + this.correctAns;
        document.getElementById("showCorrectWorkBtn").onclick = () => {this.showWorking()};
        document.getElementById("nextQuesBtnID").style.display = "block";

    }

    showWorking = () => {
        document.getElementById("showCorrectWorkBtn").style.display = "none";
        document.getElementById("correctWork").innerHTML = "<b>Correct answer:</b><br>" + this.correctAnsWorking;
    }

    wageProblem = () => {        
        let wage = getRandomNumber(15, 50, 0, 0);
        let travelAllowance = getRandomNumber(7, 15, 0, 0);
        let hours = getRandomNumber(5, 10, 0, 0);

        let questionText = getNames(1)[0] + " earns $" + wage + " per hour. They are also paid a travel allowance of $" + travelAllowance + " per shift.";
        questionText += "<br><br>How much will they earn for a " + hours + " hour shift?";
        this.question_string = questionText;
        this.originalQuestionSrc = "question 11 from Math Standard 1 2019 HSC";
        this.numMarks = 2;

        this.correctAns = "$" + dpCheck(wage * hours + travelAllowance);
        
        this.correctAnsWorking = "<table id='showWorkingOutTable'><tbody><tr><td>Pay for shift</td><td> = $" + wage + " &#215; " + hours + " hours + $" + travelAllowance + "</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + this.correctAns + "</td></tr></tbody</table>";
    }

    drawCliff = (d, theta) => {
        resetCanvas();
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 200;
        let ctx = canvas.getContext("2d");
        ctx.save();
        
        // draw cliff
        let spread = 90;
        ctx.moveTo(30, 20);
        ctx.lineTo(90, 20);
        for (let i = 20; i <= 165; i+=3) {
            //let spread = 90 + getRandomNumber(1, 1, 0, 1);
            spread += getRandomNumber(1, 1, 0, 1);
            if (spread >= 99) {
                spread = 98;
            }
            if (spread < 80) {
                spread = 80;
            }            
            ctx.lineTo(spread, i);
        }
        // draw water        
        let x = spread;
        while (x < 450) {
            ctx.lineTo(x, 165 + Math.sin(x));
            x++;
        }
        
        // draw triangle
        ctx.moveTo(100, 20);
        ctx.lineTo(100, 160);
        ctx.lineTo(200 + d, 160);
        ctx.lineTo(100, 20);
        // right angle
        ctx.moveTo(100, 150);
        ctx.lineTo(110, 150);
        ctx.lineTo(110, 160);

        // arrows
        ctx.moveTo(100, 180);
        ctx.lineTo(45 + d, 180);
        ctx.moveTo(100 + d, 180);
        ctx.lineTo(200 + d, 180);
        ctx.moveTo(110, 175);
        ctx.lineTo(100, 180);
        ctx.lineTo(110, 185);
        ctx.moveTo(190+d, 175);
        ctx.lineTo(200+d, 180);
        ctx.lineTo(190+d, 185);
        ctx.stroke();
        ctx.restore();


        // text
        ctx.font = "italic 16px CMSY10";
        ctx.fillText("h", 110, 100);
        ctx.fillText(theta, 140 + d, 150);
        ctx.font = "16px CMSY10";
        ctx.fillText("Cliff", 30, 35);
        ctx.fillText(d + " m", 50 + d, 185);
        
    }
    
    surferTrig = () => {
        let d = getRandomNumber(100, 200, 0, 0);
        let theta = getRandomNumber(10, 80, 0, 0);
        this.drawCliff(d, theta);
        let questionText = "A surfer is " + d + " metres out to sea. From that point, the angle of elevation to the top of a cliff is " + theta + "<sup>O</sup>";
        questionText += "<br>How high is the cliff, to the nearest metre?";
        this.question_string = questionText;
        this.originalQuestionSrc = "question 12 from Math Standard 1 2019 HSC";
        this.numMarks = 2;

        this.correctAns = (d * Math.tan(theta * Math.PI/180)).toFixed(0) + " m";

        
        this.correctAnsWorking = "Using the tan ratio from SOH CAH TOA,";
        this.correctAnsWorking += "<table id='showWorkingOutTable'><tbody><tr><td>tan " + theta + "<sup>O</sup></td><td> = <sup>h</sup> / <sub>" + d + "</sub></td></tr>";
        this.correctAnsWorking += "<tr><td>&#8756; h</td><td> = " + d + " &#215; tan " + theta + "<sup>O</sup></td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + (d * Math.tan(theta * Math.PI/180)).toFixed(5) + "...</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + this.correctAns + "</td></tr></tbody></table>";
    }

    interestProblem = () => {
        let name = getNames(1)[0];
        let p = 100 * getRandomNumber(10, 100, 0, 0);
        let years = getRandomNumber(3, 10, 0, 0);
        let repayments = Math.floor(p / (years * 12));
        if (repayments < 100) {
            repayments = 100;
        } else {
            repayments = 100 * Math.floor(repayments / 100) + 100;
        }

        let questionText = name + " borrowed $" + numberWithCommas(p) + " from a bank. They repaid the loan in full with payments of $" + repayments + " every month for " + years + " years.";
        questionText += "<br>How much interest did " + name + " pay to the bank?";
        this.question_string = questionText;
        this.originalQuestionSrc = "question 13 from Math Standard 1 2019 HSC";
        this.numMarks = 2;

        this.correctAns = "$" + (12 * years * repayments - p);

        this.correctAnsWorking = "<table id='showWorkingOutTable'><tbody><tr><td>Interest</td><td> = Total paid - amount borrowed</td></tr></tbody</table>";
        this.correctAnsWorking += "<br><table id='showWorkingOutTable'><tbody><tr></tr><tr><td>Total paid</td><td> = 12 monthly payments of $" + repayments + " for " + years + " years</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = 12 &#215; $" + repayments + " &#215; " + years + "</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = $" + numberWithCommas(12 * repayments * years) + "</td></tr></tbody</table>";
        this.correctAnsWorking += "<br><table id='showWorkingOutTable'><tbody><tr></tr><tr><td>Amount borrowed</td><td> = $" + p + "</td></tr></tbody</table>";
        this.correctAnsWorking += "<br><table id='showWorkingOutTable'><tbody><tr></tr><tr><td>Interest</td><td> = $" + (12 * repayments * years) + " - $" + p + "</td></tr>";;
        this.correctAnsWorking += "<tr><td></td><td> = " + this.correctAns + "</td></tr></tbody></table>";
    }

    interestProblem2 = () => {
        let p = 100 * getRandomNumber(10, 100, 0, 0);
        let n = getRandomNumber(6, 24, 0, 0);
        let r = getRandomNumber(3, 9, 0, 0);

        let questionText = "What is the interest earned when $" + numberWithCommas(p) + " is invested for " + n + " months at a simple interest rate of " + r + "% per annum?";
        this.question_string = questionText;
        this.originalQuestionSrc = "question 16 from Math Standard 1 2019 HSC";
        this.numMarks = 2;

        this.correctAns = "$" + (p * (r/100) * n / 12).toFixed(2);

        this.correctAnsWorking = "We are going to use the Simple Interest Formula: <span>I=PRN</span>, but first we need to get the number of years as interest is paid per annum:";
        this.correctAnsWorking += n + " months = <sup>" + n + "</sup>/<sub>12</sub> years";
        this.correctAnsWorking += "<table id='showWorkingOutTable'><tbody><tr><td>Interest</td><td> = PRN</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = $" + p + " &#215; " + r + "% &#215; <sup>" + n + "</sup>/<sub>12</sub></td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + this.correctAns + "</td></tr></tbody</table>";
    }

    drawHemisphere = (d) => {
        resetCanvas();
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 200;
        let ctx = canvas.getContext("2d");
        ctx.save();
        
        // draw bowl
        /*
        ctx.moveTo(190+d, 175);
        ctx.lineTo(200+d, 180);
        ctx.lineTo(190+d, 185);
        ctx.stroke();
        ctx.restore();
        */
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height * 0.2, canvas.height * 0.6, 0, - Math.PI);
        ctx.stroke();

        // draw ellipse
        let xPos, yPos;
        let centerX = canvas.width/2, centerY = canvas.height * 0.2;
        let cxt = ctx;
        for (let i = 0 * Math.PI; i < 2 * Math.PI; i += 0.01 ) {
            xPos = centerX - (30 * Math.sin(i)) * Math.sin(0 * Math.PI) + (120 * Math.cos(i)) * Math.cos(0 * Math.PI);
            yPos = centerY + (120 * Math.cos(i)) * Math.sin(0 * Math.PI) + (30 * Math.sin(i)) * Math.cos(0 * Math.PI);        
            if (i === 0) {
                cxt.moveTo(xPos, yPos);
            } else {
                cxt.lineTo(xPos, yPos);
            }
        }
        cxt.stroke();       

        // text
        ctx.font = "16px CMSY10";
        ctx.fillText(d + "cm", canvas.width/2 - 40, 35);        

        // dashed line
        ctx.setLineDash([5, 3]);
        ctx.moveTo(canvas.width/2 - canvas.height * 0.6, canvas.height * 0.2);
        ctx.lineTo(canvas.width/2 + canvas.height * 0.6, canvas.height * 0.2);
        ctx.stroke();
    }
    
    hemisphereVolume = () => {
        let d = getRandomNumber(10, 20, 0, 0);
        //d = 16;
        this.drawHemisphere(d);

        let questionText = "A bowl in the shape of a hemisphere has diameter " + d + "cm. <br>What is the volume of this bowl, correct to the nearest cubic centimetre?";
        this.question_string = questionText;
        this.originalQuestionSrc = "question 16 from Math Standard 2 2019 HSC";
        this.numMarks = 2;

        this.correctAns = (((4/3) * Math.PI * ((d/2) ** 3))/2).toFixed(0) + "cm<sup>3</sup>";

        this.correctAnsWorking = "Using the volume formula of a sphere: <i>V=<sup>4</sup> / <sub>3</sub> &#960 r<sup>3</sup></i>";
        this.correctAnsWorking += "<br>Since we are given the diameter as " + d + " cm, we half this to get the radius as:";
        this.correctAnsWorking += "<br><i>r</i> = <sup><i>d</i></sup> / <sub>2</sub> = <sup>" + d + "</sup> / <sub>2</sub> = " + (d/2) + " cm";
        this.correctAnsWorking += "<table id='showWorkingOutTable'><tbody><tr><td>Volume</td><td> = <sup>4</sup> / <sub>3</sub> &#960 r<sup>3</sup></td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = <sup>4</sup> / <sub>3</sub> &#960 " + (d/2) + " <sup>3</sup></td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + ((4/3) * Math.PI * ((d/2) ** 3)).toFixed(4) + "...</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + (((4/3) * Math.PI * ((d/2) ** 3))/2).toFixed(4) + "... (hemisphere so take half only)</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + this.correctAns + "</td></tr></tbody</table>";
    }

    drawCosineTriangle = (a, b, theta) => {
        resetCanvas();
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 200;
        let ctx = canvas.getContext("2d");
        ctx.save();
        
        // draw triangle
        ctx.moveTo(250, 20);
        ctx.lineTo(170, 150);
        ctx.lineTo(310, 180);
        ctx.lineTo(250, 20);
        ctx.stroke();

        // text
        ctx.font = "16px CMSY10";
        ctx.fillText(a + " cm", 160, 100);
        ctx.fillText(b + " cm", 210, 185);
        ctx.fillText(theta, 180, 150);
        ctx.font = "italic 16px CMSY10";
        ctx.fillText("x", 290, 100);

    }

    cosineRule = () => {
        let a = getRandomNumber(10, 20, 0, 0);
        let b = getRandomNumber(10, 20, 0, 0);
        let theta = getRandomNumber(40, 80, 0, 0);

        //a = 11;
        //b = 13;
        //theta = 80;

        this.drawCosineTriangle(a, b, theta);

        let questionText = "A diagram shows a triangle with sides of length <i>x</i> cm, " + a + " cm and " + b + " cm and an angle of " + theta + "<sup>O</sup>.";
        questionText += "<br>Use the cosine rule to calculate the value of <i>x</i>, correct to 2 significant figures";
        this.question_string = questionText;
        this.originalQuestionSrc = "question 17 from Math Standard 2 2019 HSC";
        this.numMarks = 3;

        this.correctAns = Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(theta * Math.PI / 180)).toPrecision(2) + " cm";

        this.correctAnsWorking = "Using the cosine rule:";
        this.correctAnsWorking += "<table id='showWorkingOutTable'><tbody><tr><td><i>c<sup>2</sup></td><td> = <i>a</i><sup>2</sup> + <i>b</i><sup>2</sup> - </i>2<i>ab</i>cos<i>C</i></td></tr>";
        this.correctAnsWorking += "<tr><td><i>x<sup>2</sup></i></td><td> = " + a + "<sup>2</sup> + " + b + "<sup>2</sup> - 2 &#215;" + a  + "&#215;" + b + "cos( " + theta + "<sup>O</sup>)</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + (a ** 2 + b ** 2 - 2 * a * b * Math.cos(theta * Math.PI / 180)).toFixed(4) + "...</td></tr>";
        this.correctAnsWorking += "<tr><td><i>x</i></td><td> = &#8730;" + (a ** 2 + b ** 2 - 2 * a * b * Math.cos(theta * Math.PI / 180)).toFixed(4) + "...</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + this.correctAns + "</td></tr></tbody</table>";
    }

    dividendYield = () => {
        let n = getRandomNumber(1000, 2000, 0, 0);
        let value = getRandomNumber(10, 50, 2, 0);
        //n = 1526;
        //value = 8.75;
        let perc = getRandomNumber(5, 30, 0, 0);
        //perc = 8;
        let totalDiv = n * value * perc / 100;

        this.correctAns = perc + "%";
        
        let questionText = "A person owns " + n + " shares with a market value of $" + value.toFixed(2) + " per share. The total dividend received for these shares is $" + totalDiv.toFixed(2);
        questionText += "<br>Calculate the percentage dividend yield.";
        this.question_string = questionText;
        
        this.originalQuestionSrc = "question 21 from Math Standard 2 2019 HSC";
        this.numMarks = 2;

        this.correctAnsWorking = "Percentage dividend yield is dividend &#247; total value of shares";
        this.correctAnsWorking += "<br>total value of shares = number of shares &#215; value per share";
        this.correctAnsWorking += "<table id='showWorkingOutTable'><tbody><tr><td>percentage dividend yield</td><td> = $" + totalDiv.toFixed(2)  + " &#247; (" + n + " &#215; $" + value + ")</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + dpCheck(perc / 100) + "</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + this.correctAns + "</td></tr></tbody</table>";
    }

    drawTwoRightAngledTriangles = (a, b, c) => {
        resetCanvas();
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 200;
        let ctx = canvas.getContext("2d");
        ctx.save();
        
        // draw triangle
        ctx.moveTo(160, 90); // A
        ctx.lineTo(250, 20); // B
        ctx.lineTo(360, 165); // C
        ctx.lineTo(160, 165); // D
        ctx.lineTo(160, 90); // A
        ctx.lineTo(360, 165); // C

        // right angles
        ctx.moveTo(160, 155); // D
        ctx.lineTo(170, 155);
        ctx.lineTo(170, 165);

        ctx.moveTo(242, 27); // B
        ctx.lineTo(248, 34);
        ctx.lineTo(256, 27);
        ctx.stroke();

        // text
        ctx.font = "italic 16px CMSY10";
        ctx.fillText("A", 145, 90);
        ctx.fillText("B", 245, 15);
        ctx.fillText("C", 365, 170);
        ctx.fillText("D", 150, 180);
        ctx.fillText("\u03b8", 175, 90);

        ctx.font = "16px CMSY10";
        ctx.fillText(a + " cm", 160, 50);
        ctx.fillText(b + " cm", 110, 140);
        ctx.fillText(c + " cm", 230, 185);

    }

    twoRightAngledTriangles = () => {
        let a = getRandomNumber(4, 11, 1, 0);
        //a = 4.9;
        let b = getRandomNumber(2, a-1, 1, 0);
        //b = 2.5;
        let c = getRandomNumber(a+1, 13, 0, 0);
        //c = 6;
        this.drawTwoRightAngledTriangles(a, b, c);

        let questionText = "Two right-angled triangles, <i>ABC</i> and <i>ADC</i> are shown.";
        questionText += "Calculate the size of angle <i>&theta;</i> correct to the nearest minute";
        this.question_string = questionText;

        let hyp = Math.sqrt(b ** 2 + c ** 2);
        let ans = (Math.acos(a / hyp) * 180 / Math.PI);
        let min = (ans - Math.floor(ans)) * 60;
        this.correctAns = Math.floor(ans) + "<sup>O</sup>" + min.toFixed(0) + "'";
        
        this.originalQuestionSrc = "question 22 from Math Standard 2 2019 HSC";
        this.numMarks = 3;
        
        this.correctAnsWorking = "We can find <i>&theta;</i> using the trig ratio for cos (SOH CAH TOA) since we have the side <i>AB</i> but we will need to find side <i>AC</i>.";
        this.correctAnsWorking += "<br>We can find <i>AC</i> since triangle <i>ADC</i> is right-angled and we have sides <i>AD</i> and <i>CD</i>, using pythagoras theorem:";
        this.correctAnsWorking += "<br><table id='showWorkingOutTable'><tbody><tr><td><i>c<sup>2</sup></i></td><td> = <i>a<sup>2</sup></i> + <i>b<sup>2</sup></i></td></tr>";
        this.correctAnsWorking += "<tr><td><i>AC<sup>2</sup></i></td><td> = <i>AD<sup>2</sup></i> + <i>CD<sup>2</sup></i></td></tr>";
        this.correctAnsWorking += "<tr><td><i>AC<sup>2</sup></i></td><td> = " + b + "<sup>2</sup> + " + c + "<sup>2</sup></td></tr>";
        this.correctAnsWorking += "<tr><td><i>AC<sup>2</sup></i></td><td> = " + (b **2 + c ** 2) + "</td></tr>";
        this.correctAnsWorking += "<tr><td><i>AC</i></td><td> =  &#8730;" + (b **2 + c ** 2) + "</td></tr>";
        this.correctAnsWorking += "<tr><td><i>AC</i></td><td> = " + Math.sqrt(b **2 + c ** 2).toFixed(3) + "...</td></tr>";
        this.correctAnsWorking += "<tr style='opacity:0'><td>-</td><td></td></tr>";
        this.correctAnsWorking += "<tr><td>cos <i>&theta;</i></td><td> = <sup>A</sup> / <sub>H</sub></td></tr>";
        this.correctAnsWorking += "<tr><td>cos <i>&theta;</i></td><td> = <sup>" + a + "</sup> / <sub>" + Math.sqrt(b **2 + c ** 2).toFixed(3) + "</sub></td></tr>";
        this.correctAnsWorking += "<tr><td><i>&theta;</i></td><td> = cos<sup>-1 </sup>(<sup>" + a + "</sup> / <sub>" + Math.sqrt(b **2 + c ** 2).toFixed(3) + "</sub>)</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + (Math.acos(a / hyp) * 180 / Math.PI).toFixed(4) + "...</td></tr>";
        this.correctAnsWorking += "<tr><td></td><td> = " + this.correctAns + "</td></tr></tbody</table>";

    }

    kilocalories = () => {  
        let name = getNames(1)[0];      
        let kc = getRandomNumber(50, 100, 0, 0);
        //kc = 80;
        let kj = getRandomNumber(1500, 3000, 0, 0);
        //kj = 2180;
        let questionText = name + " uses " + kc + " kilocalories of energy per kilometre while they run.";
        questionText += "<br>They eat a burger that contains " + kj + " kilojoules of energy. How many kilometres will they need to run to use up all the energy from the burger?";
        questionText += "Correct to one decimal place (1 kilocalorie = 4.184 kilojoules)";
        this.question_string = questionText;

        this.correctAns = (kj / (kc * 4.184)).toFixed(1) + " km";
        
        this.originalQuestionSrc = "question 24 from Math Standard 2 2019 HSC";
        this.numMarks = 2;

        this.correctAnsWorking = "1 kilocalorie = 4.184 kilojoules"
        this.correctAnsWorking += "<br>&#8756; " + kc + " kilocalories = " + (4.184 * kc).toFixed(3) + " kilojoules";
        this.correctAnsWorking += "<br><br>" + kj + " kilojoules &#247 " + (4.184 * kc).toFixed(3);
        this.correctAnsWorking += "<br> = " + (kj/(4.184 * kc)).toFixed(3) + "...";
        this.correctAnsWorking += "<br> = " + this.correctAns;
    }

    appleConditionalProbabilty = () => {
        let names = getNames(2);      
        let a = getRandomNumber(3, 10, 0, 0);
        let b = getRandomNumber(3, 10, 0, 0);
        //a = 9;
        //b = 8;
        let questionText = "A bowl of fruit contains " + (a + b) + " apples of which " + a + " are red and " + b + " are green.";
        questionText += "<br>" + names[0] + " takes one apple at random and eats it. " + names[1] + " then takes an apple at random and eats it.";
        questionText += "<br>By drawing a probabilty tree diagram or otherwise, what is the probability that BOTH " + names[0] + " and " + names[1] + " eat apples of the same colour?";
        this.question_string = questionText;

        let n = simplifyRatio(a * (a-1) + b * (b-1), (a+b)*(a+b-1));        
        this.correctAns = "<sup>" + n[0] + "</sup> / <sub>" + n[1] + "</sub>";
        
        this.originalQuestionSrc = "question 25 from Math Standard 2 2019 HSC";
        this.numMarks = 3;

        this.correctAnsWorking = "If both " + names[0] + " and " + names[1] + " have the same colour then they can either pick both red or green. We will work out the chance of this separately.<br>";
        this.correctAnsWorking += "<br>The chances that " + names[0] + " picks a red apple is <sup>" + a + "</sup> / <sub>" + (a+b) + "</sub>";
        this.correctAnsWorking += "<br>If this happens then there are " + (a-1) + " red apples remaining out of a total of " + (a+b-1);
        this.correctAnsWorking += "<br>Thus " + names[1] + " has a probability of <sup>" + (a-1) + "</sup> / <sub>" + (a+b-1) + "</sub>";
        this.correctAnsWorking += "<br>The chances of this BOTH happening is <sup>" + a + "</sup> / <sub>" + (a+b) + "</sub> &#215; <sup>" + (a-1) + "</sup> / <sub>" + (a+b-1) + "</sub> = <sup>" + (a * (a-1)) + "</sup> / <sub>" + ((a+b)*(a+b-1)) + "</sub>";

        this.correctAnsWorking += "<br><br>The chances that " + names[0] + " picks a green apple is <sup>" + b + "</sup> / <sub>" + (a+b) + "</sub>";
        this.correctAnsWorking += "<br>Thus " + names[1] + " has a probability of <sup>" + (b-1) + "</sup> / <sub>" + (a+b-1) + "</sub>";
        this.correctAnsWorking += "<br>The chances of this BOTH happening is <sup>" + b + "</sup> / <sub>" + (a+b) + "</sub> &#215; <sup>" + (b-1) + "</sup> / <sub>" + (a+b-1) + "</sub> = <sup>" + (b * (b-1)) + "</sup> / <sub>" + ((a+b)*(a+b-1)) + "</sub>";

        this.correctAnsWorking += "<br><br> Hence the probability that the pair select either both red or both green is <sup>" + (a * (a-1)) + "</sup> / <sub>" + ((a+b)*(a+b-1)) + "</sub> + <sup>" + (b * (b-1)) + "</sup> / <sub>" + ((a+b)*(a+b-1)) + "</sub>";
        this.correctAnsWorking += "<br> = <sup>" + ((a * (a-1)) + (b * (b-1))) + "</sup> / <sub>" + ((a+b)*(a+b-1)) + "</sub>";
        this.correctAnsWorking += "<br> = " + this.correctAns;
    }

    creditCardStatement = () => {
        let name = getNames(1)[0];
        
        this.originalQuestionSrc = "question 27 from Math Standard 2 2019 HSC";
        this.numMarks = 3;

        let rate = getRandomNumber(15, 25, 2, 0);
        //rate = 18.25;

        let amount = 100 * getRandomNumber(20, 50, 0, 0);
        //amount = 3700;

        let date = getRandomNumber(15, 25, 0, 0);
        //date = 20;

        let questionText = name + " has a credit card with the following conditions:";
        questionText += "<li>There is no interest free period</li>";
        questionText += "<li>Interest is charged at the end of the month at " + rate.toFixed(2) + "% pa, compounding daily, from the purchase date (included) to the last day of the month (included)</li><br>";
        questionText += name + "'s credit card statement for April is shown with some figures missing.<br><br>";
        questionText += "<table style='width:100%'><tbody><tr><td colspan='3'><b>Statement period:</b> 1 April to 30 April</td></tr>";
        questionText += "<tr><th>Date</th><th>Details</th><th>Amount</th></tr>";
        questionText += "<tr><td>1 April</td><td>Opening Balance</td><td>$0</td></tr>";
        questionText += "<tr><td>" + date + " April</td><td>Furniture</td><td>$" + amount + "</td></tr>";
        questionText += "<tr><td>30 April</td><td>Interest charged</td><td>***</td></tr>";
        questionText += "<tr><td>30 April</td><td>Closing balance</td><td>***</td></tr>";
        questionText += "<tr><td colspan='2'><b>Minimum payment</b></td><td>***</td></tr>";
        questionText += "</tbody></table>";

        let min = getRandomNumber(2, 5, 0, 0);
        //min = 2;
        questionText += "<br><br>The minimum payment is calculated as " + min + "% of the closing balance on 30 April.";
        questionText += "<br>Calculate the minimum payment";
        this.question_string = questionText;

        let days = 30 - date + 1;
        let c = amount * (1 + (rate/100)/365) ** days;
        this.correctAns = "$" + (c * min / 100).toFixed(2);
        
        this.correctAnsWorking = name + " used the credit card first on " + date + " April. This gained interest for " + days + " days (inclusive to the end of April).";
        this.correctAnsWorking += "<br>The closing balance on the card is ";
        this.correctAnsWorking += "<br> = <i>P</i>(1 + <sup><i>r</i></sup> / <sub>365</sub>)<sup><i>n</i></sup>";
        this.correctAnsWorking += "<br> = " + amount + " &#215; (1 + <sup>" + (rate / 100).toFixed(4) + "</sup> / <sub>365</sub>)<sup>" + days + "</sup>";
        this.correctAnsWorking += "<br> = $" + c.toFixed(2);
        this.correctAnsWorking += "<br><br>The minimum payment we are told is " + min + "% of the closing balance";
        this.correctAnsWorking += "<br>Hence, minimum payment = $" + c.toFixed(2) + " &#215; " + min + "%";
        this.correctAnsWorking += "<br> = " + this.correctAns;
    }

    bloodAlcoholContent = () => {
        let questionText = "The formula below is used to calculate an estimate for blood alcohol content (BAC) for females.";
        questionText += "<br><br><i>BAC</i><sub>Female</sub> = <sup>(10<i>N</i> - 7.5<i>H</i>)</sup> / <sub>5.5<i>M</i></sub>";
        questionText += "<br><br>The number of hourse required for a person to reach zero <i>BAC</i> after they stop consuming alcohol is given by the following formula."
        questionText += "<br><br>Hours = <sup><i>BAC</i></sup> / <sub>0.015</sub>";
        questionText += "<br><br>The number of standard drinks in a glass of wine and a glass of spirits is ";
        questionText += "<li>Wine - 1.2 standard drinks</li>";
        questionText += "<li>Spirits - 1 standard drink</li>";
        let weight = getRandomNumber(60, 80, 0, 0);
        //weight = 60;
        let wines = getRandomNumber(2, 4, 0, 0);
        let spirits = getRandomNumber(2, 4, 0, 0);
        //wines = 3;
        //spirits = 4;
        let start = getRandomNumber(5, 7, 0, 0);
        let finish = 12;
        let minA = 5 * getRandomNumber(2, 5, 0, 0);
        let minB = 5 * getRandomNumber(6, 11, 0, 0);
        //minA = 15;
        //minB = 30;
        //start = 6;
        questionText += "<br>Hannah weighs " + weight + " kg. She consumed " + wines + " glasses of wine and " + spirits + " glasses of spirits between " + start + ":" + minA + " pm  and " + finish + ":" + minB + " am the following day.";
        questionText += "<br><br>At what time is Hannah's <i>BAC</i> equal to 0?";

        this.question_string = questionText;

        this.originalQuestionSrc = "question 28 from Math Standard 2 2019 HSC";
        this.numMarks = 4;

        let n = wines * 1.2 + spirits;
        let h = finish - start + (minB - minA)/60;
        let hours = Math.floor((10*n - 7.5*h)/(5.5*weight*0.015));
        let min = ((10*n - 7.5*h)/(5.5*weight*0.015) - hours)*60;
        if (min + minB >= 60) {
            this.correctAns = (hours + 1) + ":" + (min + minB - 60).toFixed(0) + " am";
        } else {
            this.correctAns = hours + ":" + (min + minB).toFixed(0) + " am";
        }

        this.correctAnsWorking = "Hannah had " + wines + " glasses of wine and " + spirits + " glasses of spirits, so she had a total of";
        this.correctAnsWorking += "<br>1.2 &#215; " + wines + " + 1 &#215; " + spirits + " = " + n + " standard drinks.";
        this.correctAnsWorking += "<br>She had these drinks between " + start + ":" + minA + " pm  and " + finish + ":" + minB + ", or " + (finish - start) + " hours and " + (minB - minA) + " minutes";
        this.correctAnsWorking += "<br><br>Following the formula, her <i>BAC</i> = (10 &#215; " + n + " - 7.5 &#215; " + h.toFixed(2) + ")  &#247; (5.5 &#215; " + weight + "kg)";
        this.correctAnsWorking += "<br> = " + ((10*n - 7.5*h)/(5.5*weight)).toFixed(4) + "...";
        this.correctAnsWorking += "<br><br> Hours until <i>BAC</i> is zero = " + ((10*n - 7.5*h)/(5.5*weight)).toFixed(4) + " &#247; 0.015";
        this.correctAnsWorking += "<br> = " + ((10*n - 7.5*h)/(5.5*weight*0.015)).toFixed(4) + "... hours";
        this.correctAnsWorking += "<br> = " + hours + " hours and " + min.toFixed(0) + " minutes";
        this.correctAnsWorking += "<br><br>Since Hannah stopped drinking from " + finish + ":" + minB + ", her <i>BAC</i> will be zero at " + this.correctAns;
    }

    incomeTax = () => {
        let questionText = "The table below shows the income tax rates for the 2018-19 financial year.";
        questionText += "<table style='width:100%'><tbody><tr><th style='width:35%'>Taxable income</th><th>Tax payable</th></tr>";
        questionText += "<tr><td>$0 to $18 200</td><td>Nil</td></tr>";
        questionText += "<tr><td>$18 201 to $37 000</td><td>19c for each $1 over $18 200</td></tr>";
        questionText += "<tr><td>$37 001 to $90 000</td><td>$3 572 plus 32.5c for each $1 over $37 000</td></tr>";
        questionText += "<tr><td>$90 001 to $180 000</td><td>$20 797 plus 37c for each $1 over $90 000</td></tr>";
        questionText += "<tr><td>$180 001 and over</td><td>$54 097 plus 45c for each $1 over $180 000</td></tr></tbody></table></tbody></table>";

        questionText += "<br>The medicare levy is 2% of the taxable income.";
        let taxableIncome = 100 * getRandomNumber(500, 2000, 0, 0);
        questionText += "<br><br>If " + getNames(1)[0] + " pays a Medicare levy of $" + (0.02 * taxableIncome).toFixed(2) + ", what is their payable tax?";
        this.question_string = questionText;

        this.originalQuestionSrc = "question 32 from Math Standard 2 2019 HSC";
        this.numMarks = 3;

        
        let b;
        // min income is 50k
        if (taxableIncome <= 80000) {
            b = 1;
        } else if (taxableIncome <= 180000) {
            b = 2;
        } else {
            b = 3;
        }
        
        let bands = [37000, 90000, 180000];
        let taxes = [3572, 20797];
        let cents = [0.325, 0.37];
        this.correctAns = 
        this.correctAnsWorking = "If the Medicare levy is $" + numberWithCommas((0.02 * taxableIncome).toFixed(2)) + " then the taxable income is $" + numberWithCommas((0.02 * taxableIncome).toFixed(2)) + " &#247; 2%"; 
        this.correctAnsWorking += " = $" + numberWithCommas(taxableIncome);
        this.correctAnsWorking += "<br>This falls under the band ";
        if (b === 3) {
            this.correctAns = "$" + numberWithCommas((54097 + (taxableIncome - 180000) * 0.45).toFixed(2));
            this.correctAnsWorking += "$180,001 and over which means the tax paid is";
            this.correctAnsWorking += "<br> = $54 097 plus ($" + numberWithCommas(taxableIncome) + " - $180,000) &#215; $0.45";
            this.correctAnsWorking += "<br> = " + this.correctAns;
        } else {
            this.correctAns = "$" + numberWithCommas((taxes[b-1] + (taxableIncome - bands[b-1]) * cents[b-1]).toFixed(2));
            this.correctAnsWorking += "$" + numberWithCommas(bands[b-1]+1) + " and $" + numberWithCommas(bands[b]) + " which means the tax paid is";
            this.correctAnsWorking += "<br> = $" + numberWithCommas(taxes[b-1]) + " plus ($" + taxableIncome + " - $" + numberWithCommas(bands[b-1]) + ") &#215; $" + cents[b-1];
            this.correctAnsWorking += "<br> = " + this.correctAns;
        }


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

export default standard_short_answer;