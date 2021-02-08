import React from 'react';
import '../../../App.css';
import '../../../styling/sidebar.css';
import '../../../styling/workspace.css';
import Sidebar from './yr12stdsidebar';

class y12stdhome extends React.Component {    
    render() {
        return (
            <div>
                <Sidebar />                
                <h1>Year 12 Standard</h1>
                <p>Open the navigation bar on the left to begin</p>
            </div>
            
        );
    }
}  

export default y12stdhome;
