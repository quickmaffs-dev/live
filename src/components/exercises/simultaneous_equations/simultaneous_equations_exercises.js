import {getRandomNumber, numberWithCommas} from '../MathFunctions';

export function drawCanvas(x_int, y_int, option) {
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

export function equationsAndGraphs() {
    drawCanvas(0, 0, "reset");
    // x_int and y_int < 10
    let x_int = getRandomNumber(1, 9, 0, 1);
    let y_int = getRandomNumber(1, 9, 0, 1);
    //this.x_int = x_int;
    //this.y_int = y_int;
    let ans;
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        // true
        drawCanvas(x_int, y_int, "question");            
        ans = "True";
    } else {
        // false
        if (x_int !== y_int) {
            drawCanvas(y_int, x_int, "question");
        } else {
            drawCanvas(-x_int, y_int, "question");
        }            
        ans = "False";
    }
    //let m = "<sup>" + (-y_int) + "</sup> / <sub>" + x_int + "</sub>";
    let questionText = "Is this the correct graph for " + y_int + "x + " + x_int + "y = " + (x_int * y_int) + "?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    return [questionText, ans, x_int, y_int];
}

export function linearRelationships() {
    // d = kt + b
    // if t = x, what is d?
    let type = getRandomNumber(1, 3, 0, 0);
    let questionText, correct_ans, mc1, mc2, mc3;
    let k = getRandomNumber(1, 20, 0, 0); // assume postive
    let b = getRandomNumber(1, 20, 0, 1);
    let x = getRandomNumber(1, 20, 0, 0); 
    let ans = k * x + b;
    if (type === 1) {
        if (ans < 0) {
            // cant get negative distance
            return linearRelationships();
        }
        questionText = "The distance a car travels in km every hour is given by the linear model <span>d</span> = " + k + "<span>t</span> + " + b;
        let unit;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText += ". How far has the car gone in " + x + "hrs?";
            unit = " km";
        } else {
            questionText += ". How long until the car has gone " + ans + " km?";
            unit = " hrs";
            let tmp = x;
            x = ans;
            ans = tmp;
            
        }
        correct_ans = ans + unit;
        mc1 = (ans + getRandomNumber(1, 5, 0, 1)) + unit;
        mc2 = (ans + getRandomNumber(1, 5, 0, 1)) + unit;
        mc3 = (ans + getRandomNumber(1, 5, 0, 1)) + unit;
    } else if (type === 2) {
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            k = 5 * getRandomNumber(1, 20, 0, 0) / 10;
        }
        b = 0;
        ans = k * x + b;
        if (ans < 0) {
            // cant get negative distance
            return linearRelationships();
        }
        questionText = "My phone plans charges $" + k.toFixed(2) + " per GB";
        let unit;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText += ". How much will I be charged for using " + x + " GB of data?";
            unit = "$";
        } else {
            questionText += ". How much data did I use if I was charged $" + ans.toFixed(2);
            unit = " GB";
            let tmp = x;
            x = ans;
            ans = tmp;
            
        }
        correct_ans = ans.toFixed(2) + unit;
        mc1 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(2) + unit;
        mc2 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(2) + unit;
        mc3 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(2) + unit;
    } else {
        k *= 100;
        b *= 100;
        x = getRandomNumber(10, 100, 0, 0);
        ans = k * x + b;
        if (ans < 0) {
            // cant get negative distance
            return linearRelationships();
        }
        questionText = "The speed of a rocket in km/hr is given by <span>v</span> = " + numberWithCommas(k) + "<span>t</span> + " + b;
        let unit, m;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText += ". What is the rocket's speed after " + numberWithCommas(x) + "hrs?";
            unit = " km/hr";
            m = 100;
        } else {
            questionText += ". How long until the rocket's speed is " + numberWithCommas(ans) + " km/hr?";
            unit = " hrs";
            let tmp = x;
            x = ans;
            ans = tmp;
            m = 1;
        }
        correct_ans = numberWithCommas(ans) + unit;
        mc1 = numberWithCommas((ans + m * getRandomNumber(1, 5, 0, 1))) + unit;
        mc2 = numberWithCommas((ans + m * getRandomNumber(1, 5, 0, 1))) + unit;
        mc3 = numberWithCommas((ans + m * getRandomNumber(1, 5, 0, 1))) + unit;
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function pointsOfIntersection() {
    // y = ax + b
    // y = cx + d
    // ax + b = cx + d
    // d = ax + b - cx
    let x = getRandomNumber(1, 10, 0, 1);        
    let a = getRandomNumber(1, 10, 0, 1);
    let b = getRandomNumber(1, 10, 0, 1);
    let c = getRandomNumber(1, 10, 0, 1);
    let d = a * x + b - c * x;
    let y = a * x + b;

    let questionText = "What is the point of intersection of the lines <span>y</span> = " + a + "<span>x</span> + " + b + "</span> and <span>y</span> = " + c + "<span>x</span> + " + d + "</span>?";
    let ans = "(" + x + ", " + y + ")";
    let correct_ans = ans;
    let mc1 = "(" + -x + ", " + y + ")";
    let mc2 = "(" + x + ", " + -y + ")";
    let mc3 = "(" + -x + ", " + -y + ")";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}