import {dpCheck, getRandomNumber, numDecimals} from '../MathFunctions';

export function isRecurring() {    
    let correct_ans, mc1;

    let n = getRandomNumber(1, 20, 0, 0);
    let denom = [2, 3, 5, 6, 8, 9, 10];
    let d = denom[getRandomNumber(0, denom.length - 1, 0, 0)];
    console.log(n/d);
    if (parseFloat(n/d) === parseFloat((n/d).toFixed(5))) {
        correct_ans = "Terminating";
        mc1 = "Recurring";        
    } else {
        correct_ans = "Recurring";
        mc1 = "Terminating";
    }
    
    let questionText = "Is " + n  + "/" + d + " a recurring or terminating decimal";

    let arr = [correct_ans, mc1];
    return [questionText].concat(arr);
}

export function getPercentage() {
    
    let correct_ans, mc1, mc2, mc3;
    let p = getRandomNumber(5, 95, 0, 0);
    let n = getRandomNumber(5, 200, 0, 0);
    let questionText = "Find " + p + "% of " + n;
    
    correct_ans = (p * n / 100).toFixed(1);
    mc1 = (p * n / 100 + getRandomNumber(1, 10, 1, 1)).toFixed(1);
    mc2 = (p * n / 100 + getRandomNumber(1, 10, 1, 1)).toFixed(1);
    mc3 = (p * n / 100 + getRandomNumber(1, 10, 1, 1)).toFixed(1);

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function changePercentage() {
    let correct_ans, mc1, mc2, mc3;
    let p = getRandomNumber(5, 95, 0, 0);
    let n = getRandomNumber(5, 200, 0, 0);
    let questionText, ans;
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText = "Increase " + n + " by " + p + "%";
        ans = n * (100 + p)/100;
    } else {
        questionText = "Decrease " + n + " by " + p + "%";
        ans = n * (100 - p)/100;
    }
    
    correct_ans = dpCheck(ans);
    mc1 = (ans + getRandomNumber(1, 10, 1, 1)).toFixed(numDecimals(dpCheck(ans)));
    mc2 = (ans + getRandomNumber(1, 10, 1, 1)).toFixed(numDecimals(dpCheck(ans)));
    mc3 = (ans + getRandomNumber(1, 10, 1, 1)).toFixed(numDecimals(dpCheck(ans)));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}

export function expressAsPercentage() {
    let correct_ans, mc1, mc2, mc3;
    let n = getRandomNumber(1, 50, 0, 0);
    let d = getRandomNumber(n + 1, 100, 0, 0);
    let questionText = "What is " + n + "/" + d + " expressed as a percentage?";
    let ans;
    if (numDecimals(n/d) >= 4) {
        ans = parseFloat((n/d).toFixed(4));
    }
    ans *= 100;
    correct_ans = dpCheck(ans) + "%";
    mc1 = (ans + getRandomNumber(1, 10, 1, 1)).toFixed(numDecimals(dpCheck(ans))) + "%";
    mc2 = (ans + getRandomNumber(1, 10, 1, 1)).toFixed(numDecimals(dpCheck(ans))) + "%";
    mc3 = (ans + getRandomNumber(1, 10, 1, 1)).toFixed(numDecimals(dpCheck(ans))) + "%";

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   

}

export function integerAddition() {
    let a = getRandomNumber(1, 15, 0, 1);
    let b = getRandomNumber(1, 15, 0, 0);
    while (b === Math.abs(a)) {
        b = getRandomNumber(1, 15, 0, 0);
    }
    let type = getRandomNumber(1, 4, 0, 0);
    let questionText, correct_ans;
    if (type === 1){
        // a + b
        correct_ans = a + b;
        questionText = "Evaluate " + a + " + " + b;
    } else if (type === 2) {
        // a - b
        correct_ans = a - b;
        questionText = "Evaluate " + a + " - " + b;
    } else if (type === 2) {
        // a + (-b)
        correct_ans = a - b;
        questionText = "Evaluate " + a + " + (-" + b + ")";
    } else {
        // a - (-b)
        correct_ans = a + b;
        questionText = "Evaluate " + a + " - (-" + b + ")";
    }

    let mc1 = correct_ans + getRandomNumber(1, 10, 0, 1);
    let mc2 = correct_ans + getRandomNumber(1, 10, 0, 1);
    let mc3 = correct_ans + getRandomNumber(1, 10, 0, 1);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}

export function inequalities() {
    let a = getRandomNumber(1, 15, 0, 1);
    let b = getRandomNumber(1, 15, 0, 1);
    while (b === a) {
        b = getRandomNumber(1, 15, 0, 0);
    }
    let questionText, correct_ans, mc1, mc2, mc3;
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText = "Is " + a + " > " + b + "?";
        if (a > b) {
            correct_ans = "yes";
        } else {
            correct_ans = "no";
        }
    } else {
        questionText = "Is " + a + " < " + b + "?";
        if (a < b) {
            correct_ans = "yes";
        } else {
            correct_ans = "no";
        }
    }

    mc1 = correct_ans;
    if (correct_ans === "yes") {
        mc2 = "no";
        mc3 = "no";
    } else {
        mc2 = "yes";
        mc3 = "yes";
    }

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}

export function integerMultiplication() {
    let a = getRandomNumber(1, 12, 0, 1);
    let b = getRandomNumber(1, 12, 0, 0);
    let questionText, correct_ans;
    if (getRandomNumber(1, 2, 0, 0) === 1){
        // a x b
        correct_ans = a * b;
        questionText = "Evaluate " + a + " &#215; " + b;
    } else {
        // a x (-b)
        correct_ans = a * -b;
        questionText = "Evaluate " + a + " &#215; (-" + b + ")";
    }

    let mc1 = -correct_ans;
    let mc2 = correct_ans + getRandomNumber(1, 10, 0, 1);
    let mc3 = correct_ans + getRandomNumber(1, 10, 0, 1);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}

export function integerDivision() {
    let a = getRandomNumber(1, 12, 0, 1);
    let b = getRandomNumber(1, 12, 0, 0);
    let questionText, correct_ans;
    correct_ans = a;
    if (getRandomNumber(1, 2, 0, 0) === 1){
        // a x b
        questionText = "Evaluate " + (a*b) + " &#247; " + b;
    } else {
        // a x (-b)
        questionText = "Evaluate " + (a*-b) + " &#247; (-" + b + ")";
    }

    let mc1 = -correct_ans;
    let mc2 = correct_ans + getRandomNumber(1, 10, 0, 1);
    let mc3 = correct_ans + getRandomNumber(1, 10, 0, 1);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}

function getOperation() {
    let n = getRandomNumber(1, 4, 0, 0);
    if (n === 1) {
        return " + ";
    } else if (n === 2) {
        return " - ";
    } else if (n === 3) {
        return " &#215; ";
    } else {
        return " &#247; ";
    }
}

function solveBodmas(q) {
    console.log("eqn to solve is " + q);
    let a = [];
    let divCheck = 0;
    for (let i = 0; i < q.length; i++) {
        // look for division
        if (q[i] === " &#247; ") {
            divCheck = 1;
            a[a.length-1] = q[i-1] / q[i+1];
            i += 1;
        } else {
            a.push(q[i]);
        }
        
    }
    
    if (divCheck === 0) {
        // check for multiplication
        a = [];
        let multCheck = 0;
        for (let i = 0; i < q.length; i++) {
            // look for multiplication
            if (q[i] === " &#215; " && multCheck === 0) {
                multCheck = 1;
                a[a.length-1] = q[i-1] * q[i+1];
                i += 1;
            } else {
                a.push(q[i]);
            }            
        }

        if (multCheck === 0) {
            // addition check
            a = [];
            let addCheck = 0;
            for (let i = 0; i < q.length; i++) {
                // look for addition
                if (q[i] === " + " && addCheck === 0) {
                    addCheck = 1;
                    a[a.length-1] = q[i-1] + q[i+1];
                    i += 1;
                } else {
                    a.push(q[i]);
                }            
            }

            if (addCheck === 0) {
                // subtraction check
                a = [];
                let subCheck = 0;
                for (let i = 0; i < q.length; i++) {
                    // look for subtraction
                    if (q[i] === " - " && subCheck === 0) {
                        subCheck = 1;
                        a[a.length-1] = q[i-1] - q[i+1];
                        i += 1;
                    } else {
                        a.push(q[i]);
                    }
                }
                
                if (subCheck === 0) {
                    return a[0];
                } else {
                    return solveBodmas(a);
                }
            } else {
                return solveBodmas(a);
            }
        } else {
            return solveBodmas(a);
        }
    } else {
        return solveBodmas(a);
    }
}

export function bodmas() {
    let size = getRandomNumber(2, 5, 0, 0);
    let q = [];
    for (let i = 0; i < size; i++) {
        q.push(getRandomNumber(1, 12, 0, 1));
        q.push(getOperation());
    }
    q.push(getRandomNumber(1, 12, 0, 1));

    // check for division
    console.log("original: " + q);
    for (let i = 0; i < q.length; i++) {
        if (q[i] === " &#247; ") {
            q[i-1] = getRandomNumber(2, 12, 0, 1) * q[i+1];
            break;
        }
    }
    console.log("div fix: " + q);

    // check for only one division
    let singleDiv = 0;
    for (let i = 0; i < q.length; i++) {
        if (q[i] === " &#247; ") {
            if (singleDiv === 0) {
                singleDiv += 1;
            } else {
                q[i] = getOperation();
                i -= 1;
            }
        }
    }
    console.log("single div: " + q);

    // solve
    // negative fix
    let n = q;
    for (let i = 0; i < n.length; i++) {
        if (n[i] === " - ") {
            n[i] = " + ";
            n[i+1] *= -1;
            i += 1;        
        }
    }
    let ans = solveBodmas(n);

    // style negatives
    for (let i = 0; i < q.length; i++) {
        if (Number.isInteger(q[i])) {
            if (q[i] < 0) {
                q[i] = "(" + q[i] + ")";
            }
        }
    }
    console.log("styled: " + q);


    let questionText = "Evaluate " + q.join(" ");
    let correct_ans = ans;
    let mc1 = ans + getRandomNumber(1, 50, 0, 1);
    let mc2 = ans + getRandomNumber(1, 50, 0, 1);
    let mc3 = ans + getRandomNumber(1, 50, 0, 1);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}

export function temperatureChange() {    
    let a = getRandomNumber(1, 40, 0, 0) - 10;
    let b =  a + getRandomNumber(1, 10, 0, 0);
    let questionText = "The temperature this morning was " + a + "<sup>O</sup>C. Later in the day this rose to " + b + "<sup>O</sup>C. What is this temperature change?";
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        a = getRandomNumber(11, 30, 0, 0);
        b = a - getRandomNumber(1, 10, 0, 0);
        questionText = "The temperature this morning was " + a + "<sup>O</sup>C. Later in the day this dropped to " + b + "<sup>O</sup>C. What is this temperature change?";
    }
    let ans = b - a;    
    let correct_ans = ans;
    let mc1 = ans + getRandomNumber(1, 50, 0, 1);
    let mc2 = ans + getRandomNumber(1, 50, 0, 1);
    let mc3 = ans + getRandomNumber(1, 50, 0, 1);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}