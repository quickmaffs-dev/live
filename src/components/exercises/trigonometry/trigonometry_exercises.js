import {getRandomNumber, getNames, setupCanvas, dpCheck, getPronumeral} from '../MathFunctions';
import trigElevation from '../../../img/trigElevation.png';
import trigDepression from '../../../img/trigDepression.png';


function drawRightTriangle(opp, adj, hyp, theta, rightAngle) {
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
            border-bottom: 200px solid #fff;
        "></div>
        <br />
    `;

    // right angle
    if (rightAngle === 1) {
        document.getElementById("questionDiagramID").innerHTML += `
        <div style="                
            position: absolute;
            top: 226px;
            left: 478px;
        ">
            <div style="                
            position: relative;
            bottom: 0;
            right: 0;            
            height: 20px;
            width: 20px;
            border: solid black 1px;

            "></div>
        </div>`;
    }
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
    drawRightTriangle(opp, adj, hyp, "&#x3B8", 1);

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
    drawRightTriangle(opp, adj, hyp, "&#x3B8", 1);

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
    drawRightTriangle(opp, adj, hyp, theta, 1);

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


// draw triangle
function drawTriangleCanvas(type, angles) {
    let canvas = setupCanvas();
    //let ctx = setupCanvas(200, 500);
    let ctx = canvas.getContext("2d");
    canvas.height = 300;
    let borderWidth = canvas.width / 7;
    let borderHeight = canvas.height / 5;
    let degrees, x1, x2, y1, y2, x3, y3;
    ctx.save();
    ctx.beginPath();
    if (type === 1) {
        x1 = getRandomNumber(3*borderWidth, 4*borderWidth, 0, 0);
        y1 = getRandomNumber(1*borderHeight, 2*borderHeight, 0, 0);
        x2 = getRandomNumber(1*borderWidth, 2*borderWidth, 0, 0);
        y2 = getRandomNumber(3*borderHeight, 4*borderHeight, 0, 0);
        x3 = getRandomNumber(5*borderWidth, 6*borderWidth, 0, 0);
        y3 = getRandomNumber(3*borderHeight, 4*borderHeight, 0, 0);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x1, y1);
        ctx.stroke();
            
        let a = angles[0];
        let b = angles[1];
        degrees = [a, b, "x"];
            
        let temp, m, n;
        for (let i = 0; i < 100; i++) {
            m = getRandomNumber(0, degrees.length-1, 0, 0);
            n = getRandomNumber(0, degrees.length-1, 0, 0);
            temp = degrees[m];
            degrees[m] = degrees[n];
            degrees[n] = temp;
        }

        ctx.font = "italic 20px CMSY10";
        ctx.fillText(degrees[0], x1-10, y1+30);
        ctx.fillText(degrees[1], x2+30, y2-10);
        ctx.fillText(degrees[2], x3-50, y3-10);
    } else if (type === 2 || type === 3) {
        // (x-h)2 + (y-k)2 = r2
        //let x2 = canvas.width/2 - getRandomNumber(1, borderWidth, 0, 0) - (borderWidth * 3/2);
        //let y2 = canvas.height/2 + getRandomNumber(1, borderHeight, 0, 0) + (borderHeight * 3/2);
        
        x2 = getRandomNumber(1*borderWidth, 2*borderWidth, 0, 0);
        y2 = getRandomNumber(3*borderHeight, 4*borderHeight, 0, 0);
        let r = getRandomNumber(y2-borderHeight, y2, 0, 0);
        let theta1 = getRandomNumber(50, 80, 0, 0);
        x1 = x2 + r * Math.cos(theta1 * Math.PI/180);
        y1 = y2 - r * Math.sin(theta1 * Math.PI/180);
        let theta2 = getRandomNumber(10, 30, 0, 0);
        x3 = x2 + r * Math.cos(theta2 * Math.PI/180);
        y3 = y2 - r * Math.sin(theta2 * Math.PI/180);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        ctx.moveTo((x1+x2)/2-10, (y1+y2)/2-10);
        ctx.lineTo((x1+x2)/2+10, (y1+y2)/2+10);
        ctx.moveTo((x3+x2)/2, (y3+y2)/2-10);
        ctx.lineTo((x3+x2)/2, (y3+y2)/2+10);
        ctx.stroke();
        
        ctx.font = "italic 20px CMSY10";
        let a = "x";
        let b = angles[0];
        if (type === 2) {
            b = "x";
            a = angles[0];
        }

        if (getRandomNumber(1, 2, 0, 0) === 1) {
            ctx.fillText(a, x1, y1+30);
        } else {
            ctx.fillText(a, x3-40, y3-10);
        }
        ctx.fillText(b, x2+25, y2-20);
        
    }

}

export function findAngle() {
    let cA, angles, a = getRandomNumber(20, 70, 0, 0), type = getRandomNumber(1, 3, 0, 0);
    type = 3;
    if (type === 1) {
        let b = getRandomNumber(20, 70, 0, 0);
        angles = [a, b];
        cA = 180 - a - b;
    } else if (type === 2) {
        a = getRandomNumber(20, 70, 0, 0);
        angles = [a];
        cA = 180 - a - a;
    } else if (type === 3) {
        a = getRandomNumber(20, 70, 0, 0);
        angles = [a];
        cA = (180 - a)/2;
    }
    drawTriangleCanvas(type, angles);

    let questionText = "What is <span>x</span>?";
    let correct_ans = cA;
    let mc1 = cA + getRandomNumber(3, 10, 0, 1);
    let mc2 = cA + getRandomNumber(3, 10, 0, 1);
    let mc3 = cA + getRandomNumber(3, 10, 0, 1);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function squareNumbers() {
    let dp = getRandomNumber(0, 2, 0, 0);
    let x = getRandomNumber(1, 20, dp, 1);
    let questionText = "What is (" + x + ")<sup>2</sup>";
    let correct_ans = (x ** 2).toFixed(2 * dp);
    let mc1 = ((x + getRandomNumber(1, 5, 1, 1)) ** 2).toFixed(2 * dp);
    let mc2 = ((x + getRandomNumber(1, 5, 1, 1)) ** 2).toFixed(2 * dp);
    let mc3 = ((x + getRandomNumber(1, 5, 1, 1)) ** 2).toFixed(2 * dp);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function squareRoots() {
    let dp = getRandomNumber(0, 2, 0, 0);
    let x = getRandomNumber(1, 20, dp, 0);
    let questionText = "What is &radic;<span style='text-decoration: overline'>" + (x ** 2).toFixed(2 * dp) + "</span>";
    let correct_ans = x;
    let mc1 = dpCheck(x + getRandomNumber(1, 5, 1, 1));
    let mc2 = dpCheck(x + getRandomNumber(1, 5, 1, 1));
    let mc3 = dpCheck(x + getRandomNumber(1, 5, 1, 1));
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function pythagRoots() {
    let dp = getRandomNumber(0, 2, 0, 0);
    let a = getRandomNumber(1, 20, dp, 0);
    let b = getRandomNumber(1, 20, dp, 0);    
    let questionText, correct_ans;
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText = "What is &radic;<span style='text-decoration: overline'>(" + a + ")</span><sup>2</sup><span style='text-decoration: overline'> + (" + b + ")</span><sup>2</sup>";
        correct_ans = Math.sqrt(a ** 2 + b ** 2).toFixed(2);
    } else {
        a = getRandomNumber(b + 1, 21, dp, 0);        
        while (a === b) {
            a = getRandomNumber(b + 1, 21, dp, 0);
        }
        questionText = "What is &radic;<span style='text-decoration: overline'>(" + a + ")</span><sup>2</sup><span style='text-decoration: overline'> - (" + b + ")</span><sup>2</sup>";
        correct_ans = Math.sqrt(a ** 2 - b ** 2).toFixed(2);
    }
    
    let mc1 = dpCheck(parseFloat(correct_ans) + getRandomNumber(1, 5, 2, 1));
    let mc2 = dpCheck(parseFloat(correct_ans) + getRandomNumber(1, 5, 2, 1));
    let mc3 = dpCheck(parseFloat(correct_ans) + getRandomNumber(1, 5, 2, 1));
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function pythagorasTriangles() {
    // draw triangle
    let dp = getRandomNumber(0, 2, 0, 0);
    let a = getRandomNumber(1, 10, dp, 0);
    let b = getRandomNumber(1, 10, dp, 0);
    let c = parseFloat(Math.sqrt(a ** 2 + b ** 2).toFixed(dp));
    let theta = "";
    let side = getRandomNumber(1, 3, 0, 0);
    let correct_ans = 1;
    let p = getPronumeral();
    if (side === 1) {
        correct_ans = a;
        a = p;
    } else if (side === 2) {
        correct_ans = b;
        b = p;
    } else {
        correct_ans = c;
        c = p;
    }
    drawRightTriangle(a, b, c, theta, 1);
    let questionText = "What is the value of " + p + "?";
    if (dp === 0) {
        dp += 1;
    }
    let mc1 = dpCheck(correct_ans + getRandomNumber(1, 5, dp, 1));
    let mc2 = dpCheck(correct_ans + getRandomNumber(1, 5, dp, 1));
    let mc3 = dpCheck(correct_ans + getRandomNumber(1, 5, dp, 1));
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function pythagorasTest() {
    // draw triangle
    let dp = getRandomNumber(0, 2, 0, 0);
    let a = getRandomNumber(1, 10, dp, 0);
    let b = getRandomNumber(1, 10, dp, 0);
    if (dp === 0) {
        dp += 1;
    }
    let c = parseFloat(Math.sqrt(a ** 2 + b ** 2).toFixed(dp));
    let theta = "";
    drawRightTriangle(a, b, c, theta, 0);
    let questionText = "Is the triangle right angled?";
    
    let correct_ans = "yes";
    let mc1 = "yes";
    let mc2 = "no";
    let mc3 = "no";

    if (getRandomNumber(1, 2, 0, 0) === 1) {
        c += getRandomNumber(1, 1, 0, 1);
        correct_ans = "no";
        mc1 = "no";
        mc2 = "yes";
        mc3 = "yes";
    }

    let arr = [correct_ans, mc1, mc2, mc3];    
    return [questionText].concat(arr);
}

export function pythagoreanTriad() {
    let a = getRandomNumber(1, 10, 0, 0);
    let b = getRandomNumber(1, 10, 0, 0);
    let c = Math.ceil(Math.sqrt(a ** 2 + b ** 2));
    let k = getRandomNumber(1, 5, 0, 0);
    let questionText;
    let correct_ans, mc1, mc2, mc3;
    let triads = ["(3, 4, 5)", "(6, 8, 10)", "(5, 12, 13)", "(10, 24, 26)", "(9, 40, 41)", "(11, 60, 61)", "(7, 24, 25)", "(30, 40, 50)"];    
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText = "Which one of the following <strong>IS</strong> a pythagorean triad?";        
        correct_ans = triads[getRandomNumber(0, triads.length-1, 0, 0)];        
        mc1 = "(" + k*a + ", " + k*b + ", " + dpCheck(k*c + getRandomNumber(1, 1, 0, 1)) + ")";
        mc2 = "(" + k*a + ", " + dpCheck(k*b + getRandomNumber(1, 1, 0, 1)) + ", " + k*c + ")";
        mc3 = "(" + dpCheck(k*a + getRandomNumber(1, 1, 0, 1)) + ", " + k*b + ", " + k*c + ")";
    } else {
        questionText = "Which one of the following <strong>IS NOT</strong> a pythagorean triad?";
        correct_ans = "(" + k*a + ", " + k*b + ", " + k*c + ")";    
        
        mc1 = triads[getRandomNumber(0, triads.length-1, 0, 0)];
        mc2 = triads[getRandomNumber(0, triads.length-1, 0, 0)];
        while (mc2 === mc1) {
            mc2 = triads[getRandomNumber(0, triads.length-1, 0, 0)];
        }
        mc3 = triads[getRandomNumber(0, triads.length-1, 0, 0)];
        while (mc3 === mc1 || mc3 === mc2) {
            mc3 = triads[getRandomNumber(0, triads.length-1, 0, 0)];
        }
    }

    let arr = [correct_ans, mc1, mc2, mc3];    
    return [questionText].concat(arr);
}