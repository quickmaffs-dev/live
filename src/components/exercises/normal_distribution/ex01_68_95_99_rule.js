import React from 'react';
import {getRandomNumber, printTest, reset, answerType, shuffle, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';

class ex01_68_95_88_rule extends React.Component {
    constructor(props) {
        super(props);
        this.x = 1;
        this.Ans = 1;
        this.mc1 = this.mc2 = this.mc3 = 1;
        this.userAns = 1;
        this.numCorrect = 0;
        this.numQuestions = 0;
        this.userScore = 1;
        this.x_line = 1;    
        this.y_line = 1;
        this.question_string = "";
    }
    
    componentDidMount(){
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Normal distribution";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding the normal distribution. Click the Start button below to begin...";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(1); // multiplechoice === 1
        
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let mcOptions;
        if (chooseQuestion === 1) {
            mcOptions = this.rangeScores();
        } else if (chooseQuestion === 2) {
            mcOptions = this.percentScores();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "normal distribution ex01")};
        }
        this.writeFormula();
        this.writeExample();
    }

    rangeScores = () => {
        let mean = getRandomNumber(1, 100, 1, 0);
        let stdev = getRandomNumber(1, 10, 1, 0);
        let rule = [68, 95, 99.7];
        let type = getRandomNumber(1, 3, 0, 0);
        let questionText = "A normal distribution has mean " + mean + " and standard deviation " + stdev + ". What range would you expect to find " + rule[type-1] + "% of the scores";
        this.Ans = (mean - type * stdev).toFixed(1) + " and " + (mean + type * stdev).toFixed(1);
        this.mc1 = (mean - type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1) + " and " + (mean + type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1);
        this.mc2 = (mean - type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1) + " and " + (mean + type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1);
        this.mc3 = (mean - type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1) + " and " + (mean + type * stdev + getRandomNumber(1, 6, 1, 1)).toFixed(1);
        this.question_string = questionText;
        document.getElementById("questionStringID").innerHTML = questionText;
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];
        return arr;
    }

    percentScores = () => {
        let mean = getRandomNumber(1, 100, 1, 0);
        let stdev = getRandomNumber(1, 10, 1, 0);
        let rule = [68, 95, 99.7];
        let type = getRandomNumber(1, 3, 0, 0);
        let range = (mean - type * stdev).toFixed(1) + " and " + (mean + type * stdev).toFixed(1);
        let questionText = "A normal distribution has mean " + mean + " and standard deviation " + stdev + ". What percent of scores do you expect to find within the range " + range;
        this.Ans = rule[type - 1] + "%";
        this.mc1 = rule[(type - 1 + 1) % 3] + "%";
        this.mc2 = rule[(type - 1 + 2) % 3] + "%";
        this.mc3 = "50%";
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

export default ex01_68_95_88_rule;