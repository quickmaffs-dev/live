import React from 'react';
import '../../../App.css';
import '../../../styling/sidebar.css';
import '../../../styling/workspace.css';
import Sidebar from './yr09sidebar';

class y09home extends React.Component {    
    render() {
        return (
            <div>
                <Sidebar />                
                <h1>Year 9</h1>
                <p>Open the navigation bar on the left to begin</p>                
            </div>
            
        );
    }
}  

export default y09home;
