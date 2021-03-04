import firebase from '../firebase';

let numCorrect = 0;

export default function () {
    alert("test");
}

export function getRandomNumber(min, max, dec, sign) {
    // will return all integers [min, max] inclusive
    // sign = 0 then positive only, sign = 1 then positive and negative
    let n = Math.floor(Math.random() * (1 + max - min) + min);    
    if (dec > 0) {
        
        let d = Math.floor(Math.random() * Math.pow(10, dec));
        while (d % 10 === 0 || d === 0) {
            d = Math.floor(Math.random() * Math.pow(10, dec));
        }
        
        d /= Math.pow(10, dec);
        n += d; // decimal places
        if (n > max) {
            n = n - Math.floor(n - max) - 1;
        }
    }

    //this.printTest("n is " + n)
    if (sign === 1) {
        // positive and negative            
        n *= 1 - 2 * Math.floor(Math.random() * 2);
    }
    if (dec > 0) {
        n = dpCheck(n);
    }
    return n;
}

export function randomPassGen() {
    // generates random 6 figure code
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += String.fromCharCode(getRandomNumber(65, 90, 0, 0));
    }
    return code;
}

export function getDate() {
    let now = new Date();
    let d = new Date(now.getUTCFullYear(), now.getUTCMonth()+1, now.getUTCDate());
    return d;
}

export function getHomeworkTopics() {
    let homeworkTopics = [
        "algebra ex01"
        , "earning money ex01"
        , "earning money ex02"
        , "earning money ex03"
        , "earning money ex04"
        , "earning money ex05"
        , "earning money ex06"
        , "investments and loans ex01"
        , "working with numbers ex05"
        , "working with numbers ex06"
        , "rates and ratios ex01"
        , "rates and ratios ex04"
        , "coordinate geometry ex01"
        , "coordinate geometry ex02"
        , "coordinate geometry ex03"
        , "coordinate geometry ex04"
        , "coordinate geometry ex05"
    ]
    return homeworkTopics;
}

export function dpCheck(n) {
    // fixes 2.00000001 errors
    let max_dp = 5;
    if (numDecimals(n) > max_dp) {
        return n.toFixed(numDecimals(parseFloat(n.toFixed(max_dp))));
    } else {
        return n;
    }
}

export function shuffle(arr) {
    let a, b, temp;
    let len = arr.length;
    for (let i = 0; i < 4 * len; i++) {
        a = getRandomNumber(0, len - 1, 0, 0);
        b = getRandomNumber(0, len - 1, 0, 0);
        //printTest("a = " + a + " (" + typeof(a) + ")");
        //printTest("b = " + a + " (" + typeof(b) + ")");
        temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }

    for (let i = 0; i < arr.length; i++) {
        document.querySelectorAll(".mcAnsBtn")[i].innerHTML = arr[i].toString();
    }    
}

export function printTest(words) {
    document.getElementById("testID").innerHTML += "<br>" + words;
}

export function getPronumeral() {
    let x = getRandomNumber(0, 25, 0, 0);
    while (x === 14) { // x <> 'o'
        x = getRandomNumber(0, 25, 0, 0);
    }
    let pronum = "<span>" + String.fromCharCode(97 + x) + "</span>";
    return pronum;
}

export function answerType(ansType) {    
    if (ansType === 1) {
        document.getElementById("answerType01").style.display = "block"; // mc
    } else if (ansType === 2) {
        document.getElementById("answerType02").style.display = "block"; // t or f
    } else if (ansType === 3) {
        document.getElementById("answerType03").style.display = "block"; // input
        document.getElementById("userInputStringID").focus(); // set cursor
        /*
        document.getElementById("userInputStringID").addEventListener("keypress", function(event){
            if (event.defaultPrevented) {
                return; // Should do nothing if the default action has been cancelled
            }
        
            var handled = false;
            if (event.key !== undefined) {
                if (event.key === 13) {
                    console.log("working");
                }
            }  
            if (event.keyCode !== undefined) {
                if (event.keyCode === 13) {
                    console.log("working2");
                }
            }
        
            if (handled) {
            // Suppress "double action" if event handled
                event.preventDefault();
            }
        });
        */
    } else if (ansType === 4) {
        document.getElementById("answerType04").style.display = "block"; // show ans
    }
}

export function reset() {
    document.getElementById("questionStringID").innerHTML = "";
    document.getElementById("resultStringID").innerHTML = "";
    document.getElementById("answerType01").style.display = "none";
    document.getElementById("answerType02").style.display = "none";
    document.getElementById("answerType03").style.display = "none";
    document.getElementById("answerType04").style.display = "none";
    
    document.getElementById("nextQuesBtnID").style.display = "none";
    document.querySelectorAll(".questionBody")[0].style.display = "block";
    
    document.getElementById("userInputStringID").value = "";

    document.getElementById("questionDiagramID").style.display = "none";
    document.getElementById("questionDiagramID").style.display = "none";
    document.getElementById("canvasID").style.display = "none";    
    document.getElementById("questionImgID").style.display = "none";
    document.getElementById("correctWork").innerHTML = "";
    document.getElementById("showCorrectWorkBtn").style.display = "none";
    setAnsBtns(false);
}

export function specialLetterCheck(uA) {
    uA = uA.toString();
    uA = uA.replace(/"/g, "'");
    if (uA.includes("√")) {
        uA = uA.replace(/√/g, "&radic;");
    }
    if (uA.includes("π")) {
        uA = uA.replace(/π/g, "&pi;");
    }
    return uA;
}

export async function checkAns(correctAns, userAns, questionString, chapter) {        
    let result, resultMsg = "";
    correctAns = specialLetterCheck(correctAns);
    userAns = specialLetterCheck(userAns);

    let points = 0;
    if (userAns !== "") {
        if (userAns === correctAns) {
            resultMsg = userAns + " THAT IS CORRECT";
            resultFunc(resultMsg, "Correct");
            result = 1;
            let multiplier = 1;
            points = 100 * multiplier;
        } else {
            resultMsg = userAns + " is incorrect<br>The correct answer is " + correctAns;
            resultFunc(resultMsg, "Incorrect");
            result = 0;
        }
        setAnsBtns(true);
        document.getElementById("nextQuesBtnID").style.display = "block";

    }


    let email;
    let user_id = await firebase.getCurrentUserID();
    if (user_id !== null) {
        email = await firebase.getCurrentUsername();
    }    

    if (email) {
        let db = "question-db";
        let post = [questionString, userAns, correctAns, result, user_id, chapter];
        let d = getDate();
        await firebase.addQToDb(db, post, d);
    }

    //if (1 === 2) 
    locallyStoreData(correctAns, userAns, questionString, chapter, result, points);

}

function locallyStoreData(correctAns, userAns, questionString, chapter, result, points) {
    if (typeof(Storage) !== "undefined") {
        /*
        let q_id = 1;
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes("QuickMaffs")) {
                q_id += 1;
            }
        }
        let keyObj = { 'question_id': q_id, 'chapter': chapter, 'questionString': questionString, 'correct_answer' : correctAns, 'user_answer' : userAns, 'result' : result };
        keyObj = JSON.stringify(keyObj);
        let key = 'QuickMaffs_' + q_id;
        console.log(keyObj + key);
        */
        //let currPoints = 
        let uid = parseInt(localStorage.getItem("QuickM_u_id"));
        let key = 'QuickMaffs_points_' + uid + '_';
        let prevPoints = 0;
        if (localStorage.getItem(key)) {
            prevPoints = parseInt(localStorage.getItem(key).split(key));
            // people have the option to change this - need to fix this
            if (prevPoints > 2000) {
                prevPoints = 2000;
            }
        }
        let keyObj = points + prevPoints;
        if (keyObj >= 1000) {
            // store in db
            firebase.depositPoints(uid, keyObj);
            keyObj = 0;
        }
        localStorage.setItem(key, keyObj);
        
    } else {
        console.log("Browser does not support Web Storage");
    }    
}


export function checkUserInputAns(correctAns, userAns, qString, chapter) {          
    userAns = userAns.toString();
    userAns = userAns.replace(/\s/g,''); // removing spaces from answer
    checkAns(correctAns, userAns, qString, chapter);
}


export function resultFunc(output, result) {
    document.getElementById("resultStringID").innerHTML = output;
    let secretMsg = result;
    document.getElementById("secretsID").innerHTML = secretMsg;
    if (result === "Correct") {
        // increment scores
        numCorrect += 1;
    } else {
        // decrement lives            
    }
    updateScores();
}

export function numberWithCommas(x) {
    if (x > 1) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");    
    } else {
        return x
    }
}

export function numDecimals(value) {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}

export function getObject() {
    let objects = ["t shirt", "mobile phone", "watch", "table", "chair", "iPod", "computer", "hat", "shirt", "pair of pants" ,"a pair of shoes"];
    return objects[getRandomNumber(0, objects.length-1, 0, 0)];
}

export function getNames(n) {
    let allNames = ["Andy", "Beth", "Charlie", "Donna", "Ed", "Fiona", "Gary", "Hillary", "Ian", "Jessica"];
    if (n > allNames.length) {
        return ["Error: we dont have enough names to satisfy the demand, we need more names"];
    }
    let primes = [2,3,5,7,11,13,17,19,23,29];
    let primeChk = 1;
    while (allNames.length > primes.length) {
        primeChk += 100;
        primes = getPrimes(primes, primeChk);
    }

    let names = new Array(n);
    let x, chk = 1;
    for (let i = 0; i < names.length; i++) {        
        x = getRandomNumber(0, allNames.length - 1, 0, 0);
        // associated each name with a unique prime number via its position
        // if we already have that name, the prime will be a factor of the total
        while (chk % primes[x] === 0) {
            x = getRandomNumber(0, allNames.length - 1, 0, 0);
        }
        chk *= primes[x];
        names[i] = allNames[x];
    }
    return names;
}

export function getPrimeFactors(n) {
	// returns prime factors
	let factors = [];
	if (n < 2 || !Number.isInteger(n)) {
		factors = ["no factors, invalid number : " + n];
	} else {
		let primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];	
		if (n > 100) {
			primes = getPrimes(primes, n);
		}
		for (let i = 0; i < primes.length; i++) {
			if (n % primes[i] === 0) {
				factors.push(primes[i]);
				n /= primes[i];
				i = -1; // i++
			}
			if (primes[i] > n) {
				i = primes.length;
			}		
		}
	}
	return factors;	
}

export function simplifyRatio(a, b) {
    // if a or b = 1 then cannot be further simplified
    if (a === 1 || b === 1) {
        return [a, b];
    }

    let aF = getPrimeFactors(a);
    let bF = getPrimeFactors(b);
    
    // cancel out factors
    for (let i = 0; i < aF.length; i++) {
        for (let j = 0; j < bF.length; j++) {
            if (aF[i] === bF[j]) {
                aF[i] = bF[j] = 1;
                j = bF.length;
            }
        }
    }
    // multiply final numbers
    a = b = 1;
    for (let i = 0; i < aF.length; i++) {
        a *= aF[i];
    }

    for (let i = 0; i < bF.length; i++) {
        b *= bF[i];
    }
    let x = [a, b];
    return x;
}


//export function setupCanvas(height, width) {
export function setupCanvas() {
    let canvas = document.getElementById("canvasID");    
    canvas.style.backgroundColor = "white";
    canvas.style.display = "block";
    canvas.style.marginLeft = "auto";
    canvas.style.marginRight = "auto";
    //canvas.height = height;
    //canvas.width = width;
    //let ctx = canvas.getContext("2d");
    //return ctx;
    return canvas;
}

export function solveEquation(eqn) {
    let op;        
    for(let operation = 1; operation <= 4; operation++) {
        for (let i = 1; i < eqn.length; i+=2) {
            if (eqn[i] === operation) {
                op = i;
                i = eqn.length;
                operation = 4;
            }
        }
    }

    let newEqn = new Array(eqn.length - 2);
    let ans;
    if (eqn[op] === 1) {
        ans = eqn[op-1] / eqn[op+1];
    } else if (eqn[op] === 2) {
        ans = eqn[op-1] * eqn[op+1];
    } else if (eqn[op] === 3) {
        ans = eqn[op-1] + eqn[op+1];
    } else {
        ans = eqn[op-1] - eqn[op+1];
    }

    let j = 0;
    for (let i = 0; i < newEqn.length; i++) {
        if (i !== op - 1) {
            newEqn[i] = eqn[j]
        } else {
            newEqn[i] = ans;
            j += 2;
        }
        j += 1;

    }        
    
    if (newEqn.length > 1) {
        return solveEquation(newEqn);
    }
    return newEqn[0];   
}

export function mcBtn(i, correctAns, question_string, topic) {
    document.querySelectorAll(".mcAnsBtn")[i].onclick = () => {checkAns(correctAns, document.querySelectorAll(".mcAnsBtn")[i].innerHTML, question_string, topic)};
}

export function getScores() {
    let scores = [];
    let n = getRandomNumber(6, 10, 0, 0);
    let dp = getRandomNumber(0, 1, 0, 0);
    for (let i = 0; i < n; i++) {
        scores[i] = getRandomNumber(1, 20, dp, 0);
    }
    return scores;
}

export function combinations(n, r) {
    let num = factorial(n); // n!
    let denom = factorial(r) * factorial(n - r);    // r! (n-r)!
    return [num, denom];
}

export function factorial(n) {
    if (n !== Math.floor(n)) {
        console.log("error F01 - n is invalid: " + n);
        n = Math.floor(n);
    }
    if (n === 0) {
        return 1;
    }
    if (n < 0) {
        console.log("error F02 - n is invalid: " + n);
        return 0;
    }
    let f = 1;
    while (n > 1) {
        f *= n;
        n -= 1;
    }
    return f;
}

export function resetCanvas() {
    let canvas = document.getElementById("canvasID");
    canvas.style.backgroundColor = "white";
    canvas.style.display = "block";
    canvas.style.marginLeft = "auto";
    canvas.style.marginRight = "auto";
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getPrimes(primes, max) {
	var oldPrimes = primes;
	for (let i = primes[primes.length-1] + 1; i <= max; i++) {
		if(isPrime(primes, i)) {
			oldPrimes.push(i);      
		}
	}
	primes = oldPrimes;
	return primes;
}

function isPrime(primes, n) {
	// return true if number is prime  
	if (n < 2 || !Number.isInteger(n)) {  	
		return false;
	}  
	for (let i = 0; i < primes.length; i++) {
		if (n % primes[i] === 0 && n !== primes[i]) {
			return false;
		}
	}	  
	return true;
}

function updateScores() {
    document.getElementById("scoreID").innerHTML = "Score: " + 100 * numCorrect + " pts";
}

export function setAnsBtns(x) {
    for (let i = 0; i < document.querySelectorAll(".mcAnsBtn").length; i++) {
        document.querySelectorAll(".mcAnsBtn")[i].disabled = x;
    }
    
    document.getElementById("trueBtnID").disabled = x;
    document.getElementById("falseBtnID").disabled = x;

    document.getElementById("userInputStringID").disabled = x;    
    document.getElementById("userInputBtnID").disabled = x;
    /*
    document.getElementById("userInputBtnID").style.display = "inline-block";
    if (x === true) {
        document.getElementById("userInputBtnID").style.display = "none";
    }
    */
}

/*
function readQuestion() {
    let questionString = "What is the derivative of y = mx + b?";
    const utterance = new SpeechSynthesisUtterance(questionString);
    speechSynthesis.speak(utterance);
}
*/