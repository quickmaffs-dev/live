import React from 'react';
import '../../../styling/sidebar.css';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {    
    
    moveSidebar = () => {        
        if (document.querySelectorAll(".contents")[0].style.left !== "0px") {
            document.querySelectorAll(".contents")[0].style.left = "0px";
        } else {
            document.querySelectorAll(".contents")[0].style.left = "-200px";
        }    
    }
    render() {
        return (        
            <div className="sidenav">
                <button onClick={this.moveSidebar}>menu</button>
                <div className="contents">
                    <div className="subnav">
                        <button className="subnavbtn">Chp 1 Pythagoras</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to="/exercises/year11/chp03_loans/y11_ex01_future_value">Ex 3.01 Future Value</Link>
                        </div>
                    </div> 
                </div>            
            </div>
        );
    }
}  
export default Sidebar;
