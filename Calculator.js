//Shachar Israeli and Guy Udi
//203713094 & 203169180
//28/08/18

var dotIsOnFlag = false; // will check if we have already dot in the query
var dotIsLast = false;
var lastIsArithmetic = false; // will help to check the Arithmetic query

const queryStart = "Press to start";
const divideByzero = "Devided by Zero!!! try Again";

function loadPage() {
  // will load first. here i got all the listeners.
  document.querySelector(".zero").addEventListener("click", addNumber, false);
  document.querySelector(".one").addEventListener("click", addNumber, false);
  document.querySelector(".two").addEventListener("click", addNumber, false);
  document.querySelector(".three").addEventListener("click", addNumber, false);
  document.querySelector(".four").addEventListener("click", addNumber, false);
  document.querySelector(".five").addEventListener("click", addNumber, false);
  document.querySelector(".six").addEventListener("click", addNumber, false);
  document.querySelector(".seven").addEventListener("click", addNumber, false);
  document.querySelector(".eight").addEventListener("click", addNumber, false);
  document.querySelector(".nine").addEventListener("click", addNumber, false);

  document.querySelector(".dot").addEventListener("click", addDot, false);
  document.querySelector(".ac").addEventListener("click", clearQuery, false);
  document.querySelector(".equal").addEventListener("click", equal, false);

  document
    .querySelector(".plus")
    .addEventListener("click", addArithmetic, false);
  document
    .querySelector(".minus")
    .addEventListener("click", addArithmetic, false);
  document
    .querySelector(".multi")
    .addEventListener("click", addArithmetic, false);
  document
    .querySelector(".divide")
    .addEventListener("click", addArithmetic, false);
}

function addNumber(e) {
  // all the numbers got this 1. now just check which number to write
  var txtAge = document.querySelector(".display");

  if (txtAge.innerHTML == queryStart || txtAge.innerHTML == divideByzero)
    txtAge.innerHTML = "";

  if (e.target.className == "zero") {
    txtAge.innerHTML += "0";
  }

  if (e.target.className == "one") {
    txtAge.innerHTML += "1";
  }

  if (e.target.className == "two") {
    txtAge.innerHTML += "2";
  }

  if (e.target.className == "three") {
    txtAge.innerHTML += "3";
  }

  if (e.target.className == "four") {
    txtAge.innerHTML += "4";
  }

  if (e.target.className == "five") {
    txtAge.innerHTML += "5";
  }

  if (e.target.className == "six") {
    txtAge.innerHTML += "6";
  }

  if (e.target.className == "seven") {
    txtAge.innerHTML += "7";
  }

  if (e.target.className == "eight") {
    txtAge.innerHTML += "8";
  }

  if (e.target.className == "nine") {
    txtAge.innerHTML += "9";
  }
  dotIsLast = false;
  lastIsArithmetic = false; // last now is digit
}

function addArithmetic(e) {
  //add the arithmetic only if its ok to add it
  if (dotIsLast == true) {
    return;
  }
  var charToAdd; // will save the char that we want to add
  if (e.target.className == "minus") {
    charToAdd = "-";
  } else if (e.target.className == "plus") {
    charToAdd = "+";
  } else if (e.target.className == "multi") {
    charToAdd = "*";
  } else {
    charToAdd = "/";
  }

  var displayControl = document.querySelector(".display"); //connect to display

  if (
    displayControl.innerHTML == queryStart || // remove the begin string
    displayControl.innerHTML == divideByzero
  )
    displayControl.innerHTML = "";

  var displayNow = displayControl.innerHTML; // save the string

  if (lastIsArithmetic == true) {
    // last digit is aritmetic
    if (
      e.target.className == "minus" &&
      displayNow.charAt(displayNow.length - 1) != "-" &&
      displayNow.charAt(displayNow.length - 1) != "+"
    ) {
      displayControl.innerHTML += charToAdd;
      lastIsArithmetic = true;
      dotIsOnFlag = false;
    } else {
      if (displayNow.length == 1) return;
      if (
        displayNow.charAt(displayNow.length - 1) == "-" &&
        (displayNow.charAt(displayNow.length - 2) == "*" || // if i got "*- or /-"
          displayNow.charAt(displayNow.length - 2) == "/")
      )
        return;
      var str = displayNow.substring(0, displayNow.length - 1);
      displayControl.innerHTML = str + charToAdd;
      lastIsArithmetic = true;
      dotIsOnFlag = false;
    }
  } else {
    if (displayNow == "" && charToAdd != "-") {
      // if its empty the only artitmetic that can be add is "-"
      displayControl.innerHTML = queryStart;
    } else {
      displayControl.innerHTML += charToAdd;
      lastIsArithmetic = true;
      dotIsOnFlag = false;
    }
  }
}

function addDot(e) {
  var displayControl = document.querySelector(".display"); //connect to display
  if (
    dotIsOnFlag == false &&
    displayControl.innerHTML != queryStart && // check if its ok to add the dot
    displayControl.innerHTML != divideByzero
  ) {
    displayControl.innerHTML += ".";
    dotIsLast = true;
    dotIsOnFlag = true;
  }
}

function clearQuery() {
  dotIsOnFlag = false; // will check if we have already dot in the query
  dotIsLast = false;
  lastIsArithmetic = false; // will help to check the Arithmetic query

  document.querySelector(".display").innerHTML = queryStart; //connect to display
}

function equal() {
  if (lastIsArithmetic == true) return; // dont let to display if the math end aritmetic

  var displayControl = document.querySelector(".display").innerHTML; //connect to display
  if (displayControl == queryStart) return;
  if (displayControl == divideByzero) return;

  var answer = eval(displayControl).toString();

  if (answer.includes("Infinity")) {
    document.querySelector(".display").innerHTML = divideByzero;
  } else document.querySelector(".display").innerHTML = answer;

  lastIsArithmetic = false; // will help to check the Arithmetic query
  dotIsLast = false;
  var dotInAnswer = document.querySelector(".display").innerHTML.indexOf(".");

  if (dotInAnswer == -1) dotIsOnFlag = false;
  // will check if we have already dot in the query
  else dotIsOnFlag = true; // will check if we have already dot in the query
}
