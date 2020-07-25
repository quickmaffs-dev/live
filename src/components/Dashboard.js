import React, {useEffect, useState, useRef} from 'react';
import firebase from './firebase';

const Dashboard = () => {
    const [email, setEmail] = useState('');
    const isMountedRef = useRef(null);
    
    useEffect(() => {
      isMountedRef.current = true;
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            if(isMountedRef.current) {
              setEmail(user.email);
              getResults();
            }
          } else {
            if(isMountedRef.current) {
              setEmail('');
              noUser();
            }
          }
      });
      return () => isMountedRef.current = false;
    }); 
    
    function noUser() {
        document.querySelectorAll(".results")[0].style.display = "none";
        document.getElementById("dashboardTextID").innerHTML = "You need to sign in to see your dashboard.";
    }

    async function getResults() {        
        document.getElementById("dashboardTextID").innerHTML = "";
        let user_id;
        await firebase.firestore().collection('math-user-db').where("email", "==", email).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                user_id = doc.data().user_id;
            });
        });
        let num_correct = 0;
        let total = 0;
        if (user_id) {
            let chps = [];
            await firebase.firestore().collection('math-question-new-db').where("user_id", "==", user_id).orderBy("chapter").get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    let chapter = doc.data().chapter;
                    chps.push(chapter);
                    if (doc.data().result === 1) {
                        num_correct += 1;
                    }
                    total += 1;
                });
            });
            showResults(num_correct, total, user_id);

            // show more complex results
            // get list of uniques chapters
            chps = [...new Set(chps)];
            await printTable("", chps, user_id, chps.length);
            //let c = chapter.split("ex")[0];
            //let ex = "ex" + chapter.split("ex")[1];
        }
    }
    async function printTable(row, chps, user_id, n) {
        let num_correct = 0;
        let total = 0;
        let score = 0;
        if (n > 0) {
            n -= 1;
            await firebase.firestore().collection('math-question-new-db').where("user_id", "==", user_id).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    //if (doc.data().chapter === chps[i]) {
                    if (doc.data().chapter === chps[n]) {
                        if (doc.data().result === 1) {
                            num_correct += 1;
                        }
                        total += 1;
                    }
                });
                score = Math.floor(100 * num_correct / total);
                row += "<tr><td>" + chps[n] + "</td><td>" + num_correct + "</td><td>" + total + "</td><td>" + score + "%</td>";
                printTable(row, chps, user_id, n);
            });
        }
        document.querySelectorAll(".tableResults")[0].innerHTML = "<table><tr><th>Chapter</th><th>Correct</th><th>Total</th><th>Score</th>" + row + "</table>";
    }
    function showResults(num_c, tot) {
        document.querySelectorAll(".results")[0].style.display = "block";
        let correctText = "You scored " + num_c + " correct";
        let incorrectText = "You scored " + (tot - num_c) + " incorrect";
        let totalText = "Score is " + Math.floor(100 * num_c / tot) + "%";
        document.getElementById("correct").innerHTML = correctText;
        document.getElementById("incorrect").innerHTML = incorrectText;
        document.getElementById("total").innerHTML = totalText;
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
