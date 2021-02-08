import React, {useEffect} from 'react';
import '../App.css';
import '../styling/class.css';
import { getDate, getHomeworkTopics } from './exercises/MathFunctions';
//import icon from '../img/icon.png';
import firebase from './firebase';

let user_id = 0;
let myClasses = [];
let classMembers = [];
async function checkIfUserIsLoggedIn() {
    user_id = await firebase.getCurrentUserID();
    //setUserID(user_id);
    //let em = firebase.getCurrentUsername();
    //setEmail(em);        
    if (user_id !== null) {
        if (document.getElementById("loginCheck")) {
            document.getElementById("loginCheck").innerHTML = "";
            document.getElementsByClassName("usersClass")[0].style.display = "block";
        }
        //await getMyHomework();
        await getClasses();
        console.log("good to go");
    } else {
        if (document.getElementById("loginCheck")) {
            document.getElementById("loginCheck").innerHTML = "You need to be logged in to access the classroom";
        }
    }   
}

/*
async function getMyHomework() {
    let myHomework = await firebase.getMyHomework(user_id);
    if (myHomework.length > 0) {
        let row = "<h3>My homework</h3>"
        // get min date
        let minDate = myHomework[0].date;
        for (let i = 0; i < myHomework.length; i++) {
            if (myHomework[i].date < minDate) {
                minDate = myHomework[i].date;
            }
        }
        
        // get all questions done correctly by user since the minDate
        let myQuestions = await firebase.checkHomework(user_id, minDate);

        // get the unique topics
        let myTopics = [];
        for (let i = 0; i < myQuestions.length; i++) {
            let newTopic = 1;
            for (let j = 0; j < myTopics.length; j++) {
                if (myTopics[j] === myQuestions[i]) {
                    newTopic = 0;
                    break;
                }
            }
            if (newTopic === 1) {
                myTopics.push(myQuestions[i]);
            }
        }

        // count number of correct answers per topic
        let results = [];
        for (let j = 0; j < myTopics.length; j++) {
            let n = 0;
            for (let i = 0; i < myQuestions.length; i++) {
                if (myQuestions[i] === myTopics[j]) {
                    n += 1;
                }
            }
            let r = {
                topic: myTopics[j]
                , n: n
            }
            results.push(r);
        }

        for (let i = 0; i < myHomework.length; i++) {            
            let n = 0;
            for (let j = 0; j < results.length; j++) {
                if (results[j].topic === myHomework[i].topic) {
                    n = results[j].n;
                    break;
                }
            }
            if (n >= myHomework[i].questions) {
                await firebase.updateHomework(user_id, myHomework[i].topic);
                getMyHomework();
            } else {
                row += "<div>";
                row += "<h3>class : " + myHomework[i].cid + "</h3>";
                row += "<p>topic : " + myHomework[i].topic + "</p>";
                row += "<p>questions to complete : " + myHomework[i].questions + "</p>";
                row += "<p>you have completed : " + n + "</p>";
                row += "</div>";
            }            
        }

        if (document.getElementsByClassName("homeworkList")[0]) {
            document.getElementsByClassName("homeworkList")[0].innerHTML = row;
        }

        // show classes
    } else {
        if (document.getElementsByClassName("homeworkList")[0]) {
            document.getElementsByClassName("homeworkList")[0].innerHTML = "You have no homework";
        }
    }
}

async function getClasses2() {
    myClasses = await firebase.getMyClassLists(user_id);
    if (myClasses.length > 0) {
        let row = "";
        for (let i = 0; i < myClasses.length; i++) {
            let myClassDetails = await firebase.getClassDetails(myClasses[i]);
            //let uName = await firebase.getClassUsername(user_id);
            let admin = await firebase.getClassUsername(myClassDetails.aid);
            let members = await firebase.getClassMembers(myClassDetails.cid);
            row += "<div>";
            row += "<h2>" + myClassDetails.className + " ==>(maybe just show posts here)</h2>";
            if (user_id === admin.id) {
                row += "<p class='classPass'>XXXXXX</p><button class='classPassBtn' value='" + myClassDetails.pass + "'>show password</button>";
            }
            row += "<p><b>Admin:</b> " + admin.email + "</p>";            
            row += "<hr>";
            row += "<p><b>Members</b></p>";
            if (members.length > 1) {
                // get class members
                for (let i = 0; i < members.length; i++) {
                    if (members[i].id !== admin.id) {
                        row += "<p>" + members[i].email;
                        if (user_id === admin.id) {
                            row += "<button class='kickUserBtn' value='" + [myClassDetails.cid, members[i].id] + "'>kick</button>"
                        }
                        row += "</p>";
                    }

                }
                row += "<hr>";
                row += "<p><b>Homework</b></p>";
                if (user_id === admin.id) {
                    row += "<select class='homeworkTopics'></select>"
                    row += "<input class='homeworkQuestions' placeholder='number of questions...'></input>"
                    row += "<button class='homeworkBtn' value='" + myClassDetails.cid + "'>add homework</button><br>";

                    let hwork = await firebase.getHomework(myClassDetails.cid);
                    if (hwork.length > 0) {
                        row += "<table><tbody><tr><th>topic</th><th>points</th><th>completed</th><th>incompleted</th></tr>";
                        for (let i = 0; i < hwork.length;  i++) {
                            if (hwork[i].user_id !== admin.id) {
                                let u = await firebase.getClassUsername(hwork[i].user_id);
                                if (hwork[i].done === 0) {
                                    row += "<tr><td>" + hwork[i].topic + "</td><td>" + hwork[i].questions + "</td><td></td><td>" + u.email + "</td></tr>";
                                } else {
                                    row += "<tr><td>" + hwork[i].topic + "</td><td>" + hwork[i].questions + "</td><td>" + u.email + "</td><td></td></tr>";
                                }
                            }                        
                        }
                        row += "</tbody></table>";
                    }
                }
                
            } else {
                row += "<p>There are no members currently in this class. Add users to give them homework and track progress.</p>";
            }

            row += "</div><br>";            
        }
        if (document.getElementsByClassName("classList")[0]) {
            document.getElementsByClassName("classList")[0].innerHTML = row;
        }

        // show classes
    } else {
        if (document.getElementsByClassName("classList")[0]) {
            document.getElementsByClassName("classList")[0].innerHTML = "You are not in any classes";
        }
    }
    getTopics();
    classPasswords();
    await kickUsers();
    await addHomework();
}
*/
async function getClasses() {    
    // show spinner
    if (document.getElementsByClassName("classList spinner loading")[0]) {
        document.getElementsByClassName("classList spinner loading")[0].style.display = "block";
    }
    myClasses = await firebase.getMyClasses(user_id);
    let classIds = [];
    for (let i = 0; i < myClasses.length; i++) {
        classIds.push(myClasses[i].cid);
    }
    classMembers = await firebase.getAllClassMembers(classIds);

    let adminIds = [];
    for (let i = 0; i < myClasses.length; i++) {
        adminIds.push(myClasses[i].aid);
    }
    adminIds = [...new Set(adminIds.map(item => item))]; // get unique array items
    let adminDetails = await firebase.getUsersPublicDetails(adminIds);

    let homeworkDetails = await firebase.getAllHomework(classIds);
    homeworkDetails.sort((a, b) => (a.topic > b.topic) ? 1 : -1); // sort by topic

    let homeworkDates = [];
    let topics = [];
    for (let i = 0; i < homeworkDetails.length; i++) {
        if (user_id === homeworkDetails[i].uid && homeworkDetails[i].done === 0) {
            homeworkDates.push(homeworkDetails[i].date);
            topics.push(homeworkDetails[i].topic);
        }
    }
    let minDate = Math.min.apply(null, homeworkDates);
    topics = [...new Set(topics.map(item => item))]; // get unique array items

    let myWorkCompleted = await firebase.getMyCompletedWork(user_id, minDate, topics);

    //myClassmates = await firebase.getMyClassmates(myClasses);
    if (myClasses.length > 0) {
        let row = "";
        for (let i = 0; i < myClasses.length; i++) {
            row += "<div>";
            row += "<h2>" + myClasses[i].className + "</h2>";
            if (user_id === myClasses[i].aid) {
                row += "<p class='classPass'>XXXXXX</p><button class='classPassBtn' value='" + myClasses[i].classPass + "'>show password</button>";
            }
            let adminUsername = "";
            for (let j = 0; j < adminDetails.length; j++) {
                if (myClasses[i].aid === adminDetails[j].uid) {
                    adminUsername = adminDetails[j].username;
                    break;
                }
            }
            row += "<p><b>Admin:</b> " + adminUsername + "</p>";

            // show class members
            row += "<hr>";
            row += "<p><b>Members</b></p>";
            let noMembers = 1;
            for (let j = 0; j < classMembers.length; j++) {
                if (classMembers[j].cid === myClasses[i].cid && classMembers[j].uid !== user_id && classMembers[j].uid !== 0) {
                    noMembers = 0;
                    row += "<p>" + classMembers[j].username;
                    if (user_id === myClasses[i].aid) {
                        row += "<button class='kickUserBtn' value='" + [classMembers[j].cid, classMembers[j].uid] + "'>kick</button>"
                    }
                    row += "</p>";
                }
            }

            if (noMembers === 1) {
                row += "<p>There are no members currently in this class. Add users to give them homework and track progress.</p>";
            } else {
                // show homework (for admin only)
                row += "<hr>";
                row += "<p><b>Homework</b></p>";
                let noHomework = 1;
                if (user_id === myClasses[i].aid) {
                    row += "<select class='homeworkTopics'></select>"
                    row += "<input class='homeworkQuestions' placeholder='number of questions...'></input>"
                    row += "<button class='homeworkBtn' value='" + myClasses[i].cid + "'>add homework</button><br><br>";

                    for (let j = 0; j < homeworkDetails.length; j++) {                        
                        if (myClasses[i].cid === homeworkDetails[j].cid && homeworkDetails[j].uid !== myClasses[i].aid) {
                            if (noHomework === 1) {
                                row += "<table><tbody><tr><th>Topic</th><th>Q's</th><th>Completed</th><th>Incompleted</th></tr>";
                            }
                            noHomework = 0;
                            // get user details
                            let uName = "";
                            for (let k = 0; k < classMembers.length; k++) {
                                if (homeworkDetails[j].uid === classMembers[k].uid && myClasses[i].cid === classMembers[k].cid) {
                                    uName = classMembers[k].username;
                                    break;
                                }
                            }
                            if (uName !== "") {
                                if (homeworkDetails[j].done === 0) {
                                    row += "<tr><td>" + homeworkDetails[j].topic + "</td><td style='text-align:center'>" + homeworkDetails[j].questions + "</td><td></td><td>" + uName + "</td></tr>";
                                } else {
                                    row += "<tr><td>" + homeworkDetails[j].topic + "</td><td style='text-align:center'>" + homeworkDetails[j].questions + "</td><td>" + uName + "</td><td></td></tr>";
                                }
                            }                            
                        }
                    }
                    row += "</tbody></table>";
                } else {
                    for (let j = 0; j < homeworkDetails.length; j++) {
                        if (myClasses[i].cid === homeworkDetails[j].cid && homeworkDetails[j].uid === user_id && homeworkDetails[j].done === 0) {
                            noHomework = 0;
                            let numCompleted = 0;
                            for (let k = 0; k < myWorkCompleted.length; k++) {
                                if (myWorkCompleted[k] === homeworkDetails[j].topic) {
                                    numCompleted += 1;
                                }
                            }
                            if (numCompleted >= homeworkDetails[j].questions) {
                                await firebase.updateHomework(user_id, homeworkDetails[j].topic);
                                await getClasses();
                            }

                            row += "<li>" + homeworkDetails[j].topic + ": " + numCompleted + "/" + homeworkDetails[j].questions + " questions</li>";
                        }
                    }
                }

                if (noHomework === 1) {
                    row += "<p>There is no homework assigned for this class</p>";
                }
            }
            
            row += "</div><br>";
        }
        if (document.getElementsByClassName("classList")[0]) {
            document.getElementsByClassName("classList")[0].innerHTML = row;
        }
    } else {
        if (document.getElementsByClassName("classList")[0]) {
            document.getElementsByClassName("classList")[0].innerHTML = "You are not in any classes. Join a class or create your own";
        }
    }
    if (document.getElementsByClassName("classList spinner loading")[0]) {
        document.getElementsByClassName("classList spinner loading")[0].style.display = "none";
    }
    getTopics();
    classPasswords();
    await kickUsers();
    await addHomework();
}

function getTopics() {
    let topics = getHomeworkTopics();
    if (document.getElementsByClassName("homeworkTopics")[0]) {
        let sel = document.getElementsByClassName("homeworkTopics");
        for (let j = 0; j < sel.length; j++) {
            sel[j].innerHTML += "<option selected disabled>Choose topic</option>"
            for (let i = 0; i < topics.length; i++) {
                let v = topics[i];
                sel[j].innerHTML += "<option value='" + v +"'>" + v + "</option>";
            }
        }
    }
}

async function addHomework() {
    if (document.getElementsByClassName("homeworkBtn")[0]) {
        let btn = document.getElementsByClassName("homeworkBtn");
        let sel = document.getElementsByClassName("homeworkTopics");
        let pts = document.getElementsByClassName("homeworkQuestions");
        let cMembers = classMembers;
        for (let i = 0; i < btn.length; i++) {
            btn[i].onclick = async function() {
                let cid = parseInt(btn[i].value);
                let topic = sel[i].value;
                let p = pts[i].value;
                let d = getDate();
                if (topic !== "Choose topic") {
                    if (isNaN(p)) {
                        writeNotification(p + " questions is invalid");
                    } else {
                        if (p !== "") {
                            if (parseInt(p) > 0) {
                                await firebase.addHomework(cid, cMembers, topic, parseInt(p), d);
                                await getClasses();
                            }
                        }
                    }
                }            
            }
        }
    }
}

async function kickUsers() {
    if (document.getElementsByClassName("kickUserBtn")[0])  {
        let btn = document.getElementsByClassName("kickUserBtn");
        for (let i = 0; i < btn.length; i++) {
            btn[i].onclick = async function() {
                let k = btn[i].value;
                k = k.split(",");
                let class_id = parseInt(k[0]);
                let member_id = parseInt(k[1]);
                await firebase.kickClassmate(class_id, member_id);
                await getClasses();
            }
        }
    }
}

function classPasswords() {
    if (document.getElementsByClassName("classPassBtn")[0]) {
        let btn = document.getElementsByClassName("classPassBtn");
        for (let i = 0; i < btn.length; i++) {
            btn[i].onclick = function(){
                if (document.getElementsByClassName("classPass")[i].innerHTML !== "XXXXXX") {
                    document.getElementsByClassName("classPass")[i].innerHTML = "XXXXXX";
                    document.getElementsByClassName("classPassBtn")[i].innerHTML = "show password";
                } else {
                    document.getElementsByClassName("classPass")[i].innerHTML = btn[i].value;
                    document.getElementsByClassName("classPassBtn")[i].innerHTML = "hide password";
                }
            }
        }
    }
}

async function addNewClass() {
    if (document.getElementById("formInput")) {
        let className = document.getElementById("formInput").value;
        // check admin has no duplicates
        if (className) {
            if (className.match("^[A-Za-z0-9 ]+$")) { // check strings are letters numbers only
                if (className.length >= 6) {
                    if (className.length <= 30) {
                        let duplicate = 0;
                        if (myClasses) {
                            for (let i = 0; i < myClasses.length; i++) {
                                let myClassDetails = await firebase.getClassDetails(myClasses[i]);
                                if (myClassDetails.class_name === className) {
                                    duplicate = 1;
                                    writeNotification("You already have a class named <i>" + className + "</i>");
                                    break;
                                }
                            }
                        }
                        if (duplicate === 0) {
                            await firebase.addNewClass(user_id, className);
                            await getClasses();
                        }
                    } else {
                        writeNotification("<i>" + className.substring(0, 30) + "...</i> is invalid, cannot be larger than 30 characters");
                    }
                } else {
                    writeNotification("<i>" + className + "</i> is invalid, must be at least 6 characters");
                }
            } else {
                writeNotification("<i>" + className + "</i> is invalid, letters and numbers only please");
            }
        } else {
            writeNotification("Class name cannot be blank");
        }
        if (document.getElementById("newClassName")) {
            document.getElementById("newClassName").value = "";
        }
    }
}

async function joinClass() {
    if (document.getElementById("formInput")) {
        let passcode = document.getElementById("formInput").value;    
        if (passcode) {
            if (passcode.length === 6) {
                let msg = await firebase.joinClassCode(user_id, passcode);
                if (msg.includes("Success")) {
                    await getClasses();
                }
                writeNotification(msg);
            } else {
                writeNotification("invalid passcode");
            }
        }
    }
}

function closeNotification() {
    document.getElementsByClassName("notification")[0].style.display = "none";
    document.getElementsByClassName("notificationShade")[0].style.display = "none";        
}

function writeNotification(msg) {
    document.getElementById("noteText").innerHTML = msg;
    document.getElementsByClassName("notification")[0].style.display = "block";
    document.getElementsByClassName("notificationShade")[0].style.display = "block";        

}

function openShade(option) {
    // turn off btns and open shades
    if (document.getElementsByClassName("form")[0]) {
        document.getElementsByClassName("create")[0].style.display = "none";
        document.getElementsByClassName("join")[0].style.display = "none";
        document.getElementsByClassName("create")[1].style.display = "none";
        document.getElementsByClassName("join")[1].style.display = "none";
        document.getElementsByClassName("cancelForm")[0].style.display = "inline-block";
        document.getElementsByClassName("form")[0].style.transition = "all 2s";
        document.getElementsByClassName("form")[0].style.display = "block";
        document.getElementsByClassName("form")[0].style.top = "0";
        
        if (option === "create") {
            document.getElementsByClassName("create")[1].style.display = "inline-block";
            document.getElementById("formLabel").innerHTML = "Classname:";
            document.getElementById("formInput").placeholder = "new class name...";
        } else {
            document.getElementsByClassName("join")[1].style.display = "inline-block";
            document.getElementById("formLabel").innerHTML = "Class passcode:";
            document.getElementById("formInput").placeholder = "class passcode...";
        }
    }

}

function closeShade() {
    if (document.getElementsByClassName("form")[0]) {
        document.getElementsByClassName("create")[0].style.display = "inline-block";
        document.getElementsByClassName("join")[0].style.display = "inline-block";
        document.getElementsByClassName("form")[0].style.display = "none";
    }    
}

function Class() {
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }); 

  return (
    <div className="Class">
        <h1>Classroom</h1>
        <p id="loginCheck">Checking login status...</p>
        <div className="usersClass" style={{display: "none"}}>
            <div className="notificationShade" style={{display:"none"}}></div>
            <div className="notification" style={{display:"none"}}>
                <p id="noteText">This is a message</p>
                <button onClick={closeNotification}>OK</button>
            </div>
            
            <div className="newClass">
                <button className="create" onClick={() => openShade("create")}>Create class</button>
                <button className="join" onClick={() => openShade("join")}>Join class</button>
                <div className="form" style={{display:"none"}}>
                    <label id="formLabel">Classname:</label>
                    <input id="formInput" placeholder="new class name..."></input>
                    <br /><br /><br />
                    <span>
                        <button className="cancelForm" onClick={closeShade}>Cancel</button>
                        <button className="create" onClick={addNewClass}>Create class</button>
                        <button className="join" onClick={joinClass} >Join class</button>
                    </span>                    
                </div>
            </div>
            <br />

            <h3>My classes</h3>
            
            {/*<p className="homeworkList">Getting homework lists...</p>*/}

            <p className="classList">Getting class lists...</p>      
            <div className="classList spinner loading"></div>
            
            <br /><br /><br />
        </div>        
    </div>
    
  );
}

export default Class;
