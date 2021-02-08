import {getRandomNumber, numDecimals, resetCanvas, dpCheck} from '../MathFunctions';

function drawChart(x, y, xVar, yVar) {
    resetCanvas();
    let canvas = document.getElementById("canvasID");
    canvas.style.backgroundColor = "white";
    canvas.style.display = "block";
    canvas.style.marginLeft = "auto";
    canvas.style.marginRight = "auto";
    canvas.height = 400;
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.beginPath();

    
    // draw axis
    ctx.lineWidth = 2;
    ctx.moveTo(100, 20);
    ctx.lineTo(100, canvas.height - 100);
    ctx.lineTo(canvas.width - 100, canvas.height - 100);

    // arrows
    ctx.moveTo(90, 30);
    ctx.lineTo(100, 20);
    ctx.lineTo(110, 30);
    ctx.moveTo(canvas.width - 110, canvas.height - 110);
    ctx.lineTo(canvas.width - 100, canvas.height - 100);
    ctx.lineTo(canvas.width - 110, canvas.height - 90);
    ctx.stroke();
    ctx.restore();

    // plot y point 
    let y0 = 100 + getRandomNumber(0, 20, 0, 0)
    let x0 = canvas.width - 200 - getRandomNumber(0, 40, 0, 0);
    if (x > 0) {            
        ctx.moveTo(100, canvas.height - 100);
        ctx.lineTo(x0, y0);
        ctx.stroke();
        ctx.setLineDash([5, 3]);
        ctx.moveTo(100, y0);
        ctx.lineTo(x0, y0);
        ctx.lineTo(x0, canvas.height - 100);
    } else {
        ctx.moveTo(100, y0);
        ctx.lineTo(x0, canvas.height - 100);
        x *= -1;
    }
    ctx.stroke();
    ctx.restore();

    // text
    ctx.font = "20px CMSY10";
    ctx.fillText(x, x0, canvas.height - 80);
    ctx.fillText(xVar, x0, canvas.height - 50);

    ctx.fillText(y, 65, y0);
    let xn = 10;
    let yn = y0 - 60;
    let yVar1 = yVar;
    let yVar2 = "";
    if (yVar.indexOf("(") >= 0) {
        yVar1 = yVar.split("(")[0];
        yVar2 = "(" + yVar.split("(")[1];
    }
    
    ctx.rotate(-Math.PI/2.01);
    xn = -200;
    yn = 30;
    
    ctx.fillText(yVar1, xn, yn);
    ctx.fillText(yVar2, xn, yn + 20);
    ctx.restore();

}

export function gradient() {
    let correct_ans, mc1, mc2, mc3;
    let type = getRandomNumber(1, 2, 0, 0);
    let questionText;
    let x, y, xVar, yVar, unit;
    if (type === 1) {
        x = getRandomNumber(2, 6, 0, 0);
        y = 5 * getRandomNumber(80, 200, 0, 0);
        xVar = "Hours";
        yVar = "Distance (km)";
        questionText = "A car travels " + y + " km in " + x + " hours. What rate is this? (it's speed in km/h)";        
        unit = " km/h";
    } else if (type === 2) {
        x = -getRandomNumber(5, 15, 0, 0);
        y = 5 * getRandomNumber(8, 20, 0, 0);
        xVar = "Weeks";
        yVar = "Number of cases";
        questionText = "The graph shows the number of cases of flu reported over several weeks";
        unit = " cases/week";
    }

    drawChart(x, y, xVar, yVar);    

    if (y % x !== 0) {
        correct_ans = (y/x).toFixed(1);
        mc1 = (y/x + getRandomNumber(1, 5, 1, 1)).toFixed(1);
        mc2 = (y/x + getRandomNumber(1, 5, 1, 1)).toFixed(1);
        mc3 = (y/x + getRandomNumber(1, 5, 1, 1)).toFixed(1);
    } else {
        correct_ans = dpCheck(y/x);
        mc1 = dpCheck(y/x + getRandomNumber(1, 5, numDecimals(dpCheck(y/x)), 1));
        mc2 = dpCheck(y/x + getRandomNumber(1, 5, numDecimals(dpCheck(y/x)), 1));
        mc3 = dpCheck(y/x + getRandomNumber(1, 5, numDecimals(dpCheck(y/x)), 1));
    }

    correct_ans += unit;
    mc1 += unit;
    mc2 += unit;
    mc3 += unit;
    
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

function drawGradientSign(sign, xValues) {
    //resetCanvas();
    let canvas = document.getElementById("canvasID");
    canvas.style.backgroundColor = "white";
    canvas.style.display = "block";
    canvas.style.marginLeft = "auto";
    canvas.style.marginRight = "auto";
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.beginPath();

    
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
            /*
            // checkansreview
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
            */
        }

        ctx.moveTo(canvas.width/2 + k*xValues[0], canvas.height/2-10);
        ctx.lineTo(canvas.width/2 + k*xValues[0], canvas.height/2+10);
        ctx.font = "20px CMSY10";
        ctx.fillText(xValues[0], canvas.width/2 + k*xValues[0] -10, canvas.height/2+30);

        ctx.stroke();

    }
}

export function gradientSigns() {
    let type = getRandomNumber(1, 4, 0, 0);
    let xValues = [getRandomNumber(2, 8, 0, 1)];
    let sign, questionText, correct_ans, mc1, mc2, mc3;
    if (type === 1) {
        sign = 1;
        questionText = "For which values of <span>x</span> is the graphs gradient positive?";
        correct_ans = "<span>x &gt; </span>" + xValues[0];    
        mc1 = "<span>x &gt;= </span>" + xValues[0];    
        mc2 = "<span>x &lt;= </span>" + xValues[0];    
        mc3 = "<span>x &lt; </span>" + xValues[0];    
    } else if (type === 2) {
        sign = 1;
        questionText = "For which values of <span>x</span> is the graphs gradient negative?";
        correct_ans = "<span>x &lt; </span>" + xValues[0];    
        mc1 = "<span>x &gt;= </span>" + xValues[0];    
        mc2 = "<span>x &lt;= </span>" + xValues[0];    
        mc3 = "<span>x &gt; </span>" + xValues[0];            
    } else if (type === 3) {
        sign = -1;
        questionText = "For which values of <span>x</span> is the graphs gradient positive?";
        correct_ans = "<span>x &lt; </span>" + xValues[0];
        mc1 = "<span>x &gt;= </span>" + xValues[0];    
        mc2 = "<span>x &lt;= </span>" + xValues[0];    
        mc3 = "<span>x &gt; </span>" + xValues[0];    
    } else if (type === 4) {
        sign = -1;
        questionText = "For which values of <span>x</span> is the graphs gradient negative?";
        correct_ans = "<span>x &gt; </span>" + xValues[0];
        mc1 = "<span>x &gt;= </span>" + xValues[0];    
        mc2 = "<span>x &lt;= </span>" + xValues[0];    
        mc3 = "<span>x &lt; </span>" + xValues[0];    
    }
    drawGradientSign(sign, xValues);
    
    let arr = [correct_ans, mc1, mc2, mc3];
    let review = ["gradientSigns", sign, xValues];
    return [questionText].concat(arr).concat(review);
}

export function  limitEvaluation() {
    let questionText = "yes";
    let correct_ans = 1;
    let mc1 = 0;
    let mc2 = 0;
    let mc3 = 0;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}