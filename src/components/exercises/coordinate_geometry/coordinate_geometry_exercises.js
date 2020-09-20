import {getRandomNumber, setupCanvas, dpCheck, simplifyRatio} from '../MathFunctions';

function drawGraph(x1, y1, x2, y2, option) {
    let canvas = setupCanvas();
    let ctx = canvas.getContext("2d");
    ctx.restore();
    ctx.save();        
    if (option === "reset") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // draw gridlines
    let w = 16;
    ctx.moveTo(0, 0);
    let d = 0;
    while (d < canvas.width) {
        ctx.beginPath();
        ctx.lineWidth = 0.1;
        ctx.moveTo(d, 0);
        ctx.lineTo(d, canvas.height);
        ctx.moveTo(0, d);
        ctx.lineTo(canvas.width, d);
        ctx.stroke();
        
        if (d !== canvas.width/2) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(d, canvas.height/2);
            ctx.lineTo(d, canvas.height/2 + 4);
            ctx.moveTo(canvas.width/2, d);
            ctx.lineTo(canvas.width/2 + 4, d);
            ctx.stroke();
            ctx.font = "14px CMSY10";
            ctx.fillText(((d / (canvas.width/w)) - w/2), d, canvas.height/2 + 15);
            ctx.fillText(-((d / (canvas.width/w)) - w/2), canvas.width/2 + 7, d);
        }            
        d += canvas.width / w;

    }
    ctx.stroke();

    // draw axis
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.lineWidth = 1;
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
    ctx.stroke();

    
    ctx.beginPath();
    ctx.arc(x1 * canvas.width/w + canvas.width/2, -y1 * canvas.height/w + canvas.height/2, 2.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x2 * canvas.width/w + canvas.width/2, -y2 * canvas.height/w + canvas.height/2, 2.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    let m = (y2 - y1) / (x2 - x1);
    let x3, y3, x4, y4;
    
    x3 = -w / 2;
    y3 = m * (x3 - x1) + y1;
    x3 = x3 * canvas.width/w + canvas.width/2;
    y3 = -y3 * canvas.height/w + canvas.height/2;
    if (y3 < 0) {
        y3 = w / 2;
        x3 = x1 + (y3 - y1) / m;
        x3 = x3 * canvas.width/w + canvas.width/2;
        y3 = -y3 * canvas.height/w + canvas.height/2;        
    } else if (y3 > canvas.height) {
        y3 = -w / 2;
        x3 = x1 + (y3 - y1) / m;
        x3 = x3 * canvas.width/w + canvas.width/2;
        y3 = -y3 * canvas.height/w + canvas.height/2;
    }
    
    x4 = w / 2;
    y4 = m * (x4 - x1) + y1;
    x4 = x4 * canvas.width/w + canvas.width/2;
    y4 = -y4 * canvas.height/w + canvas.height/2;        
    if (y4 < 0) {
        y4 = w / 2;
        x4 = x1 + (y4 - y1) / m;            
        x4 = x4 * canvas.width/w + canvas.width/2;
        y4 = -y4 * canvas.height/w + canvas.height/2;
    } else if (y4 > canvas.height) {
        y4 = -w / 2;
        x4 = x1 + (y4 - y1) / m;
        x4 = x4 * canvas.width/w + canvas.width/2;
        y4 = -y4 * canvas.height/w + canvas.height/2;
    }
    
    ctx.moveTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.stroke();
}

export function lineMidpoint() {
    drawGraph(0, 0, 0, 0, "reset");
    let x1 = getRandomNumber(1, 7, 0, 1);
    let y1 = getRandomNumber(1, 7, 0, 1);
    let x2 = getRandomNumber(1, 7, 0, 1);
    let y2 = getRandomNumber(1, 7, 0, 1);        
    let points = [x1, y1, x2, y2];

    while (x2 === x1) {
        x2 = getRandomNumber(1, 7, 0, 1);
    }

    while (y2 === y1) {
        y2 = getRandomNumber(1, 7, 0, 1);
    }
    drawGraph(x1, y1, x2, y2);
    let questionText = "What is the midpoint of P(" + x1 + ", " + y1 + ") and Q(" + x2 + ", " + y2 + ")?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    let x = (x1 + x2)/2;
    let y = (y1 + y2)/2;
    
    let correct_ans = "(" + x +", " + y + ")";
    let mc1 = "(" + (x + getRandomNumber(1, 3, 0, 1)) +", " + y + ")";
    let mc2 = "(" + x +", " + (y + getRandomNumber(1, 3, 0, 1)) + ")";
    let mc3 = "(" + (x + getRandomNumber(1, 3, 0, 1)) +", " + (y + getRandomNumber(1, 3, 0, 1)) + ")";

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr, points);
}

export function lineDistance() {
    drawGraph(0, 0, 0, 0, "reset");
    let x1 = getRandomNumber(1, 7, 0, 1);
    let y1 = getRandomNumber(1, 7, 0, 1);
    let x2 = getRandomNumber(1, 7, 0, 1);
    let y2 = getRandomNumber(1, 7, 0, 1);

    let points = [x1, y1, x2, y2];

    while (x2 === x1) {
        x2 = getRandomNumber(1, 7, 0, 1);
    }

    while (y2 === y1) {
        y2 = getRandomNumber(1, 7, 0, 1);
    }

    drawGraph(x1, y1, x2, y2);
    let questionText, ans;
    let correct_ans, mc1, mc2, mc3;
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText = "What is the distance between P(" + x1 + ", " + y1 + ") and Q(" + x2 + ", " + y2 + ") in surd form?";        
        ans = (x1 - x2) ** 2 + (y1 - y2) ** 2;
        //square check
        let check = Math.sqrt(ans);
        if (check === Math.floor(check)) {
            ans = Math.sqrt(ans);
            correct_ans = ans;
            mc1 = ans + getRandomNumber(1, 5, 0, 1);
            mc2 = ans + getRandomNumber(1, 5, 0, 1);
            mc3 = ans + getRandomNumber(1, 5, 0, 1);
        } else {
            correct_ans = "&radic;<span style='text-decoration: overline'>" + (ans) + "</span>";
            mc1 = "&radic;<span style='text-decoration: overline'>" + (ans + getRandomNumber(1, 5, 0, 1))  + "</span>";
            mc2 = "&radic;<span style='text-decoration: overline'>" + (ans + getRandomNumber(1, 5, 0, 1))  + "</span>";
            mc3 = "&radic;<span style='text-decoration: overline'>" + (ans + getRandomNumber(1, 5, 0, 1))  + "</span>";
        }
    } else {
        questionText = "What is the distance of P(" + x1 + ", " + y1 + ") and Q(" + x2 + ", " + y2 + ") to 1 decimals?";
        ans = (x1 - x2) ** 2 + (y1 - y2) ** 2;
        ans = Math.sqrt(ans);
        correct_ans = ans.toFixed(1);
        mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1);
        mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1);
        mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1);
    }

    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr, points);
}

export function lineGradient() {
    drawGraph(0, 0, 0, 0, "reset");
    let x1 = getRandomNumber(1, 7, 0, 1);
    let y1 = getRandomNumber(1, 7, 0, 1);
    let x2 = getRandomNumber(1, 7, 0, 1);
    let y2 = getRandomNumber(1, 7, 0, 1);

    let points = [x1, y1, x2, y2];

    while (x2 === x1) {
        x2 = getRandomNumber(1, 7, 0, 1);
    }

    while (y2 === y1) {
        y2 = getRandomNumber(1, 7, 0, 1);
    }

    drawGraph(x1, y1, x2, y2);
    
            
    let questionText = "What is the gradient of the line joining points P(" + x1 + ", " + y1 + ") and Q(" + x2 + ", " + y2 + ") to 1 decimals?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans, mc1, mc2, mc3;
    if ((y2 - y1) % (x2 - x1) === 0) {
        correct_ans = (y2 - y1) / (x2 - x1);
        mc1 = (y2 - y1) / (x2 - x1) + getRandomNumber(1, 5, 0, 1);
        mc2 = (y2 - y1) / (x2 - x1) + getRandomNumber(1, 5, 0, 1);
        mc3 = (y2 - y1) / (x2 - x1) + getRandomNumber(1, 5, 0, 1);
    } else {
        correct_ans = `
        <span class="fraction">
            <span>` + (y2 - y1) + `</span>
            <span class="fraction-line">------</span>
            <span>` + (x2 - x1) + `</span>
        </span>
        `;
        mc1 = `
        <span class="fraction">
            <span>` + (y2 - y1 + getRandomNumber(1, 5, 0, 1)) + `</span>
            <span class="fraction-line">------</span>
            <span>` + (x2 - x1) + `</span>
        </span>
        `;
        mc2 = `
        <span class="fraction">
            <span>` + (y2 - y1 + getRandomNumber(1, 5, 0, 1)) + `</span>
            <span class="fraction-line">------</span>
            <span>` + (x2 - x1 + getRandomNumber(1, 5, 0, 1)) + `</span>
        </span>
        `;
        mc3 = `
        <span class="fraction">
            <span>` + (y2 - y1) + `</span>
            <span class="fraction-line">------</span>
            <span>` + (x2 - x1 + getRandomNumber(1, 5, 0, 1)) + `</span>
        </span>
        `;
    }
    
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr, points);
}


export function inclinationAngle() {        
    let m = getRandomNumber(0, 10, getRandomNumber(0, 1, 0, 0), getRandomNumber(0, 1, 0, 0));
    let questionText = "What is the angle of inclination of a line with gradient " + m + " (to the nearest minute)";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let dp, min, ans = Math.atan(m) * 180 / Math.PI;        
    if (ans > 0) {
        dp = ans - Math.floor(ans);
        min = 60 * dp;
        ans = Math.floor(ans);
    } else {
        dp = ans - Math.ceil(ans);
        min = -60 * dp;
        ans = Math.ceil(ans);
    }
    
    let correct_ans = ans + "<sup>O</sup>" + min.toFixed(0) + "'";
    let mc1 = (ans + getRandomNumber(1, 5, 0, 0)) + "<sup>O</sup>" + (min + getRandomNumber(1, 5, 0, 0)).toFixed(0) + "'";
    let mc2 = (ans + getRandomNumber(1, 5, 0, 0)) + "<sup>O</sup>" + (min + getRandomNumber(1, 5, 0, 0)).toFixed(0) + "'";
    let mc3 = (ans + getRandomNumber(1, 5, 0, 0)) + "<sup>O</sup>" + (min + getRandomNumber(1, 5, 0, 0)).toFixed(0) + "'";

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function gradient() {
    let m = getRandomNumber(0, 10, getRandomNumber(0, 1, 0, 0), getRandomNumber(0, 1, 0, 0));        
    let dp, min, ans = Math.atan(m) * 180 / Math.PI;        
    if (ans > 0) {
        dp = ans - Math.floor(ans);
        min = 60 * dp;
        ans = Math.floor(ans);
    } else {
        dp = ans - Math.ceil(ans);
        min = -60 * dp;
        ans = Math.ceil(ans);
    }

    let questionText = "What is the gradient (to 2 d.p) of a line which makes an angle of inclination of " + ans + "<sup>O</sup>" + min.toFixed(0) + "' with the x axis?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;

    
    let correct_ans = dpCheck(m);
    let mc1 = dpCheck(m + getRandomNumber(1, 5, 1, 1));
    let mc2 = dpCheck(m + getRandomNumber(1, 5, 1, 1));
    let mc3 = dpCheck(m + getRandomNumber(1, 5, 1, 1));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}



export function parallelLines() {        
    let m = getRandomNumber(1, 10, 0, getRandomNumber(0, 1, 0, 0));
    let questionText = "What is the gradient of a line parallel to <span>y = " + m + "x + " + getRandomNumber(1, 10, 0, 0) + "</span>";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    let correct_ans = m;
    let mc1 = m + getRandomNumber(1, 5, 0, 1);
    let mc2 = m + getRandomNumber(1, 5, 0, 1);
    let mc3 = m + getRandomNumber(1, 5, 0, 1);

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function parallelLinesFrac() {
    let a = getRandomNumber(1, 10, 0, 1);
    let b = getRandomNumber(2, 10, 0, 0);
    if (b === a) {
        b += 1;
    }
    let s;
    if (a < 1) {
        s = simplifyRatio(-a, b);
        a = -s[0];
    } else {
        s = simplifyRatio(a, b);
        a = s[0];
    }
    b = s[1];
    let f = `
    <span class="fraction">
        <span>` + a + `</span>
        <span class="fraction-line">------</span>
        <span>` + b + `</span>
    </span>
    `;
    let questionText = "What is the gradient of a line parallel to <span>y = " + f + "x + " + getRandomNumber(1, 10, 0, 0) + "</span>";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    let correct_ans = f;
    let mc1 = `
    <span class="fraction">
        <span>` + (a + getRandomNumber(1, 5, 0, 0)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + b + `</span>
    </span>
    `;
    let mc2 = `
    <span class="fraction">
        <span>` + (a + getRandomNumber(1, 5, 0, 0)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + (b + getRandomNumber(1, 5, 0, 0)) + `</span>
    </span>
    `;
    let mc3 = `
    <span class="fraction">
        <span>` + a + `</span>
        <span class="fraction-line">------</span>
        <span>` + (b + getRandomNumber(1, 5, 0, 0)) + `</span>
    </span>
    `;

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function perpendicularLines() {        
    let m = getRandomNumber(1, 10, 0, 0);
    let questionText = "What is the gradient of a line perpendicular to <span>y = " + m + "x + " + getRandomNumber(1, 10, 0, 0) + "</span>";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    let correct_ans =  `
    <span class="fraction">
        <span>` + (-1) + `</span>
        <span class="fraction-line">------</span>
        <span>` + m + `</span>
    </span>
    `;
    let mc1 = `
    <span class="fraction">
        <span>` + (1) + `</span>
        <span class="fraction-line">------</span>
        <span>` + m + `</span>
    </span>
    `;
    let mc2 = `
    <span class="fraction">
        <span>` + (-m) + `</span>
        <span class="fraction-line">------</span>
        <span>` + 1 + `</span>
    </span>
    `;
    let mc3 = -m;

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function perpendicularLinesFrac() {        
    let a = getRandomNumber(2, 10, 0, 1);
    let b = getRandomNumber(2, 10, 0, 0);
    if (b === a) {
        b += 1;
    }
    let s;
    if (a < 1) {
        s = simplifyRatio(-a, b);
        a = -s[0];
    } else {
        s = simplifyRatio(a, b);
        a = s[0];
    }
    b = s[1];
    let f = `
    <span class="fraction">
        <span>` + a + `</span>
        <span class="fraction-line">------</span>
        <span>` + b + `</span>
    </span>
    `;
    let questionText = "What is the gradient of a line perpendicular to <span>y = " + f + "x + " + getRandomNumber(1, 10, 0, 0) + "</span>";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    let correct_ans =  `
    <span class="fraction">
        <span>` + (-b) + `</span>
        <span class="fraction-line">------</span>
        <span>` + a + `</span>
    </span>
    `;
    let mc1 = `
    <span class="fraction">
        <span>` + b + `</span>
        <span class="fraction-line">------</span>
        <span>` + a + `</span>
    </span>
    `;
    let mc2 = `
    <span class="fraction">
        <span>` + a + `</span>
        <span class="fraction-line">------</span>
        <span>` + b + `</span>
    </span>
    `;
    let mc3 = `
    <span class="fraction">
        <span>` + (-a) + `</span>
        <span class="fraction-line">------</span>
        <span>` + b + `</span>
    </span>
    `;

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}
