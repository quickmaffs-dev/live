import React from 'react';
import '../App.css';
import SidebarRight from './SidebarRight';
import '../styling/workspace.css';
import '../styling/workspaceHSC.css';


class WorkspaceHsc extends React.Component {
  render() {
    return (
      <div>
          <div id="sideBarRightID" style={{display: "none"}}><SidebarRight /></div>
          <div id="root"></div>
          <div className="workspaceHsc">
              <h1 className="topicHeading">h</h1>
              <h3 className="topicSubHeading">subheading</h3>
              <button id="startSessionBtnID">Start</button>            
              <div className="questionBody">
                  <p id="scoreID">Score: 0 pts</p>
                  <br /><br />
                  <p id="questionStringID"></p>
                  <p id="secretsID" style={{color: "red", display:"none"}}></p>
                  <p style={{display: "none", position: "relative"}} id="questionDiagramID"></p>
                  <img style={{display: "none"}} id="questionImgID" src ="" alt=""></img>
                  <canvas id="canvasID" width="500" height="500" style={{display: "none", border:"1px solid #d3d3d3"}}></canvas>                  
                  <div id="answerType01" style={{display: "none"}}>
                      <button id="mcBtn1ID" className="mcAnsBtn">x</button>
                      <button id="mcBtn2ID" className="mcAnsBtn">x</button>
                      <button id="mcBtn3ID" className="mcAnsBtn">x</button>
                      <button id="mcBtn4ID" className="mcAnsBtn">x</button>
                  </div>
                  <div id="answerType02" style={{display: "none"}}>
                      <button id="trueBtnID" className="trueFalseBtn">True</button>
                      <button id="falseBtnID" className="trueFalseBtn">False</button>
                  </div>
                  <div id="answerType03" style={{display: "none"}}>
                      <input id="userInputStringID" autoComplete="off" placeholder="enter answer here..."></input>
                      <button id="userInputBtnID" className="submitUserAnsBtn">Submit</button>
                  </div>
                  <div id="answerType04" style={{display: "none"}}>
                      <br />
                      <button id="showAnsBtn" className="submitUserAnsBtn">Reveal Answer</button>
                      <p id="correctWork"></p>
                      <button id="showCorrectWorkBtn" className="submitUserAnsBtn" style={{display:"none"}}>Show working</button>
                  </div>
                  <div className="resultInfo">
                      <button id="nextQuesBtnID" style={{display: "none"}}>Next</button>
                      <p id="resultStringID"></p>
                  </div>
                  
              </div>            
              <p id="testID"></p>
          </div>        
      </div>      
    );
  }
}

export default WorkspaceHsc;