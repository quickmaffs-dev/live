import {getRandomNumber, numberWithCommas, getNames, getObject} from '../MathFunctions';

export function compoundInterest() {
    let correct_ans, mc1, mc2, mc3;
    // C = P (1+r)^n        
    let p = getRandomNumber(1, 100, 0, 0) * 10 ** getRandomNumber(0, 3, 0, 0);
    let r = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0)) {
        r = getRandomNumber(1, 20, 1, 0).toFixed(1);
    }
    let n = getRandomNumber(1, 10, 0, 0);
    let c = p * (1 + (r / 100)) ** n;

    let questionText = "";
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText = "What is the final value of an investment of $" + numberWithCommas(p) + " over " + n + " years at an interest rate of " + r + "% p.a";
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText = "I have $" + numberWithCommas(c.toFixed(2)) + " after investing for " + n + " years at " + r + "% p.a. How much money did I initially invest?";
            c = p;
        }            
        correct_ans = "$" + numberWithCommas(c.toFixed(2));
        mc1 = "$" + numberWithCommas((c + getRandomNumber(1, 100, 0, 1)).toFixed(2));
        mc2 = "$" + numberWithCommas((c + getRandomNumber(1, 100, 0, 1)).toFixed(2));
        mc3 = "$" + numberWithCommas((c + getRandomNumber(1, 100, 0, 1)).toFixed(2));
    } else {
        questionText = "After " + n + " years an investment of $" + numberWithCommas(p) + " is worth $" + numberWithCommas(c.toFixed(2)) + ". What was the interest rate p.a?";
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

export function compoundInterestPeriod() {
    let correct_ans, mc1, mc2, mc3;
    // C = P (1+r/x)^(n * x)
    let p = getRandomNumber(1, 100, 0, 0) * 10 ** getRandomNumber(0, 3, 0, 0);
    let r = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0)) {
        r = getRandomNumber(1, 20, 1, 0).toFixed(1);
    }
    let n = getRandomNumber(1, 10, 0, 0);
    let periods = ["biannualy", "monthly", "weekly"];
    let periodsN = [         2,        12,       52];
    let x = getRandomNumber(0, periodsN.length-1, 0, 0);
    let c = p * (1 + (r / 100)/periodsN[x]) ** (n * periodsN[x]);

    let questionText = "";
    questionText = "What is the final value of an investment of $" + numberWithCommas(p) + " over " + n + " years at an interest rate of " + r + "% compounded " + periods[x];
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText = "I have $" + numberWithCommas(c.toFixed(2)) + " after investing for " + n + " years at " + r + "% compounded " + periods[x] + ". How much money did I initially invest?";
        c = p;
    }            
    correct_ans = "$" + numberWithCommas(c.toFixed(2));
    mc1 = "$" + numberWithCommas((c + getRandomNumber(1, 100, 0, 1)).toFixed(2));
    mc2 = "$" + numberWithCommas((c + getRandomNumber(1, 100, 0, 1)).toFixed(2));
    mc3 = "$" + numberWithCommas((c + getRandomNumber(1, 100, 0, 1)).toFixed(2));

    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;        
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function inflation() {
    let correct_ans, mc1, mc2, mc3;
    let inflation = getRandomNumber(1, 5, 1, 0);
    let n = getRandomNumber(1, 5, 0, 0);
    let obj = getObject();
    let p = getRandomNumber(1, 30, 0, 0) + getRandomNumber(100, 1000, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        p = getRandomNumber(1, 30, 2, 0) + getRandomNumber(100, 1000, 2, 0);
    }
    let questionText = "Inflation is set to be " + inflation + "% per annum. How much will a $" + p + " " + obj + " cost after " + n + " years?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;        
    let ans = p * (1 + (inflation / 100)) ** n;
    correct_ans = "$" + ans.toFixed(2);
    mc1 = "$" + parseFloat((ans + getRandomNumber(1, 3, 2, 1))).toFixed(2);
    mc2 = "$" + parseFloat((ans + getRandomNumber(1, 3, 2, 1))).toFixed(2);
    mc3 = "$" + parseFloat((ans + getRandomNumber(1, 3, 2, 1))).toFixed(2);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function shares() {
    let correct_ans, mc1, mc2, mc3;
    let name = getNames(1)[0];
    let n = getRandomNumber(2, 100, 0, 0);
    let buy = getRandomNumber(1, 100, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        buy = getRandomNumber(1, 100, 2, 0);
    }

    let sell = getRandomNumber(1, 100, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        sell = getRandomNumber(1, 100, 2, 0);
    }
    let cap = Math.abs(Math.floor((buy - sell) * n * 0.1));
    let fee = getRandomNumber(1, cap, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        fee = getRandomNumber(1, cap, 2, 0);
    }
    let ans = (buy - sell) * n + fee;
    let questionText = name + " bought " + n + " shares for $" + buy + " each and later sold them for $" + sell + " each. If there was a brokerage fee of $" + fee;
    if (buy > sell) {
        questionText += ", what was the loss on the shares?"            
    } else {
        questionText += ", how much profit was made?"
        ans *= -1;
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;        
    correct_ans = "$" + ans.toFixed(2);
    mc1 = "$" + (ans + getRandomNumber(1, 50, 0, 1)).toFixed(2);
    mc2 = "$" + (ans + getRandomNumber(1, 50, 0, 1)).toFixed(2);
    mc3 = "$" + (ans + getRandomNumber(1, 50, 0, 1)).toFixed(2);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function dividend() {
    let correct_ans, mc1, mc2, mc3;
    let share_price = getRandomNumber(1, 100, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        share_price = getRandomNumber(1, 100, 2, 0);
    }

    let div_yield = getRandomNumber(1, 10, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        div_yield = getRandomNumber(1, 10, 1, 0);
    }

    let dividend = share_price * div_yield / 100;
    let type = getRandomNumber(1, 3, 0, 0);
    let questionText;
    if (type === 1) {
        questionText = "If the share price of a stock is $" + share_price + " and the yield is " + div_yield + "%, how much would a single dividend pay?";
        correct_ans = "$" + dividend.toFixed(2);
        mc1 = "$" + (dividend + getRandomNumber(1, 10, 0, 1)).toFixed(2);
        mc2 = "$" + (dividend + getRandomNumber(1, 10, 0, 1)).toFixed(2);
        mc3 = "$" + (dividend + getRandomNumber(1, 10, 0, 1)).toFixed(2);
    } else if (type === 2) {
        questionText = "A dividend pays $" + dividend.toFixed(2) + ". If the yield was " + div_yield + "%, how much is a single share?";
        share_price = (dividend / (div_yield / 100)).toFixed(2);
        correct_ans = "$" + share_price;
        mc1 = "$" + (share_price + getRandomNumber(1, 10, 0, 1));
        mc2 = "$" + (share_price + getRandomNumber(1, 10, 0, 1));
        mc3 = "$" + (share_price + getRandomNumber(1, 10, 0, 1));
    } else {
        questionText = "A share costs $" + share_price + " and has a dividend of $" + dividend.toFixed(2) + ". What is the dividend yield?";
        correct_ans = div_yield + "%";
        mc1 = (div_yield + getRandomNumber(1, 10, 0, 1)) + "%";
        mc2 = (div_yield + getRandomNumber(1, 10, 0, 1)) + "%";
        mc3 = (div_yield + getRandomNumber(1, 10, 0, 1)) + "%";
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);     
}

export function brokerageFees() {
    let correct_ans, mc1, mc2, mc3;
    let share_price = getRandomNumber(1, 100, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        share_price = getRandomNumber(1, 100, 2, 0);
    }
    let n = getRandomNumber(10, 1000, 0, 0);
    
    let fee = getRandomNumber(50, 200, 0, 0);
    let p = getRandomNumber(1, 10, 1, 0);
    let total_fee = n * p * share_price / 100 + fee;
    let questionText = getNames(1)[0] + " purchases " + n + " shares at $" + share_price + " each. The broker charges a fee of $" + fee + " plus " + p + "% of the purchase price. What is the total brokerage cost for purchasing the shares?"; 
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    correct_ans = "$" + total_fee.toFixed(2);
    mc1 = "$" + (total_fee + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    mc2 = "$" + (total_fee + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    mc3 = "$" + (total_fee + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function depreciation() {
    let correct_ans, mc1, mc2, mc3;
    let p = 100 * getRandomNumber(1, 100, 0, 0);
    let r = getRandomNumber(1, 30, 0, 0);
    let n = getRandomNumber(1, 10, 0, 0);
    let f = p * (1 - (r / 100)) ** n;
    let questionText = getNames(1)[0] + " purchases a car costing $" + p + " which depreciates at " + r + "% p.a. How much is the car worth after " + n + " years?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    correct_ans = "$" + f.toFixed(2);
    mc1 = "$" + (f + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    mc2 = "$" + (f + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    mc3 = "$" + (f + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function loans() {
    let correct_ans, mc1, mc2, mc3;
    let p = 1000 * getRandomNumber(1, 100, 0, 0);
    let r = getRandomNumber(1, 30, 1, 0);
    let n = 6 * getRandomNumber(1, 20, 0, 0);
    let i = p * ((r / 100) / 12) * n;
    let name = getNames(1)[0];
    let questionText = name + " takes out a loan of $" + numberWithCommas(p) + " over " + n + " months. The repayment rate is $" + numberWithCommas(((p + i) / n).toFixed(2)) + " per month.";
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText += " How much will " + name + " pay back altogether?";                
        correct_ans = "$" + numberWithCommas((p + i).toFixed(2));
        mc1 = "$" + numberWithCommas(((p + i) + 100 * getRandomNumber(1, 5, 0, 1)).toFixed(2));
        mc2 = "$" + numberWithCommas(((p + i) + 100 * getRandomNumber(1, 5, 0, 1)).toFixed(2));
        mc3 = "$" + numberWithCommas(((p + i) + 100 * getRandomNumber(1, 5, 0, 1)).toFixed(2));
    } else {
        questionText += " What is the flat rate of interest per annum for the loan?";
        let ans = (i / (p * n / 12)) * 100;
        correct_ans = ans.toFixed(1) + "%";
        mc1 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(1) + "%";
        mc2 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(1) + "%";
        mc3 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(1) + "%";
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function creditCardInterest() {
    let correct_ans, mc1, mc2, mc3;
    let p = 10 * getRandomNumber(1, 1000, 0, 0);
    let r = getRandomNumber(10, 30, 0, 0);
    let n = getRandomNumber(10, 50, 0, 0);
    let f = p * (1 + ((r / 100) / 365)) ** n;
    let name = getNames(1)[0];
    let obj = getObject();
    let questionText = name + " has a credit card with an interest rate of " + r + "% p.a. compounding daily and no interest free period. " + name + " uses the credit card to buy a " + obj + " which cost $" + p + ". " + name + " payed this off " + n + " days later. How much did the " + obj + " cost in total, including the interest?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    correct_ans = "$" + f.toFixed(2);
    mc1 = "$" + (f + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    mc2 = "$" + (f + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    mc3 = "$" + (f + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function bankFees() {
    let correct_ans, mc1, mc2, mc3;
    let annual_fee = 10 * getRandomNumber(10, 50, 0, 0);
    let adv_fee = 5 * getRandomNumber(2, 40, 0, 0) / 10;
    let late_fee = 5 * getRandomNumber(10, 100, 0, 0) / 10;
    let x = getRandomNumber(1, 20, 0, 0);
    let y = getRandomNumber(1, 20, 0, 0);
    let f = annual_fee + x * adv_fee + y * late_fee;
    let name = getNames(1)[0];
    let questionText = name + "'s bank charges an annual fee of $" + annual_fee + ", a cash advance fee of $" + adv_fee.toFixed(2) + " and a late payment fee of $" + late_fee.toFixed(2) + ". What is the total cost of " + name + "'s fees if they made " + x + " cash advances and " + y + " late payments?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    correct_ans = "$" + f.toFixed(2);
    mc1 = "$" + (f + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    mc2 = "$" + (f + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    mc3 = "$" + (f + getRandomNumber(1, 5, 0, 1)).toFixed(2);
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}