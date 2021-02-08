import {getRandomNumber, combinations, resetCanvas} from '../MathFunctions';

export function tossingCoins() {
    let oddsA = 0.5;
    let oddsB = 1 - oddsA;
    let numCoins = getRandomNumber(3, 6, 0, 0);
    let numAttempts = 20 * getRandomNumber(4, 10, 0, 0);
    let results = new Array(numCoins + 1);
    let sum = 0;
    for (let i = 0; i < numCoins; i++) {
        let x = combinations(numCoins, i);
        let expectedOutcome = numAttempts * (x[0] / x[1]) * (oddsA ** i) * (oddsB ** (numCoins - i));        
        results[i] = Math.floor(expectedOutcome) + getRandomNumber(1, 6, 0, 1); // noise
        if (results[i] < 0) {
            results[i] = Math.floor(expectedOutcome);
        }
        sum += results[i];
    }
    results[numCoins] = numAttempts - sum;
    if (results[numCoins] < 0) {
        return tossingCoins();
    }
    let questionText = numCoins + " coins are tossed " + numAttempts + " times and the number of heads on each trial is recorded in the table.<br><br>";
    questionText += "<table style='margin-left:auto;margin-right:auto'><tbody><tr><th>Number of heads</th><th>Freq</th></tr>";
    for (let i = 0; i <= numCoins; i++) {
        questionText += "<tr><td>" + i + "</td><td>" + results[i] + "</td></tr>";
    }
    questionText += "</tbody></table>";
    let q = getRandomNumber(0, numCoins, 0, 0);
    let ans = 0, type = getRandomNumber(1, 3, 0, 0);
    if (type === 1) {
        questionText += "<br>What is the experimental probability for tossing " + q + " heads?";
        ans = results[q];
    } else if (type === 2) {
        questionText += "<br>What is the experimental probability for tossing at least " + q + " heads?";
        for (let i = q; i <= numCoins; i++) {
            ans += results[i];
        }
    } else {
        questionText += "<br>What is the experimental probability for tossing at most " + q + " heads?";
        for (let i = q; i >= 0; i--) {
            ans += results[i];
        }
    }
    
    let correct_ans = `
    <span class="fraction">
        <span>` + ans + `</span>
        <span class="fraction-line">------</span>
        <span>` + numAttempts + `</span>
    </span>
    `;
    let mc1 = `
    <span class="fraction">
        <span>` + (ans + getRandomNumber(1, 5, 0, 1)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + numAttempts + `</span>
    </span>
    `;
    let mc2 = `
    <span class="fraction">
        <span>` + (ans + getRandomNumber(1, 5, 0, 1)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + numAttempts + `</span>
    </span>
    `;
    let mc3 = `
    <span class="fraction">
        <span>` + (ans + getRandomNumber(1, 5, 0, 1)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + numAttempts + `</span>
    </span>
    `;

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}    

export function rollingDice() {
    let oddsA = 1/6;
    let numAttempts = 50 * getRandomNumber(2, 6, 0, 0);
    let results = new Array(6);
    let sum = 0;
    for (let i = 0; i < 5; i++) {
        let expectedOutcome = numAttempts * oddsA;
        results[i] = Math.floor(expectedOutcome) + getRandomNumber(1, 6, 0, 1); // noise
        if (results[i] < 0) {
            results[i] = Math.floor(expectedOutcome);
        }
        sum += results[i];
    }
    results[5] = numAttempts - sum;
    if (results[5] < 0) {
        return rollingDice();
    }
    let questionText = "A fair 6 sided die is rolled " + numAttempts + " times and the results are recorded in the table below.";
    questionText += "<table style='margin-left:auto;margin-right:auto'><tbody><tr><th>Score</th><th>Freq</th></tr>";
    for (let i = 0; i < 6; i++) {
        questionText += "<tr><td>" + (i+1) + "</td><td>" + results[i] + "</td></tr>";
    }
    questionText += "</tbody></table>";
    let q = getRandomNumber(1, 6, 0, 0);
    let ans = 0, type = getRandomNumber(1, 3, 0, 0);
    if (type === 1) {
        questionText += "<br>What is the experimental probability for rolling " + q + "?";
        q--;
        ans = results[q];
    } else if (type === 2) {
        questionText += "<br>What is the experimental probability for rolling at least " + q + "?";
        q--;
        for (let i = q; i < 6; i++) {
            ans += results[i];
        }
    } else {
        questionText += "<br>What is the experimental probability for tossing at most " + q + "?";
        q--;
        for (let i = q; i >= 0; i--) {
            ans += results[i];
        }
    }
    
    let correct_ans = `
    <span class="fraction">
        <span>` + ans + `</span>
        <span class="fraction-line">------</span>
        <span>` + numAttempts + `</span>
    </span>
    `;
    let mc1 = `
    <span class="fraction">
        <span>` + (ans + getRandomNumber(1, 5, 0, 1)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + numAttempts + `</span>
    </span>
    `;
    let mc2 = `
    <span class="fraction">
        <span>` + (ans + getRandomNumber(1, 5, 0, 1)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + numAttempts + `</span>
    </span>
    `;
    let mc3 = `
    <span class="fraction">
        <span>` + (ans + getRandomNumber(1, 5, 0, 1)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + numAttempts + `</span>
    </span>
    `;

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}    

export function ballBag() {
    let colours = ["red", "blue", "green", "yellow", "orange", "purple"];
    let n = getRandomNumber(3, colours.length, 0, 0);
    let results = new Array(6);
    let sum = 0;
    for (let i = 0; i < n; i++) {
        results[i] = getRandomNumber(3, 10, 0, 0);
        sum += results[i];
    }

    let questionText = "A bag contains different coloured balls, there are " + results[0] + " " + colours[0];
    for (let i = 1; i < n-1; i++) {
        questionText += ", " + results[i] + " " + colours[i];
    }
    questionText += " and " + results[n-1] + " " + colours[n-1] + ". This information is summarised in the table below:<br>";
    questionText += "<table style='margin-left:auto;margin-right:auto'><tbody><tr><th>Colour</th><th>Freq</th></tr>";
    for (let i = 0; i < n; i++) {
        questionText += "<tr><td>" + colours[i] + "</td><td>" + results[i] + "</td></tr>";
    }
    questionText += "</tbody></table>";
    let q = getRandomNumber(0, n-1, 0, 0);
    questionText += "<br>What is the experimental probability of selecting a " + colours[q] + " ball?";
    let correct_ans = `
    <span class="fraction">
        <span>` + results[q] + `</span>
        <span class="fraction-line">------</span>
        <span>` + sum + `</span>
    </span>
    `;
    let mc1 = `
    <span class="fraction">
        <span>` + (results[q] + getRandomNumber(1, 5, 0, 1)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + (sum + getRandomNumber(1, 5, 0, 1)) + `</span>
    </span>
    `;
    let mc2 = `
    <span class="fraction">
        <span>` + (results[q] + getRandomNumber(1, 5, 0, 1)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + (sum + getRandomNumber(1, 5, 0, 1)) + `</span>
    </span>
    `;
    let mc3 = `
    <span class="fraction">
        <span>` + (results[q] + getRandomNumber(1, 5, 0, 1)) + `</span>
        <span class="fraction-line">------</span>
        <span>` + sum + `</span>
    </span>
    `;

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);

}

function drawCanvasVennDual(scores, a, b) {
    let canvas = document.getElementById("canvasID");
    canvas.style.backgroundColor = "white";
    canvas.style.display = "block";
    canvas.style.marginLeft = "auto";
    canvas.style.marginRight = "auto";
    canvas.height = 300;
    canvas.width = 400;
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.lineWidth = 1;

    ctx.beginPath();
    //ctx.arc((2/6)*canvas.width, (1/2)*canvas.height, 3*(1/12)*canvas.width, 0, 2 * Math.PI);
    let w = 400, h = 300;
    ctx.arc(w/3, h/2, w/4, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(2*w/3, h/2, w/4, 0, 2 * Math.PI);
    ctx.stroke();

    //ctx.moveTo(0.6 * canvas.width, canvas.height); // A point start 
    //ctx.lineTo(0.2 * canvas.width, 0.6 * canvas.height); // AC line   
    ctx.font = "20px CMSY10";
    ctx.fillText(scores[0], 20, 30); // nil scores
    ctx.fillText(a, w/4, 40); // a heading
    ctx.fillText(b, 3*w/5, 40); // b heading
    ctx.fillText(scores[1], w/4, h/2); // a scores
    ctx.fillText(scores[2], w/2, h/2); // a n b scores
    ctx.fillText(scores[3], 3*w/4, h/2); // b scores
    //ctx.fillRect(0.2 * canvas.width - 2, 0.6 * canvas.height - 2, 4, 4); // C point   
}

export function vennDual() {
    let scores = new Array(4);
    scores[0] = getRandomNumber(1, 3, 0, 0); // null scores
    let total = scores[0];
    for (let i = 1; i < 4; i++) {
        scores[i] = getRandomNumber(1, 10, 0, 0);
        total += scores[i];
    }

    let a, b, questionText = "", type = getRandomNumber(1, 6, 0, 0);
    if (type === 1) {
        a = "Breakfast";
        b = "Lunch";
        questionText = "A group of people were surveyed and asked whether they had eaten breakfast or lunch today";
    } else if (type === 2) {
        a = "Television";
        b = "Reading";
        questionText = "A group of people were surveyed and asked whether they prefer reading or watching television";
    } else if (type === 3) {
        a = "Batman";
        b = "Robin";
        questionText = "A group of people were surveyed and asked whether they prefer Batman or Robin";
    } else if (type === 4) {
        a = "Forward";
        b = "Back";
        questionText = "A rugby team was surveyed as to whether they were a forward or a back";
    } else if (type === 5) {
        a = "Sports";
        b = "Music";
        questionText = "A class was surveyed as to whether they played sports or did music";
    } else {
        a = "Chicken";
        b = "Fish";
        questionText = "A group of people were surveyed after a flight whether they chose chicken or fish as their meal during the flight";
    }
    questionText += ". The results were recorded in the Venn Diagram shown below.";
    resetCanvas();
    drawCanvasVennDual(scores, a, b);

    type = getRandomNumber(1, 7, 0, 0);
    let ans;
    if (type === 1) {
        // total
        questionText += "<br>How many people were surveyed?";
        ans = total;
    } else if (type === 2) {
        // a 
        questionText += "<br>How many people selected " + a + "?";
        ans = scores[1] + scores[2];
    } else if (type === 3) {
        // a only
        questionText += "<br>How many people selected " + a + " only?";
        ans = scores[1];
    } else if (type === 4) {
        // b only
        questionText += "<br>How many people selected " + b + " only?";
        ans = scores[3];
    } else if (type === 5) {
        // b 
        questionText += "<br>How many people selected " + b + "?";
        ans = scores[2] + scores[3];
    } else if (type === 6) {
        // a ^ b
        questionText += "<br>How many people selected both " + a + " and " + b + "?";
        ans = scores[2];
    } else {
        //nill
        questionText += "<br>How many people selected neither?";
        ans = scores[0];
    }
    console.log("ans is " + ans);
    // highlight ans
    //drawCanvasVennDualHighlight();
    
    let correct_ans = ans;

    let arr = [correct_ans, type, a, b];
    return [questionText].concat(arr).concat(scores);
}


function drawCanvasVennTriple(scores, a, b, c) {
    let canvas = document.getElementById("canvasID");
    canvas.style.backgroundColor = "white";
    canvas.style.display = "block";
    canvas.style.marginLeft = "auto";
    canvas.style.marginRight = "auto";
    canvas.height = 400;
    canvas.width = 400;
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.lineWidth = 1;

    let w = 400, h = 400, r = w/4;
    //ctx.arc((2/6)*canvas.width, (1/2)*canvas.height, 3*(1/12)*canvas.width, 0, 2 * Math.PI);
    ctx.beginPath();
    ctx.arc(w/3, h/3, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(2*w/3, h/3, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(w/2, Math.sqrt(3) * (w/6) + h/3, r, 0, 2 * Math.PI);
    ctx.stroke();

    //ctx.moveTo(0.6 * canvas.width, canvas.height); // A point start 
    //ctx.lineTo(0.2 * canvas.width, 0.6 * canvas.height); // AC line   
    ctx.font = "20px CMSY10";
    ctx.fillText(scores[0], 20, 30); // nil scores
    ctx.fillText(a, 80, 25); // a heading
    ctx.fillText(b, 240, 25); // b heading
    ctx.fillText(c, 180, 370); // c heading
    ctx.fillText(scores[1], 100, 100); // a scores
    ctx.fillText(scores[2], 200, 100); // a n b scores
    ctx.fillText(scores[3], 300, 100); // b scores
    ctx.fillText(scores[4], 145, 200); // a n c scores
    ctx.fillText(scores[5], 200, 180); // a n b n c scores
    ctx.fillText(scores[6], 245, 200); // b n c scores
    ctx.fillText(scores[7], 200, 300); // c scores
    //ctx.fillRect(0.2 * canvas.width - 2, 0.6 * canvas.height - 2, 4, 4); // C point   
}

export function vennTriple() {
    let scores = new Array(8);
    scores[0] = getRandomNumber(1, 3, 0, 0); // null scores
    let total = scores[0];
    for (let i = 1; i < 8; i++) {
        scores[i] = getRandomNumber(1, 10, 0, 0);
        total += scores[i];
    }

    let a, b, c, questionText = "", type = getRandomNumber(1, 2, 0, 0);
    if (type === 1) {
        a = "Breakfast";
        b = "Lunch";
        c = "Dinner";
        questionText = "A group of people were surveyed and asked whether they had eaten breakfast, lunch or dinner today";
    } else if (type === 2) {
        a = "Maths";
        b = "English";
        c = "History";
        questionText = "Students were asked whether they studied Maths, English or History";
    } else if (type === 3) {
        a = "Soccer";
        b = "Rugby";
        c = "Cricket";
        questionText = "Players were asked whether they played soccer, rugby or cricket";
    } else {
        a = "Action";
        b = "Drama";
        c = "Comedy";
        questionText = "A group of people were surveyed and asked whether they prefer Action, Drama or Comedy movies";
    }
    questionText += ". The results were recorded in the Venn Diagram shown below.";
    resetCanvas();
    drawCanvasVennTriple(scores, a, b, c);

    type = getRandomNumber(1, 12, 0, 0);
    let ans;
    if (type === 1) {
        // total
        questionText += "<br>How many people were surveyed?";
        ans = total;
    } else if (type === 2) {
        // a 
        questionText += "<br>How many people selected " + a + "?";
        ans = scores[1] + scores[2] + scores[4] + scores[5];
    } else if (type === 3) {
        // a only
        questionText += "<br>How many people selected " + a + " only?";
        ans = scores[1];
    } else if (type === 4) {
        // b only
        questionText += "<br>How many people selected " + b + " only?";
        ans = scores[3];
    } else if (type === 5) {
        // b 
        questionText += "<br>How many people selected " + b + "?";
        ans = scores[2] + scores[3] + scores[5] + scores[6];
    } else if (type === 6) {
        // a n b
        questionText += "<br>How many people selected both " + a + " and " + b + "?";
        ans = scores[2] + scores[5];
    } else if (type === 7) {
        // a n c
        questionText += "<br>How many people selected both " + a + " and " + c + "?";
        ans = scores[4] + scores[5];
    } else if (type === 8) {
        // b n c
        questionText += "<br>How many people selected both " + b + " and " + c + "?";
        ans = scores[5] + scores[6];
    } else if (type === 9) {
        // c only
        questionText += "<br>How many people selected " + c + " only?";
        ans = scores[7];
    } else if (type === 10) {
        // c 
        questionText += "<br>How many people selected " + c + "?";
        ans = scores[4] + scores[5] + scores[6] + scores[7];
    } else if (type === 11) {
        // a n b n c
        questionText += "<br>How many people selected " + a + ", " + b + " and " + c + "?";
        ans = scores[5];
    } else {
        //nill
        questionText += "<br>How many people selected none of the options?";
        ans = scores[0];
    }
    
    let correct_ans = ans;

    let arr = [correct_ans, type, a, b, c];
    return [questionText].concat(arr).concat(scores);
}

export function twoWayTables() {    
    let scores = [], total = 0;
    for (let i = 0; i < 4; i++) {
        scores[i] = getRandomNumber(1, 10, 0, 0);
        total += scores[i];
    }

    let qType = getRandomNumber(1, 3, 0, 0), questionText, y = [], x = [];
    if (qType === 1) {
        questionText = "Students were asked on whether they had part time jobs.";
        y = ["Male", "Female"];
        x = ["Working part-time", "Not working part-time"];
    } else if (qType === 2) {
        questionText = "A group was surveyed as to whether they voted Liberal or Labor";
        y = ["Male", "Female"];
        x = ["Voting for Liberal", "Voting for Labor"];
    } else {
        questionText = "A group was asked whether they were visiting family or going overseas during the Christmas holidays";
        y = ["Visiting family", "Not visiting family"];
        x = ["Going overseas", "Not going overseas"];
    }

    let y0 = getRandomNumber(0, y.length-1, 0, 0);
    let x0 = getRandomNumber(0, x.length-1, 0, 0);

    let aType = getRandomNumber(1, 4, 0, 0), ans;
    if (aType === 1) {
        questionText += "<br>How many were " + y[y0] + " and " + x[x0];    
        ans = scores[x0 + 2 * y0];
    } else if (aType === 2) {
        questionText += "<br>How many were " + y[y0];    
        ans = scores[2 * y0] + scores[2 * y0 + 1];
    } else if (aType === 3) {
        questionText += "<br>How many were " + x[x0];    
        ans = scores[x0] + scores[x0 + 2];
    } else {
        questionText += "<br>How many people were surveyed";
        ans = total;
    }

    questionText += "<br><br><table><tbody><tr><th style='width:30%'></th><th style='width:30%'>" + x[0] + "</th><th style='width:30%'>" + x[1] + "</th></tr><tr><th>" + y[0] + "</th><td>" + scores[0] + "</td><td>" + scores[1] + "</td></tr><tr><th>" + y[1] + "</th><td>" + scores[2] + "</td><td>" + scores[3] + "</td></tr></tbody></table>";
    return [questionText, ans];
}