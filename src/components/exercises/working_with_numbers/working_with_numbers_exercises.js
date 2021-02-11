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