import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns, numberWithCommas, numDecimals} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex03_scales extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on scales. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let mcOptions;
        
        if (chooseQuestion === 1) {
            mcOptions = this.simplifyScales();
        } else if (chooseQuestion === 2) {
            mcOptions = this.scaleApplications();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "rates and ratios ex03")};            
        }

        this.writeFormula();
        this.writeExample();

    }
    
    simplifyScales = () => {        
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
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;        
        this.Ans = "1 : " + numberWithCommas(Math.floor(n * scale));
        this.mc1 = "1 : " + numberWithCommas(n * scale * 10 ** getRandomNumber(1, 2, 0, 1));
        this.mc2 = "1 : " + numberWithCommas(n * scale * 10 ** getRandomNumber(1, 2, 0, 1));
        this.mc3 = "1 : " + numberWithCommas(n * scale * 10 ** getRandomNumber(1, 2, 0, 1));
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    scaleApplications = () => {
        let type = getRandomNumber(1, 2, 0, 0);
        let questionText = "";
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
    
            this.Ans = (x * n).toFixed(numDecimals(x) + numDecimals(n)) + prefixes[pn2];
            this.mc1 = (x * n + getRandomNumber(1, 5, 0, 1)).toFixed(numDecimals(x) + numDecimals(n)) + prefixes[pn2];
            this.mc2 = (x * n + getRandomNumber(1, 5, 0, 1)).toFixed(numDecimals(x) + numDecimals(n)) + prefixes[pn2];
            this.mc3 = (x * n + getRandomNumber(1, 5, 0, 1)).toFixed(numDecimals(x) + numDecimals(n)) + prefixes[pn2];            
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

            this.Ans = (n) + prefixes[pn0];
            this.mc1 = (n + getRandomNumber(1, 3, numDecimals(n), 1)).toFixed(numDecimals(n)) + prefixes[pn0];
            this.mc2 = (n + getRandomNumber(1, 3, numDecimals(n), 1)).toFixed(numDecimals(n)) + prefixes[pn0];
            this.mc3 = (n + getRandomNumber(1, 3, numDecimals(n), 1)).toFixed(numDecimals(n)) + prefixes[pn0];
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

            this.Ans = (ans) + prefixes[pn1 - 1];
            this.mc1 = (ans + getRandomNumber(1, 3, numDecimals(ans), 1)).toFixed(numDecimals(ans)) + prefixes[pn1 - 1];
            this.mc2 = (ans + getRandomNumber(1, 3, numDecimals(ans), 1)).toFixed(numDecimals(ans)) + prefixes[pn1 - 1];
            this.mc3 = (ans + getRandomNumber(1, 3, numDecimals(ans), 1)).toFixed(numDecimals(ans)) + prefixes[pn1 - 1];
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

export default ex03_scales;