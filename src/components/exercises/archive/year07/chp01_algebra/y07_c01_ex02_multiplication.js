import React from 'react';
import '../../../../App.css';
import '../../../../styling/sidebar.css';
import '../../../../styling/workspace.css';
import Sidebar from '../yr07sidebar';
import {getRandomNumber, printTest, reset, answerType, checkAns} from '../../MathFunctions';
import Workspace from '../../../Workspace';

class y07_c01_ex02_multiplication extends React.Component {
    constructor(props) {
        super(props);
        this.test = 1;        
    }  

    componentDidMount() {
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Algebra - multiplcation";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on addition. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();       
        answerType(2); // truefalse == 2 // each exercise (ex01, ex02...) should be of same answer type so that user doesnt switch from mc to input etc
        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        
        let result;
        
        if (chooseQuestion === 1) {
            result = this.mutliplication();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }        
        
        let correctAns = result;
        for (let i = 0; i < document.querySelectorAll(".trueFalseBtn").length; i++) {            
            document.querySelectorAll(".trueFalseBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".trueFalseBtn")[i].innerHTML)};            
        }

        this.writeFormula();
        this.writeExample();

    }
    
    mutliplication = () => {
        let x = getRandomNumber(1, 10, 0, 0);
        let y = getRandomNumber(1, 10, 0, 0);
        
        let ans = x * y;
        
        let correctAns;
        let option = + getRandomNumber(0, 1, 0, 0);

        if (option === 0) {
            correctAns = "True";
        } else {
            correctAns = "False";
            ans = x * y + getRandomNumber(1, 2, 0, 1);
        }
        
        let questionText = "Is " + x + " &#215; " + y + " = " + ans;
        document.getElementById("questionStringID").innerHTML = questionText;        
        
        return correctAns;
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

export default y07_c01_ex02_multiplication;
