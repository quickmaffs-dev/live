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
                        <button className="subnavbtn">Chp 1 Rates and Ratios</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to="/exercises/year12std/chp01_rates_and_ratios/y12std_c01_ex01_converting_rates">Ex 1.01 Converting rates</Link>
                            <Link className="subnavLink" to="/exercises/year12std/chp01_rates_and_ratios/y12std_c01_ex02_ratios">Ex 1.02 Working with ratios</Link>
                            <Link className="subnavLink" to="/exercises/year12std/chp01_rates_and_ratios/y12std_c01_ex03_scales">Ex 1.03 Working with scales</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">Chp 3 Investments and Loans</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to="/exercises/year12std/chp03_investments_and_loans/y12std_c03_ex01_compound_interest">Ex 3.01 Compound Interest</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">Chp 4 Trigonometry</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to="/exercises/year12std/chp04_trigonometry/y12std_c04_ex01_soh_cah_toa">Ex 4.01 SOH CAH TOA</Link>
                        </div>
                    </div> 
                </div>            
            </div>
        );
    }
}  
export default Sidebar;
