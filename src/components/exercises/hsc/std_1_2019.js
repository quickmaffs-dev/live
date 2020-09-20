import React from 'react';
import {getRandomNumber, reset, answerType, shuffle, checkAns, getNames } from '../MathFunctions';
import WorkspaceHsc from '../../WorkspaceHsc';
import bldPrsChrt from '../../../img/math_std_2019_q6_blood_pressure.png';
import cone_1 from '../../../img/math_std_cone_1.png';
import cone_a from '../../../img/math_std_cone_ans_a.png';
import cone_b from '../../../img/math_std_cone_ans_b.png';
import cone_c from '../../../img/math_std_cone_ans_c.png';
import cone_d from '../../../img/math_std_cone_ans_d.png';

class std_1_2019 extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "HSC Past Papers - 2019 Math Standard";
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
        let numQuestionTypes = 16;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let mcOptions;
        chooseQuestion = this.numQuestions;
        //chooseQuestion = numQuestionTypes;
        let q = true;
        if (chooseQuestion === 1) {
            mcOptions = this.networkDiagramDegree();
        } else if (chooseQuestion === 2) {
            mcOptions = this.timeDifference();
        } else if (chooseQuestion === 3) {
            mcOptions = this.bestBuy();
        } else if (chooseQuestion === 4) {
            mcOptions = this.compassBearing();
        } else if (chooseQuestion === 5) {
            mcOptions = this.speedConversion();
        } else if (chooseQuestion === 6) {
            mcOptions = this.bloodPressureChart();
        } else if (chooseQuestion === 7) {
            mcOptions = this.paretoChart();
        } else if (chooseQuestion === 8) {
            mcOptions = this.heartRate();
        } else if (chooseQuestion === 9) {
            mcOptions = this.waterDepth();
        } else if (chooseQuestion === 10) {
            mcOptions = this.triangleArea();
        } else if (chooseQuestion === 11) {
            mcOptions = this.shapeArea();  
        } else if (chooseQuestion === 12) {
            mcOptions = this.compoundInterest();
        } else if (chooseQuestion === 13) {
            mcOptions = this.timeZones();
        } else if (chooseQuestion === 14) {
            mcOptions = this.carInsurance();
        } else if (chooseQuestion === 15) {
            mcOptions = this.payRate();
        } else if (chooseQuestion === 16) {
            mcOptions = this.absoluteError();
        } else {
            q = false;
            this.numQuestions = 0;
            document.querySelectorAll(".questionBody")[0].style.display = "none";
            document.querySelectorAll(".topicSubHeading")[0].innerHTML = "You scored " + this.numCorrect + " out of " + (this.numQuestions - 1) + " (" + (100 * this.numCorrect / (this.numQuestions - 1)).toFixed(0) + "%)";
            document.querySelectorAll(".topicSubHeading")[0].innerHTML += "<br />Press the button to start again";
            document.getElementById("startSessionBtnID").style.display = "block";
        }
        
        if (q === true) {
            let correctAns = mcOptions[0];
            shuffle(mcOptions);
            let userAnswers = mcOptions;
            for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {
                document.querySelectorAll(".mcAnsBtn")[i].innerHTML = "<b>&#" + (i + 65) + ".</b>&emsp;" + document.querySelectorAll(".mcAnsBtn")[i].innerHTML;
                document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, userAnswers[i], this.question_string, "HSC Standard 2019")};
            }
            this.writeFormula();
            this.writeExample();
        }
    }

    drawCanvas = (paths) => {
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        let ctx = canvas.getContext("2d");
        ctx.save();
        // get points
        let n = getRandomNumber(4, 7, 0, 0);
        let points = new Array(2 * n);
        let r = canvas.width / 4, theta = 0, x, y, label;
        for (let i = 0; i < points.length; i += 2) {
            x = r * Math.cos(theta) + canvas.height / 2;
            y = r * Math.sin(theta) + canvas.width / 2;
            points[i] = x;
            points[i+1] = y;
            theta += 2 * Math.PI / n;
            
            ctx.fillRect(x, y, 4, 4);
            ctx.font = "italic 20px CMSY10";
            label = String.fromCharCode((i + 1)/2 + 65);
            ctx.fillText(label, x - 5, y - 5);
        }
        
        paths = new Array(n).fill(0);
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                if (getRandomNumber(1, 3, 0, 0) === 1) {
                    paths[i] += 1;
                    paths[j] += 1;
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.moveTo(points[2*i], points[2*i+1]);
                    ctx.lineTo(points[2*j], points[2*j+1]);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        console.log(paths);
        ctx.stroke();
        ctx.restore();
        return paths;
    }

    resetCanvas = () => {
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        let ctx = canvas.getContext("2d");
        ctx.save();        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    networkDiagramDegree = () => {
        this.resetCanvas();
        let paths = this.drawCanvas();
        let vertex = getRandomNumber(0, paths.length-1, 0, 0);
        document.getElementById("exampleVidID").style.display = "block";
        document.getElementById("exampleVidID").src = "https://www.youtube.com/embed/0qYw9_v0Iso";
        
        this.Ans = paths[vertex];
        this.mc1 = paths[vertex] + getRandomNumber(1, 5, 0, 1);
        this.mc2 = paths[vertex] + getRandomNumber(1, 5, 0, 1);
        this.mc3 = paths[vertex] + getRandomNumber(1, 5, 0, 1);
        
        let questionText = "What is the degree of " + String.fromCharCode(vertex + 65);
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }


    timeDifference = () => {
        let hrA = getRandomNumber(1, 22, 0, 0);
        let hrB = getRandomNumber(hrA + 1, 23, 0, 0);
        let minA = getRandomNumber(1, 59, 0, 0);
        let minB = getRandomNumber(1, 59, 0, 0);
        while (minB === minA) {
            minB = getRandomNumber(1, 59, 0, 0);
        }
        
        let pA = minA;
        if (minA < 10) {
            pA = "0" + minA;
        }
        let pB = minB;
        if (minB < 10) {
            pB = "0" + minB;
        }
        let tA = "am";
        let hA = hrA;
        if (hrA >= 12) {
            tA = "pm";
        }
        if (hrA > 12) {
            hA -= 12;
        }
        let tB = "am";
        let hB = hrB;
        if (hrB >= 12) {
            tB = "pm";
        }
        if (hrB > 12) {
            hB -= 12;
        }
        let questionText;
        questionText = "What is the time difference between " + hA + ":" + pA + tA + " and " + hB + ":" + pB + tB + "?";
        document.getElementById("exampleVidID").style.display = "block";
        document.getElementById("exampleVidID").src = "https://www.youtube.com/embed/SnkUkc23YC0";
        let hrX = hrB - hrA;
        let minX = minB - minA;
        if (minA > minB) {
            hrX -= 1;
            minX += 60;
        }
        let h = getRandomNumber(1, 1, 0, 1);
        let m = getRandomNumber(10, 10, 0, 1);        
        this.Ans = hrX + " hrs and " + minX + " min";
        this.mc1 = (hrX + h) + " hrs and " + minX + " min";
        this.mc2 = hrX + " hrs and " + (minX + m) + " min";
        this.mc3 = (hrX + h) + " hrs and " + (minX + m) + " min";

        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    bestBuy = () => {
        let questionText = "Sugar is sold in four different sized packets. <br /> Which one is the best buy?";
        document.getElementById("exampleVidID").style.display = "block";
        document.getElementById("exampleVidID").src = "https://www.youtube.com/embed/bXPPX1PR_KU";
        let prices = new Array(4);
        prices[0] = getRandomNumber(30, 50, 0, 0);
        for (let i = 1; i < prices.length; i++) {
            prices[i] = prices[i-1] + getRandomNumber(5, 20, 0, 0);
        }
        console.log("prices : " + prices);
        let k = new Array(4);
        for (let i = 0; i < k.length; i++) {
            k[i] = getRandomNumber(1, 5, 0, 0);
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        this.Ans = (k[0] * 100) + "g for $" + (k[0] * prices[0]/100).toFixed(2);
        this.mc1 = (k[1] * 100) + "g for $" + (k[1] * prices[1]/100).toFixed(2);
        this.mc2 = (k[2] * 100) + "g for $" + (k[2] * prices[2]/100).toFixed(2);
        this.mc3 = (k[3] * 100) + "g for $" + (k[3] * prices[3]/100).toFixed(2);
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }
    
    compassBearing = () => {
        let x = getRandomNumber(1, 359, 0, 0);
        while (x === 90 || x === 180 || x === 270) {
            x = getRandomNumber(1, 359, 0, 0);
        }

        let x2 = x;
        if (x < 10) {
            x2 = "00" + x;
        } else if (x < 100) {
            x2 = "0" + x;
        }

        x2 += "<sup>&#176;</sup>";
        let questionText = "Which compass bearing is the same as a true bearing of " + x2;
        document.getElementById("exampleVidID").style.display = "block";
        document.getElementById("exampleVidID").src = "https://www.youtube.com/embed/8e2FdhPmZpQ";
        let ans, v, h;
        let ver = ["N", "S"];
        let hor = ["W", "E"];
        if (0 < x && x < 90) {
            x2 = x;            
            v = 0;
            h = 1;
        } else if (90 < x && x < 180) {
            x2 = 180 - x;
            v = 1;
            h = 1;
        } else if (180 < x && x < 270) {
            x2 = x - 180;
            v = 1;
            h = 0;
        } else {
            x2 = 360 - x;
            v = 0;
            h = 0;
        }

        if (x2 < 10) {
            x2 = "0" + x2;
        }
        ans = ver[v] + x2 + "<sup>&#176;</sup>" + hor[h];
        
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        this.Ans = ans;
        this.mc1 = ver[v] + x2 + "<sup>&#176;</sup>" + hor[(h + 1) % 2];
        this.mc2 = ver[v] + (90 - parseInt(x2)) + "<sup>&#176;</sup>" + hor[h];
        this.mc3 = ver[v] + (90 - parseInt(x2)) + "<sup>&#176;</sup>" + hor[(h + 1) % 2];
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    speedConversion = () => {
        let n = getRandomNumber(1, 10, 0, 0);
        let unitsD = ["km", "m", "cm", "mm"];
        let unitsT = ["hr", "min", "sec"];
        let a = getRandomNumber(0, unitsD.length - 2, 0, 0);
        let b = getRandomNumber(0, unitsT.length - 2, 0, 0);
        let questionText = "Which expression can be used to convert a speed of " + n + unitsD[a] + " per " + unitsT[b] + " to a speed in " + unitsD[a+1] + " per " + unitsT[b+1];
        document.getElementById("exampleVidID").style.display = "block";
        document.getElementById("exampleVidID").src = "https://www.youtube.com/embed/NcRpevs6N78";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        let m = 10 ** (3 - a);
        this.Ans = n + " &#215; " + m + " &#247; 60";
        this.mc1 = n + " &#247; " + m + " &#247; 60";
        this.mc2 = n + " &#247; " + m + " &#215; 60";
        this.mc3 = n + " &#215; " + m + " &#215; 60";
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    
    bloodPressureChart = () => {
        let questionText = "When blood pressure is measured, two numbers are recorded: systolic pressure and diastolic pressure. If the measurements recorded are 130 systolic and 85 diastolic, then the blood pressure is written as ‘130 over 85’. ";
        questionText += "<br>The bars on the graph indicate the healthy ranges of blood pressure for people of various ages.";
        questionText += "<br>Which person has both blood pressure measurements in the healthy range for their age?";
        this.question_string = questionText;
        let diastolicA = [72, 74, 74, 76, 78, 79, 80, 81, 82, 83];
        let diastolicB = [82, 85, 88, 88, 88, 87, 88, 89, 90, 91];
        let systoicA = [104, 108, 109, 110, 111, 112, 115, 117, 118, 121];
        let systoicB = [120, 132, 133, 134, 135, 136, 139, 145, 146, 148];
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        document.getElementById("questionImgID").style.display = "block";
        document.getElementById("questionImgID").alt = "This is a diagram of the question";
        document.getElementById("questionImgID").src = bldPrsChrt;
        let names = getNames(4);
        let ages = new Array(4);
        for (let i = 0; i < ages.length; i++) {
            ages[i] = getRandomNumber(15, 64, 0, 0);
        }
        this.Ans = names[0] + " aged " + ages[0] + " with blood pressure " + getRandomNumber(systoicA[(Math.floor((ages[0] - 15) / 5))] + 1, systoicB[(Math.floor((ages[0] - 15) / 5))] - 1, 0, 0) + " over " + getRandomNumber(diastolicA[(Math.floor((ages[0] - 15) / 5))] + 1, diastolicB[(Math.floor((ages[0] - 15) / 5))] - 1, 0, 0);
        this.mc1 = names[1] + " aged " + ages[1] + " with blood pressure " + getRandomNumber(systoicA[(Math.floor((ages[1] - 15) / 5))] + 1, systoicB[(Math.floor((ages[1] - 15) / 5))] - 1, 0, 0) + " over " + (diastolicB[(Math.floor((ages[1] - 15) / 5))+1] + 2);
        this.mc2 = names[2] + " aged " + ages[2] + " with blood pressure " + (systoicA[(Math.floor((ages[2] - 15) / 5))] - 2) + " over " + getRandomNumber(diastolicA[(Math.floor((ages[2] - 15) / 5))] + 1, diastolicB[(Math.floor((ages[2] - 15) / 5))] - 1, 0, 0);
        this.mc3 = names[3] + " aged " + ages[3] + " with blood pressure " + (systoicA[(Math.floor((ages[3] - 15) / 5))] - 2) + " over " + (diastolicB[(Math.floor((ages[3] - 15) / 5))+1] + 2);
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    drawParetoCanvas = (options, scores) => {
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        let ctx = canvas.getContext("2d");
        ctx.save();
        // draw gridlines
        let perc = new Array(scores.length);
        let sum = 0;
        for (let i = 0; i < scores.length; i++) {
            sum += scores[i];
        }
        perc[0] = parseFloat((20 * scores[0] / sum).toFixed(0));
        for (let i = 1; i < perc.length; i++) {            
            perc[i] = perc[i-1] + parseFloat((20 * scores[i] / sum).toFixed(2));
        }
        //let w = options.length * 2;
        let w = 25;
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
        let axis_x1 = 0.12*canvas.width;
        let axis_x2 = 0.84*canvas.width;
        
        //let chartWidth = axis_x2 - axis_x1;
        let chartHeight = 4 * canvas.height/5;// - 0.16*canvas.height// - 0.1*canvas.height;
        let axis_y = 0.04 * canvas.height + chartHeight;


        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(axis_x1, axis_y - chartHeight); // left axis
        ctx.lineTo(axis_x1, axis_y);
        ctx.moveTo(axis_x2, axis_y - chartHeight); // right axis
        ctx.lineTo(axis_x2, axis_y);
        ctx.moveTo(axis_x1, axis_y); // bottom axis
        ctx.lineTo(axis_x2, axis_y);
        ctx.stroke();

        // mark left axis        
        for (let i = 0; i <= 5; i++) {
            let h = (axis_y - chartHeight) + ((5-i) * chartHeight / 5);
            ctx.fillRect(axis_x1-2, h, 4, 2); // plot left points
            ctx.fillRect(axis_x2-2, h, 4, 2); // plot right points
            // mark intercept points
            ctx.font = "15px CMSY10";
            ctx.fillText(4 * i, axis_x1-20, h);
            ctx.fillText((20 * i) + "%", axis_x2+10, h);
        }

        // axis titles
        ctx.font = "bold 20px CMSY10";
        ctx.fillText("Fruits", 7 * canvas.width/w, canvas.height - 10);
        ctx.translate(canvas.width/w - 8, 12 * canvas.width/w);
        ctx.rotate(-Math.PI/2);
        ctx.fillText("Votes", 0, 10);
        ctx.fillText("Cumulative percentage", -50, canvas.width - 25);
        ctx.restore();

        
        let tabWidth = (axis_x2 - axis_x1)/options.length - 4;
        /*
        // initial line of column chart
        let h = (axis_y - chartHeight) + ((5-scores[0]/4) * chartHeight / 5);
        ctx.beginPath();
        ctx.moveTo(axis_x1 + 5, axis_y); 
        ctx.lineTo(axis_x1 + 5, h);
        ctx.stroke();
        */
        for (let i = 0; i < options.length; i++) {
            ctx.save()
            let w = axis_x1 + i * tabWidth + tabWidth/2 + 5;
            let l = axis_x1 + (i + 1) * tabWidth + 5;
            //let h = (axis_y - chartHeight) + ((5-i) * chartHeight / 5);
            let h = (axis_y - chartHeight) + ((5-scores[i]/4) * chartHeight / 5);
            /*
            // lines bars
            ctx.beginPath();
            ctx.moveTo(l, axis_y); 
            ctx.lineTo(l, h);
            ctx.lineTo(l - tabWidth, h);
            ctx.stroke();
            */
            // fill bars
            ctx.globalAlpha = 0.3; // transparency
            ctx.fillRect(l - tabWidth + 5, h, tabWidth - 5, axis_y - h); // columns
            ctx.globalAlpha = 1.0;

            ctx.fillRect(w, axis_y, 2, 4); // middle point of column

            // cumulative percentage line
            let oldP = (axis_y - chartHeight) + ((5-perc[i]/4) * chartHeight / 5);
            if (i < perc.length - 1) {
                let newP = (axis_y - chartHeight) + ((5-perc[i+1]/4) * chartHeight / 5);
                ctx.beginPath();
                ctx.moveTo(w, oldP + 2); 
                ctx.lineTo(w + tabWidth, newP + 2);
                ctx.stroke();
                ctx.fillRect(w, oldP, 4, 4); // middle point of column
            }            
            ctx.fillRect(w, oldP, 4, 4); // middle point of column

            ctx.font = "18px CMSY10";
            /*
            ctx.rotate(Math.PI/4);
            ctx.fillText(options[i], 360 + 0.7 * i * tabWidth, 250 - 0.7 * i * tabWidth);
            */            
            ctx.rotate(Math.PI/8);
            ctx.fillText(options[i], 230 + i * tabWidth, 375 - 0.4 * i * tabWidth);
            
            ctx.restore();
        }        
    }    

    paretoChart = () => {
        this.resetCanvas();
        let fruits = ["Apple", "Banana", "Peach", "Orange", "Mango", "Cherry", "Grapes"];
        let a, b, temp;
        for (let i = 0; i < 100; i++) {
            a = getRandomNumber(0, fruits.length - 1, 0, 0);
            b = getRandomNumber(0, fruits.length - 1, 0, 0);
            temp = fruits[a];
            fruits[a] = fruits[b];
            fruits[b] = temp;
        }

        let options = fruits.slice(0, getRandomNumber(4, fruits.length, 0, 0));
        let scores = new Array(options.length);
        scores[0] = getRandomNumber(15, 20, 0, 0);
        let sum = scores[0];
        for (let i = 1; i < options.length; i++) {
            scores[i] = getRandomNumber(1, scores[i-1], 0, 0);
            sum += scores[i];
        }
        this.drawParetoCanvas(options, scores);

        let ans = getRandomNumber(0, options.length-1, 0, 0);
        let questionText = "A school collected data related to the favourite fruits of students. The Pareto chart shows the data collected.";
        questionText += "<br />What percentage of students picked " + options[ans] + " as their favourite fruit?";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        this.Ans = (100 * scores[ans]/sum).toFixed(0) + "%";
        this.mc1 = (100 * (scores[ans]/sum) + getRandomNumber(10, 50, 0, 1)).toFixed(0) + "%";
        this.mc2 = (100 * (scores[ans]/sum) + getRandomNumber(10, 50, 0, 1)).toFixed(0) + "%";
        this.mc3 = (100 * (scores[ans]/sum) + getRandomNumber(10, 50, 0, 1)).toFixed(0) + "%";
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    heartRate = () => {
        let age = getRandomNumber(15, 60, 0, 0);
        let questionText = "Heart rate is measured in beats per minute. Maximum heart rate (MHR) is calculated using the following formula. <br/>MHR = 220 – age<br />Target heart rates are calculated as a percentage of MHR. " + getNames(1)[0] + "'s age is " + age + ". If target heart rate 60% to 80% of the MHR, which of the following lies within that heart rate";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;

        let min = Math.ceil(0.6 * (220 - age));
        let max = Math.floor(0.8 * (220 - age));
        let d = getRandomNumber(max, 220, 0, 0);
        if (getRandomNumber(1, 2, 0, 0, ) === 1) {
            d = getRandomNumber(60, min, 0, 0);
        }
        this.Ans = getRandomNumber(min, max, 0, 0);
        this.mc1 = getRandomNumber(max, 220, 0, 0);
        this.mc2 = getRandomNumber(60, min, 0, 0);
        this.mc3 = d;
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }
    
    waterDepth = () => {
        let ans, coneAnswers = [cone_a, cone_b, cone_c, cone_d];
        ans = 3; // cone_d
        let questionText = "The container shown is initially full of water.";
        questionText += "<br /><img src='" + cone_1 + "' alt='Image of cone'><br />";
        questionText += "Water leaks out of the bottom of the container at a constant rate. Which graph best shows the depth of water in the container as time varies?";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;

        this.Ans = "<img src='" + coneAnswers[ans] + "' alt='Image of cone'>";
        this.mc1 = "<img src='" + coneAnswers[(ans + 1) % coneAnswers.length] + "' alt='Image of cone'>";
        this.mc2 = "<img src='" + coneAnswers[(ans + 2) % coneAnswers.length] + "' alt='Image of cone'>";
        this.mc3 = "<img src='" + coneAnswers[(ans + 3) % coneAnswers.length] + "' alt='Image of cone'>";
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }
    
    triangleArea = () => {
        this.resetCanvas();
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 125;
        console.log("height is " + canvas.height);
        console.log("width is " + canvas.width);
        // draw first triangle
        let h1 = getRandomNumber(1, 10, 0, 0);
        let p1 = getRandomNumber(h1 + 1, 10, 0, 0);
        
        let ctx = canvas.getContext("2d");
        ctx.restore();
        ctx.save();
        ctx.moveTo(35, 30); 
        ctx.lineTo(35, 100);
        ctx.lineTo(200, 100);
        ctx.lineTo(35, 30);
        ctx.moveTo(35, 90); 
        ctx.lineTo(45, 90);
        ctx.lineTo(45, 100);
        ctx.stroke();
        ctx.font = "16px CMSY10";
        ctx.fillText(h1 + "cm", 5, 70);
        ctx.fillText(p1 + "cm", 100, 50);
        ctx.fillText("x", 155, 96);
        
        let scale = getRandomNumber(2, 5, 0, 0);
        ctx.restore();
        ctx.save();
        ctx.moveTo(270, 10); 
        ctx.lineTo(270, 120);
        ctx.lineTo(470, 120);
        ctx.lineTo(270, 10);
        ctx.moveTo(270, 110); 
        ctx.lineTo(280, 110);
        ctx.lineTo(280, 120);
        ctx.stroke();
        ctx.font = "16px CMSY10";
        ctx.fillText((scale * h1) + "cm", 230, 70);
        ctx.fillText("x", 435, 116);

        let questionText = "The two triangles below are similar (NOT TO SCALE). What is the area of the triangle to the right?";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;

        h1 *= scale;
        p1 *= scale;
        let area = 0.5 * h1 * Math.sqrt(p1 ** 2 - h1 ** 2);

        this.Ans = area.toFixed(0) + "cm<sup>2</sup>";
        this.mc1 = (area + getRandomNumber(2, 10, 0, 1)).toFixed(0) + "cm<sup>2</sup>";
        this.mc2 = (area + getRandomNumber(2, 10, 0, 1)).toFixed(0) + "cm<sup>2</sup>";
        this.mc3 = (area + getRandomNumber(2, 10, 0, 1)).toFixed(0) + "cm<sup>2</sup>";
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    shapeArea = () => {
        this.resetCanvas();
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        canvas.height = 350;
        console.log("height is " + canvas.height);
        console.log("width is " + canvas.width);

        // draw first shape (rectangle)  
        let p = new Array(4);      
        let ctx = canvas.getContext("2d");
        ctx.restore();
        ctx.save();
        ctx.moveTo(35, 30); 
        ctx.lineTo(35, 100);
        ctx.lineTo(200, 100);
        ctx.lineTo(200, 30);
        ctx.lineTo(35, 30);
        ctx.moveTo(95, 25); 
        ctx.lineTo(95, 35);
        ctx.moveTo(105, 25); 
        ctx.lineTo(105, 35);
        ctx.moveTo(95, 95); 
        ctx.lineTo(95, 105);
        ctx.moveTo(105, 95); 
        ctx.lineTo(105, 105);
        ctx.moveTo(30, 50); 
        ctx.lineTo(40, 50);
        ctx.moveTo(195, 50); 
        ctx.lineTo(205, 50);
        ctx.stroke();
        ctx.font = "16px CMSY10";
        let a1 = getRandomNumber(1, 10, 0, 0);
        let a2 = getRandomNumber(1, 10, 0, 0);
        p[0] = 2 * (a1 + a2);
        ctx.fillText(a1 + "cm", 5, 70);
        ctx.fillText(a2 + "cm", 100, 20);
        ctx.fillText("Shape 1", 100, 70);

        // draw second shape (triangle)
        ctx.save();
        ctx.moveTo(250, 100); 
        ctx.lineTo(450, 30);
        ctx.lineTo(380, 100);
        ctx.lineTo(250, 100); 
        ctx.stroke();
        ctx.font = "16px CMSY10";
        let b1 = getRandomNumber(1, 10, 0, 0);
        let b2 = getRandomNumber(b1 + 1, 15, 0, 0);
        let b3 = getRandomNumber(b2, b1 + b2 - 1, 0, 0);
        p[1] = b1 + b2 + b3;
        ctx.fillText(b1 + "cm", 420, 80);
        ctx.fillText(b2 + "cm", 300, 120);
        ctx.fillText(b3 + "cm", 330, 50);
        ctx.fillText("Shape 2", 320, 90);

        // draw third shape (square)
        ctx.save();
        ctx.moveTo(55, 200); 
        ctx.lineTo(55, 300);
        ctx.lineTo(155, 300);
        ctx.lineTo(155, 200);
        ctx.lineTo(55, 200);
        ctx.moveTo(105, 195); 
        ctx.lineTo(105, 205);
        ctx.moveTo(105, 295); 
        ctx.lineTo(105, 305);
        ctx.moveTo(50, 250); 
        ctx.lineTo(60, 250);
        ctx.moveTo(150, 250); 
        ctx.lineTo(160, 250);
        ctx.stroke();
        ctx.font = "16px CMSY10";
        let c1 = getRandomNumber(1, 10, 0, 0);
        p[2] = 4 * c1;
        ctx.fillText(c1 + "cm", 10, 250);
        ctx.fillText("Shape 3", 80, 250);

        // draw fourth shape (trapezium)
        ctx.save();
        ctx.moveTo(250, 300); 
        ctx.lineTo(280, 200);
        ctx.lineTo(400, 200);
        ctx.lineTo(430, 300);
        ctx.lineTo(250, 300);
        ctx.moveTo(258, 245); 
        ctx.lineTo(273, 250);
        ctx.moveTo(422, 245); 
        ctx.lineTo(407, 250);
        ctx.stroke();
        ctx.font = "16px CMSY10";
        let d1 = getRandomNumber(1, 10, 0, 0);
        let d2 = getRandomNumber(d1+1, 15, 0, 0);
        let d3 = getRandomNumber(d2+1, 25, 0, 0);
        p[3] = 2 * d1 + d2 + d3;
        ctx.fillText(d1 + "cm", 430, 250);
        ctx.fillText(d2 + "cm", 330, 190);
        ctx.fillText(d3 + "cm", 330, 320);
        ctx.fillText("Shape 4", 315, 250);

        // check if any perimeters are the same
        for (let i = 0; i < p.length - 1; i++) {
            for (let j = i + 1; j < p.length; j++) {
                if (p[i] === p[j]) {
                    return this.shapeArea();
                }
            }
        }

        let type = getRandomNumber(1, 4, 0, 0);
        console.log("type is " + type);

        for (let i = 0; i < p.length - 1; i++) {
            if (type - 1 !== i && p[type-1] === p[i]) {
                return this.shapeArea();
            }
        }
        
        let questionText = "Which of the following shapes has a perimeter of " + p[type-1] + " cm?";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        let shapes = [1, 2, 3, 4];
        this.Ans = "Shape " + shapes[type - 1];
        this.mc1 = "Shape " + shapes[(type) % 4];
        this.mc2 = "Shape " + shapes[(type + 1) % 4];
        this.mc3 = "Shape " + shapes[(type + 2) % 4];
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    compoundInterest = () => {
        let p = getRandomNumber(1, 20, 0, 0) * 100;
        let r = getRandomNumber(1, 10, 1, 0);
        let n = getRandomNumber(2, 6, 0, 0);
        document.getElementById("exampleVidID").style.display = "block";
        document.getElementById("exampleVidID").src = "https://www.youtube.com/embed/OQ9Mv2jwQWo";
        let questionText = getNames(1)[0] + " opens a bank account and deposits $" + p + " into it. Interest is paid at " + r + "% per annum, compounding annually. <br />Assuming no further deposits or withdrawals are made, what will be the balance in the account at the end of " + n + " years?";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        let ans = p * (1 + r / 100) ** n;
        this.Ans = "$" + ans.toFixed(2);
        this.mc1 = "$" + (ans + getRandomNumber(10, 200, 2, 0)).toFixed(2);
        this.mc2 = "$" + (ans + getRandomNumber(10, 200, 2, 0)).toFixed(2);
        this.mc3 = "$" + (ans + getRandomNumber(10, 200, 2, 0)).toFixed(2);
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    timeZones = () => {
        let cities = ["Chicago", "Rio de Janeiro", "London", "Berlin", "Moscow", "Dubai", "Beijing", "Sydney", "Auckland"];
        let timezones = [-5, -3, 1, 2, 3, 4, 8, 10, 12];
        let a = getRandomNumber(0, cities.length-2, 0, 0);
        let b = getRandomNumber(a+1, cities.length-1, 0, 0);        
        let x = getRandomNumber(1, 22, 0, 0);
        let hours = timezones[b] - timezones[a];
        let m = ["am", "pm"];
        let n = 0;
        if (x > 11) {
            n = 1;
        }
        let x2 = x;
        if (x2 > 13) {
            x2 = x % 12;
        }
        if (timezones[a] > 0) {
            timezones[a] = "+" + timezones[a];
        }
        if (timezones[b] > 0) {
            timezones[b] = "+" + timezones[b];
        }
        let questionText = "The Coordinated Universal Time (UTC) of " + cities[a] + " is " + timezones[a] + " hours and the UTC of " + cities[b] + " is " + timezones[b] + " hours. When it is " + x2 + m[n] + ", Monday in " + cities[a] + ", what time is it in " + cities[b] + "?";
        let days = ["Monday", "Tuesday", "Saturday"];
        let d = 0;
        if (x + hours > 23) {
            d = 1;
        }
        let h = (x + hours) % 24;
        n = 0;
        if (h > 11) {
            n = 1;
        }
        if (h > 12) {
            h = h % 12;
        }
        if (h === 0) {
            h = 12;
        }
        
        document.getElementById("exampleVidID").style.display = "block";
        document.getElementById("exampleVidID").src = "https://www.youtube.com/embed/yB5ZQDGmshU";
        
        
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        this.Ans = h + m[n] + " " + days[d];
        this.mc1 = h + m[(n+1) % m.length] + " " + days[(d+1) % days.length];
        this.mc2 = ((h + 6) % 12) + m[n] + " " + days[d];
        this.mc3 = ((h + 6) % 12) + m[(n+1) % m.length] + " " + days[(d+1) % days.length];
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    carInsurance = () => {
        let name = getNames(1)[0];
        let age = getRandomNumber(18, 30, 0, 0);
        let a = 100 * getRandomNumber(6, 12, 0, 0);
        let b = 100 * getRandomNumber(13, 20, 0, 0);
        let c = 100 * getRandomNumber(2, 6, 0, 0);
        let questionText = name + " is " + age + " years old and has just purchased comprehensive motor vehicle insurance. The following excesses apply to claims for at-fault motor vehicle accidents";
        questionText += "<li>Basic excess of $" + a + " for each claim</li>";
        questionText += "<li>An additional age excess of $" + b + " for drivers under 25 years of age</li>";
        questionText += "<li>An additional age excess of $" + c + " for drivers 25 years of age or over with no more than 2 years driving experience</li>";
        questionText += "How much would " + name + " be required to pay as excess if they made a claim as the driver at fault in a car accident?";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        let ans = a;
        this.mc1 = "$" + (a + b);
        if (age < 25) {
            ans += b;
            this.mc1 = "$" + a;
        }
        this.Ans = "$" + ans;
        this.mc2 = "$" + b;
        this.mc3 = "$" + (a + c);
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    payRate = () => {
        let name = getNames(1)[0];        
        let pay = getRandomNumber(15, 50, 0, 0);
        let increase = getRandomNumber(2, 20, 0, 0);
        let n = getRandomNumber(4, 10, 0, 0);
        let questionText = name + " earns $" + pay + " per hour. " + name + "'s hourly pay rate increases by " + increase + "%. How much will they earn for a " + n + " hour shift after this increase?";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        let ans = (pay * (1 + increase / 100)) * n;
        this.Ans = "$" + ans.toFixed(2);
        this.mc1 = "$" + (ans + getRandomNumber(10, 50, 2, 0)).toFixed(2);
        this.mc2 = "$" + (ans + getRandomNumber(10, 50, 2, 0)).toFixed(2);
        this.mc3 = "$" + (ans + getRandomNumber(10, 50, 2, 0)).toFixed(2);
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    absoluteError = () => {
        let error = getRandomNumber(0, 2, 0, 0);
        let w = getRandomNumber(50, 100, error, 0);
        let questionText = "A person's weight is measured as " + w + "kg. What is the absolute error of this measurement?";
        this.question_string = questionText;        
        document.getElementById("questionStringID").innerHTML = "<b>" + this.numQuestions + "</b>&emsp;" + questionText;
        document.getElementById("exampleVidID").style.display = "block";
        document.getElementById("exampleVidID").src = "https://www.youtube.com/embed/ic4SLe82Y8A";
        let ans = 0.5 * 1000 * 10 ** (-1 * error);
        console.log("error was " + error);
        console.log("ans was " + ans);
        this.Ans = ans + " grams";
        this.mc1 = ans * 10 ** (1 - 2 * getRandomNumber(0, 1, 0, 0)) + " grams";
        this.mc2 = 2 * ans * 10 ** (1 - 2 * getRandomNumber(0, 1, 0, 0)) + " grams";
        this.mc3 = 2 * ans  + " grams";
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

export default std_1_2019;