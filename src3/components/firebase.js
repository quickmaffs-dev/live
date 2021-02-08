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
        this.u_id = 0;
        this.currentUserID = 0;
        this.currentUsername = "";        
    }

    async registerUser(db, em, pass, u_id) {
        // add to database
        await firebase.database().ref(db).push({
            email: em
            , password: pass
            , user_id: u_id
            , points: 0
            , background: 0
            , avatar: u_id%6
            , hat: 0
            , shirt: 0
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

    getCurrentUserID2() {        
        this.currentUserID = null;
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem("QuickM_u_id") !== null && localStorage.getItem("QuickM_u_id") !== "null") {
                this.currentUserID = parseInt(localStorage.getItem("QuickM_u_id"));                
            }
        }
        return this.currentUserID;        
    }

    async depositPoints(uid, points) {
        console.log("depositing points...");
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        let key = 0;
        let dataKey = key;
        // get current points
        let prevPoints = 0;
        for (let k in x.val()) {
            if (uid === x.val()[k].user_id) {                
                prevPoints = parseInt(x.val()[k].points);
                dataKey = key;
            } else {
                key += 1;
            }
        }

        // add new points
        let objKey = Object.keys(x.val())[dataKey];
        await firebase.database().ref(db + '/' + objKey).child("points").set(prevPoints + points);
        console.log("updated points in db");
    }

    async getUsersDetails(uid) {
        console.log("getting the users details...");
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        let d;
        for (let k in x.val()) {
            if (uid === x.val()[k].user_id) {
                d = {
                    points: x.val()[k].points,
                    avatar: x.val()[k].avatar,
                    background: x.val()[k].background,
                    hat: x.val()[k].hat,
                    shirt: x.val()[k].shirt
                }
            }
        }
        console.log("returning details");
        return d;
    }
    
    async getCurrentUserID() {
        /*
        let pass;
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem("QuickM_u_id") !== null && localStorage.getItem("QuickM_u_id") !== "null") {
                pass = localStorage.getItem("QuickM_u_id_pass").replace(/"/g,"");
            }
        }
        console.log("pass is " + pass);
        let u_id = this.getCurrentUserID();
        this.currentUsername = null;
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        for (let k in x.val()) {
            if (u_id === x.val()[k].user_id && pass === x.val()[k].password) {
                this.currentUsername = x.val()[k].email;
            }
        }
        console.log("username is " + this.currentUsername);

        return this.currentUsername;
        */
        let pass, email;
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem("QuickM_u_id") !== null && localStorage.getItem("QuickM_u_id") !== "null") {
                pass = localStorage.getItem("QuickM_u_id_pass").replace(/"/g,"");
                email = localStorage.getItem("QuickM_u_id_email").replace(/"/g,"");
            }
        }
        this.u_id = null;
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        for (let k in x.val()) {
            if (email === x.val()[k].email && pass === x.val()[k].password) {
                this.u_id = x.val()[k].user_id;
            }
        }
        //console.log("firebase " + this.u_id);
        return this.u_id;
    }

    async getCurrentUsername() {        
        let username = null;
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        for (let k in x.val()) {
            if (this.u_id === x.val()[k].user_id) {
                username = x.val()[k].email;
            }
        }

        return username;
    }
    
    async loginRealTime(em, pass) {
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        for (let k in x.val()) {
            if (em === x.val()[k].email) {
                if (pass === x.val()[k].password) {
                    this.currentUserID = x.val()[k].user_id;
                    this.currentUsername = x.val()[k].email;
                    this.currentPass = x.val()[k].password;
                    window.location.reload();

                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem("QuickM_u_id", JSON.stringify(this.currentUserID));
                        localStorage.setItem("QuickM_u_id_email", JSON.stringify(this.currentUsername));
                        localStorage.setItem("QuickM_u_id_pass", JSON.stringify(this.currentPass));
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

    // store
    async getAllProducts() {
        console.log("getting all products...");
        let db = "avatar-product-db";
        let x = await firebase.database().ref(db).once('value');
        let p, products = [];
        for (let k in x.val()) {
            if (x.val()[k].class !== "avatar") {
                p = {
                    class: x.val()[k].class,
                    item_id: x.val()[k].item_id,
                    product_id: x.val()[k].product_id,
                    desc:  x.val()[k].desc
                }
                products.push(p);
            }            
        }
        console.log("returning all products");
        return products;
    }

    async getProductId(rid) {
        // from rid return pid
        console.log("getting product id...");
        let db = "quick-maffs-wardrobe-db";
        let x = await firebase.database().ref(db).once('value');
        let p = 0;
        for (let k in x.val()) {
            if (x.val()[k].receipt_id === rid) {
                p = x.val()[k].product_id;
                break;
            }            
        }
        console.log("product id found");
        return p;
    }

    
    async getMyItems(uid) {
        console.log("getting all users items...");
        let db = "quick-maffs-wardrobe-db";
        let x = await firebase.database().ref(db).once('value');
        let p, myItems = [];
        for (let k in x.val()) {
            if (x.val()[k].user_id === uid) {
                p = {
                    product_id: x.val()[k].product_id,
                    for_sale: x.val()[k].for_sale,
                    receipt_id: x.val()[k].receipt_id
                }
                myItems.push(p);
            }            
        }
        console.log("returning all users items");
        return myItems;
    }

    async getMarketItems() {        
        console.log("getting items on the market...");
        let db = "quick-maffs-wardrobe-db";
        let x = await firebase.database().ref(db).once('value');
        let p, marketItems = [];
        for (let k in x.val()) {
            if (x.val()[k].for_sale === 1) {
                p = {
                    product_id: x.val()[k].product_id,
                    user_id: x.val()[k].user_id,
                    price: x.val()[k].price,
                    receipt_id: x.val()[k].receipt_id
                }
                marketItems.push(p);
            }            
        }
        console.log("returning all market items");
        return marketItems;
    }

    async addToWardrobe(uid, packItems) {
        console.log("adding item to wardrobe...");
        let db = "quick-maffs-wardrobe-db";
        let x = await firebase.database().ref(db).once('value');
        let rid = 0;
        for (let i = 0; i < packItems.length; i++) {
            if (x.val()) {
                rid = Object.keys(x.val()).length + 1 + i;
            } else {
                rid += 1;
            }
            
            await firebase.database().ref(db).push({
                receipt_id: rid
                , user_id: uid
                , product_id: packItems[i]
                , for_sale: 0
            });
        }
        console.log("added items to the wardrobe");
    }   
        
    async purchasePack(uid, price) {
        console.log("processing pack payment...");
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        let key = 0;
        let dataKey = key;
        // get current points
        let prevPoints = 0;
        for (let k in x.val()) {
            if (uid === x.val()[k].user_id) {                
                prevPoints = parseInt(x.val()[k].points);
                dataKey = key;
            } else {
                key += 1;
            }
        }

        // add new points
        let objKey = Object.keys(x.val())[dataKey];
        await firebase.database().ref(db + '/' + objKey).child("points").set(prevPoints - price);
        console.log("pack payment processed");
    }

    async updateUserAvatarDb(uid, c, id) {
        console.log("updating user info in database...");
        // get product and item details
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        let key = 0;
        let dataKey = key;
        for (let k in x.val()) {
            if (uid === x.val()[k].user_id) {                
                dataKey = key;
            } else {
                key += 1;
            }
        }        
        let objKey = Object.keys(x.val())[dataKey];
        await firebase.database().ref(db + '/' + objKey).child(c).set(id);

        console.log("user info updated");
    }

    async listItemOnMarket(rid, price) {
        console.log("listing item on the market...");
        let db = "quick-maffs-wardrobe-db";
        let x = await firebase.database().ref(db).once('value');
        let key = 0;
        let dataKey = key;
        for (let k in x.val()) {
            if (rid === x.val()[k].receipt_id) {                
                dataKey = key;
            } else {
                key += 1;
            }
        }        
        let objKey = Object.keys(x.val())[dataKey];
        await firebase.database().ref(db + '/' + objKey).child("price").set(price);
        await firebase.database().ref(db + '/' + objKey).child("for_sale").set(1);
        console.log("item is on the market");
    }

    async takeOffMarket(rid) {
        console.log("taking item on the market...");
        let db = "quick-maffs-wardrobe-db";
        let x = await firebase.database().ref(db).once('value');
        let key = 0;
        let dataKey = key;
        for (let k in x.val()) {
            if (rid === x.val()[k].receipt_id) {                
                dataKey = key;
            } else {
                key += 1;
            }
        }        
        let objKey = Object.keys(x.val())[dataKey];
        await firebase.database().ref(db + '/' + objKey).child("price").set(0);
        await firebase.database().ref(db + '/' + objKey).child("for_sale").set(0);
        console.log("item is off the market");
    }

    async purchaseItem(rid, bid, uPoints) {
        console.log("purchasing item...");
        // get product details (rid, sid)
        let db = "quick-maffs-wardrobe-db";
        let x = await firebase.database().ref(db).once('value');
        let p;
        for (let k in x.val()) {
            if (x.val()[k].receipt_id === rid) {
                p = {
                    seller_id: x.val()[k].user_id,
                    price: x.val()[k].price
                }
                break;
            }
        }

        if (uPoints >= p.price) {
            console.log("you can afford this item");
            // take points away from seller
            db = "users-db";
            x = await firebase.database().ref(db).once('value');
            let key = 0;
            let dataKey = key;
            let oldPoints = 0;
            for (let k in x.val()) {
                if (bid === x.val()[k].user_id) {
                    dataKey = key;
                    oldPoints = x.val()[k].points;
                    break;
                } else {
                    key += 1;
                }
            }        
            let objKey = Object.keys(x.val())[dataKey];
            await firebase.database().ref(db + '/' + objKey).child("points").set(oldPoints - p.price);

            // give points to seller
            db = "users-db";
            x = await firebase.database().ref(db).once('value');
            key = 0;
            dataKey = key;
            oldPoints = 0;
            for (let k in x.val()) {
                if (p.seller_id === x.val()[k].user_id) {
                    dataKey = key;
                    oldPoints = x.val()[k].points;
                    break;
                } else {
                    key += 1;
                }
            }        
            objKey = Object.keys(x.val())[dataKey];
            await firebase.database().ref(db + '/' + objKey).child("points").set(oldPoints + p.price);
            
            // make the trade
            db = "quick-maffs-wardrobe-db";
            x = await firebase.database().ref(db).once('value');
            key = 0;
            dataKey = key;
            for (let k in x.val()) {
                if (rid === x.val()[k].receipt_id) {
                    dataKey = key;
                    break;
                } else {
                    key += 1;
                }
            }        
            objKey = Object.keys(x.val())[dataKey];
            await firebase.database().ref(db + '/' + objKey).child("for_sale").set(0);
            await firebase.database().ref(db + '/' + objKey).child("price").set(0);
            await firebase.database().ref(db + '/' + objKey).child("user_id").set(bid);
        } else {
            console.log("you cannot afford this item");
        }
        console.log("item is purchased");
    }

    async updateDb(quotes) {
        console.log("updating db...");
        let db = "quick-maffs-songs-db";
        for (let i = 0; i < quotes.length; i++) {
            let x = await firebase.database().ref(db).once('value');
            let id = 1;
            if (x.val()) {
                id = Object.keys(x.val()).length + 1;
            }
            let q = quotes[i];
            await firebase.database().ref(db).push({
                id: id
                , link: q
            });
        }
        console.log("db updated");
    }

    async getQuoteFromDb(d) {
        console.log("getting quote...");
        let db = "quick-maffs-quote-db";
        let x = await firebase.database().ref(db).once('value');
        let q;
        for (let k in x.val()) {
            if (x.val()[k].id === d) {
                q = {
                    quote: x.val()[k].quote
                    , author: x.val()[k].author
                    , link: x.val()[k].link
                    , img: x.val()[k].img
                }
                break;
            }            
        }
        console.log("quote returned");
        return q;
    }

    async getSongFromDb(d) {
        console.log("getting song...");
        let db = "quick-maffs-songs-db";
        let x = await firebase.database().ref(db).once('value');
        let q = 0;
        for (let k in x.val()) {
            if (x.val()[k].id === d) {
                q = x.val()[k].link
                break;
            }            
        }
        console.log("song returned");
        return q;
    }


}

export default new Firebase();