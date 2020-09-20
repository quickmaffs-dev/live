import {getRandomNumber, setupCanvas, dpCheck} from '../MathFunctions';

function drawSquare(n) {
    let canvas = setupCanvas();
    //let ctx = setupCanvas(200, 500);
    let ctx = canvas.getContext("2d");
    canvas.height = 200;
    let y = getRandomNumber(10, 40, 0, 0);
    let length = canvas.height - 2 * y;
    let x = (canvas.width - length) / 2;
    
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + length);
    ctx.lineTo(x + length, y + length);
    ctx.lineTo(x + length, y);
    ctx.lineTo(x, y);
    ctx.moveTo(x + length/2, y-4);
    ctx.lineTo(x + length/2, y+4);
    ctx.moveTo(x + length/2, y+length-4);
    ctx.lineTo(x + length/2, y+length+4);
    ctx.moveTo(x-4, y + length/2);
    ctx.lineTo(x+4, y + length/2);
    ctx.moveTo(x+length-4, y + length/2);
    ctx.lineTo(x+length+4, y + length/2);
    ctx.font = "italic 20px CMSY10";        
    ctx.fillText(n + " m", x+length+4+10, y + length/2);
    ctx.stroke();
}

function drawRectangle(a, b) {
    let canvas = setupCanvas();
    let ctx = canvas.getContext("2d");
    canvas.height = 200;
    let x = getRandomNumber(100, 140, 0, 0);
    let y = getRandomNumber(10, 40, 0, 0);
    let xLength = canvas.width - 2 * x;
    let yLength = canvas.height - 2 * y;
    let shiftDown = y - 5;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y + shiftDown);
    ctx.lineTo(x, y + yLength + shiftDown);
    ctx.lineTo(x + xLength, y + yLength + shiftDown);
    ctx.lineTo(x + xLength, y + shiftDown);
    ctx.lineTo(x, y + shiftDown);
    ctx.moveTo(x + xLength/2, y-4 + shiftDown);
    ctx.lineTo(x + xLength/2, y+4 + shiftDown);
    ctx.moveTo(x + xLength/2, y+yLength-4 + shiftDown);
    ctx.lineTo(x + xLength/2, y+yLength+4 + shiftDown);
    ctx.moveTo(x-4, y + yLength/2 + shiftDown);
    ctx.lineTo(x+4, y + yLength/2 + shiftDown);
    ctx.moveTo(x-4, y + yLength/2 + y);
    ctx.lineTo(x+4, y + yLength/2 + y);
    ctx.moveTo(x+xLength-4, y + yLength/2 + shiftDown);
    ctx.lineTo(x+xLength+4, y + yLength/2 + shiftDown);
    ctx.moveTo(x+xLength-4, y + yLength/2 + y);
    ctx.lineTo(x+xLength+4, y + yLength/2 + y);
    ctx.font = "italic 20px CMSY10";        
    ctx.fillText(a + " m", x+xLength+4+10, y + yLength/2 + y);
    ctx.fillText(b + " m", x + xLength/2 + 5, 20);
    ctx.stroke();
}

function drawTrapeziumA(a, b, h) {
    let canvas = setupCanvas();
    let ctx = canvas.getContext("2d");
    canvas.height = 200;
    //let x = getRandomNumber(100, 140, 0, 0);
    let y = getRandomNumber(20, 40, 0, 0);
    //let xLength = canvas.width - 2 * x;
    let yLength = canvas.height - 2 * y;
    //let shiftDown = y - 5;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(200, y);
    ctx.lineTo(400, y + yLength);
    ctx.lineTo(80, y + yLength);
    ctx.lineTo(80, y);
    ctx.moveTo(140, y-10);
    ctx.lineTo(150, y);
    ctx.lineTo(140, y+10);
    ctx.moveTo(140, y-10+yLength);
    ctx.lineTo(150, y+yLength);
    ctx.lineTo(140, y+10+yLength);
    ctx.moveTo(80, y+yLength-15);
    ctx.lineTo(95, y+yLength-15);
    ctx.lineTo(95, y+yLength);
    ctx.font = "italic 20px CMSY10";        
    ctx.fillText(a + " m", 150, 15);
    ctx.fillText(b + " m", 200, 190);
    ctx.fillText(h + " m", 10, 100);
    ctx.stroke();
}

function drawTrapeziumB(a, b, c) {
    let canvas = setupCanvas();
    let ctx = canvas.getContext("2d");
    canvas.height = 200;
    let x = getRandomNumber(100, 140, 0, 0);
    let y = getRandomNumber(30, 40, 0, 0);
    let xLength = canvas.width - 2 * x;
    let yLength = canvas.height - 2 * y;
    //let shiftDown = y - 5;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(canvas.width/2-xLength/2, y);
    ctx.lineTo(canvas.width/2+xLength/2, y);
    ctx.lineTo(canvas.width/2+xLength*1.5/2, y+yLength);
    ctx.lineTo(canvas.width/2-xLength*1.5/2, y+yLength);
    ctx.lineTo(canvas.width/2-xLength/2, y);
    ctx.moveTo(canvas.width/2-10, y-10);
    ctx.lineTo(canvas.width/2, y);
    ctx.lineTo(canvas.width/2-10, y+10);
    ctx.moveTo(canvas.width/2-10, y-10+yLength);
    ctx.lineTo(canvas.width/2, y+yLength);
    ctx.lineTo(canvas.width/2-10, y+10+yLength);        
    ctx.moveTo(canvas.width/2-xLength*1.2/2 - 5, (y+yLength-20)/2);
    ctx.lineTo(canvas.width/2-xLength*1.2/2 + 15, (y+yLength)/2);
    ctx.moveTo(canvas.width/2+xLength*1.2/2 + 5, (y+yLength-20)/2);
    ctx.lineTo(canvas.width/2+xLength*1.2/2 - 15, (y+yLength)/2);
    ctx.font = "italic 20px CMSY10";        
    ctx.fillText(a + " m", 260, 25);
    ctx.fillText(b + " m", 260, 190);
    ctx.fillText(c + " m", canvas.width/2+xLength*1.2/2 + 10, 100);
    ctx.stroke();
}

function drawTriangle(a, b, c) {
    let canvas = setupCanvas();
    let ctx = canvas.getContext("2d");
    canvas.height = 200;
    let x = getRandomNumber(100, 140, 0, 0);
    let y = getRandomNumber(30, 40, 0, 0);
    let xLength = canvas.width - 2 * x;
    //let yLength = canvas.height - 2 * y;
    //let shiftDown = y - 5;
    let scale = getRandomNumber(1, 4, 0, 0) / 5;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, canvas.height - y);
    ctx.lineTo(x + xLength, canvas.height - y);
    ctx.lineTo(x + xLength * scale, y);
    ctx.lineTo(x, canvas.height - y);
    ctx.font = "italic 20px CMSY10";        
    ctx.fillText(a + " m", x + 10, 100);
    ctx.fillText(b + " m", x + xLength - 30, 100);
    ctx.fillText(c + " m", 250, 190);
    ctx.stroke();
}

export function perimetersBasicShapes() {
    let ans, type = getRandomNumber(1, 5, 0, 0);
    let dp = getRandomNumber(0, 2, 0, 0);
    if (type === 1) {
        let n = getRandomNumber(5, 20, dp, 0);
        drawSquare(n);
        ans = 4 * n;
    } else if (type === 2) {
        let a = getRandomNumber(5, 20, dp, 0);
        let b = getRandomNumber(a + 1, 30, dp, 0);
        drawRectangle(a, b);
        ans = 2 * (a + b);
    } else if (type === 3) {
        let a = getRandomNumber(5, 20, dp, 0);
        let b = getRandomNumber(a + 1, 30, dp, 0);
        let h = getRandomNumber(5, 30, dp, 0);
        drawTrapeziumA(a, b, h);
        ans = parseFloat((a + h + b + Math.sqrt(h**2 + (b-a)**2)).toFixed(dp));
    } else if (type === 4) {
        let a = getRandomNumber(5, 20, dp, 0);
        let b = getRandomNumber(a + 1, 30, dp, 0);
        let c = getRandomNumber(5, 30, dp, 0);
        drawTrapeziumB(a, b, c);
        ans = a + b + 2*c;
    } else {
        let a = getRandomNumber(5, 20, dp, 0);
        let b = getRandomNumber(5, 20, dp, 0);
        let c = getRandomNumber(5, 20, dp, 0);
        drawTriangle(a, b, c);
        ans = a + b + c;
    }
    let questionText = "What is the perimeter of this shape?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans = dpCheck(ans) + " m";
    let mc1 = dpCheck(ans + getRandomNumber(1, 10, dp, 1)) + " m";
    let mc2 = dpCheck(ans + getRandomNumber(1, 10, dp, 1)) + " m";
    let mc3 = dpCheck(ans + getRandomNumber(1, 10, dp, 1)) + " m";

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

/*
function perimeterCompositeShapes() {
    let main = [getRandomNumber(11, 20, 0, 0), getRandomNumber(11, 20, 0, 0)];
    let small = [getRandomNumber(1, 10, 0, 0), getRandomNumber(1, 10, 0, 0)];
    //main = [4, 3];
    //small = [1, 2];
    let edges = [main[0] - small[0], main[1] - small[1], small[0], small[1], -main[0], -main[1]];
    console.log(edges);
    let temp, n = getRandomNumber(0, edges.length-1, 0, 0);
    console.log("n is " + n);        
    for (let i = 0; i < n; i++) {
        temp = edges[0];
        edges.shift();
        edges.push(temp);
    }
    console.log(edges);        

    let canvas = setupCanvas();
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 500, 500
    let x = 250;
    let y = 250;
    let scale = 10;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let i = 0; i < edges.length; i++) {
        if (i % 2 === 0) {
            x += edges[i]  * scale;
        } else {
            y += edges[i]  * scale;
        }
        ctx.lineTo(x, y);
    }
    ctx.lineTo(x, y);
    ctx.font = "italic 20px CMSY10";        
//        ctx.fillText(c + " m", 250, 190);
    ctx.stroke();

    let questionText = "What is the perimeter of this shape?";
    this.question_string = questionText;
    document.getElementById("questionStringID").innerHTML = questionText;
    this.Ans = 1;
    this.mc1 = 1;
    this.mc2 = 1;
    this.mc3 = 1;

    let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
    return arr;
}
*/

function drawTrapezium(a, b, h) {
    let canvas = setupCanvas();
    let ctx = canvas.getContext("2d");
    canvas.height = 200;
    //let x = getRandomNumber(100, 140, 0, 0);
    let y = getRandomNumber(20, 40, 0, 0);
    //let xLength = canvas.width - 2 * x;
    let yLength = canvas.height - 2 * y;
    //let shiftDown = y - 5;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(200, y);
    ctx.lineTo(400, y + yLength);
    ctx.lineTo(80, y + yLength);
    ctx.lineTo(80, y);
    ctx.moveTo(140, y-10);
    ctx.lineTo(150, y);
    ctx.lineTo(140, y+10);
    ctx.moveTo(140, y-10+yLength);
    ctx.lineTo(150, y+yLength);
    ctx.lineTo(140, y+10+yLength);
    ctx.moveTo(80, y+yLength-15);
    ctx.lineTo(95, y+yLength-15);
    ctx.lineTo(95, y+yLength);
    ctx.font = "italic 20px CMSY10";        
    ctx.fillText(a + " m", 150, 15);
    ctx.fillText(b + " m", 200, 190);
    ctx.fillText(h + " m", 10, 100);
    ctx.stroke();
}

function drawTriangle2(b, h) {
    let canvas = setupCanvas();
    let ctx = canvas.getContext("2d");
    canvas.height = 200;
    let x = getRandomNumber(100, 140, 0, 0);
    let y = getRandomNumber(30, 40, 0, 0);
    let xLength = canvas.width - 2 * x;
    //let yLength = canvas.height - 2 * y;
    //let shiftDown = y - 5;
    let scale = getRandomNumber(1, 4, 0, 0) / 5;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, canvas.height - y);
    ctx.lineTo(x + xLength, canvas.height - y);
    ctx.lineTo(x + xLength * scale, y);
    ctx.lineTo(x, canvas.height - y);
    ctx.stroke();
    ctx.moveTo(x + xLength * scale, y);
    ctx.lineTo(x + xLength * scale, canvas.height - y);
    ctx.setLineDash([5, 3]);
    ctx.font = "italic 20px CMSY10";        
    ctx.fillText(b + " m", x + xLength * scale, 120);
    ctx.fillText(h + " m", 250, 190);
    ctx.stroke();
}

function drawRhombus(a, b) {
    let canvas = setupCanvas();
    //let ctx = setupCanvas(200, 500);
    let ctx = canvas.getContext("2d");
    canvas.height = 200;
    let y = getRandomNumber(10, 40, 0, 0);
    let length = canvas.height - 2 * y;
    let x = (canvas.width - length) / 2;
    let tilt = 30;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x-tilt, y + length);
    ctx.lineTo(x-tilt + length, y + length);
    ctx.lineTo(x + length, y);
    ctx.lineTo(x, y);
    ctx.moveTo(x + length/2, y-4);
    ctx.lineTo(x + length/2, y+4);
    ctx.moveTo(x-tilt + length/2, y+length-4);
    ctx.lineTo(x-tilt + length/2, y+length+4);
    ctx.moveTo(x-4-tilt/2, y + length/2);
    ctx.lineTo(x+4-tilt/2, y + length/2);
    ctx.moveTo(x+length-4-tilt/2, y + length/2);
    ctx.lineTo(x+length+4-tilt/2, y + length/2);
    ctx.stroke();

    ctx.setLineDash([5, 3]);
    ctx.moveTo(x, y);
    ctx.lineTo(x-tilt + length, y + length);
    ctx.moveTo(x-tilt, y + length);
    ctx.lineTo(x + length, y);;        
    ctx.stroke();
    
    ctx.font = "italic 20px CMSY10";        
    ctx.fillText(a + " m", x+20, y+20);
    ctx.fillText(b + " m", x+15, y+length-20);
}

function drawParallelogram(b, h) {
    let canvas = setupCanvas();
    let ctx = canvas.getContext("2d");
    canvas.height = 200;
    let x = getRandomNumber(100, 140, 0, 0);
    let y = getRandomNumber(10, 40, 0, 0);
    let xLength = canvas.width - 2 * x;
    let yLength = canvas.height - 2 * y;
    let shiftDown = 10;
    let tilt = 30;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y + shiftDown);
    ctx.lineTo(x - tilt, y + yLength + shiftDown);
    ctx.lineTo(x - tilt + xLength, y + yLength + shiftDown);
    ctx.lineTo(x + xLength, y + shiftDown);
    ctx.lineTo(x, y + shiftDown);
    ctx.moveTo(x + xLength/2-6, y-6 + shiftDown);
    ctx.lineTo(x + xLength/2, y + shiftDown);
    ctx.lineTo(x + xLength/2-6, y+6 + shiftDown);
    ctx.moveTo(x + xLength/2-6, y+yLength-6 + shiftDown);
    ctx.lineTo(x + xLength/2, y+yLength + shiftDown);
    ctx.lineTo(x + xLength/2-6, y+yLength+6 + shiftDown);
    ctx.moveTo(x + xLength/2, y-6 + shiftDown);
    ctx.lineTo(x + xLength/2+6, y + shiftDown);
    ctx.lineTo(x + xLength/2, y+6 + shiftDown);
    ctx.moveTo(x + xLength/2, y+yLength-6 + shiftDown);
    ctx.lineTo(x + xLength/2+6, y+yLength + shiftDown);
    ctx.lineTo(x + xLength/2, y+yLength+6 + shiftDown);
    ctx.moveTo(x - tilt/2 - 10, y + yLength/2 + shiftDown);
    ctx.lineTo(x - tilt/2 + 1, y + yLength/2 + shiftDown - 10);
    ctx.lineTo(x - tilt/2 + 10, y + yLength/2 + shiftDown);
    ctx.moveTo(x + xLength - tilt/2 - 10, y + yLength/2 + shiftDown);
    ctx.lineTo(x + xLength - tilt/2 + 1, y + yLength/2 + shiftDown - 10);
    ctx.lineTo(x + xLength - tilt/2 + 10, y + yLength/2 + shiftDown);
    ctx.stroke();
    ctx.moveTo(x, y + shiftDown);
    ctx.lineTo(x, y + yLength + shiftDown);
    ctx.setLineDash([5, 3]);
    ctx.font = "italic 20px CMSY10";        
    ctx.fillText(h + " m", x + 10, shiftDown+100);
    ctx.fillText(b + " m", x + xLength/2 + 5, shiftDown+10);
    ctx.stroke();
}

export function areaBasicShapes() {
    let ans, type = getRandomNumber(1, 6, 0, 0);
    let dp = getRandomNumber(0, 1, 0, 0);
    if (type === 1) {
        let n = getRandomNumber(5, 20, dp, 0);
        drawSquare(n);
        ans = n ** 2;
    } else if (type === 2) {
        let a = getRandomNumber(5, 20, dp, 0);
        let b = getRandomNumber(a + 1, 30, dp, 0);
        drawRectangle(a, b);
        ans = a * b;
    } else if (type === 3) {
        let a = getRandomNumber(5, 20, dp, 0);
        let b = getRandomNumber(a + 1, 30, dp, 0);
        let h = getRandomNumber(5, 30, dp, 0);
        drawTrapezium(a, b, h);
        ans = h * (a + b) / 2;            
    } else if (type === 4) {
        let h = getRandomNumber(5, 20, dp, 0);
        let b = getRandomNumber(5, 20, dp, 0);
        drawTriangle2(b, h);
        ans = 0.5 * b * h;
    } else if (type === 5) {
        let x = getRandomNumber(5, 20, dp, 0);
        let y = getRandomNumber(x + 1, 30, dp, 0);
        drawRhombus(x, y);
        ans = 0.5 * x * y;
    } else {
        let h = getRandomNumber(5, 20, dp, 0);
        let b = getRandomNumber(h+1, 30, dp, 0);
        drawParallelogram(b, h);
        ans = b * h;
    }
    let questionText = "What is the area of this shape?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans = dpCheck(ans) + " m<sup>2</sup>";
    let mc1 = dpCheck(ans + getRandomNumber(1, 10, dp, 1)) + " m<sup>2</sup>";
    let mc2 = dpCheck(ans + getRandomNumber(1, 10, dp, 1)) + " m<sup>2</sup>";
    let mc3 = dpCheck(ans + getRandomNumber(1, 10, dp, 1)) + " m<sup>2</sup>";

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}