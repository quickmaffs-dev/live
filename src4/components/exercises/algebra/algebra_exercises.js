import {getRandomNumber, solveEquation, getPronumeral, simplifyRatio, dpCheck} from '../MathFunctions';

export function additionAndSubtraction() {
    let x = getRandomNumber(1, 20, 0, 1);
    let y = getRandomNumber(1, 20, 0, 1);
    let ans = x + y;
    let questionText = "Solve " + x + " + " + y;
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    //return ans;
    return [questionText, ans];
}

export function multiplicationAndDivision() {
    let x = getRandomNumber(1, 20, 0, 1);
    let y = getRandomNumber(1, 20, 0, 1);
    let ans = x * y;
    let questionText = "Solve " + x + " x " + y;
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    return [questionText, ans];
}

export function bidmas() {
    let operations_n = getRandomNumber(2, 5, 0, 0);
    let eqn = new Array(2 * operations_n + 1);
    let divCheck = 1;
    for (let i = 0; i < eqn.length; i++) {
        if (i % 2 === 0) { // number
            eqn[i] = getRandomNumber(1, 20, 0, 0); // positive numbers only
        } else { // operation                
            eqn[i] = getRandomNumber(divCheck, 4, 0, 0);
            // division check (we only want 1 division per q to avoid any complications)
            if (eqn[i] === 1) {
                divCheck += 1;
                eqn[i + 1] = getRandomNumber(1, 12, 0, 0);
                eqn[i - 1] = getRandomNumber(1, 12, 0, 0) * eqn[i + 1];
                i += 1;
            }
        }
    }
    //eqn = [1, 4, 2, 4, 3];
    let questionText = "Solve ";
    for (let i = 0; i < eqn.length; i++) {
        if (i % 2 === 0) {
            questionText += eqn[i]    
        } else {
            if (eqn[i] === 1) {
                questionText += " &#247 ";
            } else if (eqn[i] === 2) {
                questionText += " &#215; ";
            } else if (eqn[i] === 3) {
                questionText += " + ";
            } else {
                questionText += " - ";
            }
        }
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let ans = solveEquation(eqn);
    return [questionText, ans];
}

export function pronumeralOperations() {
    let x = getRandomNumber(2, 20, 0, 1);
    let y = getRandomNumber(2, 20, 0, 1);        
    let pronum = getPronumeral();
    //get pronum value
    let p = pronum.split(">")[1].split("<")[0];
    let type = getRandomNumber(1, 4, 0, 0);
    let ans, questionText;
    if (type === 1) {
        ans = x + y + p;
        questionText = "Solve " + x + pronum + " + " + y + pronum;            
    } else if (type === 2) {
        ans = (x - y) + p;
        questionText = "Solve " + x + pronum + " - " + y + pronum;
    } else if (type === 3) {
        ans = (x * y) + p;
        questionText = "Solve " + x + pronum + " &#215; " + y;
    } else {            
        x = y * getRandomNumber(2, 12, 0, 1);
        ans = (x / y) + p;            
        questionText = "Solve " + x + pronum + " &#247; " + y;
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    return [questionText, ans];
}

export function fractions() {
    let questionText = "Simplify  ";
    let num1 = getRandomNumber(1, 12, 0, 0);
    let den1 = getRandomNumber(1, 12, 0, 0);
    let num2 = getRandomNumber(1, 12, 0, 0);
    let den2 = getRandomNumber(1, 12, 0, 0);
    questionText += `
    <span class="fraction">
        <span>` + num1 + `</span>
        <span class="fraction-line">------</span>
        <span>` + den1 + `</span>
    </span>
    `;
    let a, b, operation = getRandomNumber(1, 4, 0, 0);
    if (operation === 1) {
        questionText += `
        <span class="fraction"><span> </span><span class="fraction-line">&#247;</span><span> </span></span>
        <span class="fraction">
            <span>` + num2 + `</span>
            <span class="fraction-line">------</span>
            <span>` + den2 + `</span>
        </span>
        `;
        a = num1 * den2;
        b = den1 * num2;
    } else if (operation === 2) {
        questionText += `
        <span class="fraction"><span> </span><span class="fraction-line">&#215;</span><span> </span></span>
        <span class="fraction">
            <span>` + num2 + `</span>
            <span class="fraction-line">------</span>
            <span>` + den2 + `</span>
        </span>
        `;
        a = num1 * num2;
        b = den1 * den2;
    } else if (operation === 3) {
        questionText += `
        <span class="fraction"><span> </span><span class="fraction-line">+</span><span> </span></span>
        <span class="fraction">
            <span>` + num2 + `</span>
            <span class="fraction-line">------</span>
            <span>` + den2 + `</span>
        </span>
        `;
        a = num1 * den2 + den1 * num2;
        b = den1 * den2;
    } else {
        questionText += `
        <span class="fraction"><span> </span><span class="fraction-line">-</span><span> </span></span>
        <span class="fraction">
            <span>` + num2 + `</span>
            <span class="fraction-line">------</span>
            <span>` + den2 + `</span>
        </span>
        `;
        a = num1 * den2 - den1 * num2;
        b = den1 * den2;
    }
    let ans
    if (a < 1) {
        ans = simplifyRatio(-a, b);
        a = -ans[0];
    } else {
        ans = simplifyRatio(a, b);
        a = ans[0];
    }
    b = ans[1];
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans = `
        <span class="fraction">
            <span>` + a + `</span>
            <span class="fraction-line">------</span>
            <span>` + b + `</span>
        </span>
    `;
    let mc1 = `
        <span class="fraction">
            <span>` + (a + getRandomNumber(1, a-1, 0, 1)) + `</span>
            <span class="fraction-line">------</span>
            <span>` + b + `</span>
        </span>
    `;
    let mc2 = `
        <span class="fraction">
            <span>` + a + `</span>
            <span class="fraction-line">------</span>
            <span>` + (b + getRandomNumber(1, b-1, 0, 1)) + `</span>
        </span>
    `;
    let mc3 = `
        <span class="fraction">
            <span>` + (a + getRandomNumber(1, a-1, 0, 1)) + `</span>
            <span class="fraction-line">------</span>
            <span>` + (b + getRandomNumber(1, b-1, 0, 1)) + `</span>
        </span>
    `;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function mixedFractions() {
    let questionText = "Simplify  ";
    let c1 = getRandomNumber(1, 12, 0, 0);
    let num1 = getRandomNumber(1, 12, 0, 0);
    let den1 = num1 + getRandomNumber(1, 12, 0, 0);
    let c2 = getRandomNumber(1, 12, 0, 0);
    let num2 = getRandomNumber(1, 12, 0, 0);
    let den2 = num2 + getRandomNumber(1, 12, 0, 0);
    questionText += ` 
    <span class="fraction"><span> </span><span class="fraction-line">` + c1 + `</span><span> </span></span>       
    <span class="fraction">
        <span>` + num1 + `</span>
        <span class="fraction-line">------</span>
        <span>` + den1 + `</span>
    </span>
    `;
    let a, b, operation = getRandomNumber(1, 4, 0, 0);
    if (operation === 1) {
        questionText += `
        <span class="fraction"><span> </span><span class="fraction-line">&#247;</span><span> </span></span>
        <span class="fraction"><span> </span><span class="fraction-line">` + c2 + `</span><span> </span></span>
        <span class="fraction">
            <span>` + num2 + `</span>
            <span class="fraction-line">------</span>
            <span>` + den2 + `</span>
        </span>
        `;
        num1 = c1 * den1 + num1;
        num2 = c2 * den2 + num2;
        a = num1 * den2;
        b = den1 * num2;
    } else if (operation === 2) {
        questionText += `
        <span class="fraction"><span> </span><span class="fraction-line">&#215;</span><span> </span></span>
        <span class="fraction"><span> </span><span class="fraction-line">` + c2 + `</span><span> </span></span>
        <span class="fraction">
            <span>` + num2 + `</span>
            <span class="fraction-line">------</span>
            <span>` + den2 + `</span>
        </span>
        `;
        num1 = c1 * den1 + num1;
        num2 = c2 * den2 + num2;
        a = num1 * num2;
        b = den1 * den2;
    } else if (operation === 3) {
        questionText += `
        <span class="fraction"><span> </span><span class="fraction-line">+</span><span> </span></span>
        <span class="fraction"><span> </span><span class="fraction-line">` + c2 + `</span><span> </span></span>
        <span class="fraction">
            <span>` + num2 + `</span>
            <span class="fraction-line">------</span>
            <span>` + den2 + `</span>
        </span>
        `;
        num1 = c1 * den1 + num1;
        num2 = c2 * den2 + num2;
        a = num1 * den2 + den1 * num2;
        b = den1 * den2;
    } else {
        questionText += `
        <span class="fraction"><span> </span><span class="fraction-line">-</span><span> </span></span>
        <span class="fraction"><span> </span><span class="fraction-line">` + c2 + `</span><span> </span></span>
        <span class="fraction">
            <span>` + num2 + `</span>
            <span class="fraction-line">------</span>
            <span>` + den2 + `</span>
        </span>
        `;
        num1 = c1 * den1 + num1;
        num2 = c2 * den2 + num2;
        a = num1 * den2 - den1 * num2;
        b = den1 * den2;
    }
    let ans
    if (a < 1) {
        ans = simplifyRatio(-a, b);
        a = -ans[0];
    } else {
        ans = simplifyRatio(a, b);
        a = ans[0];
    }
    b = ans[1];
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let c = "";
    if (a > b) {
        c = Math.floor(a / b);
        a = a % b;
    }
    let correct_ans = `
        <span class="fraction"><span> </span><span class="fraction-line">` + c + `</span><span> </span></span>
        <span class="fraction">
            <span>` + a + `</span>
            <span class="fraction-line">------</span>
            <span>` + b + `</span>
        </span>
    `;
    let mc1 = `
        <span class="fraction"><span> </span><span class="fraction-line">` + c + `</span><span> </span></span>
        <span class="fraction">
            <span>` + (a + getRandomNumber(1, a-1, 0, 1)) + `</span>
            <span class="fraction-line">------</span>
            <span>` + b + `</span>
        </span>
    `;
    let mc2 = `
        <span class="fraction"><span> </span><span class="fraction-line">` + c + `</span><span> </span></span>
        <span class="fraction">
            <span>` + a + `</span>
            <span class="fraction-line">------</span>
            <span>` + (b + getRandomNumber(1, b-1, 0, 1)) + `</span>
        </span>
    `;
    let mc3 = `
        <span class="fraction"><span> </span><span class="fraction-line">` + c + `</span><span> </span></span>
        <span class="fraction">
            <span>` + (a + getRandomNumber(1, a-1, 0, 1)) + `</span>
            <span class="fraction-line">------</span>
            <span>` + (b + getRandomNumber(1, b-1, 0, 1)) + `</span>
        </span>
    `;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}    

export function decimals() {
    let a = getRandomNumber(1, 10, getRandomNumber(0, 2, 0, 0), 0);
    let b = getRandomNumber(1, 10, getRandomNumber(0, 2, 0, 0), 0);
    let type = getRandomNumber(1, 4, 0, 0);
    let ans, questionText;     
    a = parseFloat(dpCheck(a));
    b = parseFloat(dpCheck(b));
    if (type === 1) {
        questionText = "Simplify " + a + " + " + b;
        ans = a + b;
    } else if (type === 2) {
        questionText = "Simplify " + a + " - " + b;
        ans = a - b;
    } else if (type === 3) {
        questionText = "Simplify " + a + " &#215; " + b;
        ans = a * b;
    } else {
        a = b * getRandomNumber(1, 12, 0, 0);
        a = parseFloat(dpCheck(a));
        questionText = "Simplify " + a + " &#247; " + b;
        ans = a / b;
    }
    
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;        
    ans = dpCheck(ans);
    return [questionText, ans];
}

export function convertDecimalToFraction() {        
    let x = getRandomNumber(1, 1000, 0, 0);
    x /= 1000;
    x = dpCheck(x);
    let frac = simplifyRatio(1000 * x, 1000);

    let a = frac[0];
    let b = frac[1];
    let questionText = "Convert " + x + " to a fraction";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans = `
        <span class="fraction">
            <span>` + a + `</span>
            <span class="fraction-line">------</span>
            <span>` + b + `</span>
        </span>
    `;
    let mc1 = `
        <span class="fraction">
            <span>` + (a + getRandomNumber(1, a-1, 0, 1)) + `</span>
            <span class="fraction-line">------</span>
            <span>` + b + `</span>
        </span>
    `;
    let mc2 = `
        <span class="fraction">
            <span>` + a + `</span>
            <span class="fraction-line">------</span>
            <span>` + (b + getRandomNumber(1, b-1, 0, 1)) + `</span>
        </span>
    `;
    let mc3 = `
        <span class="fraction">
            <span>` + (a + getRandomNumber(1, a-1, 0, 1)) + `</span>
            <span class="fraction-line">------</span>
            <span>` + (b + getRandomNumber(1, b-1, 0, 1)) + `</span>
        </span>
    `;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}


export function convertFractionToDecimal() {
    let x = getRandomNumber(1, 1000, 0, 0);
    x /= 1000;
    x = dpCheck(x);
    let frac = simplifyRatio(1000 * x, 1000);

    let a = frac[0];
    let b = frac[1];
    let questionText = `Convert
        <span class="fraction">
            <span>` + a + `</span>
            <span class="fraction-line">------</span>
            <span>` + b + `</span>
        </span>
        to a decimal
    `;
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans = x;
    let mc1 = dpCheck(parseFloat(x) + getRandomNumber(0, 1, 3, 0));
    let mc2 = dpCheck(parseFloat(x) + getRandomNumber(0, 1, 3, 0));
    let mc3 = dpCheck(parseFloat(x) + getRandomNumber(0, 1, 3, 0));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}