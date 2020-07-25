import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import firebase from './firebase';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    
    async function loginUser(e) {
        e.preventDefault();
        let errorCode, errorMessage;
        
        await firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user);
            history.push("/");
        }).catch(function(error) {
            errorCode = error.code;
            errorMessage = error.message;            
        });        

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
