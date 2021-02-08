import React from 'react';
import { Redirect } from "react-router-dom";
import '../styling/sidebar.css';
import { Link } from 'react-router-dom';

class SidebarNew extends React.Component {    
    constructor(props) {
        super(props);
        this.year = 1;
        this.redirect = 1;
        this.chp01 = 1;
        this.chp01ex01 = 1;
        this.chp01ex01Link = 1;
        this.fillSideBar();
        this.changeBackgroundColour();
    }

    changeBackgroundColour = (hex) => {
        let navbar = document.querySelectorAll(".contents");
        if (navbar.length > 0) {
            if (typeof navbar[0] !== 'undefined') {
                navbar[0].style.backgroundColor = hex;
                document.getElementById("sideBarBtnID").style.backgroundColor = hex;
            }
        }
    }

    fillSideBar = ()  => {
        let url = window.location.search;
        let urlSplit = url.split("%");
        let yr = "";
        if (urlSplit[1] !== undefined) {
            yr = urlSplit[1];
        }

        // disable links
        let link = document.querySelectorAll(".subnavLink");
        for (let i = 0; i < link.length; i++) {
            if (typeof link[i] !== 'undefined') {
                if (link[i].innerHTML === "") {
                    document.querySelectorAll(".subnavLink")[i].style.display = "none"; // else display = "block"
                }
            }
        }
        let btn = document.querySelectorAll(".subnavbtn");
        for (let i = 0; i < btn.length; i++) {
            if (typeof btn[i] !== 'undefined') {
                if (btn[i].innerHTML === "") {
                    document.querySelectorAll(".subnavbtn")[i].style.display = "none"; // else display = "block"
                }
            }
        }
        
        this.year = yr;
        if (this.year === "7") {
            this.changeBackgroundColour("#006D99");
            this.chp01 = "Algebra";
            
            this.chp01ex01 = "Ex 01 Addition and Subtraction";
            this.chp01ex01Link = "/exercises/algebra/ex01_addition_and_subtraction?yr=%" + yr + "%";
            this.chp01ex02 = "Ex 02 Multiplication";
            this.chp01ex02Link = "/exercises/algebra/ex02_multiplication?yr=%" + yr + "%";
            this.chp01ex03 = "Ex 03 BIDMAS";
            this.chp01ex03Link = "/exercises/algebra/ex03_BIDMAS?yr=%" + yr + "%";
        } else if (this.year === "9") {    
            this.changeBackgroundColour("#009941");
            this.chp01 = "Working with numbers";
            
            this.chp01ex01 = "Ex 01 BIDMAS";
            this.chp01ex01Link = "/exercises/algebra/ex03_bidmas?yr=%" + yr + "%";
            this.chp01ex02 = "Ex 02 Fractions";
            this.chp01ex02Link = "/exercises/algebra/ex05_fractions?yr=%" + yr + "%";
            this.chp01ex03 = "Ex 03 Decimals";
            this.chp01ex03Link = "/exercises/algebra/ex06_decimals?yr=%" + yr + "%";
            this.chp01ex04 = "Ex 04 Converting fractions and decimals";
            this.chp01ex04Link = "/exercises/algebra/ex07_converting_fractions_decimals?yr=%" + yr + "%";
            
            this.chp08 = "Earning Money";
            
            this.chp08ex01 = "Ex 01 Wages & Salaries";
            this.chp08ex01Link = "/exercises/earning_money/ex01_wages_and_salaries?yr=%" + yr + "%";
            this.chp08ex02 = "Ex 02 Overtime";
            this.chp08ex02Link = "/exercises/earning_money/ex02_overtime?yr=%" + yr + "%";
            this.chp08ex03 = "Ex 03 Commision, Piecework and Leave Loading";
            this.chp08ex03Link = "/exercises/earning_money/ex03_commission_piecework_and_leave_loading?yr=%" + yr + "%";
            this.chp08ex04 = "Ex 04 Income Tax";
            this.chp08ex04Link = "/exercises/earning_money/ex04_income_tax?yr=%" + yr + "%";
            this.chp08ex05 = "Ex 05 PAYG Tax";
            this.chp08ex05Link = "/exercises/earning_money/ex05_payg_tax?yr=%" + yr + "%";

            this.chp09 = "Investigating Data";
            
            this.chp09ex01 = "Ex 01 Averages and Range";
            this.chp09ex01Link = "/exercises/investigating_data/ex01_averages_and_range?yr=%" + yr + "%";
            
            this.chp10 = "Surface Area and Volume";
            
            this.chp10ex01 = "Ex 01 Converting Units";
            this.chp10ex01Link = "/exercises/rates_and_ratios/ex01_converting_rates?yr=%" + yr + "%";
            this.chp10ex02 = "Ex 02 Perimeter";
            this.chp10ex02Link = "/exercises/area_perimeter_and_volume/ex02_perimeter?yr=%" + yr + "%";
            this.chp10ex03 = "Ex 03 Area";
            this.chp10ex03Link = "/exercises/area_perimeter_and_volume/ex03_area?yr=%" + yr + "%";

            this.chp11 = "Coordinate Geometry";
            
            this.chp11ex01 = "Ex 01 Distance, midpoints and gradients";
            this.chp11ex01Link = "/exercises/coordinate_geometry/ex01_intervals?yr=%" + yr + "%";
        } else if (this.year === "10") {    
            this.changeBackgroundColour("#FFB22C");
            this.chp01 = "Coordinate Geometry";
            
            this.chp01ex01 = "Ex 01 Intervals";
            this.chp01ex01Link = "/exercises/coordinate_geometry/ex01_intervals?yr=%" + yr + "%";
            this.chp01ex02 = "Ex 02 Inclination Angle";
            this.chp01ex02Link = "/exercises/coordinate_geometry/ex02_inclination_angle?yr=%" + yr + "%";
            this.chp01ex03 = "Ex 03 Parallel and Perpendicular Lines";
            this.chp01ex03Link = "/exercises/coordinate_geometry/ex03_parallel_perpendicular_lines?yr=%" + yr + "%";
            this.chp01ex04 = "Ex 04 Identify graphs";
            this.chp01ex04Link = "/exercises/simultaneous_equations/ex01_identify_graphs?yr=%" + yr + "%";

            this.chp02 = "Probability";
            
            this.chp02ex01 = "Ex 01 Experimental Probability";
            this.chp02ex01Link = "/exercises/probability/ex01_experimental_probability?yr=%" + yr + "%";
            this.chp02ex02 = "Ex 02 Venn Diagrams";
            this.chp02ex02Link = "/exercises/probability/ex02_venn_diagrams?yr=%" + yr + "%";

            this.chp03 = "Circle Geometry";
            
            this.chp03ex01 = "Ex 01 Parts of a circle";
            this.chp03ex01Link = "/exercises/circle_geometry/ex01_parts_of_circle?yr=%" + yr + "%";
            this.chp03ex02 = "Ex 02 Angle Properties";
            this.chp03ex02Link = "/exercises/circle_geometry/ex02_angle_properties?yr=%" + yr + "%";
            
        } else if (this.year === "11") {    
            this.changeBackgroundColour("#2F0185");
            this.chp01 = "Algebra";
            
            this.chp01ex01 = "Ex 01 Pronumerals";
            this.chp01ex01Link = "/exercises/algebra/ex04_pronumerals?yr=%" + yr + "%";

            this.chp08 = "Exponentials and Logarithms";
            
            this.chp08ex01 = "Ex 01 Evaluate exponentials";
            this.chp08ex01Link = "/exercises/exponentials_and_logarithms/ex01_evaluate_exponentials?yr=%" + yr + "%";
            this.chp08ex02 = "Ex 02 Negative indices";
            this.chp08ex02Link = "/exercises/exponentials_and_logarithms/ex02_indices?yr=%" + yr + "%";
            this.chp08ex03 = "Ex 03 Logarithms";
            this.chp08ex03Link = "/exercises/exponentials_and_logarithms/ex03_logarithms?yr=%" + yr + "%";
        } else if (this.year === "12") {
            this.changeBackgroundColour("#990000");
            this.chp01 = "Rates and Ratios";
            
            this.chp01ex01 = "Ex 01 Converting rates";
            this.chp01ex01Link = "/exercises/rates_and_ratios/ex01_converting_rates?yr=%" + yr + "%";
            this.chp01ex02 = "Ex 02 Working with ratios";
            this.chp01ex02Link = "/exercises/rates_and_ratios/ex02_ratios?yr=%" + yr + "%";
            this.chp01ex03 = "Ex 03 Working with scales";
            this.chp01ex03Link = "/exercises/rates_and_ratios/ex03_scales?yr=%" + yr + "%";
            
            this.chp03 = "Investments and Loans";
            
            this.chp03ex01 = "Ex 01 Compound Interest";
            this.chp03ex01Link = "/exercises/investments_and_loans/ex01_compound_interest?yr=%" + yr + "%";

            this.chp04 = "Trigonometry";
            
            this.chp04ex01 = "Ex 01 SOH CAH TOA";
            this.chp04ex01Link = "/exercises/trigonometry/ex01_soh_cah_toa?yr=%" + yr + "%";
            this.chp04ex02 = "Ex 02 Elevation and Depression";
            this.chp04ex02Link = "/exercises/trigonometry/ex02_elevation_and_depression?yr=%" + yr + "%";
            this.chp04ex03 = "Ex 03 Bearings";
            this.chp04ex03Link = "/exercises/trigonometry/ex03_bearings?yr=%" + yr + "%";
            this.chp04ex04 = "Ex 04 Sine Rule";
            this.chp04ex04Link = "/exercises/trigonometry/ex04_sine_rule?yr=%" + yr + "%";
            this.chp04ex05 = "Ex 05 Cosine Rule";
            this.chp04ex05Link = "/exercises/trigonometry/ex05_cosine_rule?yr=%" + yr + "%";
            this.chp04ex06 = "Ex 06 Solve Ratios";
            this.chp04ex06Link = "/exercises/trigonometry/ex06_solve_ratios?yr=%" + yr + "%";

            this.chp05 = "Simultaneous equations";
            
            this.chp05ex01 = "Ex 01 Identify Graphs";
            this.chp05ex01Link = "/exercises/simultaneous_equations/ex01_identify_graphs?yr=%" + yr + "%";
            this.chp05ex02 = "Ex 02 Linear Relationships";
            this.chp05ex02Link = "/exercises/simultaneous_equations/ex02_linear_relationships?yr=%" + yr + "%";
            this.chp05ex03 = "Ex 03 Points of Intersection";
            this.chp05ex03Link = "/exercises/simultaneous_equations/ex03_points_of_intersection?yr=%" + yr + "%";

            this.chp06 = "Data Analysis";
            
            this.chp06ex01 = "Ex 01 Scatterplots";
            this.chp06ex01Link = "/exercises/data_analysis/ex01_scatterplots?yr=%" + yr + "%";
            this.chp06ex02 = "Ex 02 Linear Association";
            this.chp06ex02Link = "/exercises/data_analysis/ex02_linear_association?yr=%" + yr + "%";

            this.chp07 = "Annuities";
            
            this.chp07ex01 = "Ex 01 Modelling Annuities";
            this.chp07ex01Link = "/exercises/annuities/ex01_modelling_annuities?yr=%" + yr + "%";
            this.chp07ex02 = "Ex 02 Future Value Tables";
            this.chp07ex02Link = "/exercises/annuities/ex02_future_value_table?yr=%" + yr + "%";

            this.chp09 = "Normal Distribution";
            
            this.chp09ex01 = "Ex 01 68, 95, 99.7 rule";
            this.chp09ex01Link = "/exercises/normal_distribution/ex01_68_95_99_rule?yr=%" + yr + "%";
            this.chp09ex02 = "Ex 02 zScores";
            this.chp09ex02Link = "/exercises/normal_distribution/ex02_zscores?yr=%" + yr + "%";
            this.chp09ex03 = "Ex 03 Average and Standard Deviation";
            this.chp09ex03Link = "/exercises/normal_distribution/ex03_average_and_standard_deviation?yr=%" + yr + "%";
        } else {
            if (this.year !== "hsc") {
                this.redirect = "/error";
            }
        }
    }

    moveSidebar = () => {  
        this.fillSideBar();      
        if (document.querySelectorAll(".contents")[0].style.left !== "0px") {
            document.querySelectorAll(".contents")[0].style.left = "0px";
            document.getElementById("sideBarBtnID").innerHTML = "<";
        } else {
            document.querySelectorAll(".contents")[0].style.left = "-200px";
            document.getElementById("sideBarBtnID").innerHTML = ">";
            this.changeBackgroundColour("#111");
        }    
    }
    //<Link className="subnavLink" to={{pathname: this.chp01ex01Link, state:this.state}}>{this.chp01ex01}</Link>
    render() {
        if (this.redirect !== 1) {
            return <Redirect to={this.redirect} />
        }
        return (        
            <div className="sidenav">
                <button id="sideBarBtnID" onClick={this.moveSidebar}>{">"}</button>
                <div className="contents">
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp01}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp01ex01Link}`}>{this.chp01ex01}</Link>
                            <Link className="subnavLink" to={`${this.chp01ex02Link}`}>{this.chp01ex02}</Link>
                            <Link className="subnavLink" to={`${this.chp01ex03Link}`}>{this.chp01ex03}</Link>
                            <Link className="subnavLink" to={`${this.chp01ex04Link}`}>{this.chp01ex04}</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp02}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp02ex01Link}`}>{this.chp02ex01}</Link>
                            <Link className="subnavLink" to={`${this.chp02ex02Link}`}>{this.chp02ex02}</Link>
                            <Link className="subnavLink" to={`${this.chp02ex03Link}`}>{this.chp02ex03}</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp03}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp03ex01Link}`}>{this.chp03ex01}</Link>
                            <Link className="subnavLink" to={`${this.chp03ex02Link}`}>{this.chp03ex02}</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp04}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp04ex01Link}`}>{this.chp04ex01}</Link>
                            <Link className="subnavLink" to={`${this.chp04ex02Link}`}>{this.chp04ex02}</Link>
                            <Link className="subnavLink" to={`${this.chp04ex03Link}`}>{this.chp04ex03}</Link>
                            <Link className="subnavLink" to={`${this.chp04ex04Link}`}>{this.chp04ex04}</Link>
                            <Link className="subnavLink" to={`${this.chp04ex05Link}`}>{this.chp04ex05}</Link>
                            <Link className="subnavLink" to={`${this.chp04ex06Link}`}>{this.chp04ex06}</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp05}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp05ex01Link}`}>{this.chp05ex01}</Link>
                            <Link className="subnavLink" to={`${this.chp05ex02Link}`}>{this.chp05ex02}</Link>
                            <Link className="subnavLink" to={`${this.chp05ex03Link}`}>{this.chp05ex03}</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp06}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp06ex01Link}`}>{this.chp06ex01}</Link>
                            <Link className="subnavLink" to={`${this.chp06ex02Link}`}>{this.chp06ex02}</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp07}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp07ex01Link}`}>{this.chp07ex01}</Link>
                            <Link className="subnavLink" to={`${this.chp07ex02Link}`}>{this.chp07ex02}</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp08}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp08ex01Link}`}>{this.chp08ex01}</Link>
                            <Link className="subnavLink" to={`${this.chp08ex02Link}`}>{this.chp08ex02}</Link>
                            <Link className="subnavLink" to={`${this.chp08ex03Link}`}>{this.chp08ex03}</Link>
                            <Link className="subnavLink" to={`${this.chp08ex04Link}`}>{this.chp08ex04}</Link>
                            <Link className="subnavLink" to={`${this.chp08ex05Link}`}>{this.chp08ex05}</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp09}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp09ex01Link}`}>{this.chp09ex01}</Link>
                            <Link className="subnavLink" to={`${this.chp09ex02Link}`}>{this.chp09ex02}</Link>
                            <Link className="subnavLink" to={`${this.chp09ex03Link}`}>{this.chp09ex03}</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp10}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp10ex01Link}`}>{this.chp10ex01}</Link>
                            <Link className="subnavLink" to={`${this.chp10ex02Link}`}>{this.chp10ex02}</Link>
                        </div>
                    </div> 
                    <div className="subnav">
                        <button className="subnavbtn">{this.chp11}</button>
                        <div className="subnav-content">
                            <Link className="subnavLink" to={`${this.chp11ex01Link}`}>{this.chp11ex01}</Link>
                        </div>
                    </div>                     
                </div>            
            </div>
        );
    }
}  
export default SidebarNew;