import React, {useEffect} from 'react';
import firebase from './firebase';
import '../styling/store.css';
import {getRandomNumber} from './exercises/MathFunctions';
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

let avatarsImg = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
let hatsImg = ["https://cvws.icloud-content.com/B/AXLbYwjtdQyGj6Jt1H55ff9kb7XcAVjldp0Q8NEy1-uEAm9grHqDQYGZ/hat1.png?o=ArMNrtgXFH1iWVe_S7Q2wL4ywNdroBlmS2Q1q_pM2KZ8&v=1&x=3&a=CAog8DQ7hKn6TZyjhPc6YLWmTGyrLe5jsCtIGQggMV5CW9ISbxDFjt7T2i4Y5YWV1NouIgEAUgRkb7XcWgSDQYGZaicWEEZHwe42sN79KY8PAAASKw29wZzvGTLfQiJO_iev_GDV7VwlwX9yJyxKh43m5wj_IBRxBeVHeAile7Gg5oaeiw3NzZ8Jqx8wP-4qjx5aVw&e=1604883661&fl=&r=3fc6ed33-97c5-4016-9614-5f18fef9a0a4-1&k=RdlHMFlM3TXUpaOuWqPUPg&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=54&s=vQx4H-2fYo6iM5hfRhHq06fLFeQ&cd=i", "https://cvws.icloud-content.com/B/AU6dXI8f0rs9qD2IRNjsICsxqSz8AdF7oJuR0OF1ufBSsk5y_aIZ14va/hat2.png?o=AvQMfCq-h6WtZDn59Plm5yjgtSc7PRa9ZJws1ShOAw5S&v=1&x=3&a=CAogNe47abX8WlC2QzFATDwHTSJx8g2Hid8Q7-2a4U7Qr9ESbxCEueLT2i4YpLCZ1NouIgEAUgQxqSz8WgQZ14vaaid9Pa7zzxugMZwQJZXIkSImAJXDTguKYfYDwGTpci5RoaRs_RFW_hRyJ0-5M2gjfzb2ABhxT6cxKllv66iG6kFjzX4XnLGLqtc1e9I0meydKg&e=1604883732&fl=&r=f4e9ec4a-fabb-4532-b648-b368caf185f7-1&k=aHXYGN5TavFin83qTItdgg&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=54&s=SCQHAyT5qcsRUM3JPpwyMH9s_e4&cd=i", "https://cvws.icloud-content.com/B/AbaslbOH3Q131H_gKnzFMFVclLqJAfRYM1tiNIYm4f2i-ZDCMvPq1Na_/hat3.png?o=AvAsiwh95BI64EoUa0M5WXihr4amVGnm8qU8GwIcBn6x&v=1&x=3&a=CAogOCiiCpQMw3Cp10HJ1ijueFrLw0xp-FtaX00nqiE_688SbxCAw-LT2i4YoLqZ1NouIgEAUgRclLqJWgTq1Na_aif7EFJCGl_0KJN0o4Kq6f9UNeLcpU1X9gO4NbBtZf2hET3mQJJaYrByJ4RdCe5cFQFZ0forY8zj2yCw-WkhlqS_qd2HwsqC8Mk5jdK7urQsZA&e=1604883733&fl=&r=30e0b050-50c7-4778-939c-849f9c547290-1&k=VWrEe6gIW_2S2WP671xmMQ&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=54&s=9sSgxLlF3KDwfdOd288pDMKDMHY&cd=i", "https://cvws.icloud-content.com/B/AbHgWLDQhtKaZkQ9FtycRqdx6-HSAawhhyC9OfeY-WON9UAhZLXhxhd6/hat4.png?o=AhFDem3S9O_jUy_5YUBQt7dpbJy1JaB7ImiVBHJ5eWYn&v=1&x=3&a=CAog5GJBlNEo_7v2SfkJlDTt3LQQUaORtpBgVZe-izfpKcUSbxCLx-LT2i4Yq76Z1NouIgEAUgRx6-HSWgThxhd6aifmqeVJjqkbxuEAG5L-gngKpZVRsqeFtLrQ9OW06dmatwQf50V0llhyJ4MJhLnVQAJI_zVeWuci_AlpWfFIe81JAWcWixRqhKlbq-7BaGxqxQ&e=1604883734&fl=&r=8935c141-8ea3-41bf-bfad-7c384f9cec09-1&k=LTWHf156QXaESh_bD5NMZw&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=54&s=gxqTrn7vD-rViZ-A474igsQiR-Q&cd=i", "https://cvws.icloud-content.com/B/AZLDHxXuhpmIzC_bGBbEH4eJ8NC6AcUyDr7riUai4lyKtaI7BD4606XR/hat5.png?o=AgFKuOf4jddUNsg2fGuX2c3dub3l41Eb9_zDgc-YtilD&v=1&x=3&a=CAogfQcVGqJ-lrgwypCHbNwxMK17XW-n0bT6PnTPjc8kPbwSbxCNteLT2i4YrayZ1NouIgEAUgSJ8NC6WgQ606XRaifZ5VjkayZtDhm_xCYzfcisJ8E7vFUo-LHl09-3V1zmY8kTxecmGiNyJ_AaZ41RcvePh3L_II95bCouEcjCTOlzP5HG11_tN8B5w3wpR1RVUA&e=1604883732&fl=&r=90e9b026-21e7-46a4-8a8f-53cee9cd023b-1&k=4CAM2IptEIKgm3QtMqcAYg&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=54&s=srzm7nHsxI97-6jr1BrFajIQIgE&cd=i"];
hatsImg = [hat1, hat2, hat3, hat4, hat5];
let shirtsImg = [shirt1, shirt2, shirt3, shirt4, shirt5, shirt6, shirt7, shirt8, shirt9, shirt10];

let user_id = 0;
let usersPoints = 0;
let products = [];
let marketItems = [];
let packCost = 5000;


const Store = () => {
    useEffect(() => {
        checkIfUserIsLoggedIn();             
    });

    async function checkIfUserIsLoggedIn() {
        document.getElementById("slotBtn").disabled = true;
        user_id = await firebase.getCurrentUserID();
        if (user_id !== null) {
            console.log("loggedin");
            products = await firebase.getAllProducts();
            let userDetails = await firebase.getUsersDetails(user_id);
            usersPoints = userDetails.points;
            if (document.getElementsByClassName("userInfo")[0]) {
                document.getElementsByClassName("userInfo")[0].style.display = "block";
                document.getElementsByClassName("myItems")[0].style.display = "block";
                document.getElementsByClassName("pack")[0].style.display = "block";
                document.getElementsByClassName("marketplace")[0].style.display = "block";
                document.getElementById("userID").innerHTML = "You have " + usersPoints + " points";
            }
            
            // dress user    
            // userDetails.hat is the receipt_id
            let hatId = await firebase.getProductId(userDetails.hat); // hatId is the product id
            let hat = getProductDetails(hatId); // item_id
            let shirtId = await firebase.getProductId(userDetails.shirt); // hatId is the product id
            let shirt = getProductDetails(shirtId); // item_id
            dressUser("hat", hat.item_id);
            dressUser("shirt", shirt.item_id);
            await openStore();

            console.log("thunderbirds are go");
        } else {
            noUser();
        }   
    }

    async function updatePoints(user_id) {
        let userDetails = await firebase.getUsersDetails(user_id);
        usersPoints = userDetails.points;
        document.getElementsByClassName("userInfo")[0].style.display = "block";
        document.getElementById("userID").innerHTML = "You have " + usersPoints + " points";
    }

    function noUser() {
        document.getElementById("textID").innerHTML = "You need to sign in to see the store.";
    }

    async function dressUser(c, id) {
        if (id > 0) {
            let n = document.getElementsByClassName("avatarClass");
            for (let i = 0; i < n.length; i++) {
                if (n[i].id === "userAvatar_" + c) {
                    document.getElementById("userAvatar_" + c).style.display = "block";
                    let imgSrc = getImgSrc(c, id);
                    n[i].src = imgSrc;
                    i = n.length;
                }
            }
        } else {
            document.getElementById("userAvatar_" + c).style.display = "none";
        }
        await showMyItems();
    }

    async function openStore() {
        document.getElementById("slotBtn").innerHTML = "Buy a pack?<br />(" + packCost + " pts)";        
        //await showMyItems();
        await openSlots();
        marketItems = await firebase.getMarketItems();
        await openMarket();


    }

    async function showMyItems() {
        let myItems = await firebase.getMyItems(user_id);
        let userDetails = await firebase.getUsersDetails(user_id);
        let row = "";
        for (let i = 0; i < myItems.length; i++) {
            if (myItems[i].for_sale === 0) {
                let rid = myItems[i].receipt_id;
                let p = getProductDetails(myItems[i].product_id);
                //console.log(p.desc);               
                let imgSrc = getImgSrc(p.class, p.item_id);
                row += "<td>";
                row += "<img src="+imgSrc+" ><p>"+p.desc+"</p>";
                /*
                row += "<button class='equipItemBtn' value='"+myItems[i].product_id+"'>equip</button>";
                row += "<button class='unequipItemBtn' value='"+myItems[i].product_id+"'>unequip</button>";
                */
                if (userDetails.hat === rid || userDetails.shirt === rid || userDetails.background === rid) {
                    row += "<button class='unequipItemBtn' value='" + rid + "'>unequip</button>";
                } else {
                    row += "<button class='equipItemBtn' value='" + rid + "'>equip</button>";                    
                    row += "<br><br><input class='price' placeholder='enter points...' /> <button style='background-color:#4CAF50' class='sellItem' value='" + rid + "'>sell item</button>";
                    //row += "<button class='takeOffMarketBtn' value='"+marketItems[i].receipt_id+"'>take off market</button>";
                }                
                row += "</td>";
                
            }
        }
        let marketItems = await firebase.getMarketItems();
        for (let i = 0; i < marketItems.length; i++) {
            let p = getProductDetails(marketItems[i].product_id);
            let imgSrc = getImgSrc(p.class, p.item_id);
            if (marketItems[i].user_id === user_id) {
                row += "<td>";
                row += "<img src=" + imgSrc + " ><p>" + p.desc + " - " + marketItems[i].price + " pts</p>";
                row += "<button class='takeOffMarketBtn' value='"+marketItems[i].receipt_id+"'>take off market</button>";
                row += "</td>";
            }
        }

        if (document.getElementsByClassName("itemList")[0]) {
            document.getElementsByClassName("itemList")[0].innerHTML = "<table><tbody><tr>" + row + "</tr></tbody></table>";
        }
        await myItemsBtnsActivate();
    }
    
    async function myItemsBtnsActivate() {
        let uid = user_id;
        let equipBtn = document.getElementsByClassName("equipItemBtn");
        for (let i = 0; i < equipBtn.length; i++) {
            equipBtn[i].onclick = async function(){
                //let pid = parseInt(val.split("_")[1]);
                let rid = parseInt(equipBtn[i].value);
                console.log("rid is " + rid);
                let pid = await firebase.getProductId(rid);
                console.log("pid is " + pid);
                let p = getProductDetails(pid);
                await firebase.updateUserAvatarDb(uid, p.class, rid);
                dressUser(p.class, p.item_id);
            }
        }

        let unequipBtn = document.getElementsByClassName("unequipItemBtn");
        for (let i = 0; i < unequipBtn.length; i++) {
            unequipBtn[i].onclick = async function(){
                let rid = parseInt(unequipBtn[i].value);
                let pid = await firebase.getProductId(rid);
                let p = getProductDetails(pid);
                await firebase.updateUserAvatarDb(uid, p.class, 0);
                dressUser(p.class, 0);
            }
        }

        let sellItem = document.getElementsByClassName("sellItem");
        for (let i = 0; i < sellItem.length; i++) {
            sellItem[i].onclick = async function(){
                let price = document.getElementsByClassName("price")[i].value;
                if (!isNaN(price)) {
                    price = parseInt(price);
                    if (price > 0) {
                        let rid = parseInt(sellItem[i].value);
                        await firebase.listItemOnMarket(rid, price);
                        writeNotification("Success! Item has been listed on the market for " + price + " points!");
                    }                    
                } else {
                    writeNotification("'" + price + "' is not a number, numbers only please");
                }
                await showMyItems();
                await openStore();

            }
        }

        let takeOffMarketBtn = document.getElementsByClassName("takeOffMarketBtn");
        for (let i = 0; i < takeOffMarketBtn.length; i++) {
            takeOffMarketBtn[i].onclick = async function(){
                //console.log(takeOffMarketBtn[i].value);
                let rid = parseInt(takeOffMarketBtn[i].value);
                await firebase.takeOffMarket(rid);                
                await showMyItems();
                await openStore();
            }
        }
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

    async function openSlots() {
        // get products
        if (document.getElementById("slotBtn")) {
            document.getElementById("slotBtn").disabled = false;

            document.getElementsByClassName("slotMachine")[0].style.display = "block";
            let m = document.getElementsByClassName("slot");        
            if (products.length > 0) {
                for (let i = 0; i < m.length; i++) {                
                    let n = getRandomNumber(0, products.length-1, 0, 0);
                    let c = products[n].class;
                    let id = products[n].item_id;
                    document.getElementsByClassName("slot")[i].src = getImgSrc(c, id);
                }
            }
        }
    }

    async function spinSlot() {
        if (usersPoints >= packCost) {
            await firebase.purchasePack(user_id, packCost);
            await updatePoints(user_id);


            document.getElementsByClassName("slotMachine")[0].style.display = "block";
            let m = document.getElementsByClassName("slot");        
            if (products.length > 0) {
                let packItems = [];
                for (let i = 0; i < m.length; i++) {                
                    let n = getRandomNumber(0, products.length-1, 0, 0);
                    if (i === 2 || i === 5 || i === 8) {
                        let pid = products[n].product_id;
                        let duplicate = 0;
                        for (let j = 0; j < packItems.length; j++) {
                            if (packItems[j] === pid) {
                                i -= 1;
                                j = packItems.length;
                                duplicate = 1;
                            }
                        }
                        if (duplicate === 0) {
                            packItems.push(pid);
                        }
                    }
                    let c = products[n].class;
                    let id = products[n].item_id;
                    let imgSrc = getImgSrc(c, id);
                    moveSlotTile(i, imgSrc);
                }
                
                // print out items
                printSlotWinners(packItems);
    
                // add items to the wardrobe
                await firebase.addToWardrobe(user_id, packItems);
                await showMyItems();
            } else {
                console.log("slots are closed (try again)");
            }        
        } else {
            writeNotification("You cannot afford a pack");
        }        
    }

    function printSlotWinners(packItems) {
        for (let i = 0; i < packItems.length; i++) {
            let p = getProductDetails(packItems[i]);
            console.log(p.desc);
        }
    }
        
    function moveSlotTile(i, imgSrc) {
        let m = document.getElementsByClassName("slot");        
        m[i].src = imgSrc;
        let slots = 4;
        let h = 202;
        let j = i;  
        m[j].style.opacity = "0";
        i = i%slots;
        let pos = i*h;
        let f = setInterval(move, 10);
        let speed = 10;        
        let rotation = 0;
        let countdown = 3;
        function move() {        
            rotation += 1;        
            let revs = [42, 60, 78];

            if (rotation % revs[Math.floor(j/slots)] === 0) {
                speed -= 1;
                if (speed < 1) {
                    speed = 1;
                    countdown += 1;
                }    
            }

            if (speed === 1 && countdown > slots && pos > (2 * slots + i) * h) {
                clearInterval(f);
            } else {
                if (pos%(slots*h) < 3*h) {
                    let move = ((pos)%(h*slots) - i*h);
                    //move += 2*Math.floor(j/3);
                    m[j].style.top = move + "px";
                }
                pos += speed;                
            }

            if (pos%(slots*h) < 3*h) {
                m[j].style.opacity = "1";
            } else {
                m[j].style.opacity = "0";
            }
        }
    }

    async function openMarket() {        
        let otherItems = "";
        for (let i = 0; i < marketItems.length; i++) {
            let p = getProductDetails(marketItems[i].product_id);
            let imgSrc = getImgSrc(p.class, p.item_id);
            if (marketItems[i].user_id !== user_id) {                
                otherItems += "<td>";
                otherItems += "<img src="+imgSrc+" ><p>"+p.desc+"</p>";
                otherItems += "<button class='purchaseItemBtn' value='"+marketItems[i].receipt_id+"'>Purchase for " + marketItems[i].price + " pts</button>";
                otherItems += "</td>";                
            }
        }

        if (document.getElementsByClassName("otherItemsForSale")[0]) {
            document.getElementsByClassName("otherItemsForSale")[0].innerHTML = "<table><tbody><tr>" + otherItems + "</tr></tbody></table>";
        }

        await marketBtnsActivate();
    }

    async function marketBtnsActivate() {        
        let uid = user_id;
        let uPoints = usersPoints;
        let purchaseItemBtn = document.getElementsByClassName("purchaseItemBtn");
        for (let i = 0; i < purchaseItemBtn.length; i++) {
            purchaseItemBtn[i].onclick = async function(){
                let rid = parseInt(purchaseItemBtn[i].value);
                console.log("user has " + uPoints);
                let msg = await firebase.purchaseItem(rid, uid, uPoints);
                await showMyItems();
                await openStore();
                await updatePoints(uid);
                writeNotification(msg);
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

    return (
        <div className="Store">
            <h1>Store</h1>
            <p id="textID"></p>
            <div className="notificationShade" style={{display:"none"}}></div>
            <div className="notification" style={{display:"none"}}>
                <p id="noteText">This is a message</p>
                <button onClick={closeNotification}>OK</button>
            </div>
            <div className="userInfo" style={{display:"none"}}>
                <p id="userID"></p>
                <h3>Your Avatar:</h3>
                <img className="avatarClass" id="userAvatar_base" src={avatarsImg[0]} alt="avatar"/>
                <img className="avatarClass" id="userAvatar_hat" alt="hat" style={{display:"none"}} />
                <img className="avatarClass" id="userAvatar_shirt" alt="shirt" style={{display:"none"}} />
            </div>
            <div className="myItems" style={{display:"none"}}>
                <h3>My Items</h3>
                <div className="itemList"></div>
            </div>
            <br />
            <div className="pack" style={{display:"none"}}>
                <h3>Slot Machine</h3>
                <br /><br />
                <div className="slotMachine" style={{display:"none"}}>
                    <div className="buttonCentre">
                        <button id="slotBtn" className="big-button" onClick={spinSlot}>Buy a pack?</button>
                    </div>
                    <br /><br />
                    <div className="slotSlider">
                        <p id="sheet1">sheet</p>
                        <img className="slot" alt="slot1" />
                        <img className="slot" alt="slot2" />
                        <img className="slot" alt="slot3" /> {/* this one */}
                        <img className="slot" alt="slot4" />
                        <p id="sheet2">sheet</p>
                    </div>
                    <div className="slotSlider">
                        <p id="sheet1">sheet</p>
                        <img className="slot" alt="slot1" />
                        <img className="slot" alt="slot2" /> {/* this one */}
                        <img className="slot" alt="slot3" />
                        <img className="slot" alt="slot4" />
                        <p id="sheet2">sheet</p>
                    </div>                
                    <div className="slotSlider">
                        <p id="sheet1">sheet</p>
                        <img className="slot" alt="slot1" /> {/* this one */}
                        <img className="slot" alt="slot2" /> 
                        <img className="slot" alt="slot3" />
                        <img className="slot" alt="slot4" />
                        <p id="sheet2">sheet</p>
                    </div>    
                    <br /><br /><br /><br />
                </div>                
            </div>  
            <br /><br />
            <div className="marketplace" style={{display:"none"}}>
                <h3>Marketplace</h3>
                <div className="otherItemsForSale"></div>
            </div>
            <br /><br />
        </div>      

        
    );
}

export default Store;
