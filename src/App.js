import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styling/sidebar.css';
import './styling/workspace.css';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Chapters from './components/Chapters';
import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';

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

import ex01_compound_interest from './components/exercises/investments_and_loans/ex01_compound_interest';

import ex01_soh_cah_toa from './components/exercises/trigonometry/ex01_soh_cah_toa';
import ex02_elevation_and_depression from './components/exercises/trigonometry/ex02_elevation_and_depression';
import ex03_bearings from './components/exercises/trigonometry/ex03_bearings';
import ex04_sine_rule from './components/exercises/trigonometry/ex04_sine_rule';
import ex05_cosine_rule from './components/exercises/trigonometry/ex05_cosine_rule';
import ex06_solve_ratios from './components/exercises/trigonometry/ex06_solve_ratios';

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


//class App extends React.Component {
function App() {
  //render() {
  return (
    <div>
      <div className="App">
        <Navbar />
        <main className="content">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/chapters" component={Chapters} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/admin" component={Admin} />

            {/* year 7 */}
            <Route path="/exercises/algebra/ex01_addition_and_subtraction" component={ex01_addition_and_subtraction} /> 
            <Route path="/exercises/algebra/ex02_multiplication" component={ex02_multiplication} /> 

            {/* year 9 */}
            <Route path="/exercises/algebra/ex03_bidmas" component={ex03_bidmas} /> 
            <Route path="/exercises/algebra/ex05_fractions" component={ex05_fractions} />
            <Route path="/exercises/algebra/ex06_decimals" component={ex06_decimals} />
            <Route path="/exercises/algebra/ex07_converting_fractions_decimals" component={ex07_converting_fractions_decimals} />
            
            {/* year 11 */}
            <Route path="/exercises/algebra/ex04_pronumerals" component={ex04_pronumerals} /> 
            
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
            
            <Route component={ErrorPage} />
          </Switch>
        </main>
        
        <div className="animation">
          <ul className="quadrados"><li></li><li></li><li></li><li></li><li></li></ul>
        </div>
        <Footer />
        
  
      </div>
    </div>
    
    );
//  }
}

export default App;
