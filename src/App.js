import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom';
import { UserContext } from "./components/UserContext";
import './styling/sidebar.css';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Chapters from './components/Chapters';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Multiplayer from "./components/Multiplayer";
import Battle from './components/Battle';
import Royale from './components/Royale';
import Store from './components/Store';
import Class from "./components/Class";
import Admin from './components/Admin';
import HscGen from './components/HscGen';

import ex01_addition_and_subtraction from './components/exercises/algebra/ex01_addition_and_subtraction';
import ex02_multiplication from './components/exercises/algebra/ex02_multiplication';
import ex03_bidmas from './components/exercises/algebra/ex03_bidmas';
import ex04_pronumerals from './components/exercises/algebra/ex04_pronumerals';
import ex05_fractions from './components/exercises/algebra/ex05_fractions';
import ex06_decimals from './components/exercises/algebra/ex06_decimals';
import ex07_converting_fractions_decimals from './components/exercises/algebra/ex07_converting_fractions_decimals';

import ex01_converting_rates from './components/exercises/rates_and_ratios/ex01_converting_rates';
import ex02_ratios from './components/exercises/rates_and_ratios/ex02_ratios';
import ex03_scales from './components/exercises/rates_and_ratios/ex03_scales';
import ex04_surds from "./components/exercises/rates_and_ratios/ex04_surds";

import ex01_compound_interest from './components/exercises/investments_and_loans/ex01_compound_interest';

import ex01_evaluate_exponentials from "./components/exercises/exponentials_and_logarithms/ex01_evaluate_exponentials";
import ex02_indices from "./components/exercises/exponentials_and_logarithms/ex02_indices";
import ex03_logarithms from "./components/exercises/exponentials_and_logarithms/ex03_logarithms";

import ex01_gradients_and_rates from "./components/exercises/calculus_i/ex01_gradients_and_rates";

import ex01_soh_cah_toa from './components/exercises/trigonometry/ex01_soh_cah_toa';
import ex02_elevation_and_depression from './components/exercises/trigonometry/ex02_elevation_and_depression';
import ex03_bearings from './components/exercises/trigonometry/ex03_bearings';
import ex04_sine_rule from './components/exercises/trigonometry/ex04_sine_rule';
import ex05_cosine_rule from './components/exercises/trigonometry/ex05_cosine_rule';
import ex06_solve_ratios from './components/exercises/trigonometry/ex06_solve_ratios';
import ex07_triangle_properties from "./components/exercises/trigonometry/ex07_triangle_properties";

import ex01_solve_equations from "./components/exercises/equations/ex01_solve_equations";
import ex02_equation_problems from "./components/exercises/equations/ex02_equation_problems";

import ex01_identify_graphs from './components/exercises/simultaneous_equations/ex01_identify_graphs';
import ex02_linear_relationships from './components/exercises/simultaneous_equations/ex02_linear_relationships';
import ex03_points_of_intersection from './components/exercises/simultaneous_equations/ex03_points_of_intersection';

import ex01_scatterplots from './components/exercises/data_analysis/ex01_scatterplots';
import ex02_linear_association from './components/exercises/data_analysis/ex02_linear_association';

import ex01_modelling_annuities from './components/exercises/annuities/ex01_modelling_annuities';
import ex02_future_value_table from './components/exercises/annuities/ex02_future_value_table';

import ex01_68_95_99_rule from './components/exercises/normal_distribution/ex01_68_95_99_rule';
import ex02_zscores from './components/exercises/normal_distribution/ex02_zscores';
import ex03_average_and_standard_deviation from './components/exercises/normal_distribution/ex03_average_and_standard_deviation';

import ex01_perimeter from './components/exercises/area_perimeter_and_volume/ex01_perimeter';
import ex02_area from './components/exercises/area_perimeter_and_volume/ex02_area';

import ex01_parts_of_circle from './components/exercises/circle_geometry/ex01_parts_of_circle';
import ex02_angle_properties from './components/exercises/circle_geometry/ex02_angle_properties';

import ex01_experimental_probability from "./components/exercises/probability/ex01_experimental_probability";
import ex02_venn_diagrams from "./components/exercises/probability/ex02_venn_diagrams";

import ex01_intervals from './components/exercises/coordinate_geometry/ex01_intervals';
import ex02_inclination_angle from './components/exercises/coordinate_geometry/ex02_inclination_angle';
import ex03_parallel_perpendicular_lines from './components/exercises/coordinate_geometry/ex03_parallel_perpendicular_lines';
import ex04_linear_equations from "./components/exercises/coordinate_geometry/ex04_linear_equations";
import ex05_cartesian_points from "./components/exercises/coordinate_geometry/ex05_cartesian_points";

import ex01_wages_and_salaries from "./components/exercises/earning_money/ex01_wages_and_salaries";
import ex02_overtime from "./components/exercises/earning_money/ex02_overtime";
import ex03_commission_piecework_and_leave_loading from "./components/exercises/earning_money/ex03_commission_piecework_and_leave_loading";
import ex04_income_tax from "./components/exercises/earning_money/ex04_income_tax";
import ex05_payg_tax from "./components/exercises/earning_money/ex05_payg_tax";
import ex01_averages_and_range from "./components/exercises/investigating_data/ex01_averages_and_range";

import std_1_2019 from './components/exercises/hsc/std_1_2019';
import gen_2_2018 from "./components/exercises/hsc/gen_2_2018";
import standard_short_answer from "./components/exercises/hsc/standard_short_answer";

function App() {
  const [userID, setUserID] = useState(null);
  //const [username, setUsername] = useState(null);

  //const value = useMemo(() => ({ userID, setUserID }), [userID, setUserID]);

  return (
    <div>
      <div className="App">
        <UserContext.Provider value={[userID, setUserID]}>
          <Navbar />
          <main className="content">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/chapters" component={Chapters} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/battle" component={Battle} />
              <Route path="/royale" component={Royale} />              
              <Route path="/admin" component={Admin} />
              <Route path="/live" component={Home} /> {/* for github pages publhed as "live" */}
              <Route path="/HscGen" component={HscGen} />
              <Route path="/store" component={Store} />
              <Route path="/multiplayer" component={Multiplayer} />
              <Route path="/class" component={Class} />



              {/* year 7 */}
              <Route path="/exercises/algebra/ex01_addition_and_subtraction" component={ex01_addition_and_subtraction} /> 
              <Route path="/exercises/algebra/ex02_multiplication" component={ex02_multiplication} /> 

              {/* year 9 */}
              <Route path="/exercises/algebra/ex03_bidmas" component={ex03_bidmas} /> 
              <Route path="/exercises/algebra/ex05_fractions" component={ex05_fractions} />
              <Route path="/exercises/algebra/ex06_decimals" component={ex06_decimals} />
              <Route path="/exercises/algebra/ex07_converting_fractions_decimals" component={ex07_converting_fractions_decimals} />
              <Route path="/exercises/area_perimeter_and_volume/ex01_perimeter" component={ex01_perimeter} />
              <Route path="/exercises/area_perimeter_and_volume/ex02_area" component={ex02_area} />
              <Route path="/exercises/earning_money/ex01_wages_and_salaries" component={ex01_wages_and_salaries} />
              <Route path="/exercises/earning_money/ex02_overtime" component={ex02_overtime} />
              <Route path="/exercises/earning_money/ex03_commission_piecework_and_leave_loading" component={ex03_commission_piecework_and_leave_loading} />
              <Route path="/exercises/earning_money/ex04_income_tax" component={ex04_income_tax} />
              <Route path="/exercises/earning_money/ex05_payg_tax" component={ex05_payg_tax} />
              <Route path="/exercises/investigating_data/ex01_averages_and_range" component={ex01_averages_and_range} />
              <Route path="/exercises/trigonometry/ex07_triangle_properties" component={ex07_triangle_properties} />
              <Route path="/exercises/equations/ex01_solve_equations" component={ex01_solve_equations} />
              <Route path="/exercises/equations/ex02_equation_problems" component={ex02_equation_problems} />

              {/* year 10 */}
              <Route path="/exercises/rates_and_ratios/ex04_surds" component={ex04_surds} /> 
              <Route path="/exercises/circle_geometry/ex01_parts_of_circle" component={ex01_parts_of_circle} /> 
              <Route path="/exercises/circle_geometry/ex02_angle_properties" component={ex02_angle_properties} /> 

              <Route path="/exercises/probability/ex01_experimental_probability" component={ex01_experimental_probability} /> 
              <Route path="/exercises/probability/ex02_venn_diagrams" component={ex02_venn_diagrams} /> 
              
              <Route path="/exercises/coordinate_geometry/ex01_intervals" component={ex01_intervals} /> 
              <Route path="/exercises/coordinate_geometry/ex02_inclination_angle" component={ex02_inclination_angle} /> 
              <Route path="/exercises/coordinate_geometry/ex03_parallel_perpendicular_lines" component={ex03_parallel_perpendicular_lines} /> 
              <Route path="/exercises/coordinate_geometry/ex04_linear_equations" component={ex04_linear_equations} /> 
              <Route path="/exercises/coordinate_geometry/ex05_cartesian_points" component={ex05_cartesian_points} /> 
              
              {/* year 11 */}
              <Route path="/exercises/algebra/ex04_pronumerals" component={ex04_pronumerals} /> 
              <Route path="/exercises/exponentials_and_logarithms/ex01_evaluate_exponentials" component={ex01_evaluate_exponentials} /> 
              <Route path="/exercises/exponentials_and_logarithms/ex02_indices" component={ex02_indices} /> 
              <Route path="/exercises/exponentials_and_logarithms/ex03_logarithms" component={ex03_logarithms} /> 
              
              <Route path="/exercises/calculus_i/ex01_gradients_and_rates" component={ex01_gradients_and_rates} /> 

              
              {/* year 12 */}
              <Route path="/exercises/rates_and_ratios/ex01_converting_rates" component={ex01_converting_rates} /> 
              <Route path="/exercises/rates_and_ratios/ex02_ratios" component={ex02_ratios} /> 
              <Route path="/exercises/rates_and_ratios/ex03_scales" component={ex03_scales} /> 

              <Route path="/exercises/investments_and_loans/ex01_compound_interest" component={ex01_compound_interest} /> 
              
              <Route path="/exercises/trigonometry/ex01_soh_cah_toa" component={ex01_soh_cah_toa} /> 
              <Route path="/exercises/trigonometry/ex02_elevation_and_depression" component={ex02_elevation_and_depression} /> 
              <Route path="/exercises/trigonometry/ex03_bearings" component={ex03_bearings} /> 
              <Route path="/exercises/trigonometry/ex04_sine_rule" component={ex04_sine_rule} /> 
              <Route path="/exercises/trigonometry/ex05_cosine_rule" component={ex05_cosine_rule} /> 
              <Route path="/exercises/trigonometry/ex06_solve_ratios" component={ex06_solve_ratios} /> 
              
              <Route path="/exercises/simultaneous_equations/ex01_identify_graphs" component={ex01_identify_graphs} /> 
              <Route path="/exercises/simultaneous_equations/ex02_linear_relationships" component={ex02_linear_relationships} /> 
              <Route path="/exercises/simultaneous_equations/ex03_points_of_intersection" component={ex03_points_of_intersection} /> 

              <Route path="/exercises/data_analysis/ex01_scatterplots" component={ex01_scatterplots} /> 
              <Route path="/exercises/data_analysis/ex02_linear_association" component={ex02_linear_association} /> 

              <Route path="/exercises/annuities/ex01_modelling_annuities" component={ex01_modelling_annuities} /> 
              <Route path="/exercises/annuities/ex02_future_value_table" component={ex02_future_value_table} /> 

              <Route path="/exercises/normal_distribution/ex01_68_95_99_rule" component={ex01_68_95_99_rule} /> 
              <Route path="/exercises/normal_distribution/ex02_zscores" component={ex02_zscores} /> 
              <Route path="/exercises/normal_distribution/ex03_average_and_standard_deviation" component={ex03_average_and_standard_deviation} /> 


              {/* hsc gen */}
              <Route path="/exercises/hsc/std_1_2019" component={std_1_2019} /> 
              <Route path="/exercises/hsc/gen_2_2018" component={gen_2_2018} /> 

              <Route path="/exercises/hsc/standard_short_answer" component={standard_short_answer} /> 
              

              <Route component={ErrorPage} />
            </Switch>
          </main>
          
          <div className="animation">
            <ul className="quadrados"><li></li><li></li><li></li><li></li><li></li></ul>
          </div>
          <Footer />
          
        </UserContext.Provider>
      </div>
    </div>
    
    );
}

export default App;
