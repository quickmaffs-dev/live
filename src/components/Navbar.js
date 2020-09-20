import React, {useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from './firebase';

const Navbar = () => {
  const history = useHistory();  
  //const isMountedRef = useRef(null);
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }); 

  async function checkIfUserIsLoggedIn() {
    let user_id = await firebase.getCurrentUserID();
    let user_name = await firebase.getCurrentUsername();
    if (user_id !== null) {
      console.log("user id is " + user_id);
      document.getElementById("usernameID").style.display = "block";
      document.getElementById("usernameID").innerHTML = user_name;//user.email;
      document.querySelectorAll(".loginClass")[0].style.display = "none";
      document.getElementById("signOutBtnID").style.display = "block";
    } else {
      console.log("no one is logged in");
      document.getElementById("usernameID").style.display = "none";
      document.getElementById("usernameID").innerHTML = "";
      document.querySelectorAll(".loginClass")[0].style.display = "block";
      document.getElementById("signOutBtnID").style.display = "none";      
    }
  }
  
  async function signOut() {        
      console.log("loggin out...");
      await firebase.logUserOut();
      history.push("/live");
      window.location.reload();
      console.log("logged out");

  }

  /*
  let play = 1;
  let oldGenre;
  function playMusic(genre) {    
    if (genre === "stop") {
      if (play === 1) { 
        play = 0;
      } else {
        play = 1;
      }
    }
    document.getElementById("musicID").style.display = "block";
    let url = "";
    if (play === 0) {
      document.getElementById("musicID").src = "https://image.freepik.com/free-icon/rounded-play-button_318-9366.jpg";
    } else {
      document.getElementById("musicID").src = "https://png.pngtree.com/png-vector/20190723/ourlarge/pngtree-pause-button-icon-png-image_1570129.jpg";
      if (genre === "stop") {
        genre = oldGenre;
      }
      let vidId;
      if (genre === "hiphop") {        
        vidId = "5qap5aO4i9A";
      } else if (genre === "techno") {
        vidId = "qWf-FPFmVw0";
      } else if (genre === "classical") {
        vidId = "QEDZd066a2k";
      } else if (genre === "relax") {
        vidId = "C9v3sZypcn4";
      } else if (genre === "pop") {
        vidId = "mhHl-DzrAfU";
      } else {
        vidId = "";
      }
      oldGenre = genre;
      url = "https://www.youtube.com/embed/" + vidId + "?autoplay=1&controls=0";
    }
    document.getElementById("musicPlayerID").src = url;
  }
  */
  return (
    <div className="Navbar">
      <div className="NavLeft">        
        <Link className="Navbar_link" to="/">Home</Link>
        <Link className="Navbar_link" to="/chapters">Chapters</Link>
        <Link className="Navbar_link" to="/dashboard">Dashboard</Link>        
        <Link className="Navbar_link" to="/hscgen">HSC Gen</Link>   
        {/*
        <div className="dropdown">
          <p className="dropbtn">Music</p>          
          <div className="dropdown-content">
            <button onClick={()=>playMusic('hiphop')}>hip hop</button>
            <button onClick={()=>playMusic('pop')}>pop</button>
            <button onClick={()=>playMusic('techno')}>techno</button>
            <button onClick={()=>playMusic('classical')}>classical</button>
            <button onClick={()=>playMusic('relax')}>relax</button>
          </div>          
        </div>
        <img src="" onClick={()=>playMusic('stop')} width="30px" height="30px" alt="musicAlt" className="dropbtn" id="musicID"></img>
        <iframe title="musicPlayer" id="musicPlayerID" width="0" height="0" allow="autoplay" src=""></iframe>
        */}
      </div>
      <div className="NavRight">
        <div style={{display: "flex"}}>
          <p className="LinkBtn" id="usernameID" style={{display: "none"}}></p>
          <button className="Navbar_link" onClick={signOut} id="signOutBtnID" style={{display: "none"}}>Logout</button>
        </div>

        <div className="loginClass" style={{display: "none"}}>
          <Link className="Navbar_link" to="/login">Login</Link>
          <Link className="Navbar_link" to="/signup">Signup</Link>
        </div>
        
      </div>
      
    </div>   
  );
}

export default Navbar;
