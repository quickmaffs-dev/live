import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import firebase from './firebase';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {        
        checkLoginStatus();
    });

    async function checkLoginStatus() {
        let user_id = await firebase.getCurrentUserID();
        if (user_id !== null) {
            history.push("/live");
        }     
    }

    async function loginUser(e) {
        e.preventDefault();
        let errorCode, errorMessage;
        
        let errMsg = "", pass = false;
        // check email string is a valid string first 
        if (email.length <= 100) {
            if (password.length <= 100) {
                if (email.includes("@")) {
                    pass = true;
                } else {
                    errMsg = "ERR 412: invalid email";
                }
            } else {
                errMsg = "ERR 411: invalid email";
                setPassword('');
            }
        } else {
            errMsg = "ERR 410: invalid email";
            setEmail('');
            setPassword('');
        }

        if (errMsg !== "") {
            setPassword('');
            document.getElementById("errorID").innerHTML = errMsg;
        }

        if (pass === true) {
            let db = "users-db";
            let x = await firebase.getDataBase(db);
            let validEmail = false;
            for (let k in x.val()) {
                if (email === x.val()[k].email) {
                    validEmail = true;
                    if (password === x.val()[k].password) {
                        console.log("all g")
                        await firebase.loginRealTime(email, password);
                    } else {
                        document.getElementById("errorID").innerHTML = "wrong password";
                        setPassword('');
                    }
                }
            }
            if (validEmail === false) {
                document.getElementById("errorID").innerHTML = "ERR 409: invalid email";
                setPassword('');
            }
    
        }
        
        if (errorCode) {
            document.getElementById("errorID").innerHTML = errorCode;
            document.getElementById("errorID").innerHTML += "<br>" + errorMessage;
            if (errorCode !== "auth/wrong-password") {
                setEmail('');
            }
            setPassword('');
        }

        

    }

    return (
        <div className="Login">
            <br /><br />
            <h1>Login</h1>
            <div className="formContainer">
                <form className = "loginForm" onSubmit={loginUser}>
                    <p id="errorID" style={{color : "red"}}></p>
                    <input type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="Email" /><br /><br />
                    <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="Password" /><br /><br />
                    <button>Login</button>
                </form>
            </div>     
        </div>      
    );
}

export default Login;
