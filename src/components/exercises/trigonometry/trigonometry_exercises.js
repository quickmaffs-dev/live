import {getRandomNumber, getNames} from '../MathFunctions';
import trigElevation from '../../../img/trigElevation.png';
import trigDepression from '../../../img/trigDepression.png';


function drawRightTriangle(opp, adj, hyp, theta) {
    document.getElementById("questionDiagramID").style.display = "block";
    document.getElementById("questionDiagramID").innerHTML = "";

    // hypotenuse side        
    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 100px;
        left: 230px;
    ">
    ` + hyp + "</div>";

    // opposite side        
    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 130px;
        left: 510px;
    ">
    ` + opp + "</div>";

    // adjacent side        
    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 250px;
        left: 250px;
    ">
    ` + adj + "</div>";

    // theta
    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 220px;
        left: 70px;
        font-style: italic;
    ">
    ` + theta + "</div>";
    
    document.getElementById("questionDiagramID").innerHTML += `
        <br /><br />
        <div style="                
            width:0;
            height: 0;
            border-left: 500px solid transparent;
            border-right: 0px solid transparent;
            border-bottom: 200px solid #555;                
        "></div>
        <br />
    `;

    // right angle
    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 230px;
        left: 476px;
    ">
        <div style="                
        position: relative;
        bottom: 0;
        right: 0;            
        height: 20px;
        width: 20px;
        border: solid black 2px;
        "></div>
    </div>`;
}

export function findRatio() {        
    let trigOption = getRandomNumber(1, 3, 0, 0);
    let opp = "";
    let adj = "";
    let hyp = "";
    let trig = "";
    let a = "";
    let b = "";
    let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];

    if (trigOption === 1) {
        // sin
        trig = "sin";
        opp = getRandomNumber(10, 50, 0, 0);
        hyp = opp + getRandomNumber(10, 50, 0, 0);
        a = opp;
        b = hyp;
        opp += unit;
        hyp += unit;
    } else if (trigOption === 2) {
        // cos
        trig = "cos";
        adj = getRandomNumber(10, 50, 0, 0);
        hyp = adj + getRandomNumber(10, 50, 0, 0);
        a = adj;
        b = hyp;
        hyp += unit;
        adj += unit;
    } else {
        // tan
        trig = "tan";
        opp = getRandomNumber(10, 50, 0, 0);
        adj = getRandomNumber(10, 50, 0, 0);
        a = opp;
        b = adj;
        opp += unit;
        adj += unit;
    }

    //this.Ans = "<sup>" + a + "</sup>&frasl;<sub>" + b + "</sub>";
    let correct_ans = "<sup>" + a + "</sup>/<sub>" + b + "</sub>";
    let mc1 = "<sup>" + (a + getRandomNumber(1, 5, 0, 1)) + "</sup>/<sub>" + b + "</sub>";
    let mc2 = "<sup>" + (a + getRandomNumber(1, 5, 0, 1)) + "</sup>/<sub>" + b + "</sub>";
    let mc3 = "<sup>" + (a + getRandomNumber(1, 5, 0, 1)) + "</sup>/<sub>" + b + "</sub>";
    
    let questionText = "What is " + trig + "&#x3B8";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    drawRightTriangle(opp, adj, hyp, "&#x3B8");

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function findTheta() {
    let trigOption = getRandomNumber(1, 3, 0, 0);
    let opp = "";
    let adj = "";
    let hyp = "";
    let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
    let r, ans;
    if (trigOption === 1) {
        // sin
        opp = getRandomNumber(10, 50, 0, 0);
        hyp = opp + getRandomNumber(10, 50, 0, 0);
        r = opp / hyp;
        ans = Math.asin(r);
        opp += unit;
        hyp += unit;            
    } else if (trigOption === 2) {
        // cos
        adj = getRandomNumber(10, 50, 0, 0);
        hyp = adj + getRandomNumber(10, 50, 0, 0);
        r = adj / hyp;
        ans = Math.acos(r);
        hyp += unit;
        adj += unit;
    } else {
        // tan
        opp = getRandomNumber(10, 50, 0, 0);
        adj = getRandomNumber(10, 50, 0, 0);
        r = opp / adj;
        ans = Math.atan(r);
        opp += unit;
        adj += unit;
    }
    ans *=  (180 / Math.PI);        
    
    let correct_ans = ans.toFixed(0) + "<sup>O</sup>";
    let mc1 = (ans + getRandomNumber(1, 10, 0, 1)).toFixed(0) + "<sup>O</sup>";
    let mc2 = (ans + getRandomNumber(1, 10, 0, 1)).toFixed(0) + "<sup>O</sup>";
    let mc3 = (ans + getRandomNumber(1, 10, 0, 1)).toFixed(0) + "<sup>O</sup>";
    
    let questionText = "What is &#x3B8";        
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    drawRightTriangle(opp, adj, hyp, "&#x3B8");

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function findSide() {
    let trigOption = getRandomNumber(1, 3, 0, 0);
    let opp = "";
    let adj = "";
    let hyp = "";
    let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
    let ans;
    let theta = getRandomNumber(5, 80, 0, 0);
    if (trigOption === 1) {
        // sin            
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            opp = getRandomNumber(10, 50, 0, 0);
            hyp = "x";
            ans = opp / Math.sin(theta * Math.PI / 180);
            opp += unit;
        } else {
            hyp = getRandomNumber(10, 50, 0, 0);
            opp = "x";
            ans = hyp * Math.sin(theta * Math.PI / 180);
            hyp += unit;
        }
    } else if (trigOption === 2) {
        // cos
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            adj = getRandomNumber(10, 50, 0, 0);
            hyp = "x";
            ans = adj / Math.cos(theta * Math.PI / 180);
            adj += unit;
        } else {
            hyp = getRandomNumber(10, 50, 0, 0);
            adj = "x";
            ans = hyp * Math.cos(theta * Math.PI / 180);
            hyp += unit;
        }
    } else {
        // tan
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            opp = getRandomNumber(10, 50, 0, 0);
            adj = "x";
            ans = opp / Math.tan(theta * Math.PI / 180);
            opp += unit;
        } else {
            adj = getRandomNumber(10, 50, 0, 0);
            opp = "x";
            ans = adj * Math.tan(theta * Math.PI / 180);
            adj += unit;
        }
    }        
    
    let correct_ans = ans.toFixed(1) + unit;
    let mc1 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(1) + unit;
    let mc2 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(1) + unit;
    let mc3 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(1) + unit;
    
    let questionText = "Find x";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    theta += "<sup>O</sup>";
    drawRightTriangle(opp, adj, hyp, theta);

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function elevation() {     
    let name = getNames(1)[0];
    let ans, questionText;
    let d = getRandomNumber(3, 50, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        d = getRandomNumber(3, 50, 1, 0);
    }
    let x = getRandomNumber(5, 80, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText = name + " is " + d + "m away from a tree. If the angle of elevation from the ground to the top of the tree is x = " + x + "<sup>O</sup>, how tall is the tree?";
        ans = d * Math.tan(x * Math.PI / 180);
    } else {
        questionText = name + " looks up from the ground at an angle of elevation of x =" + x + "<sup>O</sup> to the top of a " + d + "m tree. How far away from the base of the tree is " + name;
        ans = d / Math.tan(x * Math.PI / 180);
    }
    document.getElementById("questionImgID").style.display = "block";
    document.getElementById("questionImgID").alt = "This is a diagram of the question";
    document.getElementById("questionImgID").src = trigElevation;
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans = ans.toFixed(1) + "m";
    let mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
    let mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
    let mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function depression() {     
    let ans, questionText;
    let d = getRandomNumber(3, 50, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        d = getRandomNumber(3, 50, 1, 0);
    }
    let x = getRandomNumber(5, 80, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText = "A boat is " + d + "m away from the base of a lighthouse. A man on the top of the light house looks down to the boat at an angle of depression of x = " + x + "<sup>O</sup> at the boat. How tall is the lighthouse?";
        ans = d * Math.tan(x * Math.PI / 180);
    } else {
        questionText = "A man on a boat looks up at an angle of elevation to the top of a lighthouse at x = " + x + "<sup>O</sup>. If the lighthouse is " + d + "m tall, how far away is the boat from the base of the lighthouse?";
        ans = d / Math.tan(x * Math.PI / 180);
    }
    document.getElementById("questionImgID").style.display = "block";
    document.getElementById("questionImgID").alt = "This is a diagram of the question";
    document.getElementById("questionImgID").src = trigDepression;
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans = ans.toFixed(1) + "m";
    let mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
    let mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
    let mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "m";
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function bearings() {
    //let theta = getRandomNumber(5, 85, 0, 0) + 90 * getRandomNumber(0, 3, 0, 0);
    let theta = getRandomNumber(5, 85, 0, 0);
    let y = ["North", "South"][getRandomNumber(0, 1, 0, 0)];
    let x = ["East", "West"][getRandomNumber(0, 1, 0, 0)];
    let d = getRandomNumber(3, 50, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        d = getRandomNumber(3, 50, 1, 0);
    }
    let ans;
    let questionText = "I am walking for " + d + "km on a bearing of " + y.substring(0, 1) + theta + "<sup>O</sup>" + x.substring(0, 1) + ". ";
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        // east/west
        ans = d * Math.sin(theta * Math.PI / 180);
        questionText += "How far " + x.toLowerCase() + " am I from my starting point?";
    } else {
        /// north/south
        ans = d * Math.cos(theta * Math.PI / 180);
        questionText += "How far " + y.toLowerCase() + " am I from my starting point?";
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans = ans.toFixed(1) + "km";
    let mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "km";
    let mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "km";
    let mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "km";
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

function drawTriangle(a, b, alpha, beta) {
    document.getElementById("questionDiagramID").style.display = "block";
    document.getElementById("questionDiagramID").innerHTML = "";

    // hypotenuse side        
    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 100px;
        left: 230px;
    ">
    ` + a + "</div>";

    // opposite side        
    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 130px;
        left: 610px;
    ">
    ` + b + "</div>";
    
    // alpha
    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 220px;
        left: 620px;
    ">
    ` + alpha + "</div>";

    // beta
    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 220px;
        left: 70px;
        font-style: italic;
    ">
    ` + beta + "</div>";
   
    // the triangle
    document.getElementById("questionDiagramID").innerHTML += `
        <br /><br />
        <div style="                
            width:0;
            height: 0;
            border-left: 500px solid transparent;
            border-right: 200px solid transparent;
            border-bottom: 200px solid #555;                
        "></div>
        <br />
    `;
}

export function sineRuleSide() {
    let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
    let b = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        b = getRandomNumber(1, 20, 1, 0);
    }
    let alpha = getRandomNumber(5, 85, 0, 0);
    let beta = getRandomNumber(5, 85, 0, 0);

    let ans = Math.sin(alpha * Math.PI / 180) * b / Math.sin(beta * Math.PI / 180);
    b += unit;
    alpha += "<sup>0</sup>";
    beta += "<sup>0</sup>";
    let questionText = "Find x";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let a = "x";
    drawTriangle(a, b, alpha, beta);
    let correct_ans = ans.toFixed(1) + unit;
    let mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
    let mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
    let mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function sineRuleAngle() {
    let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
    let a = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        a = getRandomNumber(1, 20, 1, 0);
    }
    let b = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        b = getRandomNumber(1, 20, 1, 0);
    }
    let beta = getRandomNumber(5, 85, 0, 0);

    if (a * Math.sin(beta * Math.PI / 180) / b > 1) {
        // invalid
        return sineRuleAngle();
    }
    let ans = Math.asin(a * Math.sin(beta * Math.PI / 180)  / b) * 180 / Math.PI;
    a += unit;
    b += unit;
    beta += "<sup>0</sup>";
    let questionText = "Find x";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;

    let alpha = "x";
    drawTriangle(a, b, alpha, beta);
    let correct_ans = ans.toFixed(1) + "<sup>O</sup>";
    let mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "<sup>O</sup>";
    let mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "<sup>O</sup>";
    let mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + "<sup>O</sup>";
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

function drawTriangleCos(a, b, c, alpha) {
    document.getElementById("questionDiagramID").style.display = "block";
    document.getElementById("questionDiagramID").innerHTML = "";

    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 100px;
        left: 230px;
    ">
    ` + a + "</div>";

    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 130px;
        left: 610px;
    ">
    ` + b + "</div>";

    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 250px;
        left: 320px;
    ">
    ` + c + "</div>";
    
    document.getElementById("questionDiagramID").innerHTML += `
    <div style="                
        position: absolute;
        top: 220px;
        left: 620px;
    ">
    ` + alpha + "</div>";
   
    // the triangle
    document.getElementById("questionDiagramID").innerHTML += `
        <br /><br />
        <div style="                
            width:0;
            height: 0;
            border-left: 500px solid transparent;
            border-right: 200px solid transparent;
            border-bottom: 200px solid #555;                
        "></div>
        <br />
    `;
}

export function cosineRuleSide() {
    // because we are using alpha (A) its a2 = b2 + c2 -2bc*cosA
    let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
    let c = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        c = getRandomNumber(1, 20, 1, 0);
    }
    let b = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        b = getRandomNumber(1, 20, 1, 0);
    }
    let alpha = getRandomNumber(5, 85, 0, 0);
    let a = (c ** 2) + (b ** 2) - 2 * c * b * Math.cos(alpha * Math.PI / 180);
    a = Math.sqrt(a);
    let ans;
    console.log("a is " + a);
    console.log("b is " + b);
    console.log("c is " + c);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        ans = c;
        a = a.toFixed(2) + unit;
        c = "x";
    } else {
        ans = a;
        c += unit;
        a = "x";
    }        
    b += unit;
    alpha += "<sup>0</sup>";
    let questionText = "Find x";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    drawTriangleCos(a, b, c, alpha);
    let correct_ans = ans.toFixed(1) + unit;
    let mc1 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
    let mc2 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
    let mc3 = (ans + getRandomNumber(1, 5, 1, 1)).toFixed(1) + unit;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function cosineRuleAngle() {
    // because we are using alpha (A) its a2 = b2 + c2 -2bc*cosA
    let unit = ["km", "m", "cm", "mm"][getRandomNumber(0, 3, 0, 0)];
    let c = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        c = getRandomNumber(1, 20, 1, 0);
    }
    let b = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        b = getRandomNumber(1, 20, 1, 0);
    }
    let alpha = getRandomNumber(5, 85, 0, 0);
    let a = (c ** 2) + (b ** 2) - 2 * c * b * Math.cos(alpha * Math.PI / 180);
    a = Math.sqrt(a).toFixed(2);
    console.log("a is " + a);
    console.log("b is " + b);
    console.log("c is " + c);
    a += unit;
    b += unit;
    c += unit;
    let ans = alpha;
    alpha = "x";
    let questionText = "Find x";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    drawTriangleCos(a, b, c, alpha);
    let correct_ans = ans + "<sup>0</sup>";
    let mc1 = (ans + getRandomNumber(1, 5, 0, 1)) + "<sup>0</sup>";
    let mc2 = (ans + getRandomNumber(1, 5, 0, 1)) + "<sup>0</sup>";
    let mc3 = (ans + getRandomNumber(1, 5, 0, 1)) + "<sup>0</sup>";
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function solveRatio() {
    let x = getRandomNumber(1, 3, 0, 0);
    //let m = getRandomNumber(1, 10 ** x, 0, 1) / (10 ** x);
    let m = getRandomNumber(0, 1, x, 1); // getRand is inclusive and adds dp so 
    let n = parseFloat(m).toFixed(x);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        let a = getRandomNumber(1, 20, 0, 0);
        let b = a + getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            a += -1;
        }
        m = a / b;
        n = "<sup>" + a + "</sup> / <sub>" + b + "</sub>";
    }
    
    let type = getRandomNumber(1, 3, 0, 0);
    let ans, trig;
    if (type === 1) {
        trig = "sin";
        ans = Math.asin(m) * 180 / Math.PI;
    } else if (type === 2) {
        trig = "cos";
        ans = Math.acos(m) * 180 / Math.PI;
    } else {
        trig = "tan";
        ans = Math.atan(m) * 180 / Math.PI;
    }
    ans = ans.toFixed(x);
    ans = ans.toString(); // converts 1.200 to 1.2
    let questionText = "Solve for " + trig + "&#x3B8 = " + n + " to " + x + " decimal places please";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    return [questionText, ans];
}

export function evaluateTrig() {
    let theta = getRandomNumber(5, 355, 0, 0);
    let min = 0;
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        min = getRandomNumber(5, 55, 0, 0);
    }

    let k = 1;
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        k = getRandomNumber(2, 20, 0, 0);
    }
    let trig, ans;
    let type = getRandomNumber(1, 3, 0, 0);
    let sign = (-1) ** getRandomNumber(1, 2, 0, 0);
    if (type === 1) {
        trig = "sin";
        ans = k * Math.sin(sign * (theta + min / 60) * Math.PI / 180);
    } else if (type === 2) {
        trig = "cos";
        ans = k * Math.cos(sign * (theta + min / 60) * Math.PI / 180);
    } else {
        trig = "tan";
        ans = k * Math.tan(sign * (theta + min / 60) * Math.PI / 180);
    }
    let dp = getRandomNumber(1, 3, 0, 0);
    ans = ans.toFixed(dp);
    ans = ans.toString(); // converts 1.200 to 1.2
    let kStr = k.toString();
    let minStr = min.toString() + "'";
    if (k === 1) {
        kStr = "";
    }
    if (min === 0) {
        minStr = "";
    }
    let questionText = "What is " + kStr + trig + "(" + (sign * theta) + "<sup>O</sup>" + minStr + ") to " + dp + " decimal places please";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    return [questionText, ans];
}