import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';
import {compoundInterest, compoundInterestPeriod, inflation, shares, dividend, brokerageFees, depreciation, loans, creditCardInterest, bankFees} from './investments_and_loans_exercises';

class ex01_compound_interest extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Investments and Loans";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on compound interest. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 10;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        //chooseQuestion = numQuestionTypes;
        let correctAns, result;        
        if (chooseQuestion === 1) {
            result = compoundInterest();
        } else if (chooseQuestion === 2) {
            result = compoundInterestPeriod();
        } else if (chooseQuestion === 3) {
            result = inflation();
        } else if (chooseQuestion === 4) {
            result = shares();
        } else if (chooseQuestion === 5) {
            result = dividend();
        } else if (chooseQuestion === 6) {
            result = brokerageFees();
        } else if (chooseQuestion === 7) {
            result = depreciation();
        } else if (chooseQuestion === 8) {
            result = loans();
        } else if (chooseQuestion === 9) {
            result = creditCardInterest();
        } else if (chooseQuestion === 10) {
            result = bankFees();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        this.question_string = result[0];
		document.getElementById("questionStringID").innerHTML = result[0];
		correctAns = result[1];
		let mcOptions = result.slice(1, result.length);        
		correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "investments and loans ex01")};            
        }

        this.writeFormula();
        this.writeExample();

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

export default ex01_compound_interest;