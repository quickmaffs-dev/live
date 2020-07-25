import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import firebase from './firebase';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const history = useHistory();
    
    async function signUpUser(e) {
        e.preventDefault();
        // check that fields are not blank
        document.getElementById("errorID").innerHTML = "";
        let pass = 1;
        if (email === "") {
            document.getElementById("errorID").innerHTML += "<br> email cannot be blank";
            pass = 0;
            setEmail('');
        }
        if (password === "" || password2 === "") {
            document.getElementById("errorID").innerHTML += "<br> password cannot be blank";
            pass = 0;
        }

        // check that passwords match
        if (password !== password2) {
            document.getElementById("errorID").innerHTML += "<br> passwords dont match";
            pass = 0;
        }

        // check that passwords > 6 characters
        if (password.length < 6) {
            document.getElementById("errorID").innerHTML += "<br> passwords must be > 6 characters";
            pass = 0;
        }

        // check that email is valid
        if (!email.includes("@")) {
            document.getElementById("errorID").innerHTML += "<br> " + email + " is an invalid email";
            pass = 0;
        }

        // check if we already have that email
        let user_id = 0;
        await firebase.firestore().collection('math-user-db').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                //console.log("email is " + doc.data().email);
                user_id += 1;
                if (email === doc.data().email) {
                    document.getElementById("errorID").innerHTML += "<br> we already have an account for " + email;
                    pass = 0;
                }
            });
        });

        user_id += 1;
        
        if (pass === 1) {
            // add to database
            firebase.firestore().collection('math-user-db').add({email, password, user_id}).then(() => {
                setEmail('')
                setPassword('')
            });

            // authenticate user
            let errorCode, errorMessage;
            firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
                console.log(cred.user);
                history.push("/");
            }).catch(function(error) {
                errorCode = error.code;
                errorMessage = error.message;
            });
            if (errorCode) {
                document.getElementById("errorID").innerHTML = errorCode;
                document.getElementById("errorID").innerHTML += "<br>" + errorMessage;
            }
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
