
import React from 'react';
import {getRandomNumber, printTest, reset, answerType, shuffle, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex02_linear_association extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding linear associations. Click the Start button below to begin...";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(1); // multiplechoice === 1
        
        this.numQuestions += 1;
        let numQuestionTypes = 3;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let mcOptions;
        if (chooseQuestion === 1) {
            mcOptions = this.linearAssociation();
        } else if (chooseQuestion === 2) {
            mcOptions = this.pearsonCorrelationCoefficientAssociation();
        } else if (chooseQuestion === 3) {
            mcOptions = this.calculatePearsonCorrelationCoefficient();            
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "data analysis ex02")};
        }
        this.writeFormula();
        this.writeExample();
    }

    drawScatterPlot = (x, y, option) => {        
        //console.log("x:" + x);
        //console.log("y:" + y);
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
            let titles = ["Cost ($)", "Height (cm)", "Age (months)", "Time (hrs)", "Weight (kg)", "Litres (L)", "Distance (km)"];
            let x_title = titles[getRandomNumber(0, titles.length - 1, 0, 0)];
            let y_title = titles[getRandomNumber(0, titles.length - 1, 0, 0)];
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

        }
        ctx.restore();
    }

    getPearsonCorrelationCoefficient = (x, y) => {
        // get mean of x
        if (x.length !== y.length) {
            console.log("error 176: x and y are of different lengths");
            console.log("x.length is "  + x.length);
            console.log("y.length is "  + y.length);
            return 0;
        }
        // average
        let sum_x = 0;
        let sum_y = 0;
        for (let i = 0; i < x.length; i++) {
            sum_x += x[i];
            sum_y += y[i];
        }
        let mean_x = (sum_x / x.length).toFixed(5);
        let mean_y = (sum_y / y.length).toFixed(5);
        // https://www.socscistatistics.com/tests/pearson/
        let n = 0;
        let d1 = 0;
        let d2= 0;
        for (let i = 0; i < x.length; i++) {
            n += ((x[i] - mean_x) * (y[i] - mean_y));
            d1 += ((x[i] - mean_x) ** 2);
            d2 += ((y[i] - mean_y) ** 2);
        }
        let r = n / (Math.sqrt(d1) * Math.sqrt(d2));
        r = r.toFixed(6);
        return r;
    }

    linearAssociation = () => {
        this.drawScatterPlot([], [], "reset");
        // get relationship of x and y arrays
        let n = 50;
        let noise, ans, diff;
        let domain = Math.floor(0.4 * n);
        let x = new Array(n);
        let y = new Array(n);                
        let k = getRandomNumber(1, 5, 0, 1);
        let b = getRandomNumber(1, 100, 0, 0);
        
        // place array of random dots
        let type = getRandomNumber(1, 4, 0, 0);
        let x_0 = getRandomNumber(1, 100, 0, 0);
        if (type === 1) {
            // strong
            diff = 1;
            if (k < 0) {
                ans = ["strong negative", "strong positive", "weak negative", "no correlation"];
            } else {
                ans = ["strong positive", "strong negative", "weak negative", "no correlation"];
            }
        } else if (type === 2) {
            // moderate
            diff = 10;
            if (k < 0) {
                ans = ["moderate negative", "moderate positive", "weak positive", "no correlation"];
            } else {
                ans = ["moderate positive", "moderate negative", "weak negative", "no correlation"];
            }
        } else if (type === 3) {
            // weak
            diff = 20;
            if (k < 0) {
                ans = ["weak negative", "strong positive", "weak positive", "stong negative"];
            } else {
                ans = ["weak positive", "strong positive", "weak negative", "stong negative"];
            }
        } else {
            // no connection
            diff = 199;
            ans = ["no correlation", "moderate positive", "strong negative", "weak negative"];
        }

        for (let i = 0; i < n; i++) {
            // k = 1;
            // ensure values for each x
            if (i < domain) {
                x[i] = i + x_0;
            } else {
                x[i] = getRandomNumber(0, domain, 0, 0) + x_0;
            }
            //noise = 5 * getRandomNumber(min, max, 0, 0) / 1000; 
            noise = 5 * getRandomNumber(1, 1 + diff, 0, 0) / 1000; 
            y[i] = Math.floor((1 - noise) * (k * x[i] + b));
        }

        // draw scatterplot
        this.drawScatterPlot(x, y, "question");
        let questionText = "What is the correlation best described as?";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        
        // ask for random x what is y and vice versa
        // if incorrect show on chart the correct via lines
        this.Ans = ans[0];
        this.mc1 = ans[1];
        this.mc2 = ans[2];
        this.mc3 = ans[3];

        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    pearsonCorrelationCoefficientAssociation = () => {
        // get relationship of x and y arrays
        let n = getRandomNumber(7, 10, 0, 0);
        let noise, ans, diff;
        let x = new Array(n);
        let y = new Array(n);   
        let k = getRandomNumber(1, 5, 0, 1);
        let b = getRandomNumber(1, 100, 0, 0);
        
        // place array of random dots
        let type = getRandomNumber(1, 4, 0, 0);
        let x_0 = getRandomNumber(1, 100, 0, 0);
        if (type === 1) {
            // strong
            diff = 1;
        } else if (type === 2) {
            // moderate
            diff = 10;
        } else if (type === 3) {
            // weak
            diff = 20;
        } else {
            // no connection
            diff = 199;
        }

        for (let i = 0; i < n; i++) {
            // k = 1;
            // ensure values for each x
            x[i] = i + x_0;
            //noise = 5 * getRandomNumber(min, max, 0, 0) / 1000; 
            noise = 5 * getRandomNumber(1, 1 + diff, 0, 0) / 1000; 
            y[i] = Math.floor((1 - noise) * (k * x[i] + b));
        }
        
        let r = this.getPearsonCorrelationCoefficient(x, y);
        console.log("r is " + r);
        if (r >= 0.75 && r <= 1) {
            ans = ["strong positive", "weak negative", "weak negative", "no correlation"];
        } else if (r >= 0.5 && r < 0.75) {
            ans = ["moderate positive", "weak negative", "strong negative", "no correlation"];
        } else if (r >= 0.25 && r < 0.5) {
            ans = ["weak positive", "weak negative", "strong negative", "no correlation"];
        } else if (r > -0.25 && r < 0.25) {
            ans = ["no correlation", "moderate negative", "strong negative", "strong postive"];
        } else if (r > -0.5 && r <= -0.25) {
            ans = ["weak negative", "weak positive", "strong positive", "no correlation"];
        } else if (r > -0.75 && r <= -0.5) {
            ans = ["moderate negative", "weak positive", "strong positive", "no correlation"];
        } else if (r >= -1 && r <= -0.75) {
            ans = ["strong negative", "weak positive", "weak positive", "no correlation"];
        } else {
            ans = [0, 0, 0, 0];
            console.log("error 287: we have an additional value for r:" + r);
        }
        // print out arrays
        let titles = ["Cost ($)", "Height (cm)", "Age (months)", "Time (hrs)", "Weight (kg)", "Litres (L)", "Distance (km)"];
        let m = getRandomNumber(0, titles.length - 2, 0, 0);
        let x_title = titles[m];
        let y_title = titles[getRandomNumber(m + 1, titles.length - 1, 0, 0)];
        let questionText = "By calculating the pearson correlation coefficient, what would the strength of the association be?";
        questionText += "<table><tr><td style='width: 200px; font-weight: bold'>" + x_title + "</td>";
        for (let i = 0; i < x.length; i++) {
            questionText += "<td>" + x[i] + "</td>";
        }
        questionText += "</tr><tr><td style='width: 200px; font-weight: bold'>" + y_title + "</td>";
        for (let i = 0; i < y.length; i++) {
            questionText += "<td>" + y[i] + "</td>";
        }
        questionText += "</tr></table>";
        questionText += "";
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        
        this.Ans = ans[0];
        this.mc1 = ans[1];
        this.mc2 = ans[2];
        this.mc3 = ans[3];

        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    calculatePearsonCorrelationCoefficient = () => {
        // get relationship of x and y arrays
        let n = getRandomNumber(7, 10, 0, 0);
        let noise, diff;
        let x = new Array(n);
        let y = new Array(n);   
        let k = getRandomNumber(1, 5, 0, 1);
        let b = getRandomNumber(1, 100, 0, 0);
        
        // place array of random dots
        let type = getRandomNumber(1, 4, 0, 0);
        let x_0 = getRandomNumber(1, 100, 0, 0);
        if (type === 1) {
            // strong
            diff = 1;
        } else if (type === 2) {
            // moderate
            diff = 10;
        } else if (type === 3) {
            // weak
            diff = 20;
        } else {
            // no connection
            diff = 199;
        }

        for (let i = 0; i < n; i++) {
            // k = 1;
            // ensure values for each x
            x[i] = i + x_0;
            //noise = 5 * getRandomNumber(min, max, 0, 0) / 1000; 
            noise = 5 * getRandomNumber(1, 1 + diff, 0, 0) / 1000; 
            y[i] = Math.floor((1 - noise) * (k * x[i] + b));
        }
        
        let r = this.getPearsonCorrelationCoefficient(x, y);
        // print out arrays
        let titles = ["Cost ($)", "Height (cm)", "Age (months)", "Time (hrs)", "Weight (kg)", "Litres (L)", "Distance (km)"];
        let m = getRandomNumber(0, titles.length - 2, 0, 0);
        let x_title = titles[m];
        let y_title = titles[getRandomNumber(m + 1, titles.length - 1, 0, 0)];
        let questionText = "Calculate the pearson correlation coefficient of the following association";
        questionText += "<table><tr><td style='width: 200px; font-weight: bold'>" + x_title + "</td>";
        for (let i = 0; i < x.length; i++) {
            questionText += "<td>" + x[i] + "</td>";
        }
        questionText += "</tr><tr><td style='width: 200px; font-weight: bold'>" + y_title + "</td>";
        for (let i = 0; i < y.length; i++) {
            questionText += "<td>" + y[i] + "</td>";
        }
        questionText += "</tr></table>";
        questionText += "";
        document.getElementById("questionStringID").innerHTML = questionText;
        this.Ans = parseFloat(r).toFixed(4);
        this.mc1 = getRandomNumber(0, 1, 4, 1).toFixed(4);
        this.mc2 = getRandomNumber(0, 1, 4, 1).toFixed(4);
        this.mc3 = getRandomNumber(0, 1, 4, 1).toFixed(4);

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

export default ex02_linear_association;