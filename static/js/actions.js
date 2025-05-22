import { validateSignupForm } from './validation.js';

const formSignUpElement = document.querySelector('.form.signup');
// const formLoginElement = document.querySelector('.form #login');

const buttonSignUpElement = formSignUpElement.querySelector('button');
// const buttonLoginElement = formLoginElement.querySelector('button');

buttonSignUpElement.addEventListener('click',async (_event) =>{
    event.preventDefault(); // Prevent form from submitting and reloading the page
    
    // Get all inputs and error element
    const userNameInput = document.getElementById('username-input');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const repeatPasswordInput = document.getElementById('repeat-password-input');
    const errorMessageElement = document.getElementById('error-message');

    // Run validation
    const errors = validateSignupForm(userNameInput.value, emailInput.value, passwordInput.value, repeatPasswordInput.value);
    if (errors.length > 0) {
        //event.preventDefault();
        errorMessageElement.innerHTML = errors.join('. ');
        return;
    }

    const resp = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: formSignUpElement.querySelector('#username-input').value,
            email: formSignUpElement.querySelector('#email-input').value,
            password: formSignUpElement.querySelector('#password-input').value,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!resp.ok) {
        const errorMessageElement = formSignUpElement.querySelector('#error-message');
        errorMessageElement.innerHTML = 'Error: ' + resp.statusText;
        errorMessageElement.classList.remove('hidden');
        errorMessageElement.classList.add('error-message');
    } else {
        const data = await resp.json();
        console.log("Success:", data);

        window.location.href = '/room';
    }
});