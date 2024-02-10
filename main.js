// .1

/* function palindrome(str) {
    let reverseStr = str
        .toLowerCase()
        .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, "")
        .trim()
        .split("")
        .reverse()
        .join("")
        .replaceAll(" ", "")
        .replaceAll("-", "");

    //console.log(reverseStr);
    if (
        reverseStr ===
        str
        .toLowerCase()
        .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?\\-\_ ]/g, "")
        .replaceAll("-", "")
        .trim()
    )
        return true;
    else return false;
} */
//console.log(palindrome("0_0 (: /- :) 0-0"));

// .2
/* 
1	 = I
5	 = V   
10	 = X
50	 = L
100	 = C
500	 = D
1000 = M

891 = DCCCXCI
3999= MMMDCDXCIX
*/

/* function convertToRoman(num) {
    const someNumbersWithRoman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let str = "";
    for (const n in someNumbersWithRoman) {
        while (num >= someNumbersWithRoman[n]) {
            str += n;
            num -= someNumbersWithRoman[n];
        }
    }
    return str;
} */
//console.log(convertToRoman(44));

// .3

/* function rot13(str) {
    const rot13Obj = {
        A: "N",
        B: "O",
        C: "P",
        D: "Q",
        E: "R",
        F: "S",
        G: "T",
        H: "U",
        I: "V",
        J: "W",
        K: "X",
        L: "Y",
        M: "Z",
    };
    let strUpperArr = str.toUpperCase().split(" ");
    let fin = "";
    let finArr = [];
    console.log(strUpperArr);

    for (const arr of strUpperArr) {
        fin = "";
        for (const char of arr) {
            for (const n in rot13Obj) {
                if (char === n) {
                    console.log(rot13Obj[n]);
                    fin += rot13Obj[n];
                } else if (char === rot13Obj[n]) {
                    console.log(n);
                    fin += n;
                }
            }
        }
        finArr.push(fin);
        console.log("\n");
    }
    let ff = finArr.join(" ");
    if (str.length != finArr.join(" ").length) {
        ff += str[str.length - 1];
    }
    return ff;
} */

//console.log(rot13("SERR CVMMN!"));

//  .4
/* 
function telephoneCheck(str) {
    let bool = false;
    let strSp = 0;
    if (str[0] != "-" && str[str.length - 2] != "-") {
        strSp = str.split("-").join("").split(" ").join("");
    }
    console.log(strSp);
    if (
        (strSp.length === 10 && Number(strSp)) ||
        (strSp.length === 11 && Number(strSp[0]) === 1)
    ) {
        bool = true;
    } else if (strSp.length > 11 && strSp.length < 15) {
        console.log(strSp.length);
        if (Number(strSp[0]) === 1 && strSp.length === 13) {
            if (strSp[1] === "(" && strSp[5] === ")") {
                bool = true;
            }
        }
        if (strSp.length === 12) {
            console.log(strSp[0] === "(" && strSp[4] === ")");
            if (strSp[0] === "(" && strSp[4] === ")") {
                bool = true;
            }
        }
    }
    console.log(bool);
    return bool;
}

//telephoneCheck("1 (555)555-5555");

// .5

const CurrencyUnitObj = {
    PENNY: 1,
    NICKEL: 5,
    DIME: 10,
    QUARTER: 25,
    ONE: 100,
    FIVE: 500,
    TEN: 1000,
    TWENTY: 2000,
    "ONE HUNDRED": 10000,
};
const demo = [
    "ONE HUNDRED",
    "TWENTY",
    "TEN",
    "FIVE",
    "ONE",
    "QUARTER",
    "DIME",
    "NICKEL",
    "PENNY",
];

function moneyOut(cashLess, cidObj, arrR, money) {
    if (cashLess >= CurrencyUnitObj[money] && cidObj[money]) {
        if (cashLess >= cidObj[money]) {
            const amtToSubtract = cidObj[money];
            cashLess -= amtToSubtract;
            arrR.push([money, amtToSubtract / 100]);
            cidObj[money] = 0;
        } else {
            const amtToSubtract =
                Math.floor(cashLess / CurrencyUnitObj[money]) * CurrencyUnitObj[money];
            cashLess -= amtToSubtract;
            arrR.push([money, amtToSubtract / 100]);
            cidObj[money] -= amtToSubtract;
        }
    }
    return [cashLess, cidObj, arrR];
}

function checkCashRegister(price, cash, cid) {
    let cashLess = Math.round((cash - price) * 100);
    let cashLess2 = cashLess;

    let cidObj = cid.reduce((accumulator, [key, amt]) => {
        return {
            ...accumulator,
            [key]: Math.round(amt * 100),
        };
    }, {});
    let arrR = [];
    console.log(cashLess);
    demo.forEach((money) => {
        [cashLess, cidObj, arrR] = moneyOut(cashLess, cidObj, arrR, money);
    });

    if (cashLess >= CurrencyUnitObj["ONE HUNDRED"] && cidObj["ONE HUNDRED"]) {
        if (cashLess >= cidObj["ONE HUNDRED"]) {
            const hun = cidObj["ONE HUNDRED"];
            cashLess -= hun;
            arrR.push(["ONE HUNDRED", hun / 100]);
        }
    }
    if (cashLess > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    const amtLeftInCid = Object.values(cidObj).reduce((acc, amt) => acc + amt, 0);

    if (amtLeftInCid > 0) {
        return { status: "OPEN", change: arrR };
    }

    return { status: "CLOSED", change: cid };
}

console.log(
    checkCashRegister(19.5, 20, [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100],
    ])
); */

//  6.

const number = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
};

// this function convert a number to roman number
function ternNumberToRoman(num) {
    let romanNumber = "";
    while (num != 0) {
        for (const key in number) {
            if (num >= number[key]) {
                romanNumber += key;
                num -= number[key];
                break;
            }
        }
    }
    return romanNumber;
}

console.log(ternNumberToRoman(19));

// this function convert a roman number to number

function ternRomanToNumber(str) {
    let i = 0;
    let cNumber = 0;
    const strUp = str.toUpperCase();

    while (i != strUp.length) {
        for (const key in number) {
            if (strUp[i] === key) {
                if (strUp[i] === "C" && strUp[i + 1] === "M") {
                    i += 2;
                    cNumber += number["CM"];
                    break;
                } else if (strUp[i] === "C" && strUp[i + 1] === "D") {
                    i += 2;
                    cNumber += number["CD"];
                    break;
                } else if (strUp[i] === "X" && strUp[i + 1] === "C") {
                    i += 2;
                    cNumber += number["XC"];
                    break;
                } else if (strUp[i] === "X" && strUp[i + 1] === "L") {
                    i += 2;
                    cNumber += number["XL"];
                    break;
                } else if (strUp[i] === "I" && strUp[i + 1] === "X") {
                    i += 2;
                    cNumber += number["IX"];
                    break;
                } else if (strUp[i] === "I" && strUp[i + 1] === "V") {
                    i += 2;
                    cNumber += number["IV"];
                    break;
                } else {
                    cNumber += number[key];
                    i++;
                    break;
                }
            }
        }
    }
    return cNumber;
}
console.log(ternRomanToNumber("MMXXII"));

const inpNum = document.querySelector(".inp-num");
const inpTex = document.querySelector(".inp-tex");
const btn = document.querySelector("button");

btn.addEventListener("click", function() {
    if (inpNum.value != "") {
        const add = ternNumberToRoman(Number(Math.round(inpNum.value)));
        inpTex.value = add;
    } else if (inpTex.value != "") {
        const add = ternRomanToNumber(inpTex.value);
        inpNum.value = add;
    }
});