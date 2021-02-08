import React from 'react';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../MathFunctions';
import Workspace from '../../Workspace';
import {getTaxableIncome, calculateTax} from './earning_money_exercises';

class ex04_income_tax extends React.Component {
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
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on income tax. Click the Start button below to begin...";            
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
        if (chooseQuestion === 1) {
            result = getTaxableIncome();
        } else if (chooseQuestion === 2) {
            result = calculateTax();
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
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "earning money ex04")};            
        }

        this.writeFormula();
        this.writeExample();

    }
    
    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
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
    }

    writeExample = () => {
        document.getElementById("exampleTextID").innerHTML = `
        If Andrew makes 5% commission on selling a $23,000 car, he earns $23,000 &#215; 5% = $1150
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

export default ex04_income_tax;