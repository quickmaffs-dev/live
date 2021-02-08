import {getRandomNumber} from '../MathFunctions';

export function rangeScores() {
    let mean = getRandomNumber(1, 100, 1, 0);
    let stdev = getRandomNumber(1, 10, 1, 0);
    let rule = [68, 95, 99.7];
    let type = getRandomNumber(1, 3, 0, 0);
    let questionText = "A normal distribution has mean " + mean + " and standard deviation " + stdev + ". What range would you expect to find " + rule[type-1] + "% of the scores";
    let correct_ans = (mean - type * stdev).toFixed(1) + " and " + (mean + type * stdev).toFixed(1);
    let mc1 = (mean - type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1) + " and " + (mean + type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1);
    let mc2 = (mean - type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1) + " and " + (mean + type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1);
    let mc3 = (mean - type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1) + " and " + (mean + type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1);
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function percentScores() {
    let mean = getRandomNumber(1, 100, 1, 0);
    let stdev = getRandomNumber(1, 10, 1, 0);
    let rule = [68, 95, 99.7];
    let type = getRandomNumber(1, 3, 0, 0);
    let range = (mean - type * stdev).toFixed(1) + " and " + (mean + type * stdev).toFixed(1);
    let questionText = "A normal distribution has mean " + mean + " and standard deviation " + stdev + ". What percent of scores do you expect to find within the range " + range;
    let correct_ans = rule[type - 1] + "%";
    let mc1 = rule[(type - 1 + 1) % 3] + "%";
    let mc2 = rule[(type - 1 + 2) % 3] + "%";
    let mc3 = "50%";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function zScores() {
    let mean = getRandomNumber(1, 100, 1, 0);
    let stdev = getRandomNumber(1, 10, 1, 0);
    let z = getRandomNumber(1, 3, 2, 1);
    let score = mean + z * stdev;
    let questionText = "A normal distribution has mean " + mean + " and standard deviation " + stdev + ". What is the z score for a score of " + score.toFixed(3) + "?";
    let zScores = [
        [0.50000,0.50399,0.50798,0.51197,0.51595,0.51994,0.52392,0.52790,0.53188,0.53586],
        [0.53983,0.54380,0.54776,0.55172,0.55567,0.55966,0.56360,0.56749,0.57142,0.57535],
        [0.57926,0.58317,0.58706,0.59095,0.59483,0.59871,0.60257,0.60642,0.61026,0.61409],
        [0.61791,0.62172,0.62552,0.62930,0.63307,0.63683,0.64058,0.64431,0.64803,0.65173],
        [0.65542,0.65910,0.66276,0.66640,0.67003,0.67364,0.67724,0.68082,0.68439,0.68793],
        [0.69146,0.69497,0.69847,0.70194,0.70540,0.70884,0.71226,0.71566,0.71904,0.72240],
        [0.72575,0.72907,0.73237,0.73565,0.73891,0.74215,0.74537,0.74857,0.75175,0.75490],
        [0.75804,0.76115,0.76424,0.76730,0.77035,0.77337,0.77637,0.77935,0.78230,0.78524],
        [0.78814,0.79103,0.79389,0.79673,0.79955,0.80234,0.80511,0.80785,0.81057,0.81327],
        [0.81594,0.81859,0.82121,0.82381,0.82639,0.82894,0.83147,0.83398,0.83646,0.83891],
        [0.84134,0.84375,0.84614,0.84849,0.85083,0.85314,0.85543,0.85769,0.85993,0.86214],
        [0.86433,0.86650,0.86864,0.87076,0.87286,0.87493,0.87698,0.87900,0.88100,0.88298],
        [0.88493,0.88686,0.88877,0.89065,0.89251,0.89435,0.89617,0.89796,0.89973,0.90147],
        [0.90320,0.90490,0.90658,0.90824,0.90988,0.91149,0.91308,0.91466,0.91621,0.91774],
        [0.91924,0.92073,0.92220,0.92364,0.92507,0.92647,0.92785,0.92922,0.93056,0.93189],
        [0.93319,0.93448,0.93574,0.93699,0.93822,0.93943,0.94062,0.94179,0.94295,0.94408],
        [0.94520,0.94630,0.94738,0.94845,0.94950,0.95053,0.95154,0.95254,0.95352,0.95449],
        [0.95543,0.95637,0.95728,0.95818,0.95907,0.95994,0.96080,0.96164,0.96246,0.96327],
        [0.96407,0.96485,0.96562,0.96638,0.96712,0.96784,0.96856,0.96926,0.96995,0.97062],
        [0.97128,0.97193,0.97257,0.97320,0.97381,0.97441,0.97500,0.97558,0.97615,0.97670],
        [0.97725,0.97778,0.97831,0.97882,0.97932,0.97982,0.98030,0.98077,0.98124,0.98169],
        [0.98214,0.98257,0.98300,0.98341,0.98382,0.98422,0.98461,0.98500,0.98537,0.98574],
        [0.98610,0.98645,0.98679,0.98713,0.98745,0.98778,0.98809,0.98840,0.98870,0.98899],
        [0.98928,0.98956,0.98983,0.99010,0.99036,0.99061,0.99086,0.99111,0.99134,0.99158],
        [0.99180,0.99202,0.99224,0.99245,0.99266,0.99286,0.99305,0.99324,0.99343,0.99361],
        [0.99379,0.99396,0.99413,0.99430,0.99446,0.99461,0.99477,0.99492,0.99506,0.99520],
        [0.99534,0.99547,0.99560,0.99573,0.99585,0.99598,0.99609,0.99621,0.99632,0.99643],
        [0.99653,0.99664,0.99674,0.99683,0.99693,0.99702,0.99711,0.99720,0.99728,0.99736],
        [0.99744,0.99752,0.99760,0.99767,0.99774,0.99781,0.99788,0.99795,0.99801,0.99807],
        [0.99813,0.99819,0.99825,0.99831,0.99836,0.99841,0.99846,0.99851,0.99856,0.99861],
        [0.99865,0.99869,0.99874,0.99878,0.99882,0.99886,0.99889,0.99893,0.99896,0.99900]
        ];
    let chk = 1;
    if (z < 0) {
        z *= -1;
        chk = -1;
    }
    let y = Math.floor(10 * z);
    let x = Math.floor(100 * z) % 10;
    console.log("z is " + z);
    console.log("x is " + x);
    console.log("y is " + y);
    console.log("zscore is " + zScores[y][x].toFixed(4));
    let ans = zScores[y][x];
    if (chk === -1) {
        ans = 1 - ans;
    }
    let correct_ans = ans.toFixed(4);
    let mc1 = (ans + getRandomNumber(1, 999, 0, 1) / 10000).toFixed(4);
    let mc2 = (ans + getRandomNumber(1, 999, 0, 1) / 10000).toFixed(4);
    let mc3 = (ans + getRandomNumber(1, 999, 0, 1) / 10000).toFixed(4);
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function average() {
    let scores = new Array(getRandomNumber(5, 10, 0, 0));
    let questionText = "What is the average of ";
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        scores[i] = getRandomNumber(1, 30, 1, 0);
        if (i < scores.length - 1) {
            questionText += scores[i] + ", ";
        }
        sum += scores[i];
    }
    questionText += " and " + scores[scores.length - 1] + " to 2 decimal places?";        
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    let ans = (sum / scores.length).toFixed(2);
    return [questionText, ans];
}

export function standardDeviation() {
    let scores = new Array(getRandomNumber(5, 10, 0, 0));
    let questionText = "What is the standard deviation of ";
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        scores[i] = getRandomNumber(1, 30, 1, 0);
        if (i < scores.length - 1) {
            questionText += scores[i] + ", ";
        }
        sum += scores[i];
    }
    questionText += " and " + scores[scores.length - 1] + " to 3 decimal places?";        
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    console.log(scores);
    let mean = (sum / scores.length).toFixed(2);
    let s = 0;
    for (let i = 0; i < scores.length; i++) {
        s += (scores[i] - mean) ** 2;
    }
    let ans = Math.sqrt(s / scores.length).toFixed(3);
    return [questionText, ans];
}