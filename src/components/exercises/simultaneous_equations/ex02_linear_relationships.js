import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns, numberWithCommas} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex02_linear_relationships extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Simultaneous Equations";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions regarding linear relationships. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //chooseQuestion = numQuestionTypes;
        let mcOptions;
        
        if (chooseQuestion === 1) {
            mcOptions = this.linearRelationships();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "simultaneous equations ex02")};            
        }

        this.writeFormula();
        this.writeExample();

    }

    linearRelationships = () => {
        // d = kt + b
        // if t = x, what is d?
        let type = getRandomNumber(1, 3, 0, 0);
        let questionText;
        let k = getRandomNumber(1, 20, 0, 0); // assume postive
        let b = getRandomNumber(1, 20, 0, 1);
        let x = getRandomNumber(1, 20, 0, 0); 
        let ans = k * x + b;
        if (type === 1) {
            if (ans < 0) {
                // cant get negative distance
                return this.linearRelationships();
            }
            questionText = "The distance a car travels in km every hour is given by the linear model <span>d</span> = " + k + "<span>t</span> + " + b;
            let unit;
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                questionText += ". How far has the car gone in " + x + "hrs?";
                unit = " km";
            } else {
                questionText += ". How long until the car has gone " + ans + " km?";
                unit = " hrs";
                let tmp = x;
                x = ans;
                ans = tmp;
                
            }
            this.Ans = ans + unit;
            this.mc1 = (ans + getRandomNumber(1, 5, 0, 1)) + unit;
            this.mc2 = (ans + getRandomNumber(1, 5, 0, 1)) + unit;
            this.mc3 = (ans + getRandomNumber(1, 5, 0, 1)) + unit;
        } else if (type === 2) {
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                k = 5 * getRandomNumber(1, 20, 0, 0) / 10;
            }
            b = 0;
            ans = k * x + b;
            if (ans < 0) {
                // cant get negative distance
                return this.linearRelationships();
            }
            questionText = "My phone plans charges $" + k.toFixed(2) + " per GB";
            let unit;
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                questionText += ". How much will I be charged for using " + x + " GB of data?";
                unit = "$";
            } else {
                questionText += ". How much data did I use if I was charged $" + ans.toFixed(2);
                unit = " GB";
                let tmp = x;
                x = ans;
                ans = tmp;
                
            }
            this.Ans = ans.toFixed(2) + unit;
            this.mc1 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(2) + unit;
            this.mc2 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(2) + unit;
            this.mc3 = (ans + getRandomNumber(1, 5, 0, 1)).toFixed(2) + unit;
        } else {
            k *= 100;
            b *= 100;
            x = getRandomNumber(10, 100, 0, 0);
            ans = k * x + b;
            if (ans < 0) {
                // cant get negative distance
                return this.linearRelationships();
            }
            questionText = "The speed of a rocket in km/hr is given by <span>v</span> = " + numberWithCommas(k) + "<span>t</span> + " + b;
            let unit, m;
            if (getRandomNumber(1, 2, 0, 0) === 1) {
                questionText += ". What is the rocket's speed after " + numberWithCommas(x) + "hrs?";
                unit = " km/hr";
                m = 100;
            } else {
                questionText += ". How long until the rocket's speed is " + numberWithCommas(ans) + " km/hr?";
                unit = " hrs";
                let tmp = x;
                x = ans;
                ans = tmp;
                m = 1;
            }
            this.Ans = numberWithCommas(ans) + unit;
            this.mc1 = numberWithCommas((ans + m * getRandomNumber(1, 5, 0, 1))) + unit;
            this.mc2 = numberWithCommas((ans + m * getRandomNumber(1, 5, 0, 1))) + unit;
            this.mc3 = numberWithCommas((ans + m * getRandomNumber(1, 5, 0, 1))) + unit;
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

export default ex02_linear_relationships;