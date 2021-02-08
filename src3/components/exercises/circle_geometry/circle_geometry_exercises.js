import {getRandomNumber, setupCanvas} from '../MathFunctions';

function drawCircle(option) {
    let canvas = setupCanvas();
    //let ctx = setupCanvas(200, 500);
    let ctx = canvas.getContext("2d");
    canvas.height = 300;
    ctx.save();
    ctx.beginPath();
    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    let r = 0.6 * canvas.height/2;
    ctx.arc(canvas.width/2, canvas.height/2, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 1.5, 0, 2 * Math.PI);
    //ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    let x0 = canvas.width/2;
    let y0 = canvas.height/2;

    let theta = Math.PI * getRandomNumber(0, 20, 0, 0) / 10;
    let x = r * Math.cos(theta) + x0;
    let y = r * Math.sin(theta) + y0;

    if (x === x0 || y === y0) {
        return drawCircle(option);
    }
    if (option === "tangent") {
        let m1 = (y - y0) / (x - x0);
        let m2 = -1/m1;

        // y-y1 = m(x-x1)
        let x1, y1, x2 = 0, y2 = 0;
        if (x > x0) {
            x2 = canvas.width;
        }

        if (y > y0) {
            y2 = canvas.height;
        }

        y1 = m2 * (x2 - x) + y;
        x1 = x + (y2 - y) / m2;

        ctx.moveTo(x, y);
        ctx.lineTo(x2, y1);
        ctx.stroke();    
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y2);
        ctx.stroke();
    } else if (option === "radius") {
        ctx.moveTo(x, y);
        ctx.lineTo(x0, y0);
        ctx.stroke();    
    } else if (option === "diameter") {
        ctx.moveTo(x, y);
        ctx.lineTo(canvas.width - x, canvas.height - y);
        ctx.stroke();    
    } else if (option === "sector") {
        ctx.moveTo(x, y);
        ctx.lineTo(x0, y0);
        let alpha = (Math.PI / 2) * getRandomNumber(20, 70, 0, 0) / 90; // min 20 deg max 70 deg
        //let alpha = Math.PI * 70 / 90 / 2; // min 20 deg max 70 deg
        let x1 = r * Math.cos(theta + alpha) + x0;
        let y1 = r * Math.sin(theta + alpha) + y0;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x0, y0);
        ctx.lineTo(x, y);
        ctx.arc(x0, y0, r, theta, theta + alpha);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    } else if (option === "chord") {
        let alpha = (Math.PI / 2) * getRandomNumber(90, 270, 0, 0) / 90; // min 90 deg max 270 deg
        ctx.moveTo(x, y);
        let x1 = r * Math.cos(theta + alpha) + x0;
        let y1 = r * Math.sin(theta + alpha) + y0;
        ctx.lineTo(x1, y1);
        ctx.stroke();
    } else if (option === "secant") {
        let alpha = (Math.PI / 2) * getRandomNumber(50, 130, 0, 0) / 90; // min 20 deg max 70 deg
        ctx.moveTo(x, y);
        let x1 = r * Math.cos(theta + alpha) + x0;
        let y1 = r * Math.sin(theta + alpha) + y0;
        ctx.lineTo(x1, y1);
        let m = (y - y1) / (x - x1);
        
        let x2 = 0, y2 = 0;
        if (x > x0) {
            x2 = canvas.width;
        }

        if (y > y0) {
            y2 = canvas.height;
        }

        y1 = m * (x2 - x) + y;
        x1 = x + (y2 - y) / m;

        console.log("x2 is " + x2);
        console.log("y2 is " + y2);

        ctx.moveTo(x, y);
        ctx.lineTo(x2, y1);
        ctx.stroke();    
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y2);
        ctx.stroke();
    } else if (option === "segment") {
        let alpha = (Math.PI / 2) * getRandomNumber(90, 270, 0, 0) / 90; // min 90 deg max 270 deg
        ctx.moveTo(x, y);
        ctx.arc(x0, y0, r, theta, theta + alpha);
        ctx.lineTo(x, y);
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";;
        ctx.fill();
        ctx.stroke();
    } else {
        // "arc"
        let alpha = (Math.PI / 2) * getRandomNumber(90, 270, 0, 0) / 90; // min 90 deg max 270 deg
        ctx.moveTo(x, y);
        ctx.arc(x0, y0, r, theta, theta + alpha);
        ctx.lineWidth = 5;
        ctx.stroke();
        console.log("ar");
    }
}

export function partsOfCircle() {
    let ans = ["tangent", "sector", "radius", "diameter", "secant", "chord", "arc", "segment"];
    let type = getRandomNumber(1, ans.length, 0, 0) - 1;
    drawCircle(ans[type]);
    let questionText = "What part of the circle is this";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans = ans[type];
    let mc1 = ans[(type + 1) % ans.length];
    let mc2 = ans[(type + 2) % ans.length];
    let mc3 = ans[(type + 3) % ans.length];

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

function drawCircle2(k) {
    let canvas = setupCanvas();
    //let ctx = setupCanvas(200, 500);
    let ctx = canvas.getContext("2d");
    canvas.height = 300;
    ctx.save();
    ctx.beginPath();
    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    let r = 0.6 * canvas.height/2;
    ctx.arc(canvas.width/2, canvas.height/2, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 1.5, 0, 2 * Math.PI);
    //ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    let x0 = canvas.width/2;
    let y0 = canvas.height/2;

    let theta = Math.PI * getRandomNumber(0, 20, 0, 0) / 10;
    let x = r * Math.cos(theta) + x0;
    let y = r * Math.sin(theta) + y0;
    if (x === x0 || y === y0) {
        return drawCircle2(k);
    }
    
    let alpha = (Math.PI / 2) * getRandomNumber(90, 150, 0, 0) / 90; // min 90 deg max 270 deg
    let beta = (Math.PI / 2) * getRandomNumber(90, 150, 0, 0) / 90; // min 90 deg max 270 deg

    let x1 = r * Math.cos(theta + alpha) + x0;
    let y1 = r * Math.sin(theta + alpha) + y0;
    let x2 = r * Math.cos(theta - beta) + x0;
    let y2 = r * Math.sin(theta - beta) + y0;
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x0, y0);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.moveTo(r/4 * Math.cos(theta + alpha) + x0, r/4 * Math.sin(theta + alpha) + y0)
    ctx.arc(x0, y0, r/4, theta + alpha, theta - beta);
    ctx.stroke();

    let m = (y1 - y) / (x1 - x);
    let gamma = Math.atan(m);
    
    ctx.moveTo(x, y);
    //ctx.arc(x, y, r/5, gamma - Math.PI, gamma - (alpha + beta) / 2);
    //ctx.arc(x, y, r/5, gamma, gamma - (alpha + beta) / 2 - Math.PI);
    let g1, g2;
    if (gamma < 0 && x > x0 && y < y0) {
        g1 = gamma - Math.PI;
        g2 = gamma - (alpha + beta) / 2;
    } else if (gamma > 0 && x < x0 && y > y0) {
        g1 = gamma - Math.PI;
        g2 = gamma - (alpha + beta) / 2;
    } else if (gamma < 0 && x > x0 && y > y0) {
        g1 = gamma - Math.PI;
        g2 = gamma - (alpha + beta) / 2;
    } else if (gamma > 0 && x > x0 && y > y0) {
        g1 = gamma - Math.PI;
        g2 = gamma - (alpha + beta) / 2;
    } else {
        g1 = gamma;
        g2 = gamma - (alpha + beta) / 2 - Math.PI;
    }
    ctx.arc(x, y, r/5, g1, g2);
    ctx.stroke();
    ctx.moveTo(x, y);
    ctx.arc(x, y, r/4, g1, g2);        
    ctx.stroke();
    
    ctx.font = "italic 20px CMSY10";
    ctx.fillText(k, x - 10, y - 10);
    ctx.fillText("x", x0, y0);

}

export function angleProperties() {
    let questionText = "What is <span>x</span>";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let ans = getRandomNumber(20, 80, 0, 0);
    drawCircle2(ans);
    let correct_ans = 2 * ans;
    let mc1 = 2 * ans + getRandomNumber(1, 10, 0, 0);
    let mc2 = 2 * ans + getRandomNumber(1, 10, 0, 0);
    let mc3 = 2 * ans + getRandomNumber(1, 10, 0, 0);

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}