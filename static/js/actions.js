import { validateSignupForm, validateLoginForm } from './validation.js';

const formLoginElement = document.querySelector('.form.login');
const formSignUpElement = document.querySelector('.form.signup');

const buttonElement = formLoginElement ? formLoginElement.querySelector('button') : formSignUpElement.querySelector('button'); 

buttonElement.addEventListener('click',async (event) =>{
    event.preventDefault(); // Prevent form from submitting and reloading the page
    
    // Get all inputs and error element
    const userNameInput = document.getElementById('username-input');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const repeatPasswordInput = document.getElementById('repeat-password-input');
    const errorMessageElement = document.getElementById('error-message');

    // Run validation
    const errors = formLoginElement ? validateLoginForm(userNameInput.value, passwordInput.value) :
        validateSignupForm(userNameInput.value, emailInput.value, passwordInput.value, repeatPasswordInput.value);
    if (errors.length > 0) {
        //event.preventDefault();
        errorMessageElement.innerHTML = errors.join('. ');
        return;
    }

    const apiEndpoint = formLoginElement ? '/api/login' : '/api/signup';
    const fetchBody = formLoginElement ? {
        username: userNameInput.value,
        password: passwordInput.value,
    } : {
        username: userNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };
    const resp = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(fetchBody),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!resp.ok) {
        const errorMessageElement = document.querySelector('#error-message');
        errorMessageElement.innerHTML = 'Error: ' + resp.statusText;
        errorMessageElement.classList.remove('hidden');
        errorMessageElement.classList.add('error-message');
    } else {
        const data = await resp.json();
        console.log("Success:", data);

        window.location.href = '/room';
    }
});
