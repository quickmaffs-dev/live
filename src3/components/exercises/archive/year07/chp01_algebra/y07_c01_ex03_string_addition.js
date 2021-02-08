import React from 'react';
import '../../../../App.css';
import '../../../../styling/sidebar.css';
import '../../../../styling/workspace.css';
import Sidebar from '../yr07sidebar';
import {getRandomNumber, printTest, reset, answerType, checkAns} from '../../MathFunctions';
import Workspace from '../../../Workspace';

class y07_c01_ex03_string_addition extends React.Component {
    constructor(props) {
        super(props);
        this.numQuestions = 0;
    }  

    componentDidMount() {
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Algebra - addition 2";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask questions on addition. Click the Start button below to begin...";            
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()};
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        reset();
        answerType(3);

        this.numQuestions += 1;
        let numQuestionTypes = 1;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        
        let result;
        
        if (chooseQuestion === 1) {
            result = this.additionString();
        } else {
            printTest("ERROR : chooseQuestion() = " + chooseQuestion);
        }        
        
        let correctAns = result;        
        document.getElementById("userInputBtnID").onclick = () => {checkAns(correctAns, document.getElementById("userInputStringID").value)};

        this.writeFormula();
        this.writeExample();

    }
    
    additionString = () => {
        let x = getRandomNumber(1, 10, 0, 0);
        let y = getRandomNumber(1, 10, 0, 0);
        
        let ans = x + y;
        
        let questionText = "What is " + x + " + " + y;
        document.getElementById("questionStringID").innerHTML = questionText;        
        
        return ans;
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

export default y07_c01_ex03_string_addition;
