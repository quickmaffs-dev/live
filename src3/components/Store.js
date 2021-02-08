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
let hatsImg = [hat1, hat2, hat3, hat4, hat5];
let shirtsImg = [shirt1, shirt2, shirt3, shirt4, shirt5, shirt6, shirt7, shirt8, shirt9, shirt10];

let user_id = 0;
let usersPoints = 0;
let products = [];
let packCost = 100;

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

    function dressUser(c, id) {
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
        showMyItems();
    }

    async function openStore() {
        document.getElementById("slotBtn").innerHTML = "Buy a pack?<br />(" + packCost + " pts)";        
        await showMyItems();
        await openSlots();
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
                    row += "<br><input class='price' /><button class='sellItem' value='" + rid + "'>sell item</button>";
                }                
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
                    }                    
                }
                await showMyItems();
                await openMarket();

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
            console.log("you cannot afford a pack");
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
        let marketItems = await firebase.getMarketItems();
        let myItems = "";
        let otherItems = "";
        for (let i = 0; i < marketItems.length; i++) {
            let p = getProductDetails(marketItems[i].product_id);
            let imgSrc = getImgSrc(p.class, p.item_id);
            if (marketItems[i].user_id === user_id) {
                myItems += "<td>";
                myItems += "<img src="+imgSrc+" ><p>"+p.desc+"</p>";
                myItems += "<p>" + marketItems[i].price + "pts</p>";
                myItems += "<button class='takeOffMarketBtn' value='"+marketItems[i].receipt_id+"'>take off market</button>";
                myItems += "</td>";
            } else {
                otherItems += "<td>";
                otherItems += "<img src="+imgSrc+" ><p>"+p.desc+"</p>";
                otherItems += "<p>" + marketItems[i].price + "pts</p>";
                otherItems += "<button class='purchaseItemBtn' value='"+marketItems[i].receipt_id+"'>purchase</button>";
                otherItems += "</td>";                
            }
        }

        if (document.getElementsByClassName("myItemsForSale")[0]) {
            document.getElementsByClassName("myItemsForSale")[0].innerHTML = "<table><tbody><tr>" + myItems + "</tr></tbody></table>";
            document.getElementsByClassName("otherItemsForSale")[0].innerHTML = "<table><tbody><tr>" + otherItems + "</tr></tbody></table>";
        }

        await marketBtnsActivate();
    }

    async function marketBtnsActivate() {
        let takeOffMarketBtn = document.getElementsByClassName("takeOffMarketBtn");
        for (let i = 0; i < takeOffMarketBtn.length; i++) {
            takeOffMarketBtn[i].onclick = async function(){
                //console.log(takeOffMarketBtn[i].value);
                let rid = parseInt(takeOffMarketBtn[i].value);
                await firebase.takeOffMarket(rid);                
                await showMyItems();
                await openMarket();
            }
        }

        let uid = user_id;
        let uPoints = usersPoints;
        let purchaseItemBtn = document.getElementsByClassName("purchaseItemBtn");
        for (let i = 0; i < purchaseItemBtn.length; i++) {
            purchaseItemBtn[i].onclick = async function(){
                let rid = parseInt(purchaseItemBtn[i].value);
                console.log("user has " + uPoints);
                await firebase.purchaseItem(rid, uid, uPoints);
                await showMyItems();
                await openMarket();
                await updatePoints(uid);

            }
        }
        
    }

    return (
        <div className="Store">
            <h1>Store</h1>
            <p id="textID"></p>
            <div className="userInfo" style={{display:"none"}}>
                <p id="userID"></p>
                <h3>Your Avatar:</h3>
                <img className="avatarClass" id="userAvatar_base" src={avatarsImg[0]} alt="avatar"/>
                <img className="avatarClass" id="userAvatar_hat" alt="hat" style={{display:"none"}} />
                <img className="avatarClass" id="userAvatar_shirt" alt="shirt" style={{display:"none"}} />
            </div>
            <div className="myItems">
                <h3>My Items</h3>
                <div className="itemList"></div>
            </div>
            <br />
            <div className="pack">
                <h3>Slot Machine</h3>
                <br /><br />
                <div className="slotMachine" style={{display:"none"}}>
                    <button id="slotBtn" className="big-button" onClick={spinSlot}>Buy a pack?</button>
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
            <div className="marketplace">
                <h3>Marketplace</h3>
                <h4>My items for sale</h4>
                <div className="myItemsForSale"></div>
                <br />
                <h4>Other items for sale</h4>
                <div className="otherItemsForSale"></div>
            </div>
            <br /><br />
        </div>      

        
    );
}

export default Store;
