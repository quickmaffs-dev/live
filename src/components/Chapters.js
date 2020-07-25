import React from 'react';
import { Link } from 'react-router-dom';

function Chapters() {
    return (
      <div className="Chapters">        
          <h1>Chapters</h1>

          <div className="yearSection">
              <hr></hr>
              <h3>Year 7</h3>
              <h4>Chapter 1: Algebra</h4>
              <li><Link to="/exercises/algebra/ex01_addition_and_subtraction?yr=%7%">Ex 01 - Addition and subtraction</Link></li>
              <li><Link to="/exercises/algebra/ex02_multiplication?yr=%7%">Ex 02 - Multiplication</Link></li>
              <li><Link to="/exercises/algebra/ex03_bidmas?yr=%7%">Ex 03 - BIDMAS</Link></li>
          </div>

          <div className="yearSection">
              <hr></hr>
              <h3>Year 9</h3>
              <h4>Chapter 1: Working with numbers</h4>
              <li><Link to="/exercises/algebra/ex03_bidmas?yr=%9%">Ex 01 - BIDMAS</Link></li>
              <li><Link to="/exercises/algebra/ex05_fractions?yr=%9%">Ex 02 - Fractions</Link></li>
              <li><Link to="/exercises/algebra/ex06_decimals?yr=%9%">Ex 03 - Decimals</Link></li>
              <li><Link to="/exercises/algebra/ex07_converting_fractions_decimals?yr=%9%">Ex 04 - Converting fractions and decimals</Link></li>
          </div>

          <div className="yearSection">
              <hr></hr>
              <h3>Year 11</h3>
              <h4>Chapter 1: Algebra</h4>
              <li><Link to="/exercises/algebra/ex04_pronumerals?yr=%11%">Ex 01 - Pronumerals</Link></li>
          </div>
          
          <div className="yearSection">
              <hr></hr>
              <h3>Year 12</h3>
              
              <h4>Chapter 1: Rates and ratios</h4>
              <li><Link to="/exercises/rates_and_ratios/ex01_converting_rates?yr=%12%">Ex 01 - Converting Rates</Link></li>
              <li><Link to="/exercises/rates_and_ratios/ex02_ratios?yr=%12%">Ex 02 - Ratios</Link></li>
              <li><Link to="/exercises/rates_and_ratios/ex03_scales?yr=%12%">Ex 03 - Scales</Link></li>
              
              <h4>Chapter 3: Investments and Loans</h4>
              <li><Link to="/exercises/investments_and_loans/ex01_compound_interest?yr=%12%">Ex 01 - Compound Interest</Link></li>

              <h4>Chapter 4: Trigonometry</h4>
              <li><Link to="/exercises/trigonometry/ex01_soh_cah_toa?yr=%12%">Ex 01 - SOH CAH TOA</Link></li>
              <li><Link to="/exercises/trigonometry/ex02_elevation_and_depression?yr=%12%">Ex 02 - Elevation and Depression</Link></li>
              <li><Link to="/exercises/trigonometry/ex03_bearings?yr=%12%">Ex 03 - Bearings</Link></li>
              <li><Link to="/exercises/trigonometry/ex04_sine_rule?yr=%12%">Ex 04 - Sine Rule</Link></li>
              <li><Link to="/exercises/trigonometry/ex05_cosine_rule?yr=%12%">Ex 05 - Cosine Rule</Link></li>
              <li><Link to="/exercises/trigonometry/ex06_solve_ratios?yr=%12%">Ex 05 - Solve Ratios</Link></li>

              <h4>Chapter 5: Simultaneous Equations</h4>
              <li><Link to="/exercises/simultaneous_equations/ex01_identify_graphs?yr=%12%">Ex 01 - Identify Graphs</Link></li>
              <li><Link to="/exercises/simultaneous_equations/ex02_linear_relationships?yr=%12%">Ex 02 - Linear Relationships</Link></li>
              <li><Link to="/exercises/simultaneous_equations/ex03_points_of_intersection?yr=%12%">Ex 03 - Points of Intersection</Link></li>

              <h4>Chapter 6: Data Analysis</h4>
              <li><Link to="/exercises/data_analysis/ex01_scatterplots?yr=%12%">Ex 01 - Scatterplots</Link></li>
              <li><Link to="/exercises/data_analysis/ex02_linear_association?yr=%12%">Ex 02 - Linear Association</Link></li>

              <h4>Chapter 7: Annuities</h4>
              <li><Link to="/exercises/annuities/ex01_modelling_annuities?yr=%12%">Ex 01 - Annuities</Link></li>
              <li><Link to="/exercises/annuities/ex02_future_value_table?yr=%12%">Ex 02 - Future Value Tables</Link></li>
              
              <h4>Chapter 9: Normal Distribution</h4>
              <li><Link to="/exercises/normal_distribution/ex01_68_95_99_rule?yr=%12%">Ex 01 - 68, 95, 99.7 Rule</Link></li>
              <li><Link to="/exercises/normal_distribution/ex02_zscores?yr=%12%">Ex 02 - z Scores</Link></li>
              <li><Link to="/exercises/normal_distribution/ex03_average_and_standard_deviation?yr=%12%">Ex 03 - Averages and Standard Deviations</Link></li>              
          </div>
          <br />
      </div>      
    );
  }

export default Chapters;
