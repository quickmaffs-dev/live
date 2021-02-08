import React from 'react';
import '../../../App.css';
import '../../../styling/sidebar.css';
import '../../../styling/workspace.css';
import Sidebar from './yr11sidebar';

class y11home extends React.Component {    
    render() {
        return (
            <div>
                <Sidebar />                
                <h1>Year 11</h1>
                <p>Open the navigation bar on the left to begin</p>                
            </div>
            
        );
    }
}  

export default y11home;
