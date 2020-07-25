import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase';

const Navbar = () => {
  
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        if (isMountedRef.current) {
          document.getElementById("usernameID").style.display = "block";
          document.getElementById("usernameID").innerHTML = user.email;
          document.querySelectorAll(".loginClass")[0].style.display = "none";
          document.getElementById("signOutBtnID").style.display = "block";
        }
      } else {
        if (isMountedRef.current) {
          document.getElementById("usernameID").style.display = "none";
          document.getElementById("usernameID").innerHTML = "";
          document.querySelectorAll(".loginClass")[0].style.display = "block";
          document.getElementById("signOutBtnID").style.display = "none";
        }
      }
    });
    return () => isMountedRef.current = false;
    
  }, []);
  
  async function signOut() {        
      await firebase.auth().signOut().then(() => {
          console.log("user is signed out");
      });
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
        <Link className="Navbar_link" to="/chapters">Chapter</Link>
        <Link className="Navbar_link" to="/about">About Us</Link>
        <Link className="Navbar_link" to="/dashboard">Dashboard</Link>        
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
