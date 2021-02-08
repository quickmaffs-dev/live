import {getRandomNumber, getNames, dpCheck, numDecimals, numberWithCommas} from '../MathFunctions';

export function calculateWeeklyWageByHour() {
    // what is the weekly wage given the wage and number hours worked
    let wage = getRandomNumber(10, 45, 1, 0);
    
    while(numDecimals(wage) < 1) {
        wage = getRandomNumber(10, 45, 1, 0);
    }
    
    let hours = getRandomNumber(20, 50, 0, 0);
    
    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    questionText = "What is " + getNames(1)[0] + "'s weekly wage if they earn $" + wage + "0 and they work " + hours + " hours each week?";
    
    let a = wage * hours;
    let dp = "";
    if (numDecimals(a) > 0) {
        dp = "0";
    }
    correct_ans = "$" + dpCheck(a) + dp;
    mc1 = "$" + dpCheck((a + getRandomNumber(1, 10, 1, 1))) + "0";
    mc2 = "$" + dpCheck((a + getRandomNumber(1, 10, 1, 1))) + "0";
    mc3 = "$" + dpCheck((a + getRandomNumber(1, 10, 1, 1))) + "0";

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function calculateAnnualSalary() {
    // what is the annual salary given weekly/fortnightly/monthly wage
    let type = getRandomNumber(1, 3, 0, 0);
    let n, wage = getRandomNumber(800, 2000, 0, 0);
    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    if (type === 1) {
        // weekly
        n = 52;
        questionText = "What is " + getNames(1)[0] + "'s annual salary if they earn $" + wage + " each week?"
    } else if (type === 2) {
        // fortnightly
        wage = 2 * wage;
        n = 26;
        questionText = "What is " + getNames(1)[0] + "'s annual salary if they earn $" + wage + " each fortnight?"
    } else {
        //monthly
        wage = 4 * wage;
        n = 12;
        questionText = "What is " + getNames(1)[0] + "'s annual salary if they earn $" + wage + " each month?"
    }
    
    let a = wage * n;
    correct_ans = "$" + numberWithCommas(a);
    mc1 = "$" + numberWithCommas((a + getRandomNumber(10, 100, 0, 1)));
    mc2 = "$" + numberWithCommas((a + getRandomNumber(10, 100, 0, 1)));
    mc3 = "$" + numberWithCommas((a + getRandomNumber(10, 100, 0, 1)));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function calculateWeeklyWageBySalary() {
    // what is the weekly/fortnightly/monthly wage given annual salary 
    let type = getRandomNumber(1, 3, 0, 0);
    let n, salary = getRandomNumber(35000, 150000, 0, 0);
    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    if (type === 1) {
        // weekly
        n = 52.18;
        questionText = "What is " + getNames(1)[0] + "'s weekly earnings if they earn $" + numberWithCommas(salary) + " p.a?"
    } else if (type === 2) {
        // fortnightly
        n = 52.18/2;
        questionText = "What is " + getNames(1)[0] + "'s fornightly earnings if they earn $" + numberWithCommas(salary) + " p.a?"
    } else {
        //monthly
        n = 12;
        questionText = "What is " + getNames(1)[0] + "'s monthly earnings if they earn $" + numberWithCommas(salary) + " p.a?"
    }
    
    let a = salary / n;

    correct_ans = "$" + dpCheck(a.toFixed(2));
    mc1 = "$" + dpCheck((a + getRandomNumber(10, 100, 0, 1)).toFixed(2));
    mc2 = "$" + dpCheck((a + getRandomNumber(10, 100, 0, 1)).toFixed(2));
    mc3 = "$" + dpCheck((a + getRandomNumber(10, 100, 0, 1)).toFixed(2));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function hourlyPayRate() {
    // what is the hourly pay rate given the situation
    let wage = getRandomNumber(10, 45, 1, 0);
    while(numDecimals(wage) < 1) {
        wage = getRandomNumber(10, 45, 1, 0);
    }
    let hours = getRandomNumber(20, 50, 0, 0);
    let total = wage * hours;
    let dp = "";
    if (numDecimals(total) > 0) {
        dp += "0";
    }
    total = dpCheck(total) + dp;

    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    questionText = "If " + getNames(1)[0] + " earns $" + total + " from working " + hours + " hours this week, what is their hourly rate of pay?";
    
    dp = "";
    if (numDecimals(wage) > 0) {
        dp = "0";
    }
    correct_ans = "$" + wage + dp;
    mc1 = "$" + dpCheck((wage + getRandomNumber(1, 10, 1, 1))) + "0";
    mc2 = "$" + dpCheck((wage + getRandomNumber(1, 10, 1, 1))) + "0";
    mc3 = "$" + dpCheck((wage + getRandomNumber(1, 10, 1, 1))) + "0";

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function overtimeBasic() {
    // work out a persons overtime
    let wage = getRandomNumber(10, 45, 1, 0);
    while(numDecimals(wage) < 1) {
        wage = getRandomNumber(10, 45, 1, 0);
    }
    let normal_hours = getRandomNumber(30, 42, 0, 0);
    let half_hours = getRandomNumber(5, 10, 0, 0);
    let double_hours = getRandomNumber(2, half_hours - 1, 0, 0);

    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    questionText = getNames(1)[0] + " earns an hourly wage of $" + wage + "0. Calculate their total pay for the week if they worked " + normal_hours + " hours normally, " + half_hours + " at time-and-a-half and " + double_hours + " at double-time.";
    
    let total = wage * (normal_hours + half_hours * 1.5 + double_hours * 2);
    correct_ans = "$" + dpCheck(total);
    mc1 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));
    mc2 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));
    mc3 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function calculateOvertime() {
    // work out a persons overtime
    let wage = getRandomNumber(10, 45, 1, 0);
    while(numDecimals(wage) < 1) {
        wage = getRandomNumber(10, 45, 1, 0);
    }
    let normal_hours = getRandomNumber(30, 42, 0, 0);
    let half_hours = getRandomNumber(5, 10, 0, 0);
    //let double_hours = getRandomNumber(2, half_hours - 1, 0, 0);
    let hours = getRandomNumber(normal_hours - 5, normal_hours + half_hours + 5, 0, 0);
    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    let name = getNames(1)[0];
    questionText = name + "'s company pays normal pay for an employee's first " + normal_hours + " hours, time-and-a-half for the next " + half_hours + " hours and double-time for any time after that. How much money does " + name + " take home if they worked a total of " + hours + " hours if they earn $" + wage + "0?";
    
    let total = 0;
    if (hours > normal_hours) {
        total += normal_hours;
        hours -= normal_hours;
        if (hours > half_hours) {
            hours -= half_hours;
            total += (1.5 * half_hours + 2 * hours);            
        } else {
            total += (1.5 * hours);
        }
    } else {
        total = hours;
    }
    
    total *= wage;
    correct_ans = "$" + dpCheck(total);
    mc1 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));
    mc2 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));
    mc3 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);
}

export function calculateCommission() {
    // work out a commission
    let retainer = 10 * getRandomNumber(10, 40, 0, 0);
    let commission = getRandomNumber(3, 20, 0, 0);
    let sales = getRandomNumber(1000, 10000, 0, 0);
    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    let name = getNames(1)[0];
    questionText = name + " is a salesperson and earns a retainer of $" + retainer + " on top of a commission of " + commission + "% for the items they sell. If  " + name + " sells $" + numberWithCommas(sales) + " worth of product, how much will " + name + " earn?";
    
    let total = retainer + commission * sales / 100;
    correct_ans = "$" + dpCheck(total);
    mc1 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));
    mc2 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));
    mc3 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}

export function calculatePiecework() {
    // find out total of piecework
    let rate = getRandomNumber(5, 10, 1, 0);
    while(numDecimals(rate) < 1) {
        rate = getRandomNumber(5, 10, 1, 0);
    }

    let amount = getRandomNumber(10, 100, 0, 0);
    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    questionText = "If " + getNames(1)[0] + " earns $" + rate + "0 for each book they sell, how much do they earn for selling " + amount + " books?";
    
    let total = rate * amount;
    correct_ans = "$" + dpCheck(total);
    mc1 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));
    mc2 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));
    mc3 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}

export function calculatePieceworkRate() {
    // find out rate of pircework
    let rate = getRandomNumber(5, 10, 1, 0);
    while(numDecimals(rate) < 1) {
        rate = getRandomNumber(5, 10, 1, 0);
    }

    let amount = getRandomNumber(10, 100, 0, 0);
    let total = rate * amount;
    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    questionText = "If " + getNames(1)[0] + " earned $" + dpCheck(total) + " for selling " + amount + " each books, how much did each book cost?";
        
    correct_ans = "$" + rate + "0";
    mc1 = "$" + dpCheck((rate + getRandomNumber(1, 10, 1, 1))) + "0";
    mc2 = "$" + dpCheck((rate + getRandomNumber(1, 10, 1, 1))) + "0";
    mc3 = "$" + dpCheck((rate + getRandomNumber(1, 10, 1, 1))) + "0";

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}

export function calculateBonus() {
    // calculate the total bonus
    let bonus = getRandomNumber(4, 15, 0, 0);
    let salary = getRandomNumber(40000, 200000, 0, 0);
    
    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    let name = getNames(1)[0];
    questionText = name + "'s company pays staff a bonus of " + bonus + "% in additional to their annual salary in a profitable year. What would " + name + "'s bonus be if their salary was $" + numberWithCommas(salary) + " p.a?";
    
    let total = bonus * salary / 100;
    correct_ans = "$" + dpCheck(total);
    mc1 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));
    mc2 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));
    mc3 = "$" + dpCheck((total + getRandomNumber(10, 100, 1, 1)));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
} 

export function leaveLoading() {
    // calculate the leave loading (and total holiday pay)
    let wage = getRandomNumber(700, 3000, 0, 0);
    let total = wage * 4 * 1.175;

    let correct_ans, mc1, mc2, mc3;
    let questionText = "";
    let name = getNames(1)[0];
    questionText = name + " earns an annual leave loading of 17.5% of 4 weeks pay on top of his normal pay. How much is this <b>total leave pay</b> if " + name + "'s weekly wage is $" + wage;

    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText = name + " earns an annual leave loading of 17.5% of 4 weeks pay on top of his normal pay. How much is this <b>leave loading only</b> if " + name + "'s weekly wage is $" + wage;
        total = wage * 4 * 0.175;
    }

    correct_ans = "$" + total.toFixed(2);
    mc1 = "$" + (total + getRandomNumber(10, 100, 1, 1)).toFixed(2);
    mc2 = "$" + (total + getRandomNumber(10, 100, 1, 1)).toFixed(2);
    mc3 = "$" + (total + getRandomNumber(10, 100, 1, 1)).toFixed(2);

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);   
}

export function getTaxableIncome() {
    // calculate the taxable income
    let salary = 10 * getRandomNumber(4000, 10000, 0, 0);
    let deductions  = getRandomNumber(100, 1000, 0, 0);
    let correct_ans, mc1, mc2, mc3;
    let questionText = getNames(1)[0] + " earned $" + numberWithCommas(salary) + " this year and had deductions of $" + numberWithCommas(deductions) + " for work related expenses. What is their taxable income?";

    let taxableIncome = salary - deductions;
    correct_ans = "$" + numberWithCommas(taxableIncome);
    mc1 = "$" + numberWithCommas(taxableIncome + getRandomNumber(10, 1000, 0, 1));
    mc2 = "$" + numberWithCommas(taxableIncome + getRandomNumber(10, 1000, 0, 1));
    mc3 = "$" + numberWithCommas(salary);

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);  
}

export function calculateTax() {
    // calculate tax
    let taxableIncome = 10 * getRandomNumber(1000, 20000, 0, 0);
    let correct_ans, mc1, mc2, mc3;
    let questionText = getNames(1)[0] + "'s taxable income is $" + numberWithCommas(taxableIncome) + ". Using the table, how much tax would they pay?<br><br>";
    questionText += `    
    <table style='width: 100%'>
        <tbody>
            <tr>
                <th style='width: 30%'>Taxable income</th>
                <th>Tax</th>
            </tr>
            <tr>
                <td>0 - $18 200</td>
                <td>Nil</td>
            </tr>
            <tr>
                <td>$18 201 - $37 000</td>
                <td>19c for every $1 over $18 200</td>
            </tr>
            <tr>
                <td>$37 001 - $80 000</td>
                <td>$3 572 + 32.5c for every $1 over $37 000</td>
            </tr>                
            <tr>
                <td>$80 001 - $180 000</td>
                <td>$17 547 + 37c for every $1 over $80 000</td>
            </tr>
            <tr>
                <td>$180 000 and over</td>
                <td>$54 547 + 45c for every $1 over $180 000</td>
            </tr>
        </tbody>
    </table>
    `;

    let tax = 0;
    if (taxableIncome > 18200) {
        if (taxableIncome <= 37000) {
            tax = (taxableIncome - 18200) * 0.19;
        } else if (taxableIncome <= 80000) {
            tax = (taxableIncome - 37000) * 0.325 + 3572;
        } else if (taxableIncome <= 180000) {
            tax = (taxableIncome - 80000) * 0.37 + 17547;
        } else if (taxableIncome > 180000) {
            tax = (taxableIncome - 180000) * 0.45 + 54547;
        }
    }
    
    correct_ans = "$" + numberWithCommas(dpCheck(tax));
    mc1 = "$" + numberWithCommas(dpCheck(tax + getRandomNumber(10, 1000, 0, 1)));
    mc2 = "$" + numberWithCommas(dpCheck(tax + getRandomNumber(10, 1000, 0, 1)));
    mc3 = "$" + numberWithCommas(dpCheck(tax + getRandomNumber(10, 1000, 0, 1)));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);      
}


export function calculatePAYGtax() {
    // calculate tax
    let correct_ans, mc1, mc2, mc3;
    let wage = getRandomNumber(400, 1500, 0, 0);
    let deductions = 0;
    let noise = getRandomNumber(0, 3, 0, 0);
    let questionText = getNames(1)[0] + "'s earns a weekly wage of $" + (wage + noise);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        // deducations
        deductions = getRandomNumber(30, 80, 0, 0);
        questionText = getNames(1)[0] + "'s earns a weekly wage of $" + (wage + deductions + noise) + " with weekly deductions of $" + deductions;
    }
    

    let ans, payg = Math.floor((wage + 0.5 * 4) * 0.3);
    if (getRandomNumber(1, 2, 0, 0) === 1) {
        questionText += ". What is their PAYG tax (using the table)? <br><br>";        
        ans = payg;
    } else {
        questionText += ". What is their net pay? <br><br>";
        ans = wage + noise - payg;
    }

    let rows = "";
    for (let i = 0; i < 4; i++) {
        rows += "<tr>";
        rows +=    "<td>" + (wage + (i - 2) * 4) + " - " + (wage + (i - 1) * 4 - 1) + "</td>" ;
        rows +=    "<td>" + Math.floor((wage + (i - 1.5) * 4) * 0.3) + "</td>" ;
        rows += "</tr>";
    }
    questionText += `    
    <table style='width: 100%'>
        <tbody>
            <tr>
                <th>Weekly Earnings ($)</th>
                <th>PAYG Tax Withheld ($)</th>
            </tr>
            ` + rows + `
        </tbody>
    </table>
    `;

    correct_ans = "$" + ans;
    mc1 = "$" + (ans + getRandomNumber(1, 5, 0, 1));
    mc2 = "$" + (ans + getRandomNumber(1, 5, 0, 1));
    mc3 = "$" + (ans + getRandomNumber(1, 5, 0, 1));

    let arr = [correct_ans, mc1, mc2, mc3];
    return [questionText].concat(arr);      
}

