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
    let pronum = "<span>" + String.fromCharCode(97 + x) + "</span>";
    return pronum;
}

export function answerType(ansType) {
    if (ansType === 1) {
        document.getElementById("answerType01").style.display = "block";
    } else if (ansType === 2) {
        document.getElementById("answerType02").style.display = "block";
    } else if (ansType === 3) {
        document.getElementById("answerType03").style.display = "block";
    }
}

export function reset() {
    document.getElementById("questionStringID").innerHTML = "";
    document.getElementById("resultStringID").innerHTML = "";
    document.getElementById("answerType01").style.display = "none";
    
    document.getElementById("startSessionBtnID").style.display = "none";
    document.getElementById("nextQuesBtnID").style.display = "none";
    document.querySelectorAll(".questionBody")[0].style.display = "block";
    
    document.getElementById("userInputStringID").value = "";

    document.getElementById("questionDiagramID").style.display = "none";
    document.getElementById("questionDiagramID").style.display = "none";
    document.getElementById("canvasID").style.display = "none";    
    setAnsBtns(false);
}


export async function checkAns(correctAns, userAns, questionString, chapter) {
    let result, resultMsg = "";
    correctAns = correctAns.toString();
    userAns = userAns.toString();    
    if (userAns !== "") {
        if (userAns === correctAns) {
            resultMsg = userAns + " THAT IS CORRECT";
            resultFunc(resultMsg, "Correct");
            result = 1;
        } else {
            resultMsg = "UNLUGGY, " + userAns + " is incorrect<br>The correct answer is " + correctAns;
            resultFunc(resultMsg, "Incorrect");
            result = 0;
        }
        setAnsBtns(true);
        document.getElementById("nextQuesBtnID").style.display = "block";
    }


    let email;
    let user_id = 0;
    let question_id = 0;
    await firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            email = user.email;
        }
    });
    if (email) {
        await firebase.firestore().collection('math-user-db').where("email", "==", email).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                user_id = doc.data().user_id;
            });
        }).catch(function(error) {
            if (error.code === "resource-exhausted") {
                console.log("the database has exceeded its calls, please contact the admin or try again later");
            }
        });
        await firebase.firestore().collection('math-question-new-db').get().then((snapshot) => {
            question_id = snapshot.size;
        });
        question_id += 1;
    }
    
    

    if (email) {
        let correct_answer = correctAns;
        let user_answer = userAns;
        /*
        console.log("question id is " + question_id);
        console.log("user id is " + user_id);
        console.log("correct_answer is " + correct_answer);
        console.log("user_answer is " + user_answer);
        console.log("result is " + result);
        console.log("questionString is " + questionString);
        console.log("chapter is " + chapter);
        */
        await firebase.firestore().collection('math-question-new-db').add({
            question_id,
            user_id,
            correct_answer,
            user_answer,
            result,
            questionString, 
            chapter
        }).catch(function(error) {
            alert(error.code);
        }).then(() => {});
    }    
    
}


export function checkUserInputAns(correctAns, userAns, qString, chapter) {          
    userAns = userAns.toString();
    userAns = userAns.replace(/\s/g,''); // removing spaces from answer
    checkAns(correctAns, userAns, qString, chapter);
}


export function resultFunc(output, result) {
    document.getElementById("resultStringID").innerHTML = output;        
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

function setAnsBtns(x) {
    document.getElementById("mcBtn1ID").disabled = x;
    document.getElementById("mcBtn2ID").disabled = x;
    document.getElementById("mcBtn3ID").disabled = x;
    document.getElementById("mcBtn4ID").disabled = x;
    
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