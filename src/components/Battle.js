import React, {useEffect } from 'react';
import '../styling/battle.css';
import {getRandomNumber, answerType, checkUserInputAns, reset, mcBtn, shuffle} from './exercises/MathFunctions';
import {multiplicationAndDivision, fractions} from './exercises/algebra/algebra_exercises';
import {expandSurd, rationalOrIrrational, simplifySurd, surdAlgebra} from './exercises/rates_and_ratios/rates_and_ratios_exercises';
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

const Battle = () => {
    let numQuestions = 0;
    let question_string = 0;    
    let pass = 0;
    let myInterval;
    let max_score = 1000;
    let playerUsername;
    let game_over = 0;
    let penalty = 0;
    //const history = useHistory();

    let avatarsImg = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
    let hatsImg = ["https://cvws.icloud-content.com/B/AXLbYwjtdQyGj6Jt1H55ff9kb7XcAVjldp0Q8NEy1-uEAm9grHqDQYGZ/hat1.png?o=ArMNrtgXFH1iWVe_S7Q2wL4ywNdroBlmS2Q1q_pM2KZ8&v=1&x=3&a=CAog8DQ7hKn6TZyjhPc6YLWmTGyrLe5jsCtIGQggMV5CW9ISbxDFjt7T2i4Y5YWV1NouIgEAUgRkb7XcWgSDQYGZaicWEEZHwe42sN79KY8PAAASKw29wZzvGTLfQiJO_iev_GDV7VwlwX9yJyxKh43m5wj_IBRxBeVHeAile7Gg5oaeiw3NzZ8Jqx8wP-4qjx5aVw&e=1604883661&fl=&r=3fc6ed33-97c5-4016-9614-5f18fef9a0a4-1&k=RdlHMFlM3TXUpaOuWqPUPg&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=54&s=vQx4H-2fYo6iM5hfRhHq06fLFeQ&cd=i", "https://cvws.icloud-content.com/B/AU6dXI8f0rs9qD2IRNjsICsxqSz8AdF7oJuR0OF1ufBSsk5y_aIZ14va/hat2.png?o=AvQMfCq-h6WtZDn59Plm5yjgtSc7PRa9ZJws1ShOAw5S&v=1&x=3&a=CAogNe47abX8WlC2QzFATDwHTSJx8g2Hid8Q7-2a4U7Qr9ESbxCEueLT2i4YpLCZ1NouIgEAUgQxqSz8WgQZ14vaaid9Pa7zzxugMZwQJZXIkSImAJXDTguKYfYDwGTpci5RoaRs_RFW_hRyJ0-5M2gjfzb2ABhxT6cxKllv66iG6kFjzX4XnLGLqtc1e9I0meydKg&e=1604883732&fl=&r=f4e9ec4a-fabb-4532-b648-b368caf185f7-1&k=aHXYGN5TavFin83qTItdgg&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=54&s=SCQHAyT5qcsRUM3JPpwyMH9s_e4&cd=i", "https://cvws.icloud-content.com/B/AbaslbOH3Q131H_gKnzFMFVclLqJAfRYM1tiNIYm4f2i-ZDCMvPq1Na_/hat3.png?o=AvAsiwh95BI64EoUa0M5WXihr4amVGnm8qU8GwIcBn6x&v=1&x=3&a=CAogOCiiCpQMw3Cp10HJ1ijueFrLw0xp-FtaX00nqiE_688SbxCAw-LT2i4YoLqZ1NouIgEAUgRclLqJWgTq1Na_aif7EFJCGl_0KJN0o4Kq6f9UNeLcpU1X9gO4NbBtZf2hET3mQJJaYrByJ4RdCe5cFQFZ0forY8zj2yCw-WkhlqS_qd2HwsqC8Mk5jdK7urQsZA&e=1604883733&fl=&r=30e0b050-50c7-4778-939c-849f9c547290-1&k=VWrEe6gIW_2S2WP671xmMQ&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=54&s=9sSgxLlF3KDwfdOd288pDMKDMHY&cd=i", "https://cvws.icloud-content.com/B/AbHgWLDQhtKaZkQ9FtycRqdx6-HSAawhhyC9OfeY-WON9UAhZLXhxhd6/hat4.png?o=AhFDem3S9O_jUy_5YUBQt7dpbJy1JaB7ImiVBHJ5eWYn&v=1&x=3&a=CAog5GJBlNEo_7v2SfkJlDTt3LQQUaORtpBgVZe-izfpKcUSbxCLx-LT2i4Yq76Z1NouIgEAUgRx6-HSWgThxhd6aifmqeVJjqkbxuEAG5L-gngKpZVRsqeFtLrQ9OW06dmatwQf50V0llhyJ4MJhLnVQAJI_zVeWuci_AlpWfFIe81JAWcWixRqhKlbq-7BaGxqxQ&e=1604883734&fl=&r=8935c141-8ea3-41bf-bfad-7c384f9cec09-1&k=LTWHf156QXaESh_bD5NMZw&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=54&s=gxqTrn7vD-rViZ-A474igsQiR-Q&cd=i", "https://cvws.icloud-content.com/B/AZLDHxXuhpmIzC_bGBbEH4eJ8NC6AcUyDr7riUai4lyKtaI7BD4606XR/hat5.png?o=AgFKuOf4jddUNsg2fGuX2c3dub3l41Eb9_zDgc-YtilD&v=1&x=3&a=CAogfQcVGqJ-lrgwypCHbNwxMK17XW-n0bT6PnTPjc8kPbwSbxCNteLT2i4YrayZ1NouIgEAUgSJ8NC6WgQ606XRaifZ5VjkayZtDhm_xCYzfcisJ8E7vFUo-LHl09-3V1zmY8kTxecmGiNyJ_AaZ41RcvePh3L_II95bCouEcjCTOlzP5HG11_tN8B5w3wpR1RVUA&e=1604883732&fl=&r=90e9b026-21e7-46a4-8a8f-53cee9cd023b-1&k=4CAM2IptEIKgm3QtMqcAYg&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=54&s=srzm7nHsxI97-6jr1BrFajIQIgE&cd=i"];
    hatsImg = [hat1, hat2, hat3, hat4, hat5];
    let shirtsImg = [shirt1, shirt2, shirt3, shirt4, shirt5, shirt6, shirt7, shirt8, shirt9, shirt10];
    let user_id = 0;
    let products = [];


    useEffect(() => {  
        checkLoginStatus();
    }); 
    
    async function checkLoginStatus() {
        user_id = await firebase.getCurrentUserID();
        if (user_id !== null) {
            pass = 1;
            //history.push("/dashboard");
        }     
        if (document.getElementById("loginCheckMsgID")) {
            document.getElementById("loginCheckMsgID").innerHTML = "You need to sign in to access the Battle";
        }
        if (pass === 1) {            
            //document.getElementById("loginCheckMsgID").style.display = "none";
            if (document.getElementById("loginCheckMsgID")) {
                document.getElementById("loginCheckMsgID").innerHTML = "Username: ";
            }
            if (document.getElementById("beginBattleBtnID")) {
                document.getElementById("beginBattleBtnID").style.display = "block";
            }
            if (document.getElementById("battleUserID")) {
                document.getElementById("battleUserID").style.display = "block";
            }
            if (document.getElementById("battleTopics")) {
                document.getElementById("battleTopics").style.display = "block";                
                let topics = ["Algebra", "Surds"];
                if (document.getElementsByClassName("battleTopics")[0]) {
                    let sel = document.getElementsByClassName("battleTopics");
                    sel[0].innerHTML += "<option selected disabled>Choose topic</option>"
                    for (let i = 0; i < topics.length; i++) {
                        let v = topics[i];
                        sel[0].innerHTML += "<option value='" + v +"'>" + v + "</option>";
                    }
                }
            }

            // get username
            if (typeof(Storage) !== "undefined") {
                //if (localStorage.key(i).includes("QuickM_battle_username")) {
                let key = "QuickM_battle_username";
                if (localStorage.getItem(key) !== null) {
                    playerUsername = localStorage.getItem(key);
                    console.log("username is stored " + playerUsername);
                    if (document.getElementById("battleUserID")) {
                        document.getElementById("battleUserID").value = playerUsername;
                    }
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
        document.getElementsByClassName("findOpponentsList")[0].style.opacity = "1";
        document.getElementsByClassName("scoresList")[0].style.opacity = "1";
        document.getElementsByClassName("questionSpace")[0].style.opacity = "1";
        document.getElementById("countDownID").style.opacity = "1";
        document.getElementById("showResultsBtnID").style.opacity = "1";
        document.getElementsByClassName("winnersPodium")[0].opacity = "1";
        document.getElementById("waitroomAnimation").style.opacity = "1";

        document.getElementById("beginBattleBtnID").style.display = "none";
        document.getElementsByClassName("welcome")[0].style.display = "none";
        document.getElementsByClassName("findOpponentsList")[0].style.display = "none";
        document.getElementsByClassName("waitingRoom")[0].style.display = "none";
        document.getElementById("waitroomAnimation").style.display = "none";
        for (let i = 0; i < document.getElementsByClassName("findOpponent").length; i++) {
            document.getElementsByClassName("findOpponent")[i].style.opacity = "1";
            document.getElementsByClassName("findOpponent")[i].style.display = "block";
            document.getElementsByClassName("foundOpponent")[i].style.opacity = "1";
            document.getElementsByClassName("foundOpponent")[i].style.display = "none";
        }
        
        document.getElementsByClassName("scoresList")[0].style.display = "none";
        document.getElementsByClassName("questionSpace")[0].style.display = "none";
        document.getElementById("countDownID").style.display = "none";
        document.getElementById("showResultsBtnID").style.display = "none";
        document.getElementsByClassName("winnersPodium")[0].style.display = "none";

        // set score defaults
        game_over = 0;
        penalty = 0;
        numQuestions = 0;
        document.getElementById("scoreID").innerHTML = "Score: 0 pts";
        for (let i = 0; i < document.getElementsByClassName("scoresListScore").length; i++) {
            document.getElementsByClassName("scoresListScore")[i].innerHTML = "0 pts";
        }

        document.getElementsByClassName("winner")[0].innerHTML = "1st place: ";
        document.getElementsByClassName("winner")[1].innerHTML = "2nd place: ";
        document.getElementsByClassName("winner")[2].innerHTML = "3rd place: ";
    }

    async function beginBattle() {
        resetBattle();
        // get username
        if (document.getElementById("battleUserID")) {
            playerUsername = document.getElementById("battleUserID").value;
            playerUsername = playerUsername.slice(0, 11);
        }
        if (typeof(Storage) !== "undefined") {
            //if (localStorage.key(i).includes("QuickM_battle_username")) {
            let key = "QuickM_battle_username";
            localStorage.setItem(key, playerUsername);
        } else {
            console.log("Browser does not support Web Storage");
        }  
        if (document.getElementsByClassName("scoresListUsername")) {
            document.getElementsByClassName("scoresListUsername")[0].innerHTML = playerUsername;
        }

        if (document.getElementById("loginCheckMsgID")) {
            document.getElementById("loginCheckMsgID").style.display = "none";
        }
        if (document.getElementById("battleUserID")) {
            document.getElementById("battleUserID").style.display = "none";
        }
        if (document.getElementById("battleTopics")) {
            document.getElementById("battleTopics").style.display = "none";
        }

        // dim battle btn
        if (document.getElementById("beginBattleBtnID")) {
            document.getElementById("beginBattleBtnID").style.transition = "all 1s";
            document.getElementById("beginBattleBtnID").style.opacity = "0";
        }
        

        await printLoadingScreen();

        if (document.getElementById("beginBattleBtnID")) {
            document.getElementById("beginBattleBtnID").style.display = "none";
        }
        if (document.getElementById("loadingBattleTextID")) {
            document.getElementById("loadingBattleTextID").style.display = "none";
        }
        
        await sleep(1000);

        // show home screen
        if (document.getElementsByClassName("welcome")[0]) {
            document.getElementsByClassName("welcome")[0].style.display = "block";
        }
        await findOpponents();
        getOpponents();
        await getPlayerSprites();
        await countDown();
        if (document.getElementsByClassName("scoresList")[0]) {
            document.getElementsByClassName("scoresList")[0].style.display = "block";        
        }
        myInterval = setInterval(showScores, 1000); // player "AI"
        makeQuestion();        
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function printLoadingScreen() {
        let loadingPercent = 0;
        while (loadingPercent < 100) {
            if (document.getElementById("loadingBattleTextID")) {
                document.getElementById("loadingBattleTextID").innerHTML = "Loading ... " + loadingPercent + "%";
            }
            loadingPercent += getRandomNumber(10, 20, 0, 0);
            await sleep(getRandomNumber(500, 1500, 0, 0));
        } 
        if (document.getElementById("loadingBattleTextID")) {
            document.getElementById("loadingBattleTextID").innerHTML = "Loading ... 100%";
            await sleep(1000);
            document.getElementById("loadingBattleTextID").style.transition = "all 3s";
            document.getElementById("loadingBattleTextID").style.opacity = "0";
            setTimeout(function() {
                if (document.getElementById("loadingBattleTextID")) {
                    document.getElementById("loadingBattleTextID").style.display = "none";
                }
            }, 3000);
        }
    }
    
    async function findOpponents() {
        if (document.getElementById("playersOnlineID")) {
            document.getElementById("playersOnlineID").innerHTML = "Total players currently online: " + getRandomNumber(100, 140, 0, 0);
        }
        if (document.getElementsByClassName("findOpponentsList")[0]) {
            document.getElementsByClassName("findOpponentsList")[0].style.display = "block";
        }
        if (document.getElementsByClassName("waitingRoom")[0]) {
            document.getElementsByClassName("waitingRoom")[0].style.display = "block";
        }
        if (document.getElementById("waitroomAnimation")) {
            document.getElementById("waitroomAnimation").style.display = "block";
        }
        let numPlayers = 1;
        if (document.getElementsByClassName("findOpponent")[0]) {
            document.getElementsByClassName("findOpponent")[0].style.display = "none";
        }
        if (document.getElementsByClassName("foundOpponent")[0]) {
            document.getElementsByClassName("foundOpponent")[0].style.display = "block";
            document.getElementsByClassName("foundOpponent")[0].innerHTML = playerUsername;    
        }        
        
        let maxPlayers = document.getElementsByClassName("findOpponent").length;
        while (numPlayers < maxPlayers) {
            await sleep(getRandomNumber(1000, 6000, 0, 0));
            /*
            document.getElementsByClassName("findOpponent")[numPlayers].style.transition = "all 2s";
            document.getElementsByClassName("findOpponent")[numPlayers].innerHTML = "Player found";
            document.getElementsByClassName("findOpponent")[numPlayers].style.backgroundColor = "#DEDEDE";
            */
            if (document.getElementsByClassName("findOpponent")[numPlayers]) {
                document.getElementsByClassName("findOpponent")[numPlayers].style.display = "none";
            }
            if (document.getElementsByClassName("foundOpponent")[numPlayers]) {
                document.getElementsByClassName("foundOpponent")[numPlayers].style.display = "block";
            }
            numPlayers += 1;
            if (document.getElementById("mapDotID")) {
                document.getElementById("mapDotID").style.transition = "all 3s";
                document.getElementById("mapDotID").style.top = getRandomNumber(1, 99, 0, 0) + "%";
                document.getElementById("mapDotID").style.left = getRandomNumber(1, 99, 0, 0) + "%";
            }            
        } 
        
        await sleep(1000);
        if (document.getElementsByClassName("foundOpponent")) {
            for (let i = 0; i < document.getElementsByClassName("foundOpponent").length; i++) {
                document.getElementsByClassName("foundOpponent")[i].style.transition = "all 3s";
                document.getElementsByClassName("foundOpponent")[i].style.opacity = "0";
                if (document.getElementById("waitroomAnimation")) {
                    document.getElementById("waitroomAnimation").style.transition = "all 3s";
                    document.getElementById("waitroomAnimation").style.opacity = "0";
                }                
            }
        }
        
        if (document.getElementsByClassName("findOpponentsList")[0]) {
            setTimeout(function() {document.getElementsByClassName("findOpponentsList")[0].style.display = "none";}, 3000);
        }
        if (document.getElementsByClassName("waitingRoom")[0]) {
            setTimeout(function() {document.getElementsByClassName("waitingRoom")[0].style.display = "none";}, 3000);
        }
        if (document.getElementById("waitroomAnimation")) {
            setTimeout(function() {document.getElementById("waitroomAnimation").style.display = "none";}, 3000);
        }

        await sleep(3000);
    }

    function getOpponents() {
        if (document.getElementsByClassName("scoresListUsername")[1]) {
            let names1 = ['Pill Cosby', 'Claustrophobic Teletubby', 'Mr.stark I don’t feel so good', 'HortonHearsAJew', 'Kahoot the Teacher', 'Honey wheres my super kah00t', 'Nerdy-Poo', 'KahToot', 'Loud Mouth', 'Inky', 'Chunkie', 'Confused Teletuby', 'KaShootMe', 'Sub2PewDiePie', 'Kim Jong Uno', 'Comedy Central', 'Homer', 'Couch Potato', 'Kashoot me', 'Kim Jong OOF', 'Moe Lester', 'Third Wheeler', 'Nugget', 'Kashoot da teacher', 'Chungus the fungus', 'Kermit Kermicide', 'Lil Diabetus', 'Big Chungus', 'Walking Dictionary'];
            document.getElementsByClassName("scoresListUsername")[1].innerHTML = names1[getRandomNumber(0, names1.length-1, 0, 0)].slice(0, 11);
            let names2 = ['Summer Teeth', 'Gucci Flippidy Flops', 'Johnny Johnny', 'Weird Beard', 'Kermit', 'Deja View', 'Fire Guy', 'Fuzzy Pack', 'Butternut', 'Organic Punk', 'Chris P Chicken', 'Ligma', 'Kool Kids Klub', 'Married Man', 'Metal Star', 'Ctrl W = Win', 'Peter file', 'TRIGGERED', 'Nerf Bastion', 'Billy Hills', 'Night Magnet', 'Dancing Madman', 'Egghead', 'Babysaurus', 'Enigma', 'Eye Candy', 'Cheeky Monkey', 'Butter Scotch', 'Junior Jumper', 'Floating Heart', 'Loading…', 'Yeet or be Yeeted'];
            document.getElementsByClassName("scoresListUsername")[2].innerHTML = names2[getRandomNumber(0, names2.length-1, 0, 0)].slice(0, 11);
            let names3 = ['Sassy Muffin', 'Canary Apple Red', 'Woodland Beauty', 'Miss Fix It', 'Miss Meow', 'Emerald Goddess', 'Marshmallow Treat', 'Leading Light', 'Queen Bee', 'Microwave Chardonnay', 'Gentle Woman', 'Cute Pumpkin', 'Titanium Ladybug', 'Freeze Queen', 'Young Lady', 'Winner Woman', 'Wonk Sidewalk', 'EnforcerTeen', 'Me Miss', 'Undergrad Split', 'Triple Adorable', 'Her Majesty', 'Cinderella', 'The Beekeeper', 'Cool Whip', 'Digital Goddess', 'Peanut Butter Woman', 'Fresh Lovely', 'Fisher Teen', 'Lady Turnip', 'Princess Fuzzie', 'Rainbow Sweety'];
            document.getElementsByClassName("scoresListUsername")[3].innerHTML = names3[getRandomNumber(0, names3.length-1, 0, 0)].slice(0, 11);
        }
        /*
        let names4 = ['Pink Nightmare', 'Wildcat Talent', 'Koi Diva', 'TeKilla Sunrise', 'Gabe itch', 'Loaf of Beans', 'Dixie Normous', 'Cheese Ball', 'Candy Cough', 'Panda Heart', 'Cranberry Sprite', 'Crayon Munchers', 'Magic Peach', 'Tiger Kitty', 'Flower Child', 'Freckles', 'Tragic Girl', 'Girls of Neptune', 'Candycane Missy', 'Cutie Bun', 'Huggable Bab', 'Missie Lucky', 'Broken Paws', 'Anonymous Girl', 'Tiny Hunter', 'Super Giggles', 'Lady Fantastic', 'Mafia Princess', 'Eye Candy Kitten', 'Troubled Chick', 'Feral Filly'];
        document.getElementsByClassName("scoresListUsername")[4].innerHTML = names4[getRandomNumber(0, names4.length-1, 0, 0)].slice(0, 11);
        let names5 = ['Chris P. Bacon', 'Loading', 'IntellectualGuy', 'FastLearner', 'Clean Your Room', 'ImDaTeacher', 'Baby shark', 'RicknMorty', 'DonaldDuck', 'CTRL+W=Win', 'Shrek dies in Endgame', 'NuggetHunter', 'Nerf Bastion', 'Cranberry Sprite', 'crayon munchers', 'peter file', 'myPPitches', 'KaTrash', 'TRIGGERED', 'The Fitness Gram Pacer Test'];
        document.getElementsByClassName("scoresListUsername")[5].innerHTML = names5[getRandomNumber(0, names5.length-1, 0, 0)].slice(0, 11);
        */
    }

    async function getPlayerSprites() {
        // get users details
        let userDetails = await firebase.getUsersDetails(user_id);
        products = await firebase.getAllProducts();
        if (document.getElementsByClassName("playerImg")[1]) {
            if (userDetails.hat !== 0) {
                let hatId = await firebase.getProductId(userDetails.hat); // hatId is the product id
                let hat = getProductDetails(hatId); // item_id
                if (document.getElementsByClassName("playerImg")) {
                    document.getElementsByClassName("playerImg")[1].style.display = "block";
                    document.getElementsByClassName("playerImg")[1].src = getImgSrc("hat", hat.item_id);
                }                
            }
            if (userDetails.shirt !== 0) {
                let shirtId = await firebase.getProductId(userDetails.shirt); // hatId is the product id
                let shirt = getProductDetails(shirtId); // item_id
                if (document.getElementsByClassName("playerImg")) {
                    document.getElementsByClassName("playerImg")[2].style.display = "block";
                    document.getElementsByClassName("playerImg")[2].src = getImgSrc("shirt", shirt.item_id);
                }
                
            }

            for (let i = 1; i < document.getElementsByClassName("player").length; i++) {
                let items = 3; // n(base, hat, shirt) = 3
                if (getRandomNumber(1, 5, 0, 0) !== 1) {            
                    document.getElementsByClassName("playerImg")[items*i+1].style.display = "block";
                    document.getElementsByClassName("playerImg")[items*i+1].src = getImgSrc("hat", getRandomNumber(1, hatsImg.length));
                }
                if (getRandomNumber(1, 5, 0, 0) !== 1) {
                    document.getElementsByClassName("playerImg")[items*i+2].style.display = "block";
                    document.getElementsByClassName("playerImg")[items*i+2].src = getImgSrc("shirt", getRandomNumber(1, shirtsImg.length));
                }
            }
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
            if (document.getElementById("countDownID")) {
                document.getElementById("countDownID").style.display = "block";
                for (let count = 3; count > 0; count--) {
                    if (document.getElementById("countDownID")) {
                        document.getElementById("countDownID").innerHTML = "Battle begins in " + count;
                    }
                    await sleep(1000);
                }
                if (document.getElementById("countDownID")) {
                    document.getElementById("countDownID").style.display = "none";
                }
            }
        }
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
        if (document.getElementsByClassName("scoresListScore")[0]) {
            for (let i = 0; i < document.getElementsByClassName("scoresListScore").length; i++) {
                getScores[i] = parseInt(document.getElementsByClassName("scoresListScore")[i].innerHTML.split(" ")[0]);
                
                if (getScores[i] === max_score) {
                    console.log("we have a winner");
                    game_over = 1;
                    clearInterval(myInterval);
                    gameOver();
                }
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
        if (document.getElementsByClassName("player")[0]) {
            for (let i = 0; i < rankScores.length; i++) {
                x = rankScores[i];
                let h = 62;
                h = 112; // should be height of playerDiv + 2
                document.getElementsByClassName("player")[x].style.top = (i - x) * h + "px";
            }
        }
    }

    async function makeQuestion() {
        if (document.getElementsByClassName("questionSpace")[0]) {
            document.getElementsByClassName("questionSpace")[0].style.opacity = "1";
            document.getElementsByClassName("questionSpace")[0].style.display = "block";
        }
        if (document.getElementsByClassName("scoresList")[0]) {
            document.getElementsByClassName("scoresList")[0].style.display = "block";
        }
        
        if (document.getElementById("secretsID")) {
            let secretMsg = document.getElementById("secretsID").innerHTML;
            console.log("secret: " + secretMsg);
            console.log("secret: '" + secretMsg + "' penalty is " + penalty);
            if (secretMsg === "Incorrect") {
                penalty += 1;
            }
            
            rankScoresList();
            numQuestions += 1;
            if (document.getElementsByClassName("scoresListScore")[0]) {
                if (document.getElementById("scoreID")) {
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
                        let topicType = "Surds";
                        if (document.getElementsByClassName("battleTopics")[0]) {
                            topicType = document.getElementsByClassName("battleTopics")[0].value;
                        } else {
                            console.log("issues, we have not selected a topic");
                            topicType = "Algebra";
                        }
                        let numQuestionTypes;
                        let chooseQuestion;
                        let correctAns, result;
                        //chooseQuestion = 1;
                        if (topicType === "Surds") {
                            // expandSurd, rationalOrIrrational, simplifySurd, surdAlgebra
                            numQuestionTypes = 4;
                            chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
                            if (chooseQuestion === 1) {                  
                                answerType(1); // user input string == 3  
                                result = expandSurd();
                            } else if (chooseQuestion === 2) {          
                                answerType(1); // multiplechoice === 1  
                                result = rationalOrIrrational();
                            } else if (chooseQuestion === 3) {          
                                answerType(1); // multiplechoice === 1  
                                result = simplifySurd();
                            } else if (chooseQuestion === 4) {          
                                answerType(1); // multiplechoice === 1  
                                result = surdAlgebra();
                            } else {
                                // done
                                console.log("test over");
                            }
                            
                            question_string = result[0];
                            if (document.getElementById("questionStringID")) {
                                document.getElementById("questionStringID").innerHTML = result[0];
                            }
                            let mcOptions = result.slice(1, result.length);
                            correctAns = mcOptions[0];
                            shuffle(mcOptions);
                            for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {                  
                                mcBtn(i, correctAns, question_string, "rates and ratios ex04");
                                //document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, question_string, "algebra ex05")};
                            }
                        } else {
                            numQuestionTypes = 2;
                            chooseQuestion = getRandomNumber(1, numQuestionTypes, 0, 0);
                            if (chooseQuestion === 1) {                  
                                answerType(3); // user input string == 3  
                                result = multiplicationAndDivision();
                                question_string = result[0];
                                if (document.getElementById("questionStringID")) {
                                    document.getElementById("questionStringID").innerHTML = result[0];
                                }
                                correctAns = result[1];
                                if (document.getElementById("userInputBtnID")) {
                                    document.getElementById("userInputBtnID").onclick = () => {checkUserInputAns(correctAns, document.getElementById("userInputStringID").value, question_string, "algebra ex01")};
                                }
                            } else if (chooseQuestion === 2) {          
                                answerType(1); // multiplechoice === 1  
                                result = fractions();
                                question_string = result[0];
                                if (document.getElementById("questionStringID")) {
                                    document.getElementById("questionStringID").innerHTML = result[0];
                                }
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
                        }
                        
                    } else {
                        gameOver();
                    }
                }
            }
        }
        
        
        
    }

    async function gameOver() {
        clearInterval(myInterval);
        console.log("the game is over");
        if (document.getElementById("answerType01")) {
            document.getElementById("answerType01").style.display = "none";
            document.getElementById("answerType02").style.display = "none";
            document.getElementById("answerType03").style.display = "none";
        }

        let winner = 0;
        if (document.getElementsByClassName("scoresListScore")[0]) {
            for (let i = 0; i < document.getElementsByClassName("scoresListScore").length; i++) {
                let score = parseInt(document.getElementsByClassName("scoresListScore")[i].innerHTML.split(" ")[0]);
                if (score === max_score) {
                    winner = i;
                }
            }                
        }

        console.log("winner is " + document.getElementsByClassName("scoresListUsername")[winner].innerHTML);
        if (document.getElementsByClassName("scoresList")[0]) {
            document.getElementsByClassName("scoresList")[0].style.transition = "all 3s";
            document.getElementsByClassName("scoresList")[0].style.opacity = "0";            
        }
        if (document.getElementsByClassName("questionSpace")) {
            document.getElementsByClassName("questionSpace")[0].style.transition = "all 3s";
            document.getElementsByClassName("questionSpace")[0].style.opacity = "0";
            setTimeout(function() {document.getElementsByClassName("scoresList")[0].style.display = "none";}, 3000);
            setTimeout(function() {document.getElementsByClassName("questionSpace")[0].style.display = "none";}, 3000);
            await sleep(3000);
            document.getElementById("showResultsBtnID").style.display = "block";
        }
    }

    async function showPodium() {        
        if (document.getElementById("showResultsBtnID")) {
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
            
            if (document.getElementsByClassName("winnersPodium")[0]) {
                document.getElementsByClassName("winnersPodium")[0].style.display = "block";
            }
            await sleep(500);
            if (document.getElementsByClassName("winner")[2]) {
                document.getElementsByClassName("winner")[2].innerHTML += document.getElementsByClassName("scoresListUsername")[podium[2]].innerHTML;
            }

            await sleep(750);
            if (document.getElementsByClassName("winner")[1]) {
                document.getElementsByClassName("winner")[1].innerHTML += document.getElementsByClassName("scoresListUsername")[podium[1]].innerHTML;
            }

            await sleep(1000);
            if (document.getElementsByClassName("winner")[0]) {
                document.getElementsByClassName("winner")[0].innerHTML += document.getElementsByClassName("scoresListUsername")[podium[0]].innerHTML;
            }
        }
    }

    return (
        <div className="Battle">
            <h1>Let the battle begin</h1>
            <p style={{display: "block"}} id="loginCheckMsgID">You need to sign in to access the Battle</p>
            <input style={{display: "none"}} id="battleUserID" autoComplete="off" placeholder="Username"></input>
            <br />
            <button style={{display: "none"}} id="beginBattleBtnID" onClick={beginBattle}>Begin Battle</button>

            <div style={{display: "none"}} id="battleTopics">            
                <h4>Topic:</h4>
                <select className="battleTopics"></select>
            </div>
            
            <div className="battleWorkspace">
                <p id="loadingBattleTextID"></p>
                <div className="welcome" style={{display:"none"}}>
                    <div className="waitingRoom" style={{display:"none"}}>
                        <div className="findOpponentsList" style={{display:"none"}}>
                            <p id="playersOnlineID"></p>
                            <p className="findOpponent">Looking for opponent...</p><p className="foundOpponent" style={{display: "none"}}>Player found</p>
                            <p className="findOpponent">Looking for opponent...</p><p className="foundOpponent" style={{display: "none"}}>Player found</p>
                            <p className="findOpponent">Looking for opponent...</p><p className="foundOpponent" style={{display: "none"}}>Player found</p>
                            <p className="findOpponent">Looking for opponent...</p><p className="foundOpponent" style={{display: "none"}}>Player found</p>
                        </div>
                        <div id="waitroomAnimation" style={{display:"none"}}>
                            <section className="map">
                                <br /><br />
                                <img src={map} className="img-map" alt="" />
                                <div className="dots">
                                    <p className="map-dot map-dot-red" id="mapDotID" style={{top: "39%", left: "45.5%"}}></p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="scoresList" style={{display:"none"}}>
                        <div className="player" id="userPlr">
                            {/*<img className="playerImg" alt="player" src="https://i.ytimg.com/vi/lCAVcUQY83c/hqdefault.jpg" /> */}
                            <img className="playerImg" id="userAvatar_base" src={avatarsImg[0]} alt="avatar"/>
                            <img className="playerImg" id="userAvatar_hat" alt="hat" style={{display:"none"}} />
                            <img className="playerImg" id="userAvatar_shirt" alt="shirt" style={{display:"none"}} />
                            <p className="scoresListUsername">Slayer123</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        <div className="player">
                            <img className="playerImg" id="userAvatar_base" src={avatarsImg[1]} alt="avatar"/>
                            <img className="playerImg" id="userAvatar_hat" alt="hat" style={{display:"none"}} />
                            <img className="playerImg" id="userAvatar_shirt" alt="shirt" style={{display:"none"}} />
                            <p className="scoresListUsername">princess1995</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        <div className="player">
                            <img className="playerImg" id="userAvatar_base" src={avatarsImg[2]} alt="avatar"/>
                            <img className="playerImg" id="userAvatar_hat" alt="hat" style={{display:"none"}} />
                            <img className="playerImg" id="userAvatar_shirt" alt="shirt" style={{display:"none"}} />
                            <p className="scoresListUsername">kingJames</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        <div className="player">
                            <img className="playerImg" id="userAvatar_base" src={avatarsImg[3]} alt="avatar"/>
                            <img className="playerImg" id="userAvatar_hat" alt="hat" style={{display:"none"}} />
                            <img className="playerImg" id="userAvatar_shirt" alt="shirt" style={{display:"none"}} />
                            <p className="scoresListUsername">Matt</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        {/*
                        <div className="player">
                            <p className="scoresListUsername">dora</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        <div className="player">
                            <p className="scoresListUsername">anna</p>
                            <p className="scoresListScore">0 pts</p>
                        </div>
                        */}
                    </div>
                    <p id="countDownID" style={{display:"none"}}></p>
                    <div className="questionSpace">
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
