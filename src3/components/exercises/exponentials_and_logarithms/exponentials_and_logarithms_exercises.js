import {getRandomNumber} from '../MathFunctions';

export function evaluateExponentials() {
    //ae^x
    //b/e^x    
    let aDp = getRandomNumber(0, 1, 0, 0);
    let a = getRandomNumber(2, 10, aDp, 1);
    let xDp = getRandomNumber(0, 1, 0, 0);
    let x = getRandomNumber(2, 10, xDp, 1);
    let ans, questionText;
    if (getRandomNumber(1, 2, 0, 0) === 3) {
        ans = (a * Math.exp(x)).toFixed(3);
        questionText = "Evaluate " + a + "<span>e</span><sup>" + x + "</sup> (to 3 dp)";
    } else {
        x = getRandomNumber(2, 10, 0, 0);
        ans = (a / Math.exp(x)).toFixed(3);
        questionText = `Evaluate        
        <span class="fraction">
            <span>` + a + `</span>
            <span class="fraction-line">------</span>
            <span><span>e</span><sup>` + x + `</sup></span>
        </span>    (to 3 dp)`;
    }
    
    return [questionText, ans];
}

export function negativeIndices() {
    // a^-1
    // (a/b)^-1
    // ab^-1
    // (ab)^-1
    

    let a = getRandomNumber(2, 10, 0, 0);
    let type = getRandomNumber(1, 4, 0, 0);
    type = 2;    
    let x = getRandomNumber(1, 1, 0, 0);
    let questionText, denom, num, correct_ans, mc1, mc2, mc3;
    if (type === 1) {
        questionText = "What is " + a + "<sup>-" + x + "</sup>";
        num = 1;
        denom = a ** x;
    } else if (type === 2) {
        let primes = [2,3,5];
        let b = a * primes[getRandomNumber(0, primes.length-1, 0, 0)] + 1;
        //let eqn = "{J(\\theta) =\\frac{1}{2m} [\\sum^m_{i=1}(h_\\theta(x^{(i)}) - y^{(i)})2 + \\lambda\\sum^n_{j=1}\\theta^2_j}";
        //let eqn = "\\Big( \\frac{" + a + "}{" + b +"} \\Big) ^{" + (-x) + "} ?";
        questionText = `What is (
        <span class="fraction">
            <span>` + a + `</span>
            <span class="fraction-line">(------)</span>
            <span>` + b + `</span>
        </span>)
        <sup>` + (-x) + `</sup>`;
        num = b;
        denom = a;
    }
    correct_ans = `
        <span class="fraction">
            <span>` + num + `</span>
            <span class="fraction-line">------</span>
            <span>` + denom + `</span>
        </span>`;
    mc1 = `
        <span class="fraction">
            <span>` + (num + getRandomNumber(1, 5, 0, 1)) + `</span>
            <span class="fraction-line">------</span>
            <span>` + (denom + getRandomNumber(1, 5, 0, 1)) + `</span>
        </span>`;
    mc2 = `
        <span class="fraction">
            <span>` + denom + `</span>
            <span class="fraction-line">------</span>
            <span>` + num + `</span>
        </span>`;
    mc3 = `
        <span class="fraction">
            <span>` + (num + getRandomNumber(1, 5, 0, 1)) + `</span>
            <span class="fraction-line">------</span>
            <span>` + (denom + getRandomNumber(1, 5, 0, 1)) + `</span>
        </span>`;

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);    
}

export function convertToLogs() {
    let y = getRandomNumber(2, 10, 0, 0);
    let a = getRandomNumber(2, 10, 0, 0);
    let questionText, correct_ans, mc1, mc2, mc3;
    questionText = "Solve for <span>x</span> : " + y + " = " + a + "<sup><span>x</span></sup>";
    correct_ans = "<span>x</span> = log<sub>" + a + "</sub>" + y;
    mc1 = "<span>x</span> = log<sub>" + y + "</sub>" + a;
    mc2 = "<span>x</span> = log<sub>" + (y) + "</sub>1";
    mc3 = "<span>x</span> = log<sub>" + (a) + "</sub>1";
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);    
}