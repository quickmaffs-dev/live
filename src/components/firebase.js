import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import app from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAHN7qi76sqh-ZHSlAGryJEbTvxcsvFJaY",
    authDomain: "user-database-test-9ee1d.firebaseapp.com",
    databaseURL: "https://user-database-test-9ee1d.firebaseio.com",
    projectId: "user-database-test-9ee1d",
    storageBucket: "user-database-test-9ee1d.appspot.com",
    messagingSenderId: "425239506606",
    appId: "1:425239506606:web:decf3cc0780d2d8e9d073f"
};

/*
//const fire = firebase.initializeApp(firebase);
firebase.initializeApp(firebaseConfig);

export default firebase;
*/

class Firebase {
    
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore;
        this.currentUserID = 0;
        this.currentUsername = "";        
    }

    async registerUser(db, em, pass, u_id) {
        // add to database
        await firebase.database().ref(db).push({
            email: em
            , password: pass
            , user_id: u_id
        });
        this.currentUserID = u_id;
        await this.loginRealTime(em, pass);
    }
    async addQToDb(db, post) {
        let x = await firebase.database().ref(db).once('value');
        let q_id = Object.keys(x.val()).length + 1;        
        await firebase.database().ref(db).push({
            question_id: q_id
            , question_string: post[0]
            , user_answer: post[1]
            , correct_answer: post[2]
            , result: post[3]
            , user_id: post[4]
            , chapter: post[5]
        });
    }

    getCurrentUserID() {
        this.currentUserID = null;
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem("QuickM_u_id") !== null && localStorage.getItem("QuickM_u_id") !== "null") {
                this.currentUserID = parseInt(localStorage.getItem("QuickM_u_id"));
            }
        }
		return this.currentUserID;
    }

    async getCurrentUsername() {
        let u_id = this.getCurrentUserID();
        this.currentUsername = null;
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        for (let k in x.val()) {
            if (u_id === x.val()[k].user_id) {
                this.currentUsername = x.val()[k].email;
            }
        }
        return this.currentUsername;
    }
    
    async loginRealTime(em, pass) {
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        for (let k in x.val()) {
            if (em === x.val()[k].email) {
                if (pass === x.val()[k].password) {
                    this.currentUserID = x.val()[k].user_id;
                    this.currentUsername = x.val()[k].email;
                    window.location.reload();

                    if (typeof(Storage) !== "undefined") {
                        let keyObj = this.currentUserID;
                        localStorage.setItem("QuickM_u_id", JSON.stringify(keyObj));
                    } else {
                        console.log("Browser does not support Web Storage, youll have to log in on each refresh");
                    }  
                } else {
                    console.log("wrong pass");
                    document.getElementById("errorID").innerHTML += "<br> wrong password ";                    
                }
            }            
        }
    }

    logUserOut() {
        this.currentUserID = null;
        if (typeof(Storage) !== "undefined") {
            let keyObj = this.currentUserID;
            localStorage.setItem("QuickM_u_id", JSON.stringify(keyObj));            
        }
		return this.currentUserID;
    }

    async getDataBase(db) {
        let x = await firebase.database().ref(db).once('value');
        return x;
    }
}

export default new Firebase();