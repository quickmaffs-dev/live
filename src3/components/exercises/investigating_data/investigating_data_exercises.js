import {getScores, getRandomNumber, dpCheck} from '../MathFunctions';

export function getMean() {
    // get mean
    let scores = getScores();
    let correct_ans, mc1, mc2, mc3;
    let questionText = "What is the mean of the following scores: " + scores[0];
    let sum = scores[0];
    for (let i = 1; i < scores.length - 1; i++) {
        questionText += ", " + scores[i];
        sum += scores[i];
    }    
    questionText += " and " + scores[scores.length-1];
    sum += scores[scores.length-1];

    correct_ans = (sum / scores.length).toFixed(1);
    mc1 = ((sum / scores.length) + getRandomNumber(1, 10, 1, 1)).toFixed(1);
    mc2 = ((sum / scores.length) + getRandomNumber(1, 10, 1, 1)).toFixed(1);
    mc3 = ((sum / scores.length) + getRandomNumber(1, 10, 1, 1)).toFixed(1);

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function getMedian() {
    // get median
    let scores = getScores();
    let correct_ans, mc1, mc2, mc3;
    let questionText = "What is the median of the following scores: " + scores[0];
    for (let i = 1; i < scores.length - 1; i++) {
        questionText += ", " + scores[i];
    }    
    questionText += " and " + scores[scores.length-1];

    let median = scores.sort(function(a, b){return a - b})[Math.floor(scores.length/2)];
    if (scores.length % 2 === 0) {
        median = (scores.sort(function(a, b){return a - b})[scores.length/2-1] + scores.sort(function(a, b){return a - b})[scores.length/2]) / 2
    } 

    console.log(scores.sort(function(a, b){return a - b}));
    correct_ans = dpCheck(median);
    mc1 = dpCheck(median + getRandomNumber(1, 5, 0, 1));
    mc2 = dpCheck(median + getRandomNumber(1, 5, 0, 1));
    mc3 = dpCheck(median + getRandomNumber(1, 5, 0, 1));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function getMode() {
    // get mode
    let scores = getScores();
    scores.push(scores[getRandomNumber(0, scores.length-1, 0, 0)]);
    let correct_ans, mc1, mc2, mc3;
    let questionText = "What is the mode of the following scores: " + scores[0];
    for (let i = 1; i < scores.length - 1; i++) {
        questionText += ", " + scores[i];
    }    
    questionText += " and " + scores[scores.length-1];

    let curr = 0;
    let max = curr;
    let mode = [];    
    let sortScores = scores.sort(function(a, b){return a - b});
    for (let i = 1; i < sortScores.length; i++) {
        if (sortScores[i] === sortScores[i-1]) {
            curr += 1;
            if (curr === max) {
                max = curr;
                mode.push(sortScores[i-1]);
            } else  if (curr > max) {
                max = curr;
                mode = [];
                mode.push(sortScores[i-1]);
            }
        } else {
            curr = 0;
        }
    }

    correct_ans = mode;
    mc1 = mode[0] + getRandomNumber(1, 5, 0, 1);
    mc2 = mode[0] + getRandomNumber(1, 5, 0, 1);
    mc3 = mode[0] + getRandomNumber(1, 5, 0, 1); 
    if (mode.length > 1) {
        mc1 = mode[0] + getRandomNumber(1, 5, 0, 1) + "," + mode.slice(1, mode.length);
        mc2 = mode[0] + getRandomNumber(1, 5, 0, 1) + "," + mode.slice(1, mode.length);
        mc3 = mode[0] + getRandomNumber(1, 5, 0, 1) + "," + mode.slice(1, mode.length);    
    }
    
    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function getRange() {
    // get range
    let scores = getScores();
    let correct_ans, mc1, mc2, mc3;
    let questionText = "What is the range of the following scores: " + scores[0];
    for (let i = 1; i < scores.length - 1; i++) {
        questionText += ", " + scores[i];
    }    
    questionText += " and " + scores[scores.length-1];
    let max = Math.max.apply(null, scores);
    let min = Math.min.apply(null, scores);

    correct_ans = dpCheck(max - min);
    mc1 = dpCheck(max - min + getRandomNumber(1, 5, 0, 1));
    mc2 = dpCheck(max - min + getRandomNumber(1, 5, 0, 1));
    mc3 = dpCheck(max - min + getRandomNumber(1, 5, 0, 1));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);    
}
