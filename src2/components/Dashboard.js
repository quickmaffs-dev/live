//import React, {useEffect, useState, useContext} from 'react';
import React, {useEffect} from 'react';
import firebase from './firebase';
//import { UserContext } from "./UserContext";
const Dashboard = () => {
    //const [email, setEmail] = useState('');
    //const [userID, setUserID] = useContext(UserContext);
    
    //const isMountedRef = useRef(null);
    useEffect(() => {
        checkIfUserIsLoggedIn();
             
    });

    async function checkIfUserIsLoggedIn() {
        let user_id = await firebase.getCurrentUserID();
        //setUserID(user_id);
        //let em = firebase.getCurrentUsername();
        //setEmail(em);        
        if (user_id !== null) {
            getResults(user_id);
        } else {
            noUser();
        }   
    }

    function noUser() {
        document.querySelectorAll(".results")[0].style.display = "block";
        document.getElementById("dashboardTextID").innerHTML = "You need to sign in to see your results.";
        if (1 === 2) printLocalResults();
    }

    function printLocalResults() {
        // get distinct chapters first
        let allChapters = [];
        let numCorrect = [];
        let total = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes("QuickMaffs")) {
                //document.getElementById("dashboardTextID").innerHTML += "<br>" + localStorage.getItem(localStorage.key(i));
                /*
                let loc = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if (!allChapters.includes(loc.chapter)) {
                    allChapters.push(loc.chapter);
                }
                */
                let newChapter = true;
                let loc = JSON.parse(localStorage.getItem(localStorage.key(i)));
                for (let x = 0; x < allChapters.length; x++) {
                    if (allChapters[x] === loc.chapter) {
                        newChapter = false;
                        numCorrect[x] += loc.result;
                        total[x] += 1;
                    }
                }
                if (newChapter === true) {
                    let x = allChapters.length;
                    allChapters[x] = loc.chapter;
                    numCorrect[x] = loc.result;
                    total[x] = 1;
                }
            }
        }

        let row = "";
        for (let n = 0; n < allChapters.length; n++) {
            row += "<tr><td>" + allChapters[n] + "</td><td>" + numCorrect[n] + "</td><td>" + total[n] + "</td><td>" + (100 * numCorrect[n] / total[n]).toFixed(0) + "%</td>";
        }
        document.querySelectorAll(".tableResults")[0].innerHTML = "<table><tr><th>Chapter</th><th>Correct</th><th>Total</th><th>Score</th>" + row + "</table>";
        //document.getElementById("dashboardTextID").innerHTML += "<table><tr><th>Chapter</th><th>Correct</th><th>Total</th><th>Score</th>" + row + "</table>";
        
    }

    async function getResults(u_id) {
        console.log("u_id is " + u_id);
        
        let allChapters = [];
        let numCorrect = [];
        let total = [];
        let row = "";

        let db = "question-db";
        //let x = await firebase.database().ref(db).once('value');

        let x = await firebase.getDataBase(db);
        for (let k in x.val()) {
            if (x.val()[k].user_id === u_id) {
                let loc = x.val()[k];
                let newChapter = true;
                for (let x = 0; x < allChapters.length; x++) {
                    if (allChapters[x] === loc.chapter) {
                        newChapter = false;
                        numCorrect[x] += loc.result;
                        total[x] += 1;
                    }
                }
                if (newChapter === true) {
                    let x = allChapters.length;
                    allChapters[x] = loc.chapter;
                    numCorrect[x] = loc.result;
                    total[x] = 1;
                }
                //console.log(k + " -> " + x.val()[k].question_string);
            }            
        }

        for (let i = 0; i < allChapters.length; i++) {
            row += "<tr><td>" + allChapters[i] + "</td><td>" + numCorrect[i] + "</td><td>" + total[i] + "</td><td>" + (100 * numCorrect[i] / total[i]).toFixed(0) + "%</td>";
        }
        document.querySelectorAll(".tableResults")[0].innerHTML = "<table><tr><th>Chapter</th><th>Correct</th><th>Total</th><th>Score</th>" + row + "</table>";
        showResults(1, 1);
    }

    function showResults(num_c, tot) {
        document.querySelectorAll(".results")[0].style.display = "block";
        //let correctText = "You scored " + num_c + " correct";
        //let incorrectText = "You scored " + (tot - num_c) + " incorrect";
        //let totalText = "Score is " + Math.floor(100 * num_c / tot) + "%";
        //document.getElementById("correct").innerHTML = correctText;
        //document.getElementById("incorrect").innerHTML = incorrectText;
        //document.getElementById("total").innerHTML = totalText;
    }
    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
            <p id="dashboardTextID"></p>
            <div className="results" style={{display: "none"}}>
                <p id="correct" style={{color: "green"}}></p>
                <p id="incorrect" style={{color: "red"}}></p>
                <p id="total"></p>
                <div className="tableResults"></div>
            </div>
        </div>      
    );
}

export default Dashboard;
