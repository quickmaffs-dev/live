import React, {useEffect } from 'react';
import '../styling/battle.css';
import {getRandomNumber, answerType, checkAns, reset, shuffle, setAnsBtns, numDecimals} from './exercises/MathFunctions';
import {multiplicationAndDivision, fractions} from './exercises/algebra/algebra_exercises';
//import { useHistory } from "react-router-dom";
import firebase from './firebase';
import map from '../img/map.svg';

import WorkspaceQuestion from './WorkspaceQuestion';

import avatar1 from './avatarImg/base/avatar1.jpg';
import avatar2 from './avatarImg/base/avatar2.jpg';
import avatar3 from './avatarImg/base/avatar3.jpg';
import avatar4 from './avatarImg/base/avatar4.jpg';
import avatar5 from './avatarImg/base/avatar5.jpg';
import avatar6 from './avatarImg/base/avatar6.jpg';
import hat1 from './avatarImg/hats/hat1.png';
import hat2 from './avatarImg/hats/hat2.png';
import hat3 from './avatarImg/hats/hat3.png';
import hat4 from './avatarImg/hats/hat4.png';
import hat5 from './avatarImg/hats/hat5.png';
import shirt1 from './avatarImg/shirts/shirt1.png';
import shirt2 from './avatarImg/shirts/shirt2.png';
import shirt3 from './avatarImg/shirts/shirt3.png';
import shirt4 from './avatarImg/shirts/shirt4.png';
import shirt5 from './avatarImg/shirts/shirt5.png';
import shirt6 from './avatarImg/shirts/shirt6.png';
import shirt7 from './avatarImg/shirts/shirt7.png';
import shirt8 from './avatarImg/shirts/shirt8.png';
import shirt9 from './avatarImg/shirts/shirt9.png';
import shirt10 from './avatarImg/shirts/shirt10.png';

const Royale = () => {
    let numQuestions = 0;
    let question_string = 0;    
    let pass = 0;
    let myInterval;
    let playerUsername;
    let penalty = 0;
    let maxRoyalePlayers = 25;
    let challenge = 5;
    let remainingPlayers = maxRoyalePlayers;
    let lockedIn = 0;
    let lockedInColour = "grey";
    let eliminatedColour = "red";
    let pendingColour = "";
    let timePassed = 0;
    let maxTime = 3; //seconds (5 min)
    //maxTime = 100000;
    let resultStr = "";
    let correctAnsResult = "";
    let userIsOut = false;
    let ansOptions = []; // correct is always ans[0]
    let userAnsOption = "";
    let playerTable = [];
    let cAns = "";
    let wAns = "";
    let timesUpCheck = 0;
    let podium = [];
    let user_id;
    let spriteDetails = [];
    let avatarsImg = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
    let hatsImg = [hat1, hat2, hat3, hat4, hat5];
    let shirtsImg = [shirt1, shirt2, shirt3, shirt4, shirt5, shirt6, shirt7, shirt8, shirt9, shirt10];
    let products = [];

    //const history = useHistory();

    useEffect(() => {  
        checkLoginStatus();        
    }); 
    
    async function checkLoginStatus() {
        user_id = await firebase.getCurrentUserID();
        if (user_id !== null) {
            pass = 1;
            //history.push("/dashboard");
        }     
        document.getElementById("loginCheckMsgID").innerHTML = "You need to sign in to access the Royale";
        if (pass === 1) {
            //document.getElementById("loginCheckMsgID").style.display = "none";
            document.getElementById("loginCheckMsgID").innerHTML = "Username: ";
            document.getElementById("beginBattleBtnID").style.display = "block";
            document.getElementById("battleUserID").style.display = "block";
            // get username
            if (typeof(Storage) !== "undefined") {
                //if (localStorage.key(i).includes("QuickM_battle_username")) {
                let key = "QuickM_battle_username";
                if (localStorage.getItem(key) !== null) {
                    playerUsername = localStorage.getItem(key);
                    //console.log("username is stored " + playerUsername);
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

    function resetBattle() {
        // set display defaults
        document.getElementById("beginBattleBtnID").style.opacity = "1";
        document.getElementsByClassName("welcome")[0].style.opacity = "1";
        document.getElementsByClassName("questionSpaceRoyale")[0].style.opacity = "1";
        document.getElementById("countDownID").style.opacity = "1";
        document.getElementById("showResultsBtnID").style.opacity = "1";
        document.getElementsByClassName("winnersPodium")[0].opacity = "1";
        document.getElementsByClassName("royalePlayers")[0].opacity = "1";

        document.getElementById("beginBattleBtnID").style.display = "none";
        document.getElementsByClassName("welcome")[0].style.display = "none";
        document.getElementsByClassName("waitingRoom")[0].style.display = "none";
        document.getElementById("messageID").style.display = "none";
        
        document.getElementsByClassName("questionSpaceRoyale")[0].style.display = "none";
        //document.getElementById("countDownID").style.display = "none";
        document.getElementById("showResultsBtnID").style.display = "none";
        document.getElementsByClassName("winnersPodium")[0].style.display = "none";

        // set score defaults
        penalty = 0;
        numQuestions = 0;
        document.getElementById("scoreID").innerHTML = "Score: 0 pts";        

        document.getElementsByClassName("winner")[0].innerHTML = "1st place: ";
        document.getElementsByClassName("winner")[1].innerHTML = "2nd place: ";
        document.getElementsByClassName("winner")[2].innerHTML = "3rd place: ";
    }

    async function beginRoyale() {
        resetBattle();

        // get username
        playerUsername = document.getElementById("battleUserID").value;
        playerUsername = playerUsername.slice(0, 11);
        if (typeof(Storage) !== "undefined") {
            //if (localStorage.key(i).includes("QuickM_battle_username")) {
            let key = "QuickM_battle_username";
            localStorage.setItem(key, playerUsername);
        } else {
            console.log("Browser does not support Web Storage");
        }  
        //document.getElementsByClassName("scoresListUsername")[0].innerHTML = playerUsername;

        document.getElementById("loginCheckMsgID").style.display = "none";
        document.getElementById("battleUserID").style.display = "none";

        // dim battle btn
        document.getElementById("beginBattleBtnID").style.transition = "all 1s";
        document.getElementById("beginBattleBtnID").style.opacity = "0";

        await printLoadingScreen();

        document.getElementById("beginBattleBtnID").style.display = "none";
        document.getElementById("loadingBattleTextID").style.display = "none";
        
        await sleep(1000);

        // show home screen
        document.getElementsByClassName("welcome")[0].style.display = "block";
        await findOpponents();
        getOpponents();
        await getPlayerSprites();
        await countDown();
        //myInterval = setInterval(setScores, 1000);
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
    
    async function findOpponents() {        
        document.getElementsByClassName("waitingRoom")[0].style.display = "block";
        document.getElementById("mapDotID").style.transition = "all 3s";

        let numPlayers = 1;
        //numPlayers = maxRoyalePlayers; // skip
        document.getElementById("gettingRoyalPlayersID").innerHTML = "Getting players " + numPlayers + " out of " + maxRoyalePlayers;
        while (numPlayers < maxRoyalePlayers) {
            numPlayers += getRandomNumber(1, 2, 0, 0);
            if (numPlayers > maxRoyalePlayers) {
                numPlayers = maxRoyalePlayers;
            }
            document.getElementById("gettingRoyalPlayersID").innerHTML = "Getting players " + numPlayers + " out of " + maxRoyalePlayers;
            await sleep(100 * getRandomNumber(1, 15, 0, 0));

            if (getRandomNumber(1, 10, 0, 0) === 1) {
                document.getElementById("mapDotID").style.top = getRandomNumber(1, 99, 0, 0) + "%";
                document.getElementById("mapDotID").style.left = getRandomNumber(1, 99, 0, 0) + "%";
            }            
        }         
        
        await sleep(1000);
        document.getElementsByClassName("waitingRoom")[0].style.transition = "all 3s";
        document.getElementsByClassName("waitingRoom")[0].style.opacity = "0";
        setTimeout(function() {document.getElementsByClassName("waitingRoom")[0].style.display = "none";}, 3000);

        await sleep(3000);
    }

    function getOpponents() {
        let allNames = ['Pill Cosby', 'Claustrophobic Teletubby', 'Mr.stark I don’t feel so good', 'HortonHearsAJew', 'Kahoot the Teacher', 'Honey wheres my super kah00t', 'Nerdy-Poo', 'KahToot', 'Loud Mouth', 'Inky', 'Chunkie', 'Confused Teletuby', 'KaShootMe', 'Sub2PewDiePie', 'Kim Jong Uno', 'Comedy Central', 'Homer', 'Couch Potato', 'Kashoot me', 'Kim Jong OOF', 'Moe Lester', 'Third Wheeler', 'Nugget', 'Kashoot da teacher', 'Chungus the fungus', 'Kermit Kermicide', 'Lil Diabetus', 'Big Chungus', 'Walking Dictionary', 'Summer Teeth', 'Gucci Flippidy Flops', 'Johnny Johnny', 'Weird Beard', 'Kermit', 'Deja View', 'Fire Guy', 'Fuzzy Pack', 'Butternut', 'Organic Punk', 'Chris P Chicken', 'Ligma', 'Kool Kids Klub', 'Married Man', 'Metal Star', 'Ctrl W = Win', 'Peter file', 'TRIGGERED', 'Nerf Bastion', 'Billy Hills', 'Night Magnet', 'Dancing Madman', 'Egghead', 'Babysaurus', 'Enigma', 'Eye Candy', 'Cheeky Monkey', 'Butter Scotch', 'Junior Jumper', 'Floating Heart', 'Loading…', 'Yeet or be Yeeted', 'Sassy Muffin', 'Canary Apple Red', 'Woodland Beauty', 'Miss Fix It', 'Miss Meow', 'Emerald Goddess', 'Marshmallow Treat', 'Leading Light', 'Queen Bee', 'Microwave Chardonnay', 'Gentle Woman', 'Cute Pumpkin', 'Titanium Ladybug', 'Freeze Queen', 'Young Lady', 'Winner Woman', 'Wonk Sidewalk', 'EnforcerTeen', 'Me Miss', 'Undergrad Split', 'Triple Adorable', 'Her Majesty', 'Cinderella', 'The Beekeeper', 'Cool Whip', 'Digital Goddess', 'Peanut Butter Woman', 'Fresh Lovely', 'Fisher Teen', 'Lady Turnip', 'Princess Fuzzie', 'Rainbow Sweety', 'Pink Nightmare', 'Wildcat Talent', 'Koi Diva', 'TeKilla Sunrise', 'Gabe itch', 'Loaf of Beans', 'Dixie Normous', 'Cheese Ball', 'Candy Cough', 'Panda Heart', 'Cranberry Sprite', 'Crayon Munchers', 'Magic Peach', 'Tiger Kitty', 'Flower Child', 'Freckles', 'Tragic Girl', 'Girls of Neptune', 'Candycane Missy', 'Cutie Bun', 'Huggable Bab', 'Missie Lucky', 'Broken Paws', 'Anonymous Girl', 'Tiny Hunter', 'Super Giggles', 'Lady Fantastic', 'Mafia Princess', 'Eye Candy Kitten', 'Troubled Chick', 'Feral Filly', 'Chris P. Bacon', 'Loading', 'IntellectualGuy', 'FastLearner', 'Clean Your Room', 'ImDaTeacher', 'Baby shark', 'RicknMorty', 'DonaldDuck', 'CTRL+W=Win', 'Shrek dies in Endgame', 'NuggetHunter', 'Nerf Bastion', 'Cranberry Sprite', 'crayon munchers', 'peter file', 'myPPitches', 'KaTrash', 'TRIGGERED', 'The Fitness Gram Pacer Test'];
        // shuffle allNames
        for (let i = 0; i < 4 * allNames.length; i++) {
            let a = getRandomNumber(0, allNames.length-1, 0, 0);
            let b = getRandomNumber(0, allNames.length-1, 0, 0);
            let temp = allNames[a];
            allNames[a] = allNames[b];
            allNames[b] = temp;
        }
        playerTable = allNames.slice(0, maxRoyalePlayers-1);
        playerTable = [playerUsername].concat(playerTable)
        for (let i = 0; i < playerTable.length; i++) {
            playerTable[i] = playerTable[i].slice(0, 11);
        }

        let x = Math.sqrt(maxRoyalePlayers);
        let row = "", curr = 0;
        for(let i = 0; i < x; i++) {
            row += "<tr>";
            for (let j = 0; j < x; j++) {
                if (curr === 0) {
                    row += "<td id='playerSpace' class='playerTile'>" + playerTable[curr] + "</td>";
                } else {
                    row += "<td class='playerTile'>" + playerTable[curr] + "</td>";
                }
                curr += 1;
            }
            row += "</tr>";
        }
        document.querySelectorAll(".royalePlayers")[0].innerHTML = "<table>" + row + "</table>";
    }

    function playerTableAns() {
        document.getElementById("playerSpace").innerHTML = userAnsOption;
        /*
        if (document.getElementById("playerSpace").offsetWidth > 150) {
            userAnsOption = userAnsOption.slice(0, 11);
            document.getElementById("playerSpace").innerHTML = userAnsOption;
        }
        */
        for (let i = 1; i < maxRoyalePlayers; i++) {
            if (document.getElementsByClassName("playerTile")[i].style.backgroundColor === lockedInColour) {
                cAns = ansOptions[0];
                //wAns;
                if (ansOptions.length > 1) {
                    wAns = ansOptions[getRandomNumber(1, ansOptions.length-1, 0, 0) % ansOptions.length];                            
                } else {
                    // string the ans
                    wAns = (cAns + getRandomNumber(1, 5, numDecimals(cAns), 1)).toString().replace(/\s/g,'');
                    cAns = cAns.toString().replace(/\s/g,'');
                }
                document.getElementsByClassName("playerTile")[i].innerHTML = cAns;
                if (getRandomNumber(1, 10, 0, 0) === 1) {
                    document.getElementsByClassName("playerTile")[i].innerHTML = wAns;
                }
            } else {
                if (document.getElementsByClassName("playerTile")[i].style.backgroundColor !== eliminatedColour) {
                    document.getElementsByClassName("playerTile")[i].innerHTML = "";
                }
            }
        }
    }

    function playerTableNames() {
        for (let i = 0; i < maxRoyalePlayers; i++) {
            //document.getElementsByClassName("playerTile")[i].innerHTML = "<div><img src='https://i.ytimg.com/vi/lCAVcUQY83c/hqdefault.jpg' /><p class='playerTileName'>" + playerTable[i] + "</p></div>";
            document.getElementsByClassName("playerTile")[i].innerHTML = `
            <div>
                <img class='playerAvatar' src=`+avatarsImg[0]+` alt="avatar"/>
                <img class='playerAvatarHat' alt="hat" src=`+spriteDetails[i].hat+` />
                <img class='playerAvatarShirt' alt="shirt" src=`+spriteDetails[i].shirt+` />
                <p class='playerTileName'>` + playerTable[i] + `</p>
                <div class='playerShadow'></div>
            </div>`;           
            if (spriteDetails[i].hat === "") {
                document.getElementsByClassName("playerAvatarHat")[i].style.display = "none";
            }
            if (spriteDetails[i].shirt === "") {
                document.getElementsByClassName("playerAvatarShirt")[i].style.display = "none";
            }
                
        }
    }

    async function getPlayerSprites() {
        let userDetails = await firebase.getUsersDetails(user_id);
        products = await firebase.getAllProducts();
        let hatId = await firebase.getProductId(userDetails.hat); // hatId is the product id
        let hat = getProductDetails(hatId); // item_id
        let shirtId = await firebase.getProductId(userDetails.shirt);
        let shirt = getProductDetails(shirtId);

        let p = {
            //background: userDetails.background
            //, avatar: 
            hat: getImgSrc("hat", hat.item_id)
            , shirt: getImgSrc("shirt", shirt.item_id)
        }
        spriteDetails.push(p);
        for (let i = 1; i < maxRoyalePlayers; i++) {
            let h = "";
            if (getRandomNumber(1, 5, 0, 0) !== 1) {                
                h = getImgSrc("hat", getRandomNumber(1, hatsImg.length));
            }
            let s = "";
            if (getRandomNumber(1, 5, 0, 0) !== 1) {                
                s = getImgSrc("shirt", getRandomNumber(1, shirtsImg.length));
            }
            p = {
                hat: h
                , shirt: s
            }
            spriteDetails.push(p);
        }
    }
    
    function getProductDetails(pid) {
        let p = 0;
        for (let i = 0; i < products.length; i++) {
            if (products[i].product_id === pid) {
                p = products[i];
                i = products.length;        
            }
        }
        return p;
    }
    
    function getImgSrc(c, id) {
        let type = [];        
        if (c === "hat") {
            type = hatsImg;
        } else if (c === "shirt") {
            type = shirtsImg;
        }
        let imgSrc = type[id-1];
        return imgSrc;
    }

    async function countDown() {
        if (numQuestions < 1) {
            // countdown
            //document.getElementById("countDownID").style.display = "block";
            for (let count = 3; count > 0; count--) {
                document.getElementById("countDownID").innerHTML = "Royale begins in " + count;
                await sleep(1000);
            }
            document.getElementById("countDownID").innerHTML = "";
            //document.getElementById("countDownID").style.display = "none";
        }
    }

    async function setScores() {
        timePassed += 1;
        if (timePassed > maxTime) {
            console.log("max time passed");
            timesUp();
        }
        
        if (100 * lockedIn / remainingPlayers > 10 * (5 + challenge)) {
        //if (remainingPlayers / lockedIn < 2) {
            console.log("enough players");
            timesUp();
        } else {
            if (document.getElementsByClassName("royalePlayers")[0] === undefined) {
                clearInterval(myInterval);
            } else {            
                //let playerScore = parseInt(document.getElementsByClassName("scoresListScore")[0].innerHTML.split(" ")[0]);
                if (numQuestions > 0) {
                    //if (getRandomNumber(1, challenge, 0, 0) !== 1) {
                        let n = getRandomNumber(1, maxRoyalePlayers-1, 0, 0);                        
                        //if (document.getElementsByClassName("playerTile")[n].style.backgroundColor !== eliminatedColour) {
                        if (document.getElementsByClassName("playerTile")[n].style.backgroundColor === pendingColour) {
                            document.getElementsByClassName("playerTile")[n].style.backgroundColor = lockedInColour;                            
                            lockedIn += 1;             
                        }
                    //}                
                }        
            }        
        }

        if (lockedIn === remainingPlayers) {            
            console.log("everyone has submit");
            getResults();
        }
    }

    async function timesUp() {
        timesUpCheck = 1;
        clearInterval(myInterval);
        for (let i = 5; i >= 0; i--) {
            let n = getRandomNumber(1, maxRoyalePlayers-1, 0, 0);
            if (document.getElementsByClassName("playerTile")[n].style.backgroundColor !== eliminatedColour) {
                document.getElementsByClassName("playerTile")[n].style.backgroundColor = lockedInColour;
            }
            await sleep(1000);
            document.getElementById("timesUp").innerHTML = "Countdown : " + i + " sec remaining";
        }
        document.getElementById("timesUp").innerHTML = "";
        if (timesUpCheck === 1) getResults();
    }

    async function getResults() {
        clearInterval(myInterval);
        document.getElementById("answerType01").style.display = "none";
        document.getElementById("answerType02").style.display = "none";
        document.getElementById("answerType03").style.display = "none";

        playerTableAns();        
        
        // check losers   
        document.getElementById("resultStringID").style.display = "block";
        document.getElementById("resultStringID").innerHTML = "The correct answer is " + correctAnsResult;

        if (document.getElementsByClassName("playerTile")[0].style.backgroundColor !== eliminatedColour) {            
            // did not submit in time
            if (document.getElementsByClassName("playerTile")[0].style.backgroundColor !== lockedInColour) {
                document.getElementsByClassName("playerTile")[0].style.backgroundColor = eliminatedColour;

                console.log("loser ran out of time");
                userIsOut = true;
                remainingPlayers -= 1;
            }

            // put in wrong answer
            if (resultStr.includes("incorrect")) {
                document.getElementsByClassName("playerTile")[0].style.backgroundColor = eliminatedColour;
                console.log("loser wrong ans");
                userIsOut = true;
                remainingPlayers -= 1;            
            } else {
                console.log("chicken dinner");
            }

        }
        
        for (let i = 1; i < maxRoyalePlayers; i++) {
            if (!(document.getElementsByClassName("playerTile")[i].style.backgroundColor === lockedInColour && document.getElementsByClassName("playerTile")[i].innerHTML === cAns)) {//ansOptions[0].toString().replace(/\s/g,''))) {
                if (document.getElementsByClassName("playerTile")[i].style.backgroundColor !== eliminatedColour) {
                    await sleep(500);
                    remainingPlayers -= 1;
                    document.getElementsByClassName("playerTile")[i].style.backgroundColor = eliminatedColour;    
                    if (remainingPlayers === 3) {
                        console.log("we have top 3");
                        let curr = 0;
                        for (let j = 0; j < maxRoyalePlayers; j++) {
                            if (document.getElementsByClassName("playerTile")[j].style.backgroundColor !== eliminatedColour) {
                                podium[curr] = j;
                                curr += 1;
                            }
                        }
                    }
                }                
            }
            /*
            if (document.getElementsByClassName("playerTile")[i].style.backgroundColor !== lockedInColour && document.getElementsByClassName("playerTile")[i].style.backgroundColor !== "red") {
                if (document.getElementsByClassName("playerTile")[i].innerHTML !== ansOptions[0]) {
                    await sleep(500);
                    remainingPlayers -= 1;
                    document.getElementsByClassName("playerTile")[i].style.backgroundColor = eliminatedColour;
                }
            }
            */
        }

        if (document.getElementById("nextQuesBtnID")) {
            document.getElementById("nextQuesBtnID").style.display = "block";
        }
    }

    function winnerCheck() {
        if (remainingPlayers === 0) {
            console.log("loser city");
            noWinners();
            return 1;
        }

        if (remainingPlayers === 1) {
            console.log("we have a winner");
            //showPodium();
            gameOver();
            return 1;
        }

        return 0;
    }

    async function makeQuestion() {
        document.getElementById("scoreID").style.display = "none";
        userAnsOption = "";
        playerTableNames();
        document.getElementById("timesUp").innerHTML = "";

        //console.log("text is " + document.getElementsByClassName("playerTile")[0].innerHTML);
        timesUpCheck = 0;
        timePassed = 0;
        lockedIn = 0;
        challenge -= 1;
        if (challenge < 0) {
            challenge = 0;
        }
        document.getElementsByClassName("questionSpaceRoyale")[0].style.opacity = "1";
        document.getElementsByClassName("questionSpaceRoyale")[0].style.display = "block";

        // reset colours
        document.getElementsByClassName("playerTile")[0].style.fontWeight = "bold";
        for (let i = 0; i < maxRoyalePlayers; i++) {
            if (document.getElementsByClassName("playerTile")[i].style.backgroundColor === lockedInColour) {
                document.getElementsByClassName("playerTile")[i].style.backgroundColor = pendingColour;
            } else if (document.getElementsByClassName("playerTile")[i].style.backgroundColor === eliminatedColour){
                document.getElementsByClassName("playerTile")[i].style.transition = "all 1s";
                document.getElementsByClassName("playerTile")[i].style.opacity = "0.25";
            }
        }

        let secretMsg = document.getElementById("secretsID").innerHTML;
        if (secretMsg === "Incorrect") {
            penalty += 1;
        }
        //console.log("secret: " + secretMsg);
        //console.log("secret: '" + secretMsg + "' penalty is " + penalty);
        if (winnerCheck() === 0) {
        
            numQuestions += 1;
            //document.getElementsByClassName("scoresListScore")[0].innerHTML = document.getElementById("scoreID").innerHTML.split("Score: ")[1];
            //let playerScore = parseInt(document.getElementsByClassName("scoresListScore")[0].innerHTML.split(" ")[0]);

            if (secretMsg === "Incorrect") {
                document.getElementById("nextQuesBtnID").disabled = true;
                await sleep(penalty * 1000 - 1000);
                document.getElementById("nextQuesBtnID").disabled = false;                
            }

            document.getElementById("nextQuesBtnID").onclick = () => {makeQuestion()};

            //rankScoresList();
            reset(); 
            if (userIsOut === true) {
                setAnsBtns(true);
                userAnsOption = "";
            }
            //answerType(3); // user input string == 3
            let numQuestionTypes = 2;
            let chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
            let correctAns, result;
            if (chooseQuestion === 1) {                  
                answerType(3); // user input string == 3  
                result = multiplicationAndDivision();
                question_string = result[0];
                document.getElementById("questionStringID").innerHTML = result[0];
                correctAns = result[1];
                ansOptions = [correctAns];
                //document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value, question_string, "algebra ex01")};
                document.getElementById("userInputBtnID").onclick = () => {checkRoyaleInputAns(correctAns, document.getElementById("userInputStringID").value, question_string, "algebra ex01")};
            } else if (chooseQuestion === 2) {          
                answerType(1); // multiplechoice === 1  
                result = fractions();
                question_string = result[0];
                document.getElementById("questionStringID").innerHTML = result[0];
                let mcOptions = result.slice(1, result.length);
                correctAns = mcOptions[0];
                ansOptions = [correctAns, mcOptions[1], mcOptions[2], mcOptions[3]];
                shuffle(mcOptions);
                for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {                  
                    //mcBtn(i, correctAns, question_string, "algebra ex05");
                    checkRoyaleMcAns(i, correctAns, question_string, "algebra ex05") 
                    //document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, question_string, "algebra ex05")};
                }
            } else {
                // done
                console.log("test over");
            }
            correctAnsResult = correctAns;

            await sleep(100 * getRandomNumber(10, 30, 0, 0));
            myInterval = setInterval(setScores, 1000);
        }
    }

    function checkRoyaleInputAns(correctAns, userAns, question_string, topic) {
        lockedIn += 1;
        document.getElementsByClassName("playerTile")[0].style.backgroundColor = lockedInColour;
        //checkUserInputAns(correctAns, userAns, question_string, ex);
        userAns = userAns.toString();
        userAns = userAns.replace(/\s/g,''); // removing spaces from answer
        checkAns(correctAns, userAns, question_string, topic);
        if (document.getElementById("nextQuesBtnID")) {
            document.getElementById("nextQuesBtnID").style.display = "none";
        }
        document.getElementById("resultStringID").style.display = "block";
        resultStr = document.getElementById("resultStringID").innerHTML;
        document.getElementById("resultStringID").style.display = "none";
        userAnsOption = userAns;
        if (userAnsOption.length > 10) {
            userAnsOption = userAnsOption.slice(0, 11);
        }
    }

    function checkRoyaleMcAns(i, correctAns, question_string, topic) {
        // this sets the mc answer btns
        let userAns = document.querySelectorAll(".mcAnsBtn")[i].innerHTML;
        document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAnsRoyale(correctAns, userAns, question_string, topic)};
    }

    function checkAnsRoyale(correctAns, userAns, question_string, topic) {
        // this triggers once mc btn is clicked
        userAnsOption = userAns;
        lockedIn += 1;
        document.getElementsByClassName("playerTile")[0].style.backgroundColor = lockedInColour;
        checkAns(correctAns, userAns, question_string, topic)
        if (document.getElementById("nextQuesBtnID")) {
            document.getElementById("nextQuesBtnID").style.display = "none";
        }
        document.getElementById("resultStringID").style.display = "block";
        resultStr = document.getElementById("resultStringID").innerHTML;
        document.getElementById("resultStringID").style.display = "none";
    }

    async function noWinners() {
        clearInterval(myInterval);
        document.getElementById("answerType01").style.display = "none";
        document.getElementById("answerType02").style.display = "none";
        document.getElementById("answerType03").style.display = "none";
        document.getElementsByClassName("questionSpaceRoyale")[0].style.transition = "all 3s";
        document.getElementsByClassName("questionSpaceRoyale")[0].style.opacity = "0";
        setTimeout(function() {document.getElementsByClassName("questionSpaceRoyale")[0].style.display = "none";}, 3000);
        await sleep(3000);
        document.getElementById("messageID").style.display = "block";
        document.getElementById("messageID").innerHTML = "No winners today";
    }

    async function gameOver() {
        clearInterval(myInterval);
        console.log("the game is over");
        document.getElementById("answerType01").style.display = "none";
        document.getElementById("answerType02").style.display = "none";
        document.getElementById("answerType03").style.display = "none";

        let winner = 0;
        for (let i = 0; i < maxRoyalePlayers; i++) {
            if (document.getElementsByClassName("playerTile")[i].style.backgroundColor !== eliminatedColour) {
                winner = i;
                i = maxRoyalePlayers;
            }
        }        

        console.log("winner is " + document.getElementsByClassName("playerTileName")[winner].innerHTML);
        document.getElementsByClassName("questionSpaceRoyale")[0].style.transition = "all 3s";
        document.getElementsByClassName("questionSpaceRoyale")[0].style.opacity = "0";
        setTimeout(function() {document.getElementsByClassName("questionSpaceRoyale")[0].style.display = "none";}, 3000);
        await sleep(3000);
        document.getElementById("showResultsBtnID").style.display = "block";
    }

    async function showPodium() {        
        document.getElementById("showResultsBtnID").style.transition = "all 3s";
        document.getElementById("showResultsBtnID").style.opacity = "0";
        setTimeout(function() {document.getElementById("showResultsBtnID").style.display = "none";}, 3000);
        await sleep(3000);
        
        //let podium = [0, 1, 2];
        
        document.getElementsByClassName("winnersPodium")[0].style.display = "block";
        await sleep(500);
        document.getElementsByClassName("winner")[2].innerHTML += document.getElementsByClassName("playerTileName")[podium[2]].innerHTML;

        await sleep(750);
        document.getElementsByClassName("winner")[1].innerHTML += document.getElementsByClassName("playerTileName")[podium[1]].innerHTML

        await sleep(1000);
        document.getElementsByClassName("winner")[0].innerHTML += document.getElementsByClassName("playerTileName")[podium[0]].innerHTML
    }

    return (
        <div className="Royale">
            <h1>Let's get ready to rumble</h1>
            <p style={{display: "block"}} id="loginCheckMsgID">You need to sign in to access the Royale</p>
            <input style={{display: "none"}} id="battleUserID" autoComplete="off" placeholder="Username"></input>
            <br />
            
            <button style={{display: "none"}} id="beginBattleBtnID" onClick={beginRoyale}>Begin Royale</button>
            {/*}<p id="testTab"></p> */}
            <div className="battleWorkspace">
                <p id="loadingBattleTextID"></p>
                <div className="welcome" style={{display:"none"}}>
                    <div className="waitingRoom" style={{display:"none"}}>
                        <p id="gettingRoyalPlayersID"></p>
                        <section className="map">
                            <br /><br />
                            <img src={map} className="img-map" alt="" />
                            <div className="dots">
                                <p className="map-dot map-dot-red" id="mapDotID" style={{top: "39%", left: "45.5%"}}></p>
                            </div>
                        </section>
                    </div>
                    <p id="countDownID"></p>
                    <div className="questionSpaceRoyale">
                        <div className="royalePlayers"></div>
                        <p id="timesUp"></p>
                        <WorkspaceQuestion />
                    </div>
                    <button style={{display: "none"}} id="showResultsBtnID" onClick={showPodium}>See results...</button>
                    <div className="winnersPodium" style={{display:"none"}}>
                        <p className="winner" style={{fontSize: "24px"}}>1st place: </p>
                        <p className="winner" style={{fontSize: "20px"}}>2nd place: </p>
                        <p className="winner" style={{fontSize: "18px"}}>3rd place: </p>
                    </div>
                    <p id="messageID" style={{display:"none"}}></p>
                </div>
            </div>
        </div>      
    );
    
}

export default Royale;

