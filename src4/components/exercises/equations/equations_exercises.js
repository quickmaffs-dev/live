import {getRandomNumber, getPronumeral, getNames} from '../MathFunctions';

export function oneStepEquations() {
    // x + a = c
    let a, x, c, type = getRandomNumber(1, 3, 0, 0);
    x = getRandomNumber(1, 10, 0, 1);
    let questionText = "Solve ";
    if (type === 1) {
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            // x + a = c
            a = getRandomNumber(1, 10, 0, 0);
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                questionText += getPronumeral() + " <span>+</span> " + a + " <span>=</span> ";
            } else {
                questionText += a + " <span>+</span> " + getPronumeral() + " <span>=</span> ";
            }
        } else {
            // x - a = c
            a = -getRandomNumber(1, 10, 0, 0);
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                questionText += getPronumeral() + " <span>-</span> " + (-a) + " <span>=</span> ";
            } else {
                questionText += "<span>-</span>" + (-a) + " <span>+</span> " + getPronumeral() + " <span>=</span> ";
            }
        }
        c = x + a;
        questionText += c;    
    } else if (type === 2) {
        // ax = c
        a = getRandomNumber(2, 10, 0, 1);
        c = a*x;
        questionText += a + getPronumeral() + " <span>=</span> " + c;
    } else {
        // x/a = c
        a = getRandomNumber(2, 10, 0, 0);
        c = getRandomNumber(1, 10, 0, 1);
        x = a*c;
        questionText +=
        `
        <span class="fraction">
            <span>` + getPronumeral() + `</span>
            <span class="fraction-line">------</span>
            <span>` + a + `</span>
        </span>
        `;
        questionText += `
        <span class="fraction">
            <span></span>
            <span class="fraction-line"> = ` + c + `</span>
            <span></span>
        </span>
        `;
    }

    let ans = x;    
    return [questionText, ans];
}

export function twoStepEquations() {
    let a, b, x, c, type = getRandomNumber(1, 4, 0, 0);
    x = getRandomNumber(1, 10, 0, 1);
    let questionText = "Solve ";

    if (type === 1) {
        a = getRandomNumber(2, 10, 0, 1);
        b = getRandomNumber(1, 10, 0, 1);
        c = a*x + b;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            // ax+b = c            
            if (b < 0) {
                questionText += a + getPronumeral() + " <span> - </span> " + (-b) + " <span>=</span> " + c;
            } else {
                questionText += a + getPronumeral() + " <span>+</span> " + b + " <span>=</span> " + c;
            }
        } else {
            // b+ax = c
            if (a < 0) {
                questionText += b + " <span> - </span>" + (-a) + getPronumeral() + " <span>=</span> " + c;
            } else {
                questionText += b + " <span>+</span>" + a + getPronumeral() + " <span>=</span> " + c;
            }
        }
    } else if (type === 2) {
        a = getRandomNumber(2, 10, 0, 1);
        b = getRandomNumber(2, 10, 0, 1);
        c = getRandomNumber(2, 10, 0, 1);
        x = (c-b) * a;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            // x/a + b = c
            questionText += `
            <span class="fraction">
                <span>` + getPronumeral() + `</span>
                <span class="fraction-line">------</span>
                <span>` + a + `</span>
            </span>
            `;
            if (b < 0) {                
                questionText += `
                <span class="fraction">
                    <span></span>
                    <span class="fraction-line"> - ` + (-b) + `</span>
                    <span></span>
                </span>
                `;                
            } else {
                questionText += `
                <span class="fraction">
                    <span></span>
                    <span class="fraction-line"> + ` + b + `</span>
                    <span></span>
                </span>
                `;
            }
        } else {
            // b + x/a = c            
            if (a < 0) {
                questionText += `
                <span class="fraction">
                    <span></span>
                    <span class="fraction-line">` + b + ` - </span>
                    <span></span>
                </span>
                `;
                questionText += `
                <span class="fraction">
                    <span>` + getPronumeral() + `</span>
                    <span class="fraction-line">------</span>
                    <span>` + (-a) + `</span>
                </span>
                `;
            } else {
                questionText += `
                <span class="fraction">
                    <span></span>
                    <span class="fraction-line">` + b + ` + </span>
                    <span></span>
                </span>
                `;
                questionText += `
                <span class="fraction">
                    <span>` + getPronumeral() + `</span>
                    <span class="fraction-line">------</span>
                    <span>` + a + `</span>
                </span>
                `;
            }

        }
        questionText += `
        <span class="fraction">
            <span></span>
            <span class="fraction-line"> = ` + c + `</span>
            <span></span>
        </span>
        `;
    } else if (type === 3) {
        // ax/b = c
        a = getRandomNumber(2, 10, 0, 1);
        b = getRandomNumber(2, 10, 0, 1);
        while (a === b) {
            b = getRandomNumber(2, 10, 0, 1);
        }
        x = b*getRandomNumber(1, 10, 0, 1);
        c = a*x/b;
        questionText += `
        <span class="fraction">
            <span>` + a + getPronumeral() + `</span>
            <span class="fraction-line">------</span>
            <span>` + b + `</span>
        </span>
        `;
        questionText += `
        <span class="fraction">
            <span></span>
            <span class="fraction-line"> = ` + c + `</span>
            <span></span>
        </span>
        `;
    } else {
        a = getRandomNumber(1, 10, 0, 1);
        b = getRandomNumber(2, 10, 0, 1);
        c = getRandomNumber(1, 10, 0, 1);
        x = b*c - a;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            // (x+a)/b = c
            if (a < 0) {
                questionText += `
                <span class="fraction">
                    <span>` + getPronumeral() + ` - ` + (-a) + `</span>
                    <span class="fraction-line">------------</span>
                    <span>` + b + `</span>
                </span>
                `;
            } else {
                questionText += `
                <span class="fraction">
                    <span>` + getPronumeral() + ` + ` + a + `</span>
                    <span class="fraction-line">------------</span>
                    <span>` + b + `</span>
                </span>
                `;
            }
        } else {
            // (a+x)/b = c
            questionText += `
            <span class="fraction">
                <span>` + a + ` + ` + getPronumeral() + `</span>
                <span class="fraction-line">------------</span>
                <span>` + b + `</span>
            </span>
            `;

        }        
        questionText += `
        <span class="fraction">
            <span></span>
            <span class="fraction-line"> = ` + c + `</span>
            <span></span>
        </span>
        `;

    }

    let ans = x;    
    return [questionText, ans];
}

export function dualVariables() {
    // ax + b = cx + d
    let x, a, b, c, d;
    x = getRandomNumber(1, 10, 0, 1);
    a = getRandomNumber(2, 10, 0, 1);
    b = getRandomNumber(1, 10, 0, 1);
    c = getRandomNumber(2, 10, 0, 1);
    d = a*x + b - c*x;
    let p = getPronumeral();
    let questionText = "Solve ";
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        // ax + b
        if (b < 0) {
            questionText += a + p + " <span> - </span> " + (-b);
        } else {
            questionText += a + p + " <span> + </span> " + b;
        }
    } else {
        // b + ax
        if (a < 0) {
            questionText += b + " <span> - </span>" + (-a) + p;
        } else {
            questionText += b + " <span> + </span>" + a + p;
        }
    }

    if (getRandomNumber(1, 2, 0, 0) === 1) {
        // = cx + d
        if (d < 0) {
            questionText += "<span> = </span>" + c + p + " <span> - </span> " + (-d);
        } else {
            questionText += "<span> = </span>" + c + p + " <span> + </span> " + d;
        }
    } else {
        // = d + cx
        if (c < 0) {
            questionText += "<span> = </span>" + d + " <span> - </span>" + (-c) + p;
        } else {
            questionText += "<span> = </span>" + d + " <span> + </span>" + c + p;
        }
    }

    let ans = x;    
    return [questionText, ans];  
}

export function bracketEquations() {
    let a, b, c, d, x, type = getRandomNumber(1, 2, 0, 0);
    let p = getPronumeral();
    x = getRandomNumber(1, 10, 0, 1);
    a = getRandomNumber(2, 10, 0, 1);
    b = getRandomNumber(1, 10, 0, 1);
    let questionText = "Solve ";
    
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        // a(x + b)
        if (b < 0) {
            questionText += a + "(" + p + "<span> - </span>" + (-b) + ")";
        } else {
            questionText += a + "(" + p + "<span> + </span>" + b + ")";
        }
    } else {
        // a(b + x)
        if (b < 0) {
            b *= -1;
        }
        questionText += a + "(" + b + "<span> + </span>" + p + " )";

    }

    if (type === 1) {
        // = c
        c = (x + b) * a;
        questionText += " <span> = </span>" + c;        
    } else if (type === 2) {
        c = getRandomNumber(2, 10, 0, 1);
        d = a*(x + b) - c*x;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            // cx + d
            if (d < 0) {
                questionText += "<span> = </span>" + c + p + "<span> - </span>" + (-d);
            } else {
                questionText += "<span> = </span>" + c + p + "<span> + </span>" + d;
            }
        } else {
            // d + cx
            if (c < 0) {
                questionText += "<span> = </span>" + d + "<span> - </span>" + (-c) + p;
            } else {
                questionText += "<span> = </span>" + d + "<span> + </span>" + c + p;
            }
        }
    }

    let ans = x;    
    return [questionText, ans];  
}

export function equationProblems() {
    let type = getRandomNumber(1, 2, 0, 0);
    let questionText, ans;
    if (type === 1) {
        let m = getRandomNumber(20, 50, 0, 0);
        let b = m + getRandomNumber(1, m-1, 0, 1);
        questionText = "To fix a car, a mechanic charges based on the following formula:";
        questionText += "<br><br><span>C = </span>" + m + "<span>h + </span>" + b;
        questionText += "<br><br>Where <span>C</span> is the cost in dollars and <span>h</span> is the number of hours. ";
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            let h = getRandomNumber(2, 6, 0, 0);
            questionText += "How much would it cost for the mechanic to do " + h + " hours of work?";
            ans = m*h + b;
        } else {
            ans = getRandomNumber(2, 6, 0, 0);
            questionText += "If the mechanic charged $" + (m*ans + b) + " for a job, how many hours work was this?";
        }
    } else if (type === 2) {
        let a = getRandomNumber(5, 12, 0, 0);
        let b = getRandomNumber(50, 100, 0, 0);
        questionText = getNames(1)[0] + " is selling raffle tickets at $" + a + " a ticket. ";
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            questionText += "If they sell " + b + " tickets, how much money have they raised?";
            ans = a * b;
        } else {
            questionText += "If they make $" + (a*b) + " selling tickets, how many have they sold?";
            ans = b;
        }
    }
    return [questionText, ans];  
}
