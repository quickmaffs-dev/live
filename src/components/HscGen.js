import React from 'react';
import { Link } from 'react-router-dom';

function HscGen() {
    return (
      <div className="HscGen">        
          <h1>HSC Gen</h1>

          <div className="yearSection">
              <hr></hr>
              <h3>Math Standard</h3>
              <li><Link to="/exercises/hsc/std_1_2019?yr=%hsc%">Math Standard 2019</Link></li>
          </div>
          <br />
      </div>      
    );
  }

export default HscGen;
