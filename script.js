// set variables
let form;
let username;
let email;
let password;
let password2;

// wait til page loads and then set variables & event listeners
window.addEventListener('load', setVariables);

// initialize variables with form fields and set submit button function
function setVariables () {
    form = document.getElementById('form');
    username = document.getElementById('username');
    email = document.getElementById('email');
    password = document.getElementById('password');
    password2 = document.getElementById('password2');
    form.addEventListener('submit', submitForm);
}

// check that value has been entered for each required input
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    }
    )
}

// check for a valid email entry
function checkEmail (input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid')
    }
}

// check that value entered meets length requirements
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// check that passwords are equal
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

// returns entry field name (Email, Password, etc) with first letter capitalized
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// submits form after running validation checks on each field
function submitForm (e) {
    e.preventDefault();

   checkRequired([username, email, password, password2]);
   checkLength(username, 3, 15);
   checkLength(password, 6, 25);
   checkEmail(email);
   checkPasswordsMatch(password, password2);
}

// show error text under field when value fails validation
function showError (input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    formControl.querySelector('small').textContent = message;
}

// turns field border green if entry meets validation requirements
function showSuccess (input) {
    const formControl = input.parentElement; 
    formControl.className = 'form-control success';
}