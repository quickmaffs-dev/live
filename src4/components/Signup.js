import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import firebase from './firebase';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const history = useHistory();
    
    useEffect(() => {        
        checkLoginStatus();
    });

    async function checkLoginStatus() {
        let user_id = await firebase.getCurrentUserID();
        if (user_id !== null) {
            history.push("/dashboard");
        }     
    }

    async function signUpUser(e) {
        e.preventDefault();
        document.getElementById("errorID").innerHTML = "";

        let pass = 0;
        if (email.length <= 100) {
            if (password.length <= 100) {
                if (email !== "") {
                    if (password !== "" && password2 !== "") {
                        if (password === password2) {
                            if (password.length >= 6) {
                                if (email.includes("@")) {
                                    if (email.length > 3) { // x@x
                                        pass = 1;
                                    } else {
                                        document.getElementById("errorID").innerHTML += "<br> " + email + " is an invalid email";    
                                    }
                                } else {
                                    document.getElementById("errorID").innerHTML += "<br> " + email + " is an invalid email";
                                }
                            } else {
                                document.getElementById("errorID").innerHTML += "<br> passwords must be > 6 characters";
                                setPassword('');
                                setPassword2('');    
                            }
                        } else {
                            document.getElementById("errorID").innerHTML = "<br> passwords dont match";
                            setPassword('');
                            setPassword2('');
                        }
                    } else {
                        document.getElementById("errorID").innerHTML = "<br> password cannot be blank";
                        setPassword('');
                        setPassword2('');
                    }
                } else {
                    document.getElementById("errorID").innerHTML = "<br> email cannot be blank";
                    setEmail('');
                }
            } else {
                document.getElementById("errorID").innerHTML = "ERR 411: invalid email";
                setPassword('');
                setPassword2('');
            }
        } else {
            document.getElementById("errorID").innerHTML = "ERR 410: invalid email";
            setEmail('');
            setPassword('');
            setPassword2('');
        }

        
        // check if we already have that email
        let user_id = 0;
        let db = "users-db";
        //let x = await firebase.database().ref(db).once('value');
        let x = await firebase.getDataBase(db);
        for (let k in x.val()) {
            if (email === x.val()[k].email) {
                document.getElementById("errorID").innerHTML += "<br> we already have an account for " + email;
                pass = 0;
            }            
        }
        
        if (pass === 1) {
            if (x.val() != null) {
                user_id = Object.keys(x.val()).length;
            }
            user_id += 1;
            await firebase.registerUser(db, email, password, user_id);
            history.push("/live");
            window.location.reload();
        }
        
        setPassword('');
        setPassword2('');
    }
    return (
        <div className="Signup">
            <br /><br />
            <h1>Signup</h1>
            <div className="formContainer">
                <form className="loginForm" onSubmit={signUpUser}>
                    <p id="errorID" style={{color : "red"}}></p>
                    <label>email:</label><br />                
                    <input type="text" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br /><br />
                    <label>password:</label><br />                
                    <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br /><br />
                    <label>password confirm:</label><br />                
                    <input type="password" value={password2} onChange={e => setPassword2(e.currentTarget.value)}/><br /><br />
                    <button>Create account</button>
                </form>
            </div>
            
        </div>      
    );
}

export default Signup;
