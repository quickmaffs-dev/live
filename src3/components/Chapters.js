import React from 'react';
import { Link } from 'react-router-dom';

function Chapters() {
    return (
      <div className="Chapters">        
          <h1>Chapters</h1>
          <div className="yearSection">              
              <h4>Chapter 1: Working with Numbers</h4>
              <li><Link to="/exercises/rates_and_ratios/ex01_converting_rates?yr=%12%">Ex 01 - Converting Rates</Link></li>
              <li><Link to="/exercises/rates_and_ratios/ex02_ratios?yr=%12%">Ex 02 - Ratios</Link></li>
              <li><Link to="/exercises/rates_and_ratios/ex03_scales?yr=%12%">Ex 03 - Scales</Link></li>

              <h4>Chapter 2: Algebra</h4>
              <li><Link to="/exercises/algebra/ex01_addition_and_subtraction?yr=%7%">Ex 01 - Addition and subtraction</Link></li>
              <li><Link to="/exercises/algebra/ex02_multiplication?yr=%7%">Ex 02 - Multiplication</Link></li>
              <li><Link to="/exercises/algebra/ex03_bidmas?yr=%9%">Ex 03 - BIDMAS</Link></li>
              <li><Link to="/exercises/algebra/ex04_pronumerals?yr=%11%">Ex 04 - Pronumerals</Link></li>
              <li><Link to="/exercises/algebra/ex05_fractions?yr=%9%">Ex 05 - Fractions</Link></li>
              <li><Link to="/exercises/algebra/ex06_decimals?yr=%9%">Ex 06 - Decimals</Link></li>
              <li><Link to="/exercises/algebra/ex07_converting_fractions_decimals?yr=%9%">Ex 07 - Converting fractions and decimals</Link></li>

              <h4>Chapter 3: Earning Money</h4>
              <li><Link to="/exercises/earning_money/ex01_wages_and_salaries?yr=%9%">Ex 01 - Wages and salaries</Link></li>
              <li><Link to="/exercises/earning_money/ex02_overtime?yr=%9%">Ex 02 - Overtime</Link></li>
              <li><Link to="/exercises/earning_money/ex03_commission_piecework_and_leave_loading?yr=%9%">Ex 03 - Commission, piecework and leave loading</Link></li>
              <li><Link to="/exercises/earning_money/ex04_income_tax?yr=%9%">Ex 04 - Income tax</Link></li>
              <li><Link to="/exercises/earning_money/ex05_payg_tax?yr=%9%">Ex 05 - PAYG tax</Link></li>
              <li><Link to="/exercises/investments_and_loans/ex01_compound_interest?yr=%12%">Ex 01 - Compound Interest</Link></li>
              <li><Link to="/exercises/annuities/ex01_modelling_annuities?yr=%12%">Ex 01 - Annuities</Link></li>
              <li><Link to="/exercises/annuities/ex02_future_value_table?yr=%12%">Ex 02 - Future Value Tables</Link></li>

              <h4>Chapter 4: Investigating Data</h4>
              <li><Link to="/exercises/investigating_data/ex01_averages_and_range?yr=%9%">Ex 01 - Averages and Range</Link></li>
              <li><Link to="/exercises/data_analysis/ex01_scatterplots?yr=%12%">Ex 01 - Scatterplots</Link></li>
              <li><Link to="/exercises/data_analysis/ex02_linear_association?yr=%12%">Ex 02 - Linear Association</Link></li>

              <h4>Chapter 5: Surface Area and Volume</h4>
              <li><Link to="/exercises/rates_and_ratios/ex01_converting_rates?yr=%9%">Ex 01 - Converting units</Link></li>
              <li><Link to="/exercises/area_perimeter_and_volume/ex01_perimeter?yr=%9%">Ex 02 - Perimeter</Link></li>
              <li><Link to="/exercises/area_perimeter_and_volume/ex02_area?yr=%9%">Ex 03 - Area</Link></li>
              
              <h4>Chapter 6: Coordinate Geometry</h4>
              <li><Link to="/exercises/coordinate_geometry/ex01_intervals?yr=%10%">Ex 01 - Distance, midpoints and gradient</Link></li>              
              <li><Link to="/exercises/coordinate_geometry/ex02_inclination_angle?yr=%10%">Ex 02 - Inclination Angle</Link></li>
              <li><Link to="/exercises/coordinate_geometry/ex03_parallel_perpendicular_lines?yr=%10%">Ex 03 - Parallel and perpendicular lines</Link></li>
              <li><Link to="/exercises/coordinate_geometry/ex04_linear_equations?yr=%10%">Ex 04 - Further Gradients</Link></li>
              <li><Link to="/exercises/coordinate_geometry/ex05_cartesian_points?yr=%10%">Ex 05 - Cartesian Points</Link></li>

              
              <h4>Chapter 7: Probability</h4>
              <li><Link to="/exercises/probability/ex01_experimental_probability?yr=%10%">Ex 01 - Experimental Probability</Link></li>
              <li><Link to="/exercises/probability/ex02_venn_diagrams?yr=%10%">Ex 02 - Venn Diagrams</Link></li>

              <h4>Chapter 8: Circle Geometry</h4>
              <li><Link to="/exercises/circle_geometry/ex01_parts_of_circle?yr=%10%">Ex 01 - Parts of a circle</Link></li>
              <li><Link to="/exercises/circle_geometry/ex02_angle_properties?yr=%10%">Ex 02 - Angle Properties</Link></li>
              
              <h4>Chapter 9: Exponentials and Logarithms</h4>
              <li><Link to="/exercises/exponentials_and_logarithms/ex01_evaluate_exponentials?yr=%11%">Ex 01 - Evaluate Exponentials</Link></li>
              <li><Link to="/exercises/exponentials_and_logarithms/ex02_indices?yr=%11%">Ex 02 - Negative indices</Link></li>
              <li><Link to="/exercises/exponentials_and_logarithms/ex03_logarithms?yr=%11%">Ex 03 - Logarithms</Link></li>
              
              <h4>Chapter 10: Trigonometry</h4>
              <li><Link to="/exercises/trigonometry/ex01_soh_cah_toa?yr=%12%">Ex 01 - SOH CAH TOA</Link></li>
              <li><Link to="/exercises/trigonometry/ex02_elevation_and_depression?yr=%12%">Ex 02 - Elevation and Depression</Link></li>
              <li><Link to="/exercises/trigonometry/ex03_bearings?yr=%12%">Ex 03 - Bearings</Link></li>
              <li><Link to="/exercises/trigonometry/ex04_sine_rule?yr=%12%">Ex 04 - Sine Rule</Link></li>
              <li><Link to="/exercises/trigonometry/ex05_cosine_rule?yr=%12%">Ex 05 - Cosine Rule</Link></li>
              <li><Link to="/exercises/trigonometry/ex06_solve_ratios?yr=%12%">Ex 06 - Solve Ratios</Link></li>
              <li><Link to="/exercises/trigonometry/ex07_triangle_properties?yr=%9%">Ex 07 - Triangle Properties</Link></li>

              <h4>Chapter 11: Simultaneous Equations</h4>
              <li><Link to="/exercises/simultaneous_equations/ex01_identify_graphs?yr=%12%">Ex 01 - Identify Graphs</Link></li>
              <li><Link to="/exercises/simultaneous_equations/ex02_linear_relationships?yr=%12%">Ex 02 - Linear Relationships</Link></li>
              <li><Link to="/exercises/simultaneous_equations/ex03_points_of_intersection?yr=%12%">Ex 03 - Points of Intersection</Link></li>

              <h4>Chapter 12: Normal Distribution</h4>
              <li><Link to="/exercises/normal_distribution/ex01_68_95_99_rule?yr=%12%">Ex 01 - 68, 95, 99.7 Rule</Link></li>
              <li><Link to="/exercises/normal_distribution/ex02_zscores?yr=%12%">Ex 02 - z Scores</Link></li>
              <li><Link to="/exercises/normal_distribution/ex03_average_and_standard_deviation?yr=%12%">Ex 03 - Averages and Standard Deviations</Link></li>              

              <h4>Chapter 13: Calculus I</h4>
              <li><Link to="/exercises/calculus_i/ex01_gradients_and_rates?yr=%12%">Ex 01 - Gradient and Rates</Link></li>

              <h4>Chapter 14: Equations</h4>
              <li><Link to="/exercises/equations/ex01_solve_equations?yr=%9%">Ex 01 - Solve Equations</Link></li>
              <li><Link to="/exercises/equations/ex02_equation_problems?yr=%9%">Ex 02 - Equation Problems</Link></li>

          </div>
          <br /><br />
          <h1>HSC Gen</h1>
          <div className="yearSection">
            <h3>Math Standard</h3>
            <li><Link to="/exercises/hsc/std_1_2019?yr=%hsc%">Math Standard 2019</Link></li>
            <li><Link to="/exercises/hsc/gen_2_2018?yr=%hsc%">Math General 2018</Link></li>          

            <h3>Short answer</h3>
            <li><Link to="/exercises/hsc/standard_short_answer?yr=%hsc%">Math Standard</Link></li>
          </div>
          <br /><br />
            {/*
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

              <h4>Chapter 8: Earning Money</h4>
              <li><Link to="/exercises/earning_money/ex01_wages_and_salaries?yr=%9%">Ex 01 - Wages and salaries</Link></li>
              <li><Link to="/exercises/earning_money/ex02_overtime?yr=%9%">Ex 02 - Overtime</Link></li>
              <li><Link to="/exercises/earning_money/ex03_commission_piecework_and_leave_loading?yr=%9%">Ex 03 - Commission, piecework and leave loading</Link></li>
              <li><Link to="/exercises/earning_money/ex04_income_tax?yr=%9%">Ex 04 - Income tax</Link></li>
              <li><Link to="/exercises/earning_money/ex05_payg_tax?yr=%9%">Ex 05 - PAYG tax</Link></li>

              <h4>Chapter 9: Investigating Data</h4>
              <li><Link to="/exercises/investigating_data/ex01_averages_and_range?yr=%9%">Ex 01 - Averages and Range</Link></li>

              <h4>Chapter 10: Surface Area and Volume</h4>
              <li><Link to="/exercises/rates_and_ratios/ex01_converting_rates?yr=%9%">Ex 01 - Converting units</Link></li>
              <li><Link to="/exercises/area_perimeter_and_volume/ex01_perimeter?yr=%9%">Ex 02 - Perimeter</Link></li>
              <li><Link to="/exercises/area_perimeter_and_volume/ex02_area?yr=%9%">Ex 03 - Area</Link></li>
              
              <h4>Chapter 11: Coordinate Geometry</h4>
              <li><Link to="/exercises/coordinate_geometry/ex01_intervals?yr=%9%">Ex 01 - Distance, midpoints and gradient</Link></li>
              
          </div>

          <div className="yearSection">
              <hr></hr>
              <h3>Year 10</h3>
              <h4>Chapter 3: Coordinate Geometry</h4>
              <li><Link to="/exercises/coordinate_geometry/ex01_intervals?yr=%10%">Ex 01 - Intervals</Link></li>
              <li><Link to="/exercises/coordinate_geometry/ex02_inclination_angle?yr=%10%">Ex 02 - Inclination Angle</Link></li>
              <li><Link to="/exercises/coordinate_geometry/ex03_parallel_perpendicular_lines?yr=%10%">Ex 03 - Parallel and perpendicular lines</Link></li>
              <li><Link to="/exercises/simultaneous_equations/ex01_identify_graphs?yr=%10%">Ex 04 - Identify Graphs</Link></li>
              
              <h4>Chapter 12: Probability</h4>
              <li><Link to="/exercises/probability/ex01_experimental_probability?yr=%10%">Ex 01 - Experimental Probability</Link></li>
              <li><Link to="/exercises/probability/ex02_venn_diagrams?yr=%10%">Ex 02 - Venn Diagrams</Link></li>

              <h4>Chapter 15: Circle Geometry</h4>
              <li><Link to="/exercises/circle_geometry/ex01_parts_of_circle?yr=%10%">Ex 01 - Parts of a circle</Link></li>
              <li><Link to="/exercises/circle_geometry/ex02_angle_properties?yr=%10%">Ex 02 - Angle Properties</Link></li>
          </div>

          <div className="yearSection">
              <hr></hr>
              <h3>Year 11</h3>
              <h4>Chapter 1: Algebra</h4>
              <li><Link to="/exercises/algebra/ex04_pronumerals?yr=%11%">Ex 01 - Pronumerals</Link></li>

              <h4>Chapter 8: Exponentials and Logarithms</h4>
              <li><Link to="/exercises/exponentials_and_logarithms/ex01_evaluate_exponentials?yr=%11%">Ex 01 - Evaluate Exponentials</Link></li>
              <li><Link to="/exercises/exponentials_and_logarithms/ex02_indices?yr=%11%">Ex 02 - Negative indices</Link></li>
              <li><Link to="/exercises/exponentials_and_logarithms/ex03_logarithms?yr=%11%">Ex 03 - Logarithms</Link></li>
              
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
              <li><Link to="/exercises/trigonometry/ex06_solve_ratios?yr=%12%">Ex 06 - Solve Ratios</Link></li>

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
            */}
      </div>      
    );
  }

export default Chapters;
