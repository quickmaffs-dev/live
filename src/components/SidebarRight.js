import React from 'react';
import '../styling/sidebar.css';

class SidebarRight extends React.Component {    
    openSheet = (x, y) => {     
        if (document.querySelectorAll(".SidebarRightContent")[y].style.display === "block") {
            document.querySelectorAll(".SidebarRightContent")[y].style.display = "none";
            document.querySelectorAll(".SideBarRightBtn")[x].style.backgroundColor = "#00B6FF";
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
                </div>
            </div>
        );
    }
}  
export default SidebarRight;
