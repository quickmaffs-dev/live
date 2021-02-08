import {getRandomNumber, numberWithCommas, getNames} from '../MathFunctions';

export function correctFormula() {
    let name = getNames(1)[0];
    let p = 100 * getRandomNumber(1, 1000, 0, 0);
    let r = getRandomNumber(10, 20, 0, 0);
    let d = getRandomNumber(Math.floor(p/100), Math.floor(p/4), 2, 0).toFixed(2);
    let type = getRandomNumber(1, 4, 0, 0);
    let questionText;
    let correct_ans, mc1, mc2, mc3;
    if (type === 1) {
        questionText = name + " borrows $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding monthly. " + name + " will repay the loan by making monthly repayments of $" + d + ". Which is the correct formula to determine how much is owed in the annuity?";
        correct_ans = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) - " + d;
        mc1 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) - " + d;
        mc2 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) + " + d;
        mc3 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) + " + d;
    } else if (type === 2) {
        questionText = name + " borrows $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding annually. " + name + " will repay the loan by making annual repayments of $" + d + ". Which is the correct formula to determine how much is owed in the annuity?";
        correct_ans = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) - " + d;
        mc1 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) - " + d;
        mc2 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) + " + d;
        mc3 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) + " + d;
    } else if (type === 3) {
        questionText = name + " invests $" + numberWithCommas(p) + " in an annuity with at an interest rate of " + r + "% p.a. compounding monthly. " + name + " further deposit $" + d + " into the annuity every month. Which is the correct formula to determine how much the annuity is worth?";
        correct_ans = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) + " + d;
        mc1 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) - " + d;
        mc2 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) + " + d;
        mc3 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) - " + d;        
    } else {
        questionText = name + " invests $" + numberWithCommas(p) + " in an annuity with at an interest rate of " + r + "% p.a. compounding annually. " + name + " further deposit $" + d + " into the annuity each year. Which is the correct formula to determine how much the annuity is worth?";
        correct_ans = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) + " + d;
        mc1 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%) - " + d;
        mc2 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) + " + d;
        mc3 = "V<sub><span>n+1</span></sub> = V<sub><span>n</span></sub>(1 + " + r + "%/12) - " + d;
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function evaluateAnnuity() {
    let name = getNames(1)[0];
    let p = 100 * getRandomNumber(1, 1000, 0, 0);
    let r = getRandomNumber(10, 20, 0, 0);
    let n = getRandomNumber(3, 6, 0, 0);
    let d = parseFloat(getRandomNumber(Math.floor(p/100), Math.floor(p/n), 2, 0).toFixed(2));
    let type = getRandomNumber(1, 5, 0, 0);
    let period = 1;
    let total_n;
    
    let questionText;
    if (type === 1) {
        total_n = getRandomNumber(5, 30, 0, 0) * period;
        period = 12;
        d = p * ((r / 100 / period) * (1 + r / 100 / period) ** total_n) / ((1 + r / 100 / period) ** total_n - 1);
        questionText = name + " borrows $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding monthly. " + name + " will repay the loan by making monthly repayments of $" + numberWithCommas(d.toFixed(2)) + ". How much money is owed after " + n + " months?";
        d *= -1;
    } else if (type === 2) {
        total_n = getRandomNumber(5, 30, 0, 0) * period;
        period = 52;
        d = p * ((r / 100 / period) * (1 + r / 100 / period) ** total_n) / ((1 + r / 100 / period) ** total_n - 1);
        questionText = name + " borrows $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding weekly. " + name + " will repay the loan by making weekly repayments of $" + numberWithCommas(d.toFixed(2)) + ". How much money is owed after " + n + " weeks?";
        d *= -1;
    } else if (type === 3) {            
        d = parseInt((d - d % 100).toFixed(0));
        if (d < 100) {
            d = 100;
        }
        questionText = name + " invests $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding annually. " + name + " will continue to deposit annual repayments of $" + numberWithCommas(d) + ". What is the investment worth after " + n + " years?";            
        period = 1;
    } else if (type === 4) {
        questionText = name + " invests $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding monthly. " + name + " will continue to deposit monthly repayments of $" + numberWithCommas(d) + ". What is the investment worth after " + n + " months?";
        period = 12;
    } else {
        questionText = name + " invests $" + numberWithCommas(p) + " at an interest rate of " + r + "% p.a. compounding quarterly. " + name + " will continue to deposit quarterly repayments of $" + numberWithCommas(d) + ". What is the investment worth after " + n + " quarters?";
        period = 4;
    }
    
    let vn = p;
    for (let i = 0; i < n; i++) {
        vn = (vn * (1 + (r / 100)/period) + d);
        //console.log(vn);
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText; 
    let correct_ans = "$" + numberWithCommas(vn.toFixed(2));
    let mc1 = "$" + numberWithCommas((parseFloat(vn) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
    let mc2 = "$" + numberWithCommas((parseFloat(vn) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
    let mc3 = "$" + numberWithCommas((parseFloat(vn) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function futureValueTable() {
    let xItems = 6; // change to percent
    let yItems = 6; // change to n terms
    let fvt = [];
    let row;
    let vn = 0;
    for (let j = 0; j < yItems; j++) {
        row = new Array(xItems);
        for (let i = 0; i < xItems; i++) {
            if (j > 0) {
                vn = fvt[j-1][i];
            }
            row[i] = vn * (1 + (i+1) / 100) + 1;
        }
        fvt.push(row);
    }
    console.log(fvt);
    let questionText = "<table><tr><td>Period</td>";
    for (let i = 0; i < xItems; i++) {
        questionText += "<td>" + (i + 1) + "%</td>";
    }
    questionText += "</tr>";
    for (let j = 0; j < yItems; j++) {
        questionText += "<tr><td>" + (j + 1) + "</td>"
        row = new Array(xItems);
        for (let i = 0; i < xItems; i++) {
            questionText += "<td>" + fvt[j][i].toFixed(4) + "</td>";
        }
        questionText += "</tr>"
    }
    questionText += "</table>";
    let p = 100 * getRandomNumber(10, 1000, 0, 0);
    let ans;
    let r = getRandomNumber(1, xItems, 0, 0);
    let n = getRandomNumber(2, yItems, 0, 0);
    let type = getRandomNumber(1, 3, 0, 0);
    let correct_ans, mc1, mc2, mc3;
    if (type === 1) {
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText += "<br>Using the table, calculate the future value of an annuity for investing $" + numberWithCommas(p) + " at " + r + "% p.a. for " + n + " years compounded annually";
        } else {
            r = getRandomNumber(1, xItems / 2, 0, 0);
            n = 2 * getRandomNumber(2, yItems/2, 0, 0);
            questionText += "<br>Using the table, calculate the future value of an annuity for investing $" + numberWithCommas(p) + " at " + (2 * r) + "% p.a. for " + (n / 2) + " years compounded six-monthly";
        }
        ans = p * parseFloat(fvt[n-1][r-1].toFixed(4));        
        correct_ans = "$" + numberWithCommas(ans.toFixed(2));
        mc1 = "$" + numberWithCommas((parseFloat(ans) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
        mc2 = "$" + numberWithCommas((parseFloat(ans) + getRandomNumber(1, 100, 2, 1)).toFixed(2));
        mc3 = "$" + numberWithCommas((parseFloat(ans) + getRandomNumber(1, 100, 2, 1)).toFixed(2));            
    } else if (type === 2) {
        let a = numberWithCommas((p * parseFloat(fvt[n-1][r-1].toFixed(4))).toFixed(2));
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText += "<br>Using the table, find the payment amount of an annuity whose future value is $" + numberWithCommas(a) + " at " + r + "% p.a. for " + n + " years compounded annually";
        } else {
            r = getRandomNumber(1, xItems / 2, 0, 0);
            n = 2 * getRandomNumber(2, yItems/2, 0, 0);
            a = numberWithCommas((p * parseFloat(fvt[n-1][r-1].toFixed(4))).toFixed(2));
            questionText += "<br>Using the table, find the payment amount of an annuity whose future value is $" + numberWithCommas(a) + " at " + (2 * r) + "% p.a. for " + (n / 2) + " years compounded six-monthly";
        }
        ans = p;
        correct_ans = "$" + numberWithCommas(ans);
        mc1 = "$" + numberWithCommas(parseFloat(ans) + 100 * getRandomNumber(1, 10, 0, 1));
        mc2 = "$" + numberWithCommas(parseFloat(ans) + 100 * getRandomNumber(1, 10, 0, 1));
        mc3 = "$" + numberWithCommas(parseFloat(ans) + 100 * getRandomNumber(1, 10, 0, 1));
    } else {
        let a = numberWithCommas((p * parseFloat(fvt[n-1][r-1].toFixed(4))).toFixed(2));
        questionText += "<br>Using the table, find the interest rate of an annuity whose future value is $" + numberWithCommas(a) + " when $" + numberWithCommas(p) + " is invested at the end of each year for " + n + " years";
        ans = r;
        correct_ans = r + "%";
        mc1 = (r + getRandomNumber(1, 3, 0, 1)) + "%";
        mc2 = (r + getRandomNumber(1, 3, 0, 1)) + "%";
        mc3 = (r + getRandomNumber(1, 3, 0, 1)) + "%";
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function presentValueTable() {
    let xItems = 6; // change to percent
    let yItems = 6; // change to n terms
    let fvt = [];
    let row;
    for (let j = 0; j < yItems; j++) {
        row = new Array(xItems);            
        for (let i = 0; i < xItems; i++) {
            if (j === 0) {
                row[i] = 1 / (1 + (i+1) / 100);
            } else {
                row[i] = (1 + fvt[j-1][i]) / (1 + (i+1) / 100);
            }
        }
        fvt.push(row);
    }
    console.log(fvt);
    let questionText = "<table><tr><td>Period</td>";
    for (let i = 0; i < xItems; i++) {
        questionText += "<td>" + (i + 1) + "%</td>";
    }
    questionText += "</tr>";
    for (let j = 0; j < yItems; j++) {
        questionText += "<tr><td>" + (j + 1) + "</td>"
        row = new Array(xItems);
        for (let i = 0; i < xItems; i++) {
            questionText += "<td>" + fvt[j][i].toFixed(4) + "</td>";
        }
        questionText += "</tr>"
    }
    questionText += "</table>";
    let p = 100 * getRandomNumber(10, 1000, 0, 0);
    let ans;
    let r = getRandomNumber(1, xItems, 0, 0);
    let n = getRandomNumber(2, yItems, 0, 0);
    let type = getRandomNumber(1, 3, 0, 0);
    type = 1;
    let correct_ans, mc1, mc2, mc3;
    if (type === 1) {
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText += "<br>Using the table, calculate the present value of an annuity for investing $" + numberWithCommas(p) + " at " + r + "% p.a. for " + n + " years compounded annually";
        } else {
            r = getRandomNumber(1, xItems / 2, 0, 0);
            n = 2 * getRandomNumber(2, yItems/2, 0, 0);
            questionText += "<br>Using the table, calculate the present value of an annuity for investing $" + numberWithCommas(p) + " at " + (2 * r) + "% p.a. for " + (n / 2) + " years compounded six-monthly";
        }
        ans = p * parseFloat(fvt[n-1][r-1].toFixed(4));        
        correct_ans = "$" + numberWithCommas(ans.toFixed(2));
        mc1 = "$" + numberWithCommas(parseFloat((parseFloat(ans) + getRandomNumber(1, 100, 2, 1))).toFixed(2));
        mc2 = "$" + numberWithCommas(parseFloat((parseFloat(ans) + getRandomNumber(1, 100, 2, 1))).toFixed(2));
        mc3 = "$" + numberWithCommas(parseFloat((parseFloat(ans) + getRandomNumber(1, 100, 2, 1))).toFixed(2));            
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}