import React from 'react';
import '../../../App.css';
import '../../../styling/sidebar.css';
import '../../../styling/workspace.css';
import Sidebar from './yr07sidebar';

class y07home extends React.Component {    
    render() {
        return (
            <div>
                <Sidebar />                
                <h1>Year 7</h1>
                <p>Open the navigation bar on the left to begin</p>                
            </div>
            
        );
    }
}  

export default y07home;
