import React from 'react';
import '../styling/sidebar.css';

class SidebarRight extends React.Component {    
    openSheet = (x, y) => {     
        if (document.querySelectorAll(".SidebarRightContent")[y].style.display === "block") {
            document.querySelectorAll(".SidebarRightContent")[y].style.display = "none";
            document.querySelectorAll(".SideBarRightBtn")[x].style.backgroundColor = "#00B6FF";
            let s = document.getElementById("exampleVidID").src;
            document.getElementById("exampleVidID").src = s;
        } else {
            document.querySelectorAll(".SidebarRightContent")[y].style.display = "block";
            document.querySelectorAll(".SidebarRightContent")[x].style.display = "none";
            document.querySelectorAll(".SideBarRightBtn")[x].style.backgroundColor = "#111";            
        }
        document.querySelectorAll(".SideBarRightBtn")[y].style.backgroundColor = "#00B6FF";  
    }
    render() {
        return (                    
            <div className="SidebarRight">
                <div className="SidebarRightBtns">
                    <button className="SideBarRightBtn" onClick={this.openSheet.bind(this, 0, 1)}>Example</button>                    
                    <button className="SideBarRightBtn" onClick={this.openSheet.bind(this, 1, 0)}>Formulas</button>
                </div>
                <div className="SidebarRightContent">
                    <button onClick={this.openSheet.bind(this, 1, 0)}>X</button>
                    <h3>Formulas</h3>
                    <p id="formulaTextID">test</p>
                </div>
                <div className="SidebarRightContent">
                    <button onClick={this.openSheet.bind(this, 0, 1)}>X</button>
                    <h3>Example</h3>
                    <p id="exampleTextID">test</p>
                    <iframe allowFullScreen="0" id="exampleVidID" style={{display: "none", padding:0}} width="420" height="315" title="exampleVideo">
                    </iframe>
                </div>
            </div>
        );
    }
}  
export default SidebarRight;
