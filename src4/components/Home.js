import React, {useEffect} from 'react';
import '../App.css';
//import icon from '../img/icon.png';
import firebase from './firebase';


async function getTodaysInfo() {
    await getQuote();
    await getSong();
    console.log("we're good to go jack");
}

async function getQuote() {
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date();
    let secondDate = new Date("2020-11-04"); // 4 november    
    let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    let quote = await firebase.getQuoteFromDb(diffDays);
    if (document.getElementById("quote")) {
      document.getElementById("quote").innerHTML = quote.quote;
      document.getElementById("quoteAuthor").innerHTML = " - " + quote.author;
      document.getElementById("quoteAuthor").href = quote.link;
      document.getElementById("quoteImg").src = quote.img;
      document.getElementById("quoteAuthor").style.display = "block";
      document.getElementById("quoteImg").style.display = "block";
    }
    

}

async function getSong() {
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date();
    let secondDate = new Date("2020-11-04"); // 4 november
    let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    let song = await firebase.getSongFromDb(diffDays);
    let emb;

    if (song) {
      // get embed code
      emb = song.split("?v=")[1];
    } else {
      console.log("WE ARE OUT OF SONGS");
      emb = "PIb6AZdTr-A";
    }

    // when you have the await, if you switch links to another page which does have songID, you will get errors
    if (document.getElementById("songID")) {
      document.getElementById("songID").src = "https://www.youtube.com/embed/" + emb;
      document.getElementById("songID").style.display = "block";
    }
    
}


function Home() {
  useEffect(() => {
    getTodaysInfo();
  }); 

  return (
    <div className="Home">
      <h1>Home page</h1>
      <p>Welcome to QuickMaffs!</p>
      <br /><br /><br /><br />
      <div className="quoteSpace">
        <h3>Quote of the day</h3>
        <div className="quoteText">
          <p id="quote"></p>
          <a id="quoteAuthor" href="https://en.wikipedia.org/wiki/michael_Jordan" target="_blank" rel="noopener noreferrer" style={{display:"none"}} >test</a>
        </div>
        <img id="quoteImg" alt="quote author" style={{display:"none"}} />
      </div>
      
      <br />
      <div className="songSpace">
        <h3>Song of the day</h3>
        <iframe title="song" id="songID" width="420" height="315"  style={{display:"none"}} src=""></iframe>
      </div>
      <br /><br /><br />
    </div>
    
  );
}

export default Home;
