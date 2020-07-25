import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns, getPrimeFactors, getNames, simplifyRatio} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex02_ratios extends React.Component {
    constructor(props) {
        super(props);
        this.x = 1;
        this.Ans = 1;
        this.mc1 = this.mc2 = this.mc3 = 1;
        this.userAns = 1;
        this.numCorrect = 0;
        this.numQuestions = 0;
        this.userScore = 1;        
        this.question_string = "";
    }    

    
    componentDidMount(){
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Rates and ratios";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on ratios. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 3;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let mcOptions;
        
        if (chooseQuestion === 1) {
            mcOptions = this.simplifyRatioDuo();
        } else if (chooseQuestion === 2) {
            mcOptions = this.simplifyRatioTrio();
        } else if (chooseQuestion === 3) {
            mcOptions = this.ratioApplications();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "rate and ratios ex02")};            
        }

        this.writeFormula();
        this.writeExample();

    }
    
    simplifyRatioDuo = () => {
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
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        //let ans = this.simplifyRatio(an, bn);
        let ans = simplifyRatio(an, bn);
        let a0 = ans[0];
        let b0 = ans[1];
        // make sure no common factors
        this.Ans = a0 + " : " + b0;
        this.mc1 = (a0 + getRandomNumber(0, 3, 0, 1)) + " : " + (b0 + getRandomNumber(1, 3, 0, 1));
        this.mc2 = (a0 + getRandomNumber(1, 3, 0, 1)) + " : " + (b0 + getRandomNumber(0, 3, 0, 1));
        this.mc3 = (a0 + getRandomNumber(0, 3, 0, 1)) + " : " + (b0 + getRandomNumber(1, 3, 0, 1));
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
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
    simplifyRatioTrio = () => {
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
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
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
        this.Ans = an + " : " + bn + " : " + cn;
        this.mc1 = (an + getRandomNumber(0, 3, 0, 1)) + " : " + (bn + getRandomNumber(0, 3, 0, 1)) + " : " + (cn + getRandomNumber(1, 3, 0, 1));
        this.mc2 = (an + getRandomNumber(0, 3, 0, 1)) + " : " + (bn + getRandomNumber(1, 3, 0, 1)) + " : " + (cn + getRandomNumber(1, 3, 0, 1));
        this.mc3 = (an + getRandomNumber(1, 3, 0, 1)) + " : " + (bn + getRandomNumber(0, 3, 0, 1)) + " : " + (cn + getRandomNumber(0, 3, 0, 1));
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    ratioApplications = () => {
        // andy and ben
        let r1 = getRandomNumber(1, 15, 0, 0);
        let r2 = getRandomNumber(1, 15, 0, 0);
        let x = getRandomNumber(1, 10, 0, 0) * (r1 + r2);
        let a = (r1 * (x / (r1+r2))).toFixed(0);
        let b = (r2 * (x / (r1+r2))).toFixed(0);        

        let type = getRandomNumber(1, 3, 0, 0);
        let questionText = "";
        if (type === 1) {            
            let names = getNames(2);
            let n1 = names[0];
            let n2 = names[1];
            questionText = n1 + " and " + n2 + " split a prize of $" + x + " in the ratio " + r1 + " : " + r2 + ". How should they split this money between them?";
            this.Ans = "$" + a + " : $" + b;
            this.mc1 = "$" + (r1 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0) + " : $" + (r2 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0);
            this.mc2 = "$" + (r1 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0) + " : $" + (r2 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0);
            this.mc3 = "$" + (r1 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0) + " : $" + (r2 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0);            
        } else if (type === 2) {
            questionText = "I need to mix cement and water in the ratio " + r1 + "L : " + r2 + "L. If I need a total of " + x + "L, what will the split be?";
            this.Ans = a + " L : " + b + " L";
            this.mc1 = (r1 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0) + " L : " + (r2 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0) + " L";
            this.mc2 = (r1 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0) + " L : " + (r2 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0) + " L";
            this.mc3 = (r1 * (x / (r1+r2)) + getRandomNumber(1, 3, 0, 1)).toFixed(0) + " L : " + (r2 * (x / (r1+r2)) + getRandomNumber(0, 3, 0, 1)).toFixed(0) + " L";            
        } else {
            let names = getNames(2);
            let n1 = names[0];
            let n2 = names[1];
            let w = getRandomNumber(2, 4, 0, 0);
            a *= w;
            b *= w;
            questionText = "The ratio of of " + n1 + "'s weight to " + n2 + " is " + r1 + " : " + r2 + ". If " + n1 + " is " + a + "kg, how much does " + n2 + " weigh?";
            this.Ans = b + " kg";
            this.mc1 = ((w * r2 * (x / (r1+r2)) + getRandomNumber(1, 5, 0, 1))) + " kg";
            this.mc2 = ((w * r2 * (x / (r1+r2)) + getRandomNumber(1, 5, 0, 1))) + " kg";
            this.mc3 = ((w * r2 * (x / (r1+r2)) + getRandomNumber(1, 5, 0, 1))) + " kg";
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
        n squared is n x n        
        `;
    }

    writeExample = () => {
        document.getElementById("exampleTextID").innerHTML = `
        eg1, 4 ^ 2 = 4 x 4
        <br> 
        = 16
        <br>
        eg2, sqrt(9) = 3
        `;
    }

    render() {
        return (
            <div>
                <Workspace />
            </div>
            
        );
    }
}  

export default ex02_ratios;