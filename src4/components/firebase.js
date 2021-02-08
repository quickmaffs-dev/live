import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import app from 'firebase/app';
import { randomPassGen } from './exercises/MathFunctions';

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

    async addQToDb(db, post, d) {
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
            , date: Date.parse(d)
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
        console.log("logging in user...");
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
        console.log("user logged in");
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
        let msg = "";
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
            msg = "Success! You have purchased this item!";
        } else {
            msg = "You cannot afford this item";
        }
        console.log("item is purchased");
        return msg;
    }

    async updateDb() {
        console.log("updating db...");
        let db = "question-db";
        let x = await firebase.database().ref(db).once('value');
        let objKey = Object.keys(x.val());
        for (let i = 0; i < objKey.length; i++) {
            await firebase.database().ref(db + '/' + objKey[i]).child("date").set(1608037200000);
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
        let q;
        for (let k in x.val()) {
            if (x.val()[k].id === d) {
                q = x.val()[k].link
                break;
            }            
        }
        console.log("song returned");
        return q;
    }


    // classes
    async getMyClassLists(uid) {
        console.log("getting users classes...");
        let db = "quick-maffs-class-lists";
        let x = await firebase.database().ref(db).once('value');
        let myClasses = [];
        for (let k in x.val()) {
            if (x.val()[k].member_id === uid) {
                myClasses.push(x.val()[k].class_id);
            }            
        }
        console.log("users classes returned");
        return myClasses;
    }

    async getMyClasses(uid) {
        console.log("getting users classes...");

        // get class ids
        let db = "quick-maffs-class-lists";
        let x = await firebase.database().ref(db).once('value');
        let classIds = [];
        for (let k in x.val()) {
            if (x.val()[k].member_id === uid) {
                classIds.push(x.val()[k].class_id);
            }            
        }
        // get class details
        db = "quick-maffs-classes";
        x = await firebase.database().ref(db).once('value');
        let myClasses = [];
        for (let k in x.val()) {
            let cid = x.val()[k].class_id;
            if (classIds.includes(cid)) {
                let c = {
                    cid: cid
                    , className: x.val()[k].class_name
                    , classPass: x.val()[k].class_pass
                    , aid: x.val()[k].admin_id
                }
                myClasses.push(c);

            }  
        }
        
        console.log("users classes returned");
        return myClasses;
    }

    async getUsersPublicDetails(ids) {
        // this is the public details (like username)
        console.log("getting users public details...");
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        let details = [];
        for (let k in x.val()) {
            if (ids.includes(x.val()[k].user_id)) {
                let d = {
                    uid: x.val()[k].user_id
                    , username: x.val()[k].email
                }
                details.push(d);
            }
        }
        console.log("users public details returned");
        return details;
    }

    async getClassDetails(cid) {
        // get class details
        console.log("getting class details...")
        let db = "quick-maffs-classes";
        let x = await firebase.database().ref(db).once('value');
        //let allClasses = x.val();
        let c;
        for (let k in x.val()) {
            if (x.val()[k].class_id === cid) {                
                c = {
                    aid: x.val()[k].admin_id
                    , cid: x.val()[k].class_id
                    , className: x.val()[k].class_name
                    , pass: x.val()[k].class_pass                    
                }
            }
        }
        console.log("class details returned")
        return c;
    }

    async kickClassmate(cid, mid) {
        console.log("kicking class member...");
        let db = "quick-maffs-class-lists";
        let x = await firebase.database().ref(db).once('value');
        let key = 0;
        let dataKey = key;
        let passed = 0;
        for (let k in x.val()) {
            if (x.val()[k].class_id === cid && x.val()[k].member_id === mid) {
                dataKey = key;
                passed = 1;
                break;
            } else {
                key += 1;
            }
        }
        if (passed === 1) {
            let objKey = Object.keys(x.val())[dataKey];
            await firebase.database().ref(db + '/' + objKey).child("member_id").set(0);
        } else {
            console.log("ERROR 591: cid was " + cid + " and mid was " + mid + " these are not in the database " + db);
        }        
        console.log("class member kicked");
    }

    async getClassUsername(uid) {
        console.log("getting user...");
        let db = "users-db";
        let x = await firebase.database().ref(db).once('value');
        let u;
        for (let k in x.val()) {
            if (x.val()[k].user_id === uid) {
                u = {
                    id: x.val()[k].user_id
                    , email: x.val()[k].email
                }
                break;
            }
        }        
        console.log("user returned");
        return u;
    }

    async getClassMembers(cid) {
        console.log("getting class members...");
        let db = "quick-maffs-class-lists";
        let x = await firebase.database().ref(db).once('value');
        //let allClasses = x.val();
        let members = [];
        for (let k in x.val()) {
            if (x.val()[k].class_id === cid && x.val()[k].member_id !== 0) {                
                let uname = await this.getClassUsername(x.val()[k].member_id);
                members.push(uname);
            }
        }
        console.log("class members returned");
        return members;
    }

    async getAllClassMembers(cids) {
        console.log("getting all class members...");
        let db = "quick-maffs-class-lists";
        let x = await firebase.database().ref(db).once('value');
        //let allClasses = x.val();
        let members = [];
        for (let k in x.val()) {
            if (cids.includes(x.val()[k].class_id) && x.val()[k].member_id !== 0) {
                let m = {
                    cid: x.val()[k].class_id
                    , uid: x.val()[k].member_id
                    , username: ""
                }
                members.push(m);
            }
        }
        
        // get emails of unique class mates
        let uids = [...new Set(members.map(item => item.uid))]; // get unique array items
        let publicDetails = await this.getUsersPublicDetails(uids);
        for (let i = 0; i < members.length; i++) {
            for (let j = 0; j < publicDetails.length; j++) {
                if (publicDetails[j].uid === members[i].uid) {
                    members[i].username = publicDetails[j].username;
                    break;
                }
            }
        }

        console.log("all class members returned");
        return members;
    }

    async addNewClass(uid, className) {
        console.log("adding new class...");
        let db = "quick-maffs-classes";
        let x = await firebase.database().ref(db).once('value');
        let id = 1;
        if (x.val()) {
            id = Object.keys(x.val()).length + 1;
        }

        // generate passkey
        let n = Object.keys(x.val()).length-1;
        let pass = Object.keys(x.val())[n];
        pass = pass.substring(pass.length-6, pass.length);
        pass = pass.toUpperCase();

        let check = 0;
        while (check === 0) {
            check = 1;
            for (let k in x.val()) {
                if (pass === x.val()[k].class_pass) {
                    check = 0;
                    pass = randomPassGen();
                }
            }
        }

        // create class
        await firebase.database().ref(db).push({
            class_id: id
            , admin_id: uid
            , class_name: className
            , class_pass: pass
        });

        // add user to members list
        db = "quick-maffs-class-lists";
        x = await firebase.database().ref(db).once('value');
        let key = 1;
        if (x.val()) {
            key = Object.keys(x.val()).length + 1;
        }
        await firebase.database().ref(db).push({
            class_key: key
            , class_id: id
            , member_id: uid
        });
        console.log("class added");
    }

    async joinClassCode(uid, code) {
        console.log("adding new class...");
        let db = "quick-maffs-classes";
        let x = await firebase.database().ref(db).once('value');
        // check if valid class
        let msg = "Error 626: the code '" + code + "' is invalid";
        let cid = 0;
        let className = "";
        for (let k in x.val()) {
            if (x.val()[k].class_pass === code) {
                msg = "";
                cid = x.val()[k].class_id;
                className = x.val()[k].class_name;
                break;
            }
        }

        // check user is not already enrolled in that course
        if (cid > 0) {
            db = "quick-maffs-class-lists";
            x = await firebase.database().ref(db).once('value');
            for (let k in x.val()) {
                if (x.val()[k].class_id === cid && x.val()[k].member_id === uid) {
                    msg = "Error 642: you are already enrolled in this class, <br />'" + className + "'";
                    break;
                }
            }
        }
        
        if (msg === "") {
            // enter user in class
            let key = 1;
            if (x.val()) {
                key = Object.keys(x.val()).length + 1;
            }
            await firebase.database().ref(db).push({
                class_key: key
                , class_id: cid
                , member_id: uid
            });
            msg = "Successfully joined class <i>" + className + "</i>"
        }

        console.log("joined class");
        return msg;
    }

    async addHomework(cid, classMembers, topic, q, d) {        
        console.log("adding homework...");
        // get memberids
        /*
        let db = "quick-maffs-class-lists";
        let x = await firebase.database().ref(db).once('value');
        //let allClasses = x.val();
        for (let k in x.val()) {
            if (x.val()[k].class_id === cid && x.val()[k].member_id !== 0) {
                members.push(x.val()[k].member_id);
            }
        }
        */
        let members = [];
        for (let i = 0; i < classMembers.length; i++) {
            if (cid === classMembers[i].cid) {
                members.push(classMembers[i].uid);
            }
        }
        
        let db = "quick-maffs-homework";
        let x = await firebase.database().ref(db).once('value');
        let id = 1;
        if (x.val()) {
            id = Object.keys(x.val()).length + 1;
        }
        for (let i = 0; i < members.length; i++) {
            await firebase.database().ref(db).push({
                h_id: id + i
                , class_id: cid
                , user_id: members[i]
                , date: Date.parse(d)
                , topic: topic
                , done: 0
                , questions: q
            });
        }

        console.log("homework added");
    }

    async getHomework(cid) {
        console.log("getting homework...");
        let db = "quick-maffs-homework";
        let x = await firebase.database().ref(db).once('value');
        //let allClasses = x.val();
        let homework = [];
        for (let k in x.val()) {
            if (x.val()[k].class_id === cid) {
                let h = {
                    done: x.val()[k].done
                    , topic: x.val()[k].topic
                    , user_id: x.val()[k].user_id
                    , questions: x.val()[k].questions
                }
                homework.push(h);
            }
        }
        console.log("homework returned");
        return homework;
    }

    async getAllHomework(cids) {
        console.log("getting all homework...");
        let db = "quick-maffs-homework";
        let x = await firebase.database().ref(db).once('value');
        //let allClasses = x.val();
        let homework = [];
        for (let k in x.val()) {
            if (cids.includes(x.val()[k].class_id)) {
            //if (x.val()[k].class_id === cid) {
                let h = {
                    done: x.val()[k].done
                    , topic: x.val()[k].topic
                    , uid: x.val()[k].user_id
                    , questions: x.val()[k].questions
                    , cid: x.val()[k].class_id
                    , date: x.val()[k].date
                }
                homework.push(h);
            }
        }
        console.log("all homework returned");
        return homework;
    }

    async getMyHomework(uid) {
        console.log("getting your homework...");
        // get a list of all homework from userid
        let db = "quick-maffs-homework";
        let x = await firebase.database().ref(db).once('value');
        let myHomework = [];
        for (let k in x.val()) {
            if (x.val()[k].user_id === uid && x.val()[k].done === 0) {
                let h = {
                    cid: x.val()[k].class_id
                    , date: x.val()[k].date
                    , questions: x.val()[k].questions
                    , topic: x.val()[k].topic
                }
                myHomework.push(h);
            }
        }
        console.log("returning homework");
        return myHomework;        
    }

    async getMyCompletedWork(uid, minD, topics) {
        console.log("getting user completed work...");
        let completedWork = [];
        let db = "question-db";
        let x = await firebase.database().ref(db).once('value');
        for (let k in x.val()) {
            if (x.val()[k].user_id === uid && topics.includes(x.val()[k].chapter) && x.val()[k].date >= minD && x.val()[k].result === 1) {
                completedWork.push(x.val()[k].chapter);
            }
        }
        console.log("user completed work returned");
        return completedWork;
    }

    async checkHomework(uid, minDate) {
        console.log("checking your homework...");
        // get a list of all homework from userid
        let db = "question-db";
        let x = await firebase.database().ref(db).once('value');
        let myHomework = [];
        for (let k in x.val()) {
            if (x.val()[k].user_id === uid && x.val()[k].date >= minDate && x.val()[k].result === 1) {
                myHomework.push(x.val()[k].chapter);
            }
        }
        console.log("homework checked and returning");
        return myHomework;        
    }

    async updateHomework(uid, topic) {
        console.log("updating homework db...");
        let db = "quick-maffs-homework";
        let x = await firebase.database().ref(db).once('value');
        let key = 0;
        for (let k in x.val()) {
            if (x.val()[k].topic === topic && x.val()[k].user_id === uid) {
                let objKey = Object.keys(x.val())[key];
                await firebase.database().ref(db + '/' + objKey).child("done").set(1);
            } else {
                key += 1;
            }
        }
        console.log("homework db updated")
    }
}

export default new Firebase();