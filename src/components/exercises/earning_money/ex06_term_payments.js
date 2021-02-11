import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';
import {deferredPaymentPlan, termPaymentsPackage} from './earning_money_exercises';

class ex06_term_payments extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Earning Money";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on term payments. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(1); // multiple choice == 1 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        
        this.numQuestions += 1;
        let numQuestionTypes = 2;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns, result; 
        chooseQuestion = numQuestionTypes;
        if (chooseQuestion === 1) {
            result = termPaymentsPackage();
        } else if (chooseQuestion === 2) {
            result = deferredPaymentPlan();
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
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "earning money ex06")};
        }

        this.writeFormula();
        this.writeExample();

    }
    
    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
        Net pay = gross pay - tax - other deductions
        `;
    }

    writeExample = () => {
        document.getElementById("exampleTextID").innerHTML = `
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

export default ex06_term_payments;