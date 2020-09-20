import React, {useEffect } from 'react';
import '../styling/battle.css';
import {getRandomNumber, answerType, checkUserInputAns, reset, mcBtn, shuffle} from './exercises/MathFunctions';
import {multiplicationAndDivision, fractions} from './exercises/algebra/algebra_exercises';
//import { useHistory } from "react-router-dom";
import firebase from './firebase';

import WorkspaceQuestion from './WorkspaceQuestion';

const Battle = () => {
    let numQuestions = 0;
    let question_string = 0;    
    let pass = 0;
    let myInterval;
    let max_score = 500;
    let playerUsername;
    let game_over = 0;
    let penalty = 0;
    //const history = useHistory();

    useEffect(() => {  
        checkLoginStatus();        
    }); 
    
    async function checkLoginStatus() {
        let user_id = await firebase.getCurrentUserID();
        if (user_id !== null) {
            pass = 1;
            //history.push("/dashboard");
        }     

        if (pass === 1) {
            document.getElementById("loginCheckMsgID").style.display = "none";
            document.getElementById("beginBattleBtnID").style.display = "block";
            document.getElementById("battleUserID").style.display = "block";
            // get username
            if (typeof(Storage) !== "undefined") {
                //if (localStorage.key(i).includes("QuickM_battle_username")) {
                let key = "QuickM_battle_username";
                if (localStorage.getItem(key) !== null) {
                    playerUsername = localStorage.getItem(key);
                    console.log("username is stored " + playerUsername);
                    document.getElementById("battleUserID").value = playerUsername;
                } else {
                    console.log("no username");
                }
                //localStorage.setItem(key, playerUsername);
            } else {
                console.log("Browser does not support Web Storage");
            }  
        }
    }

    async function beginBattle() {
        // store username
        playerUsername = document.getElementById("battleUserID").value;
        playerUsername = playerUsername.slice(0, 11);
        if (typeof(Storage) !== "undefined") {
            //if (localStorage.key(i).includes("QuickM_battle_username")) {
            let key = "QuickM_battle_username";
            localStorage.setItem(key, playerUsername);
        } else {
            console.log("Browser does not support Web Storage");
        }  
        document.getElementById("battleUserID").style.display = "none";
        document.getElementsByClassName("scoresListUsername")[0].innerHTML = playerUsername;

        document.getElementById("beginBattleBtnID").style.transition = "all 1s";
        document.getElementById("beginBattleBtnID").style.opacity = "0";
        await printLoadingScreen();
        document.getElementById("beginBattleBtnID").style.display = "none";
        document.getElementById("loadingBattleTextID").style.display = "none";
        await sleep(1000);

        // show home screen
        document.getElementsByClassName("welcome")[0].style.display = "block";
        await findOpponents();
        await countDown();
        document.getElementsByClassName("scoresList")[0].style.display = "block";        
        myInterval = setInterval(showScores, 1000);
        makeQuestion();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function printLoadingScreen() {
        let loadingPercent = 0;
        while (loadingPercent < 100) {
            document.getElementById("loadingBattleTextID").innerHTML = "Loading ... " + loadingPercent + "%";
            loadingPercent += getRandomNumber(10, 20, 0, 0);
            await sleep(getRandomNumber(500, 1500, 0, 0));
        } 
        document.getElementById("loadingBattleTextID").innerHTML = "Loading ... 100%";
        await sleep(1000);
        document.getElementById("loadingBattleTextID").style.transition = "all 3s";
        document.getElementById("loadingBattleTextID").style.opacity = "0";
        setTimeout(function() {document.getElementById("loadingBattleTextID").style.display = "none";}, 3000);
    }

    async function countDown() {
        if (numQuestions < 1) {
            // countdown
            document.getElementById("countDownID").style.display = "block";
            for (let count = 3; count > 0; count--) {
                document.getElementById("countDownID").innerHTML = "Battle begins in " + count;
                await sleep(1000);
            }
            document.getElementById("countDownID").style.display = "none";
        }
    }

    async function findOpponents() {
        document.getElementById("playersOnlineID").innerHTML = "Total players currently online: " + getRandomNumber(20, 40, 0, 0);
        document.getElementsByClassName("findOpponentsList")[0].style.display = "block";
        let numPlayers = 1;
        document.getElementsByClassName("findOpponent")[0].style.display = "none";
        document.getElementsByClassName("foundOpponent")[0].style.display = "block";
        document.getElementsByClassName("foundOpponent")[0].innerHTML = playerUsername;
        
        while (numPlayers < 6) {
            await sleep(getRandomNumber(1000, 6000, 0, 0));
            /*
            document.getElementsByClassName("findOpponent")[numPlayers].style.transition = "all 2s";
            document.getElementsByClassName("findOpponent")[numPlayers].innerHTML = "Player found";
            document.getElementsByClassName("findOpponent")[numPlayers].style.backgroundColor = "#DEDEDE";
            */
            document.getElementsByClassName("findOpponent")[numPlayers].style.display = "none";
            document.getElementsByClassName("foundOpponent")[numPlayers].style.display = "block";
            numPlayers += 1;
        } 
        
        await sleep(1000);
        for (let i = 0; i < document.getElementsByClassName("foundOpponent").length; i++) {
            document.getElementsByClassName("foundOpponent")[i].style.transition = "all 3s";
            document.getElementsByClassName("foundOpponent")[i].style.opacity = "0";
        }        
        setTimeout(function() {document.getElementsByClassName("findOpponentsList")[0].style.display = "none";}, 3000);
        await sleep(3000);

        let names1 = ['Pill Cosby', 'Claustrophobic Teletubby', 'Mr.stark I don’t feel so good', 'HortonHearsAJew', 'Kahoot the Teacher', 'Honey wheres my super kah00t', 'Nerdy-Poo', 'KahToot', 'Loud Mouth', 'Inky', 'Chunkie', 'Confused Teletuby', 'KaShootMe', 'Sub2PewDiePie', 'Kim Jong Uno', 'Comedy Central', 'Homer', 'Couch Potato', 'Kashoot me', 'Kim Jong OOF', 'Moe Lester', 'Third Wheeler', 'Nugget', 'Kashoot da teacher', 'Chungus the fungus', 'Kermit Kermicide', 'Lil Diabetus', 'Big Chungus', 'Walking Dictionary'];
        document.getElementsByClassName("scoresListUsername")[1].innerHTML = names1[getRandomNumber(0, names1.length-1, 0, 0)].slice(0, 11);;
        let names2 = ['Summer Teeth', 'Gucci Flippidy Flops', 'Johnny Johnny', 'Weird Beard', 'Kermit', 'Deja View', 'Fire Guy', 'Fuzzy Pack', 'Butternut', 'Organic Punk', 'Chris P Chicken', 'Ligma', 'Kool Kids Klub', 'Married Man', 'Metal Star', 'Ctrl W = Win', 'Peter file', 'TRIGGERED', 'Nerf Bastion', 'Billy Hills', 'Night Magnet', 'Dancing Madman', 'Egghead', 'Babysaurus', 'Enigma', 'Eye Candy', 'Cheeky Monkey', 'Butter Scotch', 'Junior Jumper', 'Floating Heart', 'Loading…', 'Yeet or be Yeeted'];
        document.getElementsByClassName("scoresListUsername")[2].innerHTML = names2[getRandomNumber(0, names2.length-1, 0, 0)].slice(0, 11);;
        let names3 = ['Sassy Muffin', 'Canary Apple Red', 'Woodland Beauty', 'Miss Fix It', 'Miss Meow', 'Emerald Goddess', 'Marshmallow Treat', 'Leading Light', 'Queen Bee', 'Microwave Chardonnay', 'Gentle Woman', 'Cute Pumpkin', 'Titanium Ladybug', 'Freeze Queen', 'Young Lady', 'Winner Woman', 'Wonk Sidewalk', 'EnforcerTeen', 'Me Miss', 'Undergrad Split', 'Triple Adorable', 'Her Majesty', 'Cinderella', 'The Beekeeper', 'Cool Whip', 'Digital Goddess', 'Peanut Butter Woman', 'Fresh Lovely', 'Fisher Teen', 'Lady Turnip', 'Luna Star', 'Princess Fuzzie', 'Rainbow Sweety'];
        document.getElementsByClassName("scoresListUsername")[3].innerHTML = names3[getRandomNumber(0, names3.length-1, 0, 0)].slice(0, 11);;
        let names4 = ['Pink Nightmare', 'Wildcat Talent', 'Koi Diva', 'TeKilla Sunrise', 'Gabe itch', 'Loaf of Beans', 'Dixie Normous', 'Cheese Ball', 'Candy Cough', 'Panda Heart', 'Cranberry Sprite', 'Crayon Munchers', 'Magic Peach', 'Tiger Kitty', 'Flower Child', 'Freckles', 'Tragic Girl', 'Girls of Neptune', 'Candycane Missy', 'Cutie Bun', 'Huggable Bab', 'Missie Lucky', 'Broken Paws', 'Anonymous Girl', 'Tiny Hunter', 'Super Giggles', 'Lady Fantastic', 'Mafia Princess', 'Eye Candy Kitten', 'Troubled Chick', 'Feral Filly'];
        document.getElementsByClassName("scoresListUsername")[4].innerHTML = names4[getRandomNumber(0, names4.length-1, 0, 0)].slice(0, 11);;
        let names5 = ['Chris P. Bacon', 'Loading…', 'IntellectualGuy', 'FastLearner', 'Clean Your Room', 'I’mDaTeacher', 'Baby shark', 'RicknMorty', 'DonaldDuck', 'CTRL+W=Win', 'Shrek dies in Endgame', 'NuggetHunter', 'Nerf Bastion', 'Cranberry Sprite', 'crayon munchers', 'peter file', 'myPPitches', 'KaTrash', 'TRIGGERED', 'The Fitness Gram Pacer Test'];
        document.getElementsByClassName("scoresListUsername")[5].innerHTML = names5[getRandomNumber(0, names5.length-1, 0, 0)].slice(0, 11);;
    }

    async function showScores() {        
        //element.classList.contains('some-class');
        if (document.getElementsByClassName("scoresListScore")[0] === undefined) {
            clearInterval(myInterval);
        } else {            
            let playerScore = parseInt(document.getElementsByClassName("scoresListScore")[0].innerHTML.split(" ")[0]);
            if (numQuestions > 0) {
                for (let i = 1; i < document.getElementsByClassName("scoresListScore").length; i++) {
                    let old = parseInt(document.getElementsByClassName("scoresListScore")[i].innerHTML.split(" ")[0]);
                    
                    let delay = 3 + i + getRandomNumber(0, Math.floor((old - playerScore) / 100), 0, 0);
                    if (getRandomNumber(0, delay, 0, 0) === 0) {
                        document.getElementsByClassName("scoresListScore")[i].innerHTML = old + 100 * getRandomNumber(0, 1, 0, 0) + " pts";
                    }
                    rankScoresList();
                }
            }        
        }
        
        //rankScoresList();
    }

    async function rankScoresList() {
        // get scores   
        let getScores = [], rankScores = [];     
        for (let i = 0; i < document.getElementsByClassName("scoresListScore").length; i++) {
            getScores[i] = parseInt(document.getElementsByClassName("scoresListScore")[i].innerHTML.split(" ")[0]);
            
            if (getScores[i] === max_score) {
                game_over = 1;
                clearInterval(myInterval);
                //gameOver();
            }
        }
        let max;
        for(let a = 0; a < getScores.length; a++) {
            max = a;
            for (let b = 0; b < getScores.length; b++) {
                if (getScores[b] > getScores[max]) {
                    max = b;
                }
            }
            rankScores[a] = max;
            getScores[max] = -1;
        }

        await sleep(100); /* transition needs this for some reason */        
        let x;
        for (let i = 0; i < rankScores.length; i++) {
            x = rankScores[i];
            document.getElementsByClassName("player")[x].style.top = (i - x) * 62 + "px";
        }

    }

    async function makeQuestion() {
        let secretMsg = document.getElementById("secretsID").innerHTML;
        if (secretMsg === "Incorrect") {
            penalty += 1;
        }
        console.log("secret: " + secretMsg);
        console.log("secret: '" + secretMsg + "' penalty is " + penalty);
        rankScoresList();
        numQuestions += 1;
        document.getElementsByClassName("scoresListScore")[0].innerHTML = document.getElementById("scoreID").innerHTML.split("Score: ")[1];
        let playerScore = parseInt(document.getElementsByClassName("scoresListScore")[0].innerHTML.split(" ")[0]);
        console.log("player score is " + playerScore);
        if (playerScore >= max_score) {
            game_over = 1;
            gameOver();
        }

        if (game_over === 0) {
            if (secretMsg === "Incorrect") {
                document.getElementById("nextQuesBtnID").disabled = true;
                await sleep(penalty * 1000 - 1000);
                document.getElementById("nextQuesBtnID").disabled = false;                
            }

            document.getElementById("nextQuesBtnID").onclick = () => {makeQuestion()};
            
            //rankScoresList();
            reset(); 
            //answerType(3); // user input string == 3
            let numQuestionTypes = 2;
            let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
            let correctAns, result;
            //chooseQuestion = 1;
            if (chooseQuestion === 1) {                  
                answerType(3); // user input string == 3  
                result = multiplicationAndDivision();
                question_string = result[0];
                document.getElementById("questionStringID").innerHTML = result[0];
                correctAns = result[1];
                document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value, question_string, "algebra ex01")};
            } else if (chooseQuestion === 2) {          
                answerType(1); // multiplechoice === 1  
                result = fractions();
                question_string = result[0];
                document.getElementById("questionStringID").innerHTML = result[0];
                let mcOptions = result.slice(1, result.length);
                correctAns = mcOptions[0];
                shuffle(mcOptions);
                for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {                  
                    mcBtn(i, correctAns, question_string, "algebra ex05");
                    //document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, question_string, "algebra ex05")};
                }
            } else {
                // done
                console.log("test over");
            }
        } else {
            gameOver();
        }
    }

    async function gameOver() {
        clearInterval(myInterval);
        console.log("the game is over");
        document.getElementById("answerType01").style.display = "none";
        document.getElementById("answerType02").style.display = "none";
        document.getElementById("answerType03").style.display = "none";

        let winner = 0;
        for (let i = 0; i < document.getElementsByClassName("scoresListScore").length; i++) {
            let score = parseInt(document.getElementsByClassName("scoresListScore")[i].innerHTML.split(" ")[0]);
            if (score === max_score) {
                winner = i;
            }
        }                

        console.log("winner is " + document.getElementsByClassName("scoresListUsername")[winner].innerHTML);
        document.getElementsByClassName("scoresList")[0].style.transition = "all 3s";
        document.getElementsByClassName("scoresList")[0].style.opacity = "0";
        document.getElementsByClassName("questionSpace")[0].style.transition = "all 3s";
        document.getElementsByClassName("questionSpace")[0].style.opacity = "0";
        setTimeout(function() {document.getElementsByClassName("scoresList")[0].style.display = "none";}, 3000);
        setTimeout(function() {document.getElementsByClassName("questionSpace")[0].style.display = "none";}, 3000);
        await sleep(3000);
        document.getElementById("showResultsBtnID").style.display = "block";
    }

    async function showPodium() {        
        document.getElementById("showResultsBtnID").style.transition = "all 3s";
        document.getElementById("showResultsBtnID").style.opacity = "0";
        setTimeout(function() {document.getElementById("showResultsBtnID").style.display = "none";}, 3000);
        await sleep(3000);
        
        let podium = [0, 0, 0];
        for (let p = 0; p < podium.length; p++) {
            let max = 0;
            for (let i = 0; i < document.getElementsByClassName("scoresListScore").length; i++) {
                let x = parseInt(document.getElementsByClassName("scoresListScore")[i].innerHTML.split(" ")[0]);
                if (x > max) {
                    max = x;
                    podium[p] = i;
                }
            }
            document.getElementsByClassName("scoresListScore")[podium[p]].innerHTML = "0 pts";
        }
        
        document.getElementsByClassName("winnersPodium")[0].style.display = "block";
        await sleep(500);
        document.getElementsByClassName("winner")[2].innerHTML += document.getElementsByClassName("scoresListUsername")[podium[2]].innerHTML;

        await sleep(750);
        document.getElementsByClassName("winner")[1].innerHTML += document.getElementsByClassName("scoresListUsername")[podium[1]].innerHTML;

        await sleep(1000);
        document.getElementsByClassName("winner")[0].innerHTML += document.getElementsByClassName("scoresListUsername")[podium[0]].innerHTML;

        

    }

    return (
        <div className="Battle">
            <h1>Battle</h1>
            <p style={{display: "block"}} id="loginCheckMsgID">You need to sign in to access the Battle</p>
            <input style={{display: "none"}} id="battleUserID" autoComplete="off" placeholder="Username"></input><br />
            <button style={{display: "none"}} id="beginBattleBtnID" onClick={beginBattle}>Begin Battle</button>
            {/*}<p id="testTab"></p> */}
            <div className="battleWorkspace">
                <p id="loadingBattleTextID"></p>
                <div className="welcome" style={{display:"none"}}>
                    <h1>Let the battle begin</h1>
                    <div className="findOpponentsList" style={{display:"none"}}>
                        <p id="playersOnlineID"></p>
                        <p className="findOpponent">Looking for opponent...</p><p className="foundOpponent" style={{display: "none"}}>Player found</p>
                        <p className="findOpponent">Looking for opponent...</p><p className="foundOpponent" style={{display: "none"}}>Player found</p>
                        <p className="findOpponent">Looking for opponent...</p><p className="foundOpponent" style={{display: "none"}}>Player found</p>
                        <p className="findOpponent">Looking for opponent...</p><p className="foundOpponent" style={{display: "none"}}>Player found</p>
                        <p className="findOpponent">Looking for opponent...</p><p className="foundOpponent" style={{display: "none"}}>Player found</p>
                        <p className="findOpponent">Looking for opponent...</p><p className="foundOpponent" style={{display: "none"}}>Player found</p>
                    </div>
                    <div className="scoresList" style={{display:"none"}}>
                        <div className="player" id="userPlr">
                            <p className="scoresListUsername">Slayer123</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        <div className="player">
                            <p className="scoresListUsername">princess1995</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        <div className="player">
                            <p className="scoresListUsername">kingJames</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        <div className="player">
                            <p className="scoresListUsername">Matt</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        <div className="player">
                            <p className="scoresListUsername">dora</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        <div className="player">
                            <p className="scoresListUsername">anna</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                    </div>
                    <div className="questionSpace">
                        <p id="countDownID" style={{display:"none"}}></p>
                        <WorkspaceQuestion />
                    </div>
                    <button style={{display: "none"}} id="showResultsBtnID" onClick={showPodium}>See results...</button>
                    <div className="winnersPodium" style={{display:"none"}}>
                        <p className="winner" style={{fontSize: "24px"}}>1st place: </p>
                        <p className="winner" style={{fontSize: "20px"}}>2nd place: </p>
                        <p className="winner" style={{fontSize: "18px"}}>3rd place: </p>
                    </div>
                </div>
            </div>
        </div>      
    );
    
}

export default Battle;
