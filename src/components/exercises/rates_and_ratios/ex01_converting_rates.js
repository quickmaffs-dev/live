import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns, numberWithCommas, numDecimals} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex01_converting_rates extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on rates and how to convert them. Click the Start button below to begin...";            
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
            mcOptions = this.convertRatesSingle();
        } else if (chooseQuestion === 2) {
            mcOptions = this.convertRatesDouble();
        } else if (chooseQuestion === 3) {
            mcOptions = this.rateChangeAppliations();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "rates and ratios ex01")};            
        }

        this.writeFormula();
        this.writeExample();

    }
    
    convertRatesSingle = () => {
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
        let b = numberWithCommas(n) + prefixes[pn1] + unit;        
        let questionText;
        if (getRandomNumber(1, 2, 0, 0) === 1) {
            // large : small
            questionText = "Convert " + b + " to " + prefixes[pn0] + unit;
            this.Ans = a;
            this.mc1 = numberWithCommas(n0 * 10 ** getRandomNumber(1, 2, 0, 1)) + prefixes[pn0] + unit;
            this.mc2 = numberWithCommas(n0 * 10 ** getRandomNumber(1, 2, 0, 1)) + prefixes[pn0] + unit;
            this.mc3 = numberWithCommas(n0 * 10 ** getRandomNumber(1, 2, 0, 1)) + prefixes[pn0] + unit;
        } else {
            questionText = "Convert " + a + " to " + prefixes[pn2] + unit;
            this.Ans = b;
            this.mc1 = numberWithCommas(n * 10 ** getRandomNumber(1, 2, 0, 1)) + prefixes[pn2] + unit;
            this.mc2 = numberWithCommas(n * 10 ** getRandomNumber(1, 2, 0, 1)) + prefixes[pn2] + unit;
            this.mc3 = numberWithCommas(n * 10 ** getRandomNumber(1, 2, 0, 1)) + prefixes[pn2] + unit;
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;

        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }    

    convertRatesDouble = () => {
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
        let questionText;
        if (getRandomNumber(1, 2, 0, 0) === 1) {      
            let m = a*c;
            if (numDecimals(m) > 5) {
                m = m.toFixed(2);
            }
            questionText = "Convert " + numberWithCommas(b) + x2 + "/" + y2 + " to " + x1 + "/" + y1;
            this.Ans = numberWithCommas(m) + x1 + "/" + y1;
            this.mc1 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x1 + "/" + y1;
            this.mc2 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x1 + "/" + y1;
            this.mc3 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x1 + "/" + y1;
        } else {
            let m = b*c;
            if (numDecimals(m) > 5) {
                m = m.toFixed(2);
            }
            questionText = "Convert " + numberWithCommas(a) + x1 + "/" + y1 + " to " + x2 + "/" + y2;
            this.Ans = numberWithCommas(m) + x2 + "/" + y2;
            this.mc1 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x2 + "/" + y2;
            this.mc2 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x2 + "/" + y2;
            this.mc3 = numberWithCommas(m * 10 ** getRandomNumber(1, 2, 0, 1)) + x2 + "/" + y2;
        }
    
        if (x1 === x2 && y1 === y2) {
            return this.convertRatesDouble();
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;

        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    rateChangeAppliations = () => {
        let type = getRandomNumber(1, 4, 0, 0);
        let questionText;
        let arr;
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
            this.Ans = "$" + (b * x / a).toFixed(2);
            this.mc1 = this.mc2 = this.mc3 = 1; // "$" + numberWithCommas((getRandomNumber(1, 5, 0, 1) + b * x / a).toFixed(2));
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
            this.Ans = (y * a / x).toFixed(2) + "m";
            this.mc1 = this.mc2 = this.mc3 = 1; // "$" + numberWithCommas((getRandomNumber(1, 5, 0, 1) + b * x / a).toFixed(2));
        } else if (type === 3) {
            let s = getRandomNumber(1, 100, 0, 0);
            let du = [" km", " m"][getRandomNumber(0, 1, 0, 0)];
            let tu = ["hr", "min", "sec"][getRandomNumber(0, 2, 0, 0)];
            let t = getRandomNumber(2, 10, 0, 0);
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                t = getRandomNumber(2, 10, 1, 0);
            }            
            questionText = "A rocket is moving at " + s + du + "/" + tu + ". How far will it go in " + t + tu + "?";
            this.Ans = (s * t).toFixed(2) + du;
            this.mc1 = this.mc2 = this.mc3 = 1; // "$" + numberWithCommas((getRandomNumber(1, 5, 0, 1) + b * x / a).toFixed(2));
        } else {
            let s = getRandomNumber(1, 100, 0, 0);
            let du = [" km", " m"][getRandomNumber(0, 1, 0, 0)];
            let tu = ["hr", "min", "sec"][getRandomNumber(0, 2, 0, 0)];
            let d = getRandomNumber(1, 200, 0, 0);
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                d = getRandomNumber(1, 200, 1, 0);
            }            
            questionText = "A rocket is moving at " + s + du + "/" + tu + ". How long until it gets " + d + du + "?";
            this.Ans = (d / s).toFixed(2) + tu;
            this.mc1 = this.mc2 = this.mc3 = 1; // "$" + numberWithCommas((getRandomNumber(1, 5, 0, 1) + b * x / a).toFixed(2));
            
        }
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;        
        arr = [this.Ans, this.mc1, this.mc2, this.mc3];
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

export default ex01_converting_rates;