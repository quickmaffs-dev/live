import React from 'react';
import {getRandomNumber, printTest, reset, answerType, shuffle, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex01_scatterplots extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Data Analysis";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding scatterplots. Click the Start button below to begin...";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(1); // multiplechoice === 1
        
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let mcOptions;
        if (chooseQuestion === 1) {
            mcOptions = this.associatingVariables();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {this.showAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "data analysis ex01")};
        }
        this.writeFormula();
        this.writeExample();
    }

    showAns = (correctAns, userAns, qString, chp) => {        
        let canvas = document.getElementById("canvasID");
        let ctx = canvas.getContext("2d");
        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "red";
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(this.x_line + 3, canvas.height);
        ctx.lineTo(this.x_line + 3, this.y_line);
        ctx.moveTo(0, this.y_line);
        ctx.lineTo(this.x_line, this.y_line);
        ctx.stroke();
        checkAns(correctAns, userAns, qString, chp);
        ctx.restore();
    }

    drawScatterPlot = (x, y, x_title, y_title, option, x_q, y_ans) => {
        
        console.log("x:" + x);
        console.log("y:" + y);
        let canvas = document.getElementById("canvasID");
        canvas.style.backgroundColor = "white";
        canvas.style.display = "block";
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
        let ctx = canvas.getContext("2d");
        ctx.restore();
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
        ctx.moveTo(2 * canvas.width/w, 0);
        ctx.lineTo(2 * canvas.width/w, canvas.height - 2 * canvas.height/w);
        ctx.moveTo(2 * canvas.width/w, canvas.height - 2 * canvas.height/w);
        ctx.lineTo(2 * canvas.width, canvas.height - 2 * canvas.height/w);
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // axis arrow heads
        ctx.beginPath();
        ctx.moveTo(2 * canvas.width/w - 8, 0 + 12);
        ctx.lineTo(2 * canvas.width/w, 0);
        ctx.lineTo(2 * canvas.width/w + 8, 0 + 12);        
        ctx.moveTo(canvas.width - 12, canvas.height - 2 * canvas.height/w - 8);
        ctx.lineTo(canvas.width, canvas.height - 2 * canvas.height/w);
        ctx.lineTo(canvas.width - 12, canvas.height - 2 * canvas.height/w + 8);
        
        ctx.lineWidth = 1;
        ctx.stroke();

        // plot axis marks
        let num_x = -1; // dont include the edge
        let num_y = 0;
        for (let i = 2 * canvas.width/w; i < canvas.width; i += 2 * canvas.width/w) {
            let m = 2;
            ctx.fillRect(i - m/2, canvas.height - 2 * canvas.height/w - m, m, 2*m);
            num_x += 1;
        }        
        for (let j = canvas.height - 2 * 2 * canvas.height/w; j > 0; j -= 2 * canvas.height/w) {
            let m = 2;
            ctx.fillRect(2* canvas.width/w - m, j - m/2, 2*m, m);
            num_y += 1;
        }
        
        if (option !== "reset") {            
            
            // axis labels
            //let x_key = Math.ceil((x[x.length - 1] - x[0]) / num_x);
            //let y_key = Math.ceil((y[y.length - 1] - y[0]) / num_y);
            let x_min = Math.min(...x);
            let y_min = Math.min(...y);
            let x_max = Math.max(...x);
            let y_max = Math.max(...y);
            let x_key = Math.ceil((x_max - x_min) / num_x);
            let y_key = Math.ceil((y_max - y_min) / num_y);
            let n = -1;
            if (x_min === 0) {
                n = 0;
            }
            for (let i = 2 * canvas.width/w; i < canvas.width; i += 2 * canvas.width/w) {
                ctx.font = "15px CMSY10";
                ctx.fillText(x_min + x_key * n, i - 10, canvas.height - 2 * canvas.height/w + 18);
                n += 1;
            }
            n = -1;
            for (let j = canvas.height - 2 * canvas.height/w; j > 0; j -= 2 * canvas.height/w) {
                ctx.font = "15px CMSY10";
                ctx.fillText(y_min + y_key * n, 2 * canvas.width/w - 24, j);
                n += 1;
            }
            
            // axis titles
            ctx.font = "18px CMSY10";
            ctx.fillText(x_title, 7 * canvas.width/w, canvas.height - 10);
            ctx.translate(canvas.width/w - 8, 12 * canvas.width/w);
            ctx.rotate(-Math.PI/2);
            ctx.fillText(y_title, 0, 0);
            ctx.restore();
            // plot x points
            let space_x = canvas.width - 2 * canvas.width/w;
            space_x /= (num_x + 1);
            let space_y = canvas.height - 2 * canvas.height/w;
            space_y /= (num_y + 1);

            let point_size = 6;
            let gap = 2;
            if (x_min === 0) {
                gap = 1;
            }
            for(let i = 0; i < x.length; i += 1) {
                let x_paint = gap * 2 * canvas.width/w + (x[i] - x_min) * space_x / x_key - point_size/2;
                let y_paint =  canvas.height - 2 * canvas.height / w - (y[i] - y_min + y_key) * space_y / y_key - point_size/2;
                ctx.fillRect(x_paint, y_paint, point_size, point_size);
            }

            // store correct ans
            this.x_line = 4 * canvas.width/w + (x_q - x_min) * space_x / x_key - 5;
            this.y_line = canvas.height - 2 * canvas.height / w - (y_ans - y_min + y_key) * space_y / y_key;
        }
        ctx.restore();
    }

    associatingVariables = () => {
        this.drawScatterPlot([], [], "", "", "reset");
        // get relationship of x and y arrays
        let n = getRandomNumber(10, 20, 0, 0);
        let k = getRandomNumber(1, 5, 0, 0);
        let b = getRandomNumber(5, 20, 0, 0);
        let x = new Array(n);
        let y = new Array(n);
        let x_0 = 0;
        let y_0 = 0;
        let x_title, y_title;
        let type = getRandomNumber(1, 2, 0, 0);
        if (type === 1) {
            x_title = "height (cm)";
            x_0 = getRandomNumber(110, 130, 0, 0);
            y_title = "weight (kg)";
            y_0 = 40;
        } else {
            x_title = "Petrol (L)";
            x_0 = 0;
            y_title = "Cost ($)";
            y_0 = 0;
        }
        console.log("k is " + k);

        // place array of random dots
        for (let i = 0; i < n; i++) {
            k = 1;
            // ensure values for each x
            x[i] = i + x_0;            
            y[i] = k * x[i] + b + getRandomNumber(1, k, 0, 1) + y_0;
            // get more random x points
            
            i += 1;
            x[i] = getRandomNumber(0, x.length-1, 0, 0) + x_0;
            y[i] = k * x[i] + b + getRandomNumber(1, k, 0, 1) + y_0;
            

        }
        // draw scatterplot

        //x = [10, 20, 30, 40];
        //y = [6, 11, 14, 19];
        let x_min = Math.min(...x);
        let x_max = Math.max(...x);
        let x_q = getRandomNumber(x_min, x_max, 0, 0);
        let y_a = k * x_q + b + y_0;
        let questionText = "The relationship between " + x_title + " and " + y_title + " is given below. ";
        let ans;
        if (type === 1) {
            questionText += "If a boy is " + x_q + "cm tall, how much would he weigh?";
            ans = y_a;
        } else {
            questionText += "How much would " + x_q + "L of petrol cost?";
            ans = y_a;
        }
        this.drawScatterPlot(x, y, x_title, y_title, "question", x_q, ans);
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        
        
        // ask for random x what is y and vice versa
        // if incorrect show on chart the correct via lines
        this.Ans = ans;
        this.mc1 = ans + getRandomNumber(10, 20, 0, 1);
        this.mc2 = ans + getRandomNumber(10, 20, 0, 1);
        this.mc3 = ans + getRandomNumber(10, 20, 0, 1);

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

export default ex01_scatterplots;