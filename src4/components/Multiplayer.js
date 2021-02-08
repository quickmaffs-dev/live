import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
//import icon from '../img/icon.png';
import firebase from './firebase';


async function checkIfUserIsLoggedIn() {
    let user_id = await firebase.getCurrentUserID();
    //setUserID(user_id);
    //let em = firebase.getCurrentUsername();
    //setEmail(em);        
    if (user_id !== null) {
        document.getElementById("loginCheck").innerHTML = "";
        document.getElementsByClassName("multiplayerOptions")[0].style.display = "block";
    } else {
        document.getElementById("loginCheck").innerHTML = "You need to be logged in to access multiplayer";
    }   
}

function Multiplayer() {
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }); 

  return (
    <div className="Multiplayer">
      <h1>Multiplayer</h1>
      <p id="loginCheck">Checking login status...</p>
      <div className="multiplayerOptions" style={{display:"none"}}>
          <table><tbody>
            <tr>
              <td style={{borderRight:"1px solid black"}}>
                <Link to="battle">
                  <div className="battleImgClass">                    
                    <img id="battleImg" alt="battle" src="https://i.pinimg.com/originals/e1/6b/26/e16b262cb047f6f70c3dcf50e1e7beaf.jpg" />
                    <img id="battleImgInvert" alt="battle" src="https://i.pinimg.com/originals/e1/6b/26/e16b262cb047f6f70c3dcf50e1e7beaf.jpg" />
                  </div>
                </Link>
              </td>
              <td>
                <Link to="royale">
                  <div className="battleImgClass">
                    <img id="battleImg" alt="battle" src="https://cdn.vox-cdn.com/thumbor/_sQbGv5fHhcjhfkkvG3WzwwAkCk=/0x0:1600x900/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/48988427/doom_alt_boxart.0.0.jpg" />
                    <img id="battleImgInvert" alt="battle" src="https://cdn.vox-cdn.com/thumbor/_sQbGv5fHhcjhfkkvG3WzwwAkCk=/0x0:1600x900/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/48988427/doom_alt_boxart.0.0.jpg" />
                  </div>
                </Link>                
              </td>
            </tr>
            <tr>
              <td style={{borderRight:"1px solid black"}}>Battle</td>
              <td>Royale</td>
            </tr>  
            <tr>
              <td style={{borderRight:"1px solid black", textAlign:"left"}}>
                  <li>Versus 3 other players</li>
                  <li>Winner is first to reach 1000 pts</li>
                  <li>Each incorrect answer accumulates a 1 second penalty, unlimited chances</li>
              </td>
              <td style={{textAlign:"left", paddingLeft:"30px"}}>
                  <li>Versus 24 other players</li>
                  <li>Involves a series of rounds with questions</li>
                  <li>Incorrect answer and player loses the round</li>
                  <li>Winner is last person remaining</li>
              </td>
            </tr>  
        </tbody></table>
      </div>
    
    </div>
    
  );
}

export default Multiplayer;
