import React from 'react';
import '../../../../App.css';
import '../../../../styling/sidebar.css';
import '../../../../styling/workspace.css';
import Sidebar from '../yr07sidebar';
import {getRandomNumber, printTest, shuffle, reset, answerType, checkAns} from '../../MathFunctions';
import Workspace from '../../../Workspace';

class y07_c01_ex01_addition extends React.Component {
    constructor(props) {
        super(props);
        this.x = 1;
        this.Ans = 1;
        this.mc1 = this.mc2 = this.mc3 = 1;
        this.userAns = 1;
        this.numCorrect = 0;
        this.numQuestions = 0;
        this.userScore = 1;        
    }    

    
    componentDidMount(){
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Algebra - addition";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on addition. Click the Start button below to begin...";            
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
            mcOptions = this.addition();
        } else if (chooseQuestion === 2) {
            mcOptions = this.subtraction();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }
        
        let correctAns = mcOptions[0];
        shuffle(mcOptions);
        for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {            
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML)};            
        }

        this.writeFormula();
        this.writeExample();

    }
    
    addition = () => {
        this.x = getRandomNumber(1, 10, 0, 0);
        this.y = getRandomNumber(1, 10, 0, 0);
        this.Ans = this.x + this.y;        
        this.mc1 = this.mc2 = this.mc3 = 1;
        
        let questionText = "What is " + this.x + " + " + this.y;
        document.getElementById("questionStringID").innerHTML = questionText;
        
        let arr = [this.Ans, this.mc1, this.mc2, this.mc3];        
        return arr;
    }

    subtraction = () => {
        this.x = getRandomNumber(1, 10, 0, 0);
        this.y = getRandomNumber(1, 10, 0, 0);
        this.Ans = this.x - this.y;        
        this.mc1 = this.mc2 = this.mc3 = 1;
        
        let questionText = "What is " + this.x + " - " + this.y;
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
                <Sidebar />
                <Workspace />
            </div>
            
        );
    }
}  

export default y07_c01_ex01_addition;
