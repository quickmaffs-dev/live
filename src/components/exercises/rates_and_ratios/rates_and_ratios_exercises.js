import {getRandomNumber, numberWithCommas, dpCheck, numDecimals, simplifyRatio, getPrimeFactors, getNames} from '../MathFunctions';
import loa_01 from '../../../img/loa_01.png';
import loa_02 from '../../../img/loa_02.png';
import loa_03 from '../../../img/loa_03.png';
import loa_04 from '../../../img/loa_04.png';
import loa_05 from '../../../img/loa_05.png';
import loa_06 from '../../../img/loa_06.png';
import loa_07 from '../../../img/loa_07.png';
import loa_08 from '../../../img/loa_08.png';
import loa_09 from '../../../img/loa_09.png';
import loa_10 from '../../../img/loa_10.png';
import loa_11 from '../../../img/loa_11.png';

export function convertRatesSingle() {
    let units = ['m', 'L', 'g', 'B'];
    let unit = units[getRandomNumber(0, units.length-1, 0, 0)];
    //let prefixes = ['m', 'c', '', 'k'];
    let prefixes = ['k', '', 'c', 'm'];

    let pn1 = getRandomNumber(0, prefixes.length-2, 0, 0); // pn1 = [0, 2]
    let pn2 = getRandomNumber(pn1+1, prefixes.length-1, 0, 0); // pn2 = [pn+1, 3] , [1, 3], [3, 3]

    if (prefixes[pn1] === 'c' && unit !== 'm') {
        pn1 = 0;
    }

    if (prefixes[pn2] === 'c' && unit !== 'm') {
        pn2 = 3;
    }

    let n = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        //decimals
        n = getRandomNumber(1, 20, 1, 0);
    }

    let pn0 = pn1;
    let n0 = n;
    let a = numberWithCommas(n) + prefixes[pn1] + unit;
    while (pn2 - pn1 > 0) {            
        n *= (10 ** (3 - pn1));
        pn1++;
    }
    let b = numberWithCommas(dpCheck(n)) + prefixes[pn1] + unit;        
    let questionText, correct_ans, mc1, mc2, mc3;
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        // large : small
        console.log("hey")
        questionText = "Convert " + b + " to " + prefixes[pn0] + unit;
        correct_ans = a;
        mc1 = numberWithCommas(dpCheck(n0 * 10 ** getRandomNumber(1, 2, 0, 1))) + prefixes[pn0] + unit;
        mc2 = numberWithCommas(dpCheck(n0 * 10 ** getRandomNumber(1, 2, 0, 1))) + prefixes[pn0] + unit;
        mc3 = numberWithCommas(dpCheck(n0 * 10 ** getRandomNumber(1, 2, 0, 1))) + prefixes[pn0] + unit;
    } else {
        questionText = "Convert " + a + " to " + prefixes[pn2] + unit;
        correct_ans = b;
        mc1 = numberWithCommas(n * 10 ** getRandomNumber(1, 2, 0, 1)) + prefixes[pn2] + unit;
        mc2 = numberWithCommas(n * 10 ** getRandomNumber(1, 2, 0, 1)) + prefixes[pn2] + unit;
        mc3 = numberWithCommas(n * 10 ** getRandomNumber(1, 2, 0, 1)) + prefixes[pn2] + unit;
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}    

export function limitsOfAccuracy() {
    let type = getRandomNumber(1, 3, 0, 0);
    type -= 1;
    let ans, pics = [loa_01, loa_02, loa_03, loa_04, loa_05, loa_06, loa_07, loa_08, loa_09, loa_10, loa_11];
    if (type === 0) {
        ans = ["0.5mm", "1mm", "1cm", "5mm"];
    } else if (type === 1) {
        ans = ["0.5<sup>O</sup>C", "1<sup>O</sup>C", "5<sup>O</sup>C", "10<sup>O</sup>C"];
    } else if (type === 2) {
        ans = ["30 sec", "1 min", "5 min", "0.5 sec"];
    } else if (type === 3) {
        ans = ["50 g", "1 g", "5 g", "500 g"];
    } else if (type === 4) {
        ans = ["0.5 m", "50 cm", "50 mm", "0.5 cm"];
    } else if (type === 5) {
        ans = ["0.5<sup>O</sup>", "1<sup>O</sup>", "5<sup>O</sup>", "0.05<sup>O</sup>"];
    } else if (type === 6) {
        ans = ["2.5km/h","5km/h", "10km/h", "0.5km/h"];
    } else if (type === 7) {
        ans = ["250 g", "500 g", "0.5 g", "100 g"];
    } else if (type === 8) {
        ans = ["5 mL", "0.5 mL", "0.25 mL", "2.5 mL"];
    } else if (type === 9) {
        ans = ["500 L", "1 kL", "0.5 L", "2.5 kL"];
    } else {
        ans = ["1/8 tank", "1/2 tank", "1/5 tank", "1/10 tank"];
    }
    let questionText = "What are the limits of accuracy for ";
    document.getElementById("questionImgID").style.display = "block";
    document.getElementById("questionImgID").alt = "This is a diagram of the question";
    document.getElementById("questionImgID").src = pics[type];
    //this.question_string = questionText;        
    //document.getElementById("questionStringID").innerHTML = questionText;

    let correct_ans = ans[0];
    let mc1 = ans[1];
    let mc2 = ans[2];
    let mc3 = ans[3];
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function convertRatesDouble() {
    //x1/y1 -> x2/y2
    let topType = getRandomNumber(1, 3, 0, 0);
    let units = [''];
    let topUnit = '';
    let prefixes;
    if (topType === 1) {
        prefixes = ['$', 'c']; // x100            
    } else if (topType === 2) {
        prefixes = ['hrs', 'min', 'sec']; // x60, x60
    } else {
        prefixes = ['k', '', 'c', 'm'];
        units = ['m', 'L', 'B', 'g'];
        topUnit = units[getRandomNumber(0, units.length-1, 0, 0)];
    }
    let topPrefix = getRandomNumber(0, prefixes.length-1, 0, 0);
    let topPrefixNew = getRandomNumber(topPrefix, prefixes.length-1, 0, 0);

    if (topUnit !== 'm') {
        if (prefixes[topPrefix] === 'c') { // topPrefix = 2
            topPrefix = 1;
        }
        if (prefixes[topPrefixNew] === 'c') { // topPrefixNew = 2
            topPrefixNew = 1;
        }
    }
    

    let a = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        //decimals
        a = getRandomNumber(1, 20, 1, 0);
    }
    let b = a;
    let x = topPrefix;
    if (topType === 1) { //prefixes = ['$', 'c']; // x60, x60
        while (x < topPrefixNew) {
            b *= 100;
            x++;
        }
    } else if (topType === 2) { //prefixes = ['hrs', 'min', 'sec']; // x60, x60
        while (x < topPrefixNew) {
            b *= 60;
            x++;
        }
    } else { // prefix = ['k', '', 'c', 'm'];
        while (x < topPrefixNew) {
            b *= 10 ** (3 - x);
            x++;
        }
    }
    let x1 = prefixes[topPrefix] + topUnit;
    let x2 = prefixes[topPrefixNew] + topUnit;
            
    let bottomType = getRandomNumber(1, 3, 0, 0);
    units = [''];
    let bottomUnit = '';
    while (bottomType === topType) {
        bottomType = getRandomNumber(1, 3, 0, 0);
    }        

    // get bottom units
    if (bottomType === 1) {
        prefixes = ['$', 'c']; // x100
    } else if (bottomType === 2) {
        prefixes = ['hrs', 'min', 'sec']; // x60, x60
    } else {
        prefixes = ['k', '', 'c', 'm'];
        units = ['m', 'L', 'B', 'g'];
        bottomUnit = units[getRandomNumber(0, units.length-1, 0, 0)];
    }
    let bottomPrefix = getRandomNumber(0, prefixes.length-1, 0, 0);
    let bottomPrefixNew = getRandomNumber(bottomPrefix, prefixes.length-1, 0, 0);

    if (bottomUnit !== 'm') {
        if (prefixes[bottomPrefix] === 'c') { 
            bottomPrefix = 1;
        }
        if (prefixes[bottomPrefixNew] === 'c') { 
            bottomPrefixNew = 1;
        }
    }

    let c = 1;
    x = bottomPrefix;  
    if (bottomType === 1) { //prefixes = ['$', 'c']; // x60, x60
        while (x < bottomPrefixNew) {
            c *= 100;
            x++;
        }
    } else if (bottomType === 2) { //prefixes = ['hrs', 'min', 'sec']; // x60, x60
        while (x < bottomPrefixNew) {
            c *= 60;
            x++;
        }
    } else { // prefix = ['k', '', 'c', 'm'];
        while (x < bottomPrefixNew) {
            c *= 10 ** (3 - x);
            x++;
        }
    }
    let y1 = prefixes[bottomPrefix] + bottomUnit;
    let y2 = prefixes[bottomPrefixNew] + bottomUnit;        
    let questionText, correct_ans, mc1, mc2, mc3;
    if (getRandomNumber(1, 2, 0, 0) === 1) {      
        let m = a*c;
        if (numDecimals(m) > 5) {
            m = m.toFixed(2);
        }
        questionText = "Convert " + numberWithCommas(b) + x2 + "/" + y2 + " to " + x1 + "/" + y1;
        correct_ans = numberWithCommas(m) + x1 + "/" + y1;
        mc1 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x1 + "/" + y1;
        mc2 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x1 + "/" + y1;
        mc3 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x1 + "/" + y1;
    } else {
        let m = b*c;
        if (numDecimals(m) > 5) {
            m = m.toFixed(2);
        }
        questionText = "Convert " + numberWithCommas(a) + x1 + "/" + y1 + " to " + x2 + "/" + y2;
        correct_ans = numberWithCommas(m) + x2 + "/" + y2;
        mc1 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x2 + "/" + y2;
        mc2 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x2 + "/" + y2;
        mc3 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x2 + "/" + y2;
    }

    if (x1 === x2 && y1 === y2) {
        return convertRatesDouble();
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function rateChangeAppliations() {
    let type = getRandomNumber(1, 4, 0, 0);
    let questionText, correct_ans, mc1, mc2, mc3;
    if (type === 1) {
        let a = getRandomNumber(1, 50, 0, 0);
        let x = 0;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            x = getRandomNumber(1, 20, 0, 0);    
        } else {
            x = getRandomNumber(1, 20, 2, 0);                
        }
        let b = getRandomNumber(1, 50, 0, 0);
        while (b === a) {
            b = getRandomNumber(1, 50, 0, 0);
        }
        questionText = "If " + a + "m of material costs $" + x + ", how much would " + b + "m cost?";
        correct_ans = "$" + (b * x / a).toFixed(2);
        mc1 = "$" + numberWithCommas((getRandomNumber(1, 5, 0, 1) + b * x / a).toFixed(2));
        mc2 = "$" + numberWithCommas((getRandomNumber(1, 5, 0, 1) + b * x / a).toFixed(2));
        mc3 = "$" + numberWithCommas((getRandomNumber(1, 5, 0, 1) + b * x / a).toFixed(2));
    } else if (type === 2) {
        let a = getRandomNumber(1, 50, 0, 0);
        let x = 0;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            x = getRandomNumber(1, 20, 0, 0);    
        } else {
            x = getRandomNumber(1, 20, 2, 0);                
        }
        let y = 0;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            y = getRandomNumber(1, 20, 0, 0);
        } else {
            y = getRandomNumber(1, 20, 2, 0);
        }            
        while (y === a) {
            y = getRandomNumber(1, 20, 2, 0);
        }
        questionText = "If I can buy " + a + "m of material for $" + x + ", how much material can I buy for $" + y + "?";
        correct_ans = (y * a / x).toFixed(2) + "m";
        mc1 = "$" + numberWithCommas((getRandomNumber(1, 5, 0, 1) + y * a / x).toFixed(2));
        mc2 = "$" + numberWithCommas((getRandomNumber(1, 5, 0, 1) + y * a / x).toFixed(2));
        mc3 = "$" + numberWithCommas((getRandomNumber(1, 5, 0, 1) + y * a / x).toFixed(2));
    } else if (type === 3) {
        let s = getRandomNumber(1, 100, 0, 0);
        let du = [" km", " m"][getRandomNumber(0, 1, 0, 0)];
        let tu = ["hr", "min", "sec"][getRandomNumber(0, 2, 0, 0)];
        let t = getRandomNumber(2, 10, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            t = getRandomNumber(2, 10, 1, 0);
        }            
        questionText = "A rocket is moving at " + s + du + "/" + tu + ". How far will it go in " + t + tu + "?";
        correct_ans = (s * t).toFixed(2) + du;
        mc1 = (getRandomNumber(1, 5, 0, 1) + s * t).toFixed(2) + du;
        mc2 = (getRandomNumber(1, 5, 0, 1) + s * t).toFixed(2) + du;
        mc3 = (getRandomNumber(1, 5, 0, 1) + s * t).toFixed(2) + du;
    } else {
        let s = getRandomNumber(1, 100, 0, 0);
        let du = [" km", " m"][getRandomNumber(0, 1, 0, 0)];
        let tu = ["hr", "min", "sec"][getRandomNumber(0, 2, 0, 0)];
        let d = getRandomNumber(1, 200, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            d = getRandomNumber(1, 200, 1, 0);
        }            
        questionText = "A rocket is moving at " + s + du + "/" + tu + ". How long until it gets " + d + du + "?";
        correct_ans = (d / s).toFixed(2) + tu;
        mc1 = (getRandomNumber(1, 5, 0, 1) + d / s).toFixed(2) + du;
        mc2 = (getRandomNumber(1, 5, 0, 1) + d / s).toFixed(2) + du;
        mc3 = (getRandomNumber(1, 5, 0, 1) + d / s).toFixed(2) + du;
        
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;        
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}
  
/*
    simplifyRatio = (a, b) => {
        let aF = getPrimeFactors(a);
        let bF = getPrimeFactors(b);
        
        // cancel out factors
        for (let i = 0; i < aF.length; i++) {
            for (let j = 0; j < bF.length; j++) {
                if (aF[i] === bF[j]) {
                    aF[i] = bF[j] = 1;
                    j = bF.length;
                }
            }
        }
        // multiply final numbers
        a = b = 1;
        for (let i = 0; i < aF.length; i++) {
            a *= aF[i];
        }

        for (let i = 0; i < bF.length; i++) {
            b *= bF[i];
        }
        let x = [a, b];
        return x;
    }
*/
    
export function simplifyRatioDuo() {
    let primes = [2, 3, 5, 7];
    let questionText = "";
    let type = getRandomNumber(1, 3, 0, 0);
    let an, bn;
    if (type === 1) {
        // integers
        let n = getRandomNumber(1, 4, 0, 0);
        let a, b;
        a = b = new Array(n);
        an = bn = 1;
        for (let i = 0; i < n-1; i++) {
            a[i] = primes[getRandomNumber(0, primes.length-1, 0, 0)];
            an *= a[i];
            b[i] = primes[getRandomNumber(0, primes.length-1, 0, 0)];
            bn *= b[i];
        }
        let x = getRandomNumber(2, 10, 0, 0);
        a[n-1] = b[n-1] = x;
        an *= x;
        bn *= x;
        questionText = "Simplify " + an + " : " + bn;
    } else if (type === 2) {
        // decimals
        let dpA = getRandomNumber(0, 2, 0, 0);
        an = getRandomNumber(1, 20, dpA, 0).toFixed(dpA);
        let dpB = getRandomNumber(0, 2, 0, 0);
        bn = getRandomNumber(1, 20, dpB, 0).toFixed(dpB);
        questionText = "Simplify " + an + " : " + bn;
        let m = dpA;
        if (dpB > dpA) {
            m = dpB;
        }
        an = Math.floor(an * (10 ** m));
        bn = Math.floor(bn * (10 ** m));
    } else if (type === 3) {
        // fractions
        let a1 = getRandomNumber(1, 20, 0, 0);
        let a2 = getRandomNumber(1, 20, 0, 0);
        let b1 = getRandomNumber(1, 20, 0, 0);
        let b2 = getRandomNumber(1, 20, 0, 0);
        an = a1 * b2;
        bn = a2 * b1;
        questionText = "Simplify <sup>" + a1 + "</sup>/<sub>" + a2 + "</sub> : <sup>" + b1 + "</sup>/<sub>" + b2 + "</sub>";
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    //let ans = this.simplifyRatio(an, bn);
    let ans = simplifyRatio(an, bn);
    let a0 = ans[0];
    let b0 = ans[1];
    // make sure no common factors
    let correct_ans = a0 + " : " + b0;
    let mc1 = (a0 + getRandomNumber(0, 3, 0, 1)) + " : " + (b0 + getRandomNumber(1, 3, 0, 1));
    let mc2 = (a0 + getRandomNumber(1, 3, 0, 1)) + " : " + (b0 + getRandomNumber(0, 3, 0, 1));
    let mc3 = (a0 + getRandomNumber(0, 3, 0, 1)) + " : " + (b0 + getRandomNumber(1, 3, 0, 1));
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function simplifyRatioTrio() {
    let primes = [2, 3, 5, 7];
    let an, bn, cn;
    let n = getRandomNumber(1, 4, 0, 0);
    let a, b, c;
    a = b = c = new Array(n);
    an = bn = cn = 1;
    for (let i = 0; i < n-1; i++) {
        a[i] = primes[getRandomNumber(0, primes.length-1, 0, 0)];
        an *= a[i];
        b[i] = primes[getRandomNumber(0, primes.length-1, 0, 0)];
        bn *= b[i];
        c[i] = primes[getRandomNumber(0, primes.length-1, 0, 0)];
        cn *= c[i];
    }

    let x = getRandomNumber(2, 10, 0, 0);
    a[n-1] = b[n-1] = c[n-1] = x;
    an *= x;
    bn *= x;
    cn *= x;
    let questionText = "Simplify " + an + " : " + bn + " : " + cn;
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let aF = getPrimeFactors(an);
    let bF = getPrimeFactors(bn);
    let cF = getPrimeFactors(cn);
    // testing
    console.log(an + " prime factors are:");
    for (let i = 0; i < aF.length; i++) {
        console.log(aF[i]);
    }
    console.log(bn + " prime factors are:");
    for (let i = 0; i < bF.length; i++) {
        console.log(bF[i]);
    }
    console.log(cn + " prime factors are:");
    for (let i = 0; i < cF.length; i++) {
        console.log(cF[i]);
    }
    // cancel out factors
    for (let i = 0; i < aF.length; i++) {
        for (let j = 0; j < bF.length; j++) {
            for (let k = 0; k < cF.length; k++) {
                if (aF[i] === bF[j]  && bF[i] === cF[k]) {
                    aF[i] = bF[j] = cF[k] = 1;
                    k = cF.length;
                }
            }
        }
    }
    // multiply final numbers
    an = bn = cn = 1;
    for (let i = 0; i < aF.length; i++) {
        an *= aF[i];
    }
    for (let i = 0; i < bF.length; i++) {
        bn *= bF[i];
    }
    for (let i = 0; i < cF.length; i++) {
        cn *= cF[i];
    }
    // make sure no common factors
    let correct_ans = an + " : " + bn + " : " + cn;
    let mc1 = (an + getRandomNumber(0, 3, 0, 1)) + " : " + (bn + getRandomNumber(0, 3, 0, 1)) + " : " + (cn + getRandomNumber(1, 3, 0, 1));
    let mc2 = (an + getRandomNumber(0, 3, 0, 1)) + " : " + (bn + getRandomNumber(1, 3, 0, 1)) + " : " + (cn + getRandomNumber(1, 3, 0, 1));
    let mc3 = (an + getRandomNumber(1, 3, 0, 1)) + " : " + (bn + getRandomNumber(0, 3, 0, 1)) + " : " + (cn + getRandomNumber(0, 3, 0, 1));
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function ratioApplications() {
    // andy and ben
    let r1 = getRandomNumber(1, 15, 0, 0);
    let r2 = getRandomNumber(1, 15, 0, 0);
    let x = getRandomNumber(1, 10, 0, 0) * (r1 + r2);
    let a = (r1 * (x / (r1+r2))).toFixed(0);
    let b = (r2 * (x / (r1+r2))).toFixed(0);        

    let type = getRandomNumber(1, 3, 0, 0);
    let questionText = "", correct_ans, mc1, mc2, mc3;
    if (type === 1) {            
        let names = getNames(2);
        let n1 = names[0];
        let n2 = names[1];
        questionText = n1 + " and " + n2 + " split a prize of $" + x + " in the ratio " + r1 + " : " + r2 + ". How should they split this money between them?";
        correct_ans = "$" + a + " : $" + b;
        mc1 = "$" + (r1 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0) + " : $" + (r2 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0);
        mc2 = "$" + (r1 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0) + " : $" + (r2 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0);
        mc3 = "$" + (r1 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0) + " : $" + (r2 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0);            
    } else if (type === 2) {
        questionText = "I need to mix cement and water in the ratio " + r1 + "L : " + r2 + "L. If I need a total of " + x + "L, what will the split be?";
        correct_ans = a + " L : " + b + " L";
        mc1 = (r1 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0) + " L : " + (r2 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0) + " L";
        mc2 = (r1 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0) + " L : " + (r2 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0) + " L";
        mc3 = (r1 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0) + " L : " + (r2 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0) + " L";            
    } else {
        let names = getNames(2);
        let n1 = names[0];
        let n2 = names[1];
        let w = getRandomNumber(2, 4, 0, 0);
        a *= w;
        b *= w;
        questionText = "The ratio of of " + n1 + "'s weight to " + n2 + " is " + r1 + " : " + r2 + ". If " + n1 + " is " + a + "kg, how much does " + n2 + " weigh?";
        correct_ans = b + " kg";
        mc1 = ((w * r2 * (x / (r1+r2)) + getRandomNumber(1, 5, 0, 1))) + " kg";
        mc2 = ((w * r2 * (x / (r1+r2)) + getRandomNumber(1, 5, 0, 1))) + " kg";
        mc3 = ((w * r2 * (x / (r1+r2)) + getRandomNumber(1, 5, 0, 1))) + " kg";
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function simplifyScales() {        
    let prefixes = ['mm', 'cm', 'm', 'km'];        

    let pn1 = getRandomNumber(0, prefixes.length-2, 0, 0); // pn1 = [0, 2]
    let pn2 = getRandomNumber(pn1+1, prefixes.length-1, 0, 0); // pn2 = [pn+1, 3] , [1, 3], [3, 3]

    let n = getRandomNumber(1, 20, 0, 0);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        //decimals
        n = getRandomNumber(1, 20, 1, 0);
    }
    let questionText = "Express 1 " + prefixes[pn1] + " to " + n + " " + prefixes[pn2] + " in the ratio form 1:x";        
    let scale = 1;

    while (pn2 - pn1 > 0) {
        pn1++;
        scale *= (10 ** pn1);            
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;        
    let correct_ans = "1 : " + numberWithCommas(Math.floor(n * scale));
    let mc1 = "1 : " + numberWithCommas(n * scale * 10 ** getRandomNumber(1, 2, 0, 1));
    let mc2 = "1 : " + numberWithCommas(n * scale * 10 ** getRandomNumber(1, 2, 0, 1));
    let mc3 = "1 : " + numberWithCommas(n * scale * 10 ** getRandomNumber(1, 2, 0, 1));
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function scaleApplications() {
    let type = getRandomNumber(1, 2, 0, 0);
    let questionText = "", correct_ans, mc1, mc2, mc3;
    if (type === 1) {
        let prefixes = ['mm', 'cm', 'm', 'km'];        

        let pn1 = getRandomNumber(0, 1, 0, 0); // pn1 = [mm, cm]
        let pn2 = getRandomNumber(2, 3, 0, 0); // pn2 = [m, km]

        let n = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            //decimals
            n = getRandomNumber(1, 20, 1, 0);
        }
        let x = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            //decimals
            x = getRandomNumber(1, 20, 1, 0);
        }
        questionText = "The scale on a map is given by 1" + prefixes[pn1] + " = " + n + " " + prefixes[pn2] + ". If the distance between two points on the map is " + x + " " + prefixes[pn1] + ", what is the actual distance?";        

        correct_ans = (x * n).toFixed(numDecimals(x) + numDecimals(n)) + prefixes[pn2];
        mc1 = (x * n + getRandomNumber(1, 5, 0, 1)).toFixed(numDecimals(x) + numDecimals(n)) + prefixes[pn2];
        mc2 = (x * n + getRandomNumber(1, 5, 0, 1)).toFixed(numDecimals(x) + numDecimals(n)) + prefixes[pn2];
        mc3 = (x * n + getRandomNumber(1, 5, 0, 1)).toFixed(numDecimals(x) + numDecimals(n)) + prefixes[pn2];            
    } else if (type === 2) {
        let prefixes = ['mm', 'cm', 'm', 'km'];
        let pn1 = getRandomNumber(0, 1, 0, 0); // pn1 = [mm, cm]
        let n = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            //decimals
            n = getRandomNumber(1, 20, 1, 0);
        }
        let x = getRandomNumber(1, 50, 0, 0) * 10 ** getRandomNumber(0, 5, 0, 0);

        let pn0 = pn1;
        let ans = x * n;            
        pn1 += 1;
        while (ans > 10 ** pn1) {
            ans /= 10 ** pn1;
            pn1++;
        }

        questionText = "A drawing has the scale 1 : " + numberWithCommas(x) + ". What is the drawing length of a distance of " + ans + prefixes[pn1 - 1] + "?";

        correct_ans = (n) + prefixes[pn0];
        mc1 = (n + getRandomNumber(1, 3, numDecimals(n), 1)).toFixed(numDecimals(n)) + prefixes[pn0];
        mc2 = (n + getRandomNumber(1, 3, numDecimals(n), 1)).toFixed(numDecimals(n)) + prefixes[pn0];
        mc3 = (n + getRandomNumber(1, 3, numDecimals(n), 1)).toFixed(numDecimals(n)) + prefixes[pn0];
    } else {
        let prefixes = ['mm', 'cm', 'm', 'km'];
        let pn1 = getRandomNumber(0, 1, 0, 0); // pn1 = [mm, cm]
        let n = getRandomNumber(1, 20, 0, 0);
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            //decimals
            n = getRandomNumber(1, 20, 1, 0);
        }
        let x = getRandomNumber(1, 50, 0, 0) * 10 ** getRandomNumber(0, 5, 0, 0);

        questionText = "A drawing has the scale 1 : " + numberWithCommas(x) + ". What is the actual length of a measure length of " + n + prefixes[pn1] + "?";
        let ans = x * n;
        pn1 += 1; //
        while (ans > 10 ** pn1) {
            ans /= 10 ** pn1;
            pn1++;
        }

        correct_ans = (ans) + prefixes[pn1 - 1];
        mc1 = (ans + getRandomNumber(1, 3, numDecimals(ans), 1)).toFixed(numDecimals(ans)) + prefixes[pn1 - 1];
        mc2 = (ans + getRandomNumber(1, 3, numDecimals(ans), 1)).toFixed(numDecimals(ans)) + prefixes[pn1 - 1];
        mc3 = (ans + getRandomNumber(1, 3, numDecimals(ans), 1)).toFixed(numDecimals(ans)) + prefixes[pn1 - 1];
    }
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}