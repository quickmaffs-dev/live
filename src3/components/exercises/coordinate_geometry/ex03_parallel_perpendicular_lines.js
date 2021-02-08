import React from 'react';
import {getRandomNumber, printTest, reset, answerType, shuffle, checkAns } from '../MathFunctions';
import Workspace from '../../Workspace';
import {parallelLines, parallelLinesFrac, perpendicularLines, perpendicularLinesFrac} from './coordinate_geometry_exercises';

class ex03_parallel_perpendicular_lines extends React.Component {
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
        document.querySelectorAll(".topicHeading")[0].innerHTML = "Coordinate Geometry";
        document.querySelectorAll(".topicSubHeading")[0].innerHTML = "This will ask quesitons regarding coordinate geometry. Click the Start button below to begin...";
        document.getElementById("startSessionBtnID").onclick = () => {this.makeQuestion()}; //this.makeQuestion
        document.getElementById("nextQuesBtnID").onclick = () => {this.makeQuestion()};
    }
    
    makeQuestion = () => { 
        document.getElementById("startSessionBtnID").style.display = "none";
        reset();       
        answerType(1); // multiplechoice === 1
        
        this.numQuestions += 1;
        let numQuestionTypes = 4;
        let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
        let correctAns, result;
        if (chooseQuestion === 1) {
            result = parallelLines();
        } else if (chooseQuestion === 2) {
            result = parallelLinesFrac();
        } else if (chooseQuestion === 3) {
            result = perpendicularLines();
        } else if (chooseQuestion === 4) {
            result = perpendicularLinesFrac();
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
            document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, this.question_string, "coordinate geometry ex03")};
        }
        this.writeFormula();
        this.writeExample();
    }
    
    writeFormula = () => {
        document.getElementById("formulaTextID").innerHTML = `
        parallel lines have the same gradient.
        <br><span>m<sub>1</sub> = m<sub>2</sub></span>
        
        <br><br> perpendicular lines have negative inverse gradients
        <br><span>m<sub>1</sub> = -1/m<sub>2</sub></span>

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

export default ex03_parallel_perpendicular_lines;