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
                            <Link className="subnavLink" to="/exercises/year09/chp01_pythagoras/y09_c01_ex01_squares">Ex 1.01 Squares and square roots</Link>
                            <Link className="subnavLink" to="/exercises/year09/chp01_pythagoras/y09_c01_ex02_triangles">Ex 1.02 Naming triangles </Link>
                            <Link className="subnavLink" to="/exercises/year09/chp01_pythagoras/y09_c01_ex03_trig">Ex 1.03 Trigonometry </Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">Chp 2 Area</button>
                        <div className="subnav-content">
                            <a href="#bring">Bring</a>
                            <a href="#deliver">Deliver</a>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">Chp 3 Algebra</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to="/exercises/year09/chp03_algebra/y09_c03_ex01_addition">Ex 3.01 Pronumeral Addition </Link>
                            <Link className="subnavLink" to="/exercises/year09/chp03_algebra/y09_c03_ex02_order_of_operations">Ex 3.02 order of operations </Link>
                        </div>
                    </div> 
                    
                </div>            
            </div>
        );
    }
}  
export default Sidebar;
