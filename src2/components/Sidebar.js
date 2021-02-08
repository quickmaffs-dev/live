import React from 'react';
import '../styling/sidebar.css';
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
                        <button className="subnavbtn">Year 7</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to="/exercises/addition">addition </Link>
                            <Link className="subnavLink" to="/exercises/subtraction">subtraction </Link>
                            <a href="#careers">Chp 3 Surds</a>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">Year 8</button>
                        <div className="subnav-content">
                            <a href="#bring">Bring</a>
                            <a href="#deliver">Deliver</a>
                            <a href="#package">Package</a>
                            <a href="#express">Express</a>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">Year 9</button>
                        <div className="subnav-content">
                            <a href="#link1">Link 1</a>
                            <a href="#link2">Link 2</a>
                            <a href="#link3">Link 3</a>
                            <a href="#link4">Link 4</a>
                        </div>
                    </div>
                </div>            
            </div>
        );
    }
}  
export default Sidebar;
