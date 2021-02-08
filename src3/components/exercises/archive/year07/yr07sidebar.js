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
                        <button className="subnavbtn">Chp 1 Algebra</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to="/exercises/year07/chp01_algebra/y07_c01_ex01_addition">Ex 1.01 addition</Link>                                               
                            <Link className="subnavLink" to="/exercises/year07/chp01_algebra/y07_c01_ex02_multiplication">Ex 1.02 multiplication</Link>
                            <Link className="subnavLink" to="/exercises/year07/chp01_algebra/y07_c01_ex03_string_addition">Ex 1.03 addition 2.0</Link>
                        </div>
                    </div>                     
                </div>            
            </div>
        );
    }
}  
export default Sidebar;
