import React from 'react';
import '../App.css';
import SidebarRight from './SidebarRight';
//import SidebarNew from './SidebarNew';
import WorkspaceQuestion from './WorkspaceQuestion';
import '../styling/workspace.css';


class Workspace extends React.Component {
  render() {
    return (
      <div>
          {/*<div style={{display: "none"}}><SidebarNew /></div>*/}
          <div style={{display: "none"}}><SidebarRight /></div>
          <div id="root"></div>
          <div className="workspace">
              <h1 className="topicHeading">h</h1>
              <h3 className="topicSubHeading">subheading</h3>
              <button id="startSessionBtnID">Start</button>            
              <WorkspaceQuestion />
              <p id="testID"></p>
          </div>        
      </div>      
    );
  }
}

export default Workspace;