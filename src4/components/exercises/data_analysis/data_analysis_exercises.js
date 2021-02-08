import {getRandomNumber} from '../MathFunctions';

function drawScatterPlot(x, y, x_title, y_title, option, x_q, y_ans) {        
    console.log("x:" + x);
    console.log("y:" + y);
    let canvas = document.getElementById("canvasID");
    canvas.style.backgroundColor = "white";
    canvas.style.display = "block";
    canvas.style.marginLeft = "auto";
    canvas.style.marginRight = "auto";
    let ctx = canvas.getContext("2d");
    ctx.restore();
    ctx.save();        
    if (option === "reset") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // draw gridlines
    let w = 20;
    ctx.moveTo(0, 0);
    ctx.lineWidth = 0.1;
    let d = 0;
    while (d < canvas.width) {
        ctx.moveTo(d, 0);
        ctx.lineTo(d, canvas.height);
        ctx.moveTo(0, d);
        ctx.lineTo(canvas.width, d);
        d += canvas.width / w;
    }
    ctx.stroke();

    // draw axis        
    ctx.beginPath();
    ctx.moveTo(2 * canvas.width/w, 0);
    ctx.lineTo(2 * canvas.width/w, canvas.height - 2 * canvas.height/w);
    ctx.moveTo(2 * canvas.width/w, canvas.height - 2 * canvas.height/w);
    ctx.lineTo(2 * canvas.width, canvas.height - 2 * canvas.height/w);
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // axis arrow heads
    ctx.beginPath();
    ctx.moveTo(2 * canvas.width/w - 8, 0 + 12);
    ctx.lineTo(2 * canvas.width/w, 0);
    ctx.lineTo(2 * canvas.width/w + 8, 0 + 12);        
    ctx.moveTo(canvas.width - 12, canvas.height - 2 * canvas.height/w - 8);
    ctx.lineTo(canvas.width, canvas.height - 2 * canvas.height/w);
    ctx.lineTo(canvas.width - 12, canvas.height - 2 * canvas.height/w + 8);
    
    ctx.lineWidth = 1;
    ctx.stroke();

    // plot axis marks
    let num_x = -1; // dont include the edge
    let num_y = 0;
    for (let i = 2 * canvas.width/w; i < canvas.width; i += 2 * canvas.width/w) {
        let m = 2;
        ctx.fillRect(i - m/2, canvas.height - 2 * canvas.height/w - m, m, 2*m);
        num_x += 1;
    }        
    for (let j = canvas.height - 2 * 2 * canvas.height/w; j > 0; j -= 2 * canvas.height/w) {
        let m = 2;
        ctx.fillRect(2* canvas.width/w - m, j - m/2, 2*m, m);
        num_y += 1;
    }
    
    if (option !== "reset") {            
        
        // axis labels
        //let x_key = Math.ceil((x[x.length - 1] - x[0]) / num_x);
        //let y_key = Math.ceil((y[y.length - 1] - y[0]) / num_y);
        let x_min = Math.min(...x);
        let y_min = Math.min(...y);
        let x_max = Math.max(...x);
        let y_max = Math.max(...y);
        let x_key = Math.ceil((x_max - x_min) / num_x);
        let y_key = Math.ceil((y_max - y_min) / num_y);
        let n = -1;
        if (x_min === 0) {
            n = 0;
        }
        for (let i = 2 * canvas.width/w; i < canvas.width; i += 2 * canvas.width/w) {
            ctx.font = "15px CMSY10";
            ctx.fillText(x_min + x_key * n, i - 10, canvas.height - 2 * canvas.height/w + 18);
            n += 1;
        }
        n = -1;
        for (let j = canvas.height - 2 * canvas.height/w; j > 0; j -= 2 * canvas.height/w) {
            ctx.font = "15px CMSY10";
            ctx.fillText(y_min + y_key * n, 2 * canvas.width/w - 24, j);
            n += 1;
        }
        
        // axis titles
        ctx.font = "18px CMSY10";
        ctx.fillText(x_title, 7 * canvas.width/w, canvas.height - 10);
        ctx.translate(canvas.width/w - 8, 12 * canvas.width/w);
        ctx.rotate(-Math.PI/2);
        ctx.fillText(y_title, 0, 0);
        ctx.restore();
        // plot x points
        let space_x = canvas.width - 2 * canvas.width/w;
        space_x /= (num_x + 1);
        let space_y = canvas.height - 2 * canvas.height/w;
        space_y /= (num_y + 1);

        let point_size = 6;
        let gap = 2;
        if (x_min === 0) {
            gap = 1;
        }
        for(let i = 0; i < x.length; i += 1) {
            let x_paint = gap * 2 * canvas.width/w + (x[i] - x_min) * space_x / x_key - point_size/2;
            let y_paint =  canvas.height - 2 * canvas.height / w - (y[i] - y_min + y_key) * space_y / y_key - point_size/2;
            ctx.fillRect(x_paint, y_paint, point_size, point_size);
        }

        // store correct ans
        let x_line = 4 * canvas.width/w + (x_q - x_min) * space_x / x_key - 5;
        let y_line = canvas.height - 2 * canvas.height / w - (y_ans - y_min + y_key) * space_y / y_key;
        ctx.restore();
        return [x_line, y_line];
    } 
    ctx.restore();
    return 0;
    
}

export function associatingVariables() {
    drawScatterPlot([], [], "", "", "reset");
    // get relationship of x and y arrays
    let n = getRandomNumber(10, 20, 0, 0);
    let k = getRandomNumber(1, 5, 0, 0);
    let b = getRandomNumber(5, 20, 0, 0);
    let x = new Array(n);
    let y = new Array(n);
    let x_0 = 0;
    let y_0 = 0;
    let x_title, y_title;
    let type = getRandomNumber(1, 2, 0, 0);
    if (type === 1) {
        x_title = "height (cm)";
        x_0 = getRandomNumber(110, 130, 0, 0);
        y_title = "weight (kg)";
        y_0 = 40;
    } else {
        x_title = "Petrol (L)";
        x_0 = 0;
        y_title = "Cost ($)";
        y_0 = 0;
    }
    console.log("k is " + k);

    // place array of random dots
    for (let i = 0; i < n; i++) {
        k = 1;
        // ensure values for each x
        x[i] = i + x_0;            
        y[i] = k * x[i] + b + getRandomNumber(1, k, 0, 1) + y_0;
        // get more random x points
        
        i += 1;
        x[i] = getRandomNumber(0, x.length-1, 0, 0) + x_0;
        y[i] = k * x[i] + b + getRandomNumber(1, k, 0, 1) + y_0;
        

    }
    // draw scatterplot

    //x = [10, 20, 30, 40];
    //y = [6, 11, 14, 19];
    let x_min = Math.min(...x);
    let x_max = Math.max(...x);
    let x_q = getRandomNumber(x_min, x_max, 0, 0);
    let y_a = k * x_q + b + y_0;
    let questionText = "The relationship between " + x_title + " and " + y_title + " is given below. ";
    let ans;
    if (type === 1) {
        questionText += "If a boy is " + x_q + "cm tall, how much would he weigh?";
        ans = y_a;
    } else {
        questionText += "How much would " + x_q + "L of petrol cost?";
        ans = y_a;
    }
    let lines = drawScatterPlot(x, y, x_title, y_title, "question", x_q, ans);
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    
    // ask for random x what is y and vice versa
    // if incorrect show on chart the correct via lines
    let correct_ans = ans;
    let mc1 = ans + getRandomNumber(10, 20, 0, 1);
    let mc2 = ans + getRandomNumber(10, 20, 0, 1);
    let mc3 = ans + getRandomNumber(10, 20, 0, 1);

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr, lines);
}


function drawScatterPlot2(x, y, option) {
    //console.log("x:" + x);
    //console.log("y:" + y);
    let canvas = document.getElementById("canvasID");
    canvas.style.backgroundColor = "white";
    canvas.style.display = "block";
    canvas.style.marginLeft = "auto";
    canvas.style.marginRight = "auto";
    let ctx = canvas.getContext("2d");
    ctx.restore();
    ctx.save();        
    if (option === "reset") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // draw gridlines
    let w = 20;
    ctx.moveTo(0, 0);
    ctx.lineWidth = 0.1;
    let d = 0;
    while (d < canvas.width) {
        ctx.moveTo(d, 0);
        ctx.lineTo(d, canvas.height);
        ctx.moveTo(0, d);
        ctx.lineTo(canvas.width, d);
        d += canvas.width / w;
    }
    ctx.stroke();

    // draw axis        
    ctx.beginPath();
    ctx.moveTo(2 * canvas.width/w, 0);
    ctx.lineTo(2 * canvas.width/w, canvas.height - 2 * canvas.height/w);
    ctx.moveTo(2 * canvas.width/w, canvas.height - 2 * canvas.height/w);
    ctx.lineTo(2 * canvas.width, canvas.height - 2 * canvas.height/w);
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // axis arrow heads
    ctx.beginPath();
    ctx.moveTo(2 * canvas.width/w - 8, 0 + 12);
    ctx.lineTo(2 * canvas.width/w, 0);
    ctx.lineTo(2 * canvas.width/w + 8, 0 + 12);        
    ctx.moveTo(canvas.width - 12, canvas.height - 2 * canvas.height/w - 8);
    ctx.lineTo(canvas.width, canvas.height - 2 * canvas.height/w);
    ctx.lineTo(canvas.width - 12, canvas.height - 2 * canvas.height/w + 8);
    
    ctx.lineWidth = 1;
    ctx.stroke();

    // plot axis marks
    let num_x = -1; // dont include the edge
    let num_y = 0;
    for (let i = 2 * canvas.width/w; i < canvas.width; i += 2 * canvas.width/w) {
        let m = 2;
        ctx.fillRect(i - m/2, canvas.height - 2 * canvas.height/w - m, m, 2*m);
        num_x += 1;
    }        
    for (let j = canvas.height - 2 * 2 * canvas.height/w; j > 0; j -= 2 * canvas.height/w) {
        let m = 2;
        ctx.fillRect(2* canvas.width/w - m, j - m/2, 2*m, m);
        num_y += 1;
    }
    
    if (option !== "reset") {            
        
        // axis labels
        //let x_key = Math.ceil((x[x.length - 1] - x[0]) / num_x);
        //let y_key = Math.ceil((y[y.length - 1] - y[0]) / num_y);
        let x_min = Math.min(...x);
        let y_min = Math.min(...y);
        let x_max = Math.max(...x);
        let y_max = Math.max(...y);
        let x_key = Math.ceil((x_max - x_min) / num_x);
        let y_key = Math.ceil((y_max - y_min) / num_y);
        let n = -1;
        if (x_min === 0) {
            n = 0;
        }
        for (let i = 2 * canvas.width/w; i < canvas.width; i += 2 * canvas.width/w) {
            ctx.font = "15px CMSY10";
            ctx.fillText(x_min + x_key * n, i - 10, canvas.height - 2 * canvas.height/w + 18);
            n += 1;
        }
        n = -1;
        for (let j = canvas.height - 2 * canvas.height/w; j > 0; j -= 2 * canvas.height/w) {
            ctx.font = "15px CMSY10";
            ctx.fillText(y_min + y_key * n, 2 * canvas.width/w - 24, j);
            n += 1;
        }
        
        // axis titles
        let titles = ["Cost ($)", "Height (cm)", "Age (months)", "Time (hrs)", "Weight (kg)", "Litres (L)", "Distance (km)"];
        let x_title = titles[getRandomNumber(0, titles.length - 1, 0, 0)];
        let y_title = titles[getRandomNumber(0, titles.length - 1, 0, 0)];
        ctx.font = "18px CMSY10";
        ctx.fillText(x_title, 7 * canvas.width/w, canvas.height - 10);
        ctx.translate(canvas.width/w - 8, 12 * canvas.width/w);
        ctx.rotate(-Math.PI/2);
        ctx.fillText(y_title, 0, 0);
        ctx.restore();
        // plot x points
        let space_x = canvas.width - 2 * canvas.width/w;
        space_x /= (num_x + 1);
        let space_y = canvas.height - 2 * canvas.height/w;
        space_y /= (num_y + 1);

        let point_size = 6;
        let gap = 2;
        if (x_min === 0) {
            gap = 1;
        }
        for(let i = 0; i < x.length; i += 1) {
            let x_paint = gap * 2 * canvas.width/w + (x[i] - x_min) * space_x / x_key - point_size/2;
            let y_paint =  canvas.height - 2 * canvas.height / w - (y[i] - y_min + y_key) * space_y / y_key - point_size/2;
            ctx.fillRect(x_paint, y_paint, point_size, point_size);
        }

    }
    ctx.restore();
}

function getPearsonCorrelationCoefficient(x, y) {
    // get mean of x
    if (x.length !== y.length) {
        console.log("error 176: x and y are of different lengths");
        console.log("x.length is "  + x.length);
        console.log("y.length is "  + y.length);
        return 0;
    }
    // average
    let sum_x = 0;
    let sum_y = 0;
    for (let i = 0; i < x.length; i++) {
        sum_x += x[i];
        sum_y += y[i];
    }
    let mean_x = (sum_x / x.length).toFixed(5);
    let mean_y = (sum_y / y.length).toFixed(5);
    // https://www.socscistatistics.com/tests/pearson/
    let n = 0;
    let d1 = 0;
    let d2= 0;
    for (let i = 0; i < x.length; i++) {
        n += ((x[i] - mean_x) * (y[i] - mean_y));
        d1 += ((x[i] - mean_x) ** 2);
        d2 += ((y[i] - mean_y) ** 2);
    }
    let r = n / (Math.sqrt(d1) * Math.sqrt(d2));
    r = r.toFixed(6);
    return r;
}

export function linearAssociation() {
    drawScatterPlot2([], [], "reset");
    // get relationship of x and y arrays
    let n = 50;
    let noise, ans, diff;
    let domain = Math.floor(0.4 * n);
    let x = new Array(n);
    let y = new Array(n);                
    let k = getRandomNumber(1, 5, 0, 1);
    let b = getRandomNumber(1, 100, 0, 0);
    
    // place array of random dots
    let type = getRandomNumber(1, 4, 0, 0);
    let x_0 = getRandomNumber(1, 100, 0, 0);
    if (type === 1) {
        // strong
        diff = 1;
        if (k < 0) {
            ans = ["strong negative", "strong positive", "weak negative", "no correlation"];
        } else {
            ans = ["strong positive", "strong negative", "weak negative", "no correlation"];
        }
    } else if (type === 2) {
        // moderate
        diff = 10;
        if (k < 0) {
            ans = ["moderate negative", "moderate positive", "weak positive", "no correlation"];
        } else {
            ans = ["moderate positive", "moderate negative", "weak negative", "no correlation"];
        }
    } else if (type === 3) {
        // weak
        diff = 20;
        if (k < 0) {
            ans = ["weak negative", "strong positive", "weak positive", "stong negative"];
        } else {
            ans = ["weak positive", "strong positive", "weak negative", "stong negative"];
        }
    } else {
        // no connection
        diff = 199;
        ans = ["no correlation", "moderate positive", "strong negative", "weak negative"];
    }

    for (let i = 0; i < n; i++) {
        // k = 1;
        // ensure values for each x
        if (i < domain) {
            x[i] = i + x_0;
        } else {
            x[i] = getRandomNumber(0, domain, 0, 0) + x_0;
        }
        //noise = 5 * getRandomNumber(min, max, 0, 0) / 1000; 
        noise = 5 * getRandomNumber(1, 1 + diff, 0, 0) / 1000; 
        y[i] = Math.floor((1 - noise) * (k * x[i] + b));
    }

    // draw scatterplot
    drawScatterPlot2(x, y, "question");
    let questionText = "What is the correlation best described as?";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    // ask for random x what is y and vice versa
    // if incorrect show on chart the correct via lines
    let correct_ans = ans[0];
    let mc1 = ans[1];
    let mc2 = ans[2];
    let mc3 = ans[3];

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function pearsonCorrelationCoefficientAssociation() {
    // get relationship of x and y arrays
    let n = getRandomNumber(7, 10, 0, 0);
    let noise, ans, diff;
    let x = new Array(n);
    let y = new Array(n);   
    let k = getRandomNumber(1, 5, 0, 1);
    let b = getRandomNumber(1, 100, 0, 0);
    
    // place array of random dots
    let type = getRandomNumber(1, 4, 0, 0);
    let x_0 = getRandomNumber(1, 100, 0, 0);
    if (type === 1) {
        // strong
        diff = 1;
    } else if (type === 2) {
        // moderate
        diff = 10;
    } else if (type === 3) {
        // weak
        diff = 20;
    } else {
        // no connection
        diff = 199;
    }

    for (let i = 0; i < n; i++) {
        // k = 1;
        // ensure values for each x
        x[i] = i + x_0;
        //noise = 5 * getRandomNumber(min, max, 0, 0) / 1000; 
        noise = 5 * getRandomNumber(1, 1 + diff, 0, 0) / 1000; 
        y[i] = Math.floor((1 - noise) * (k * x[i] + b));
    }
    
    let r = getPearsonCorrelationCoefficient(x, y);
    console.log("r is " + r);
    if (r >= 0.75 && r <= 1) {
        ans = ["strong positive", "weak negative", "weak negative", "no correlation"];
    } else if (r >= 0.5 && r < 0.75) {
        ans = ["moderate positive", "weak negative", "strong negative", "no correlation"];
    } else if (r >= 0.25 && r < 0.5) {
        ans = ["weak positive", "weak negative", "strong negative", "no correlation"];
    } else if (r > -0.25 && r < 0.25) {
        ans = ["no correlation", "moderate negative", "strong negative", "strong postive"];
    } else if (r > -0.5 && r <= -0.25) {
        ans = ["weak negative", "weak positive", "strong positive", "no correlation"];
    } else if (r > -0.75 && r <= -0.5) {
        ans = ["moderate negative", "weak positive", "strong positive", "no correlation"];
    } else if (r >= -1 && r <= -0.75) {
        ans = ["strong negative", "weak positive", "weak positive", "no correlation"];
    } else {
        ans = [0, 0, 0, 0];
        console.log("error 287: we have an additional value for r:" + r);
    }
    // print out arrays
    let titles = ["Cost ($)", "Height (cm)", "Age (months)", "Time (hrs)", "Weight (kg)", "Litres (L)", "Distance (km)"];
    let m = getRandomNumber(0, titles.length - 2, 0, 0);
    let x_title = titles[m];
    let y_title = titles[getRandomNumber(m + 1, titles.length - 1, 0, 0)];
    let questionText = "By calculating the pearson correlation coefficient, what would the strength of the association be?";
    questionText += "<table><tr><td style='width: 200px; font-weight: bold'>" + x_title + "</td>";
    for (let i = 0; i < x.length; i++) {
        questionText += "<td>" + x[i] + "</td>";
    }
    questionText += "</tr><tr><td style='width: 200px; font-weight: bold'>" + y_title + "</td>";
    for (let i = 0; i < y.length; i++) {
        questionText += "<td>" + y[i] + "</td>";
    }
    questionText += "</tr></table>";
    questionText += "";
    //this.question_string = questionText;
    //document.getElementById("questionStringID").innerHTML = questionText;
    
    let correct_ans = ans[0];
    let mc1 = ans[1];
    let mc2 = ans[2];
    let mc3 = ans[3];

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function calculatePearsonCorrelationCoefficient() {
    // get relationship of x and y arrays
    let n = getRandomNumber(7, 10, 0, 0);
    let noise, diff;
    let x = new Array(n);
    let y = new Array(n);   
    let k = getRandomNumber(1, 5, 0, 1);
    let b = getRandomNumber(1, 100, 0, 0);
    
    // place array of random dots
    let type = getRandomNumber(1, 4, 0, 0);
    let x_0 = getRandomNumber(1, 100, 0, 0);
    if (type === 1) {
        // strong
        diff = 1;
    } else if (type === 2) {
        // moderate
        diff = 10;
    } else if (type === 3) {
        // weak
        diff = 20;
    } else {
        // no connection
        diff = 199;
    }

    for (let i = 0; i < n; i++) {
        // k = 1;
        // ensure values for each x
        x[i] = i + x_0;
        //noise = 5 * getRandomNumber(min, max, 0, 0) / 1000; 
        noise = 5 * getRandomNumber(1, 1 + diff, 0, 0) / 1000; 
        y[i] = Math.floor((1 - noise) * (k * x[i] + b));
    }
    
    let r = getPearsonCorrelationCoefficient(x, y);
    // print out arrays
    let titles = ["Cost ($)", "Height (cm)", "Age (months)", "Time (hrs)", "Weight (kg)", "Litres (L)", "Distance (km)"];
    let m = getRandomNumber(0, titles.length - 2, 0, 0);
    let x_title = titles[m];
    let y_title = titles[getRandomNumber(m + 1, titles.length - 1, 0, 0)];
    let questionText = "Calculate the pearson correlation coefficient of the following association";
    questionText += "<table><tr><td style='width: 200px; font-weight: bold'>" + x_title + "</td>";
    for (let i = 0; i < x.length; i++) {
        questionText += "<td>" + x[i] + "</td>";
    }
    questionText += "</tr><tr><td style='width: 200px; font-weight: bold'>" + y_title + "</td>";
    for (let i = 0; i < y.length; i++) {
        questionText += "<td>" + y[i] + "</td>";
    }
    questionText += "</tr></table>";
    questionText += "";
    //document.getElementById("questionStringID").innerHTML = questionText;
    let correct_ans = parseFloat(r).toFixed(4);
    let mc1 = parseFloat(getRandomNumber(0, 1, 4, 1)).toFixed(4);
    let mc2 = parseFloat(getRandomNumber(0, 1, 4, 1)).toFixed(4);
    let mc3 = parseFloat(getRandomNumber(0, 1, 4, 1)).toFixed(4);

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}
