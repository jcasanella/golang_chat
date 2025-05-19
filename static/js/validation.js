const formElement = document.getElementById('form');

const userNameInput = document.getElementById('username-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const repeatPasswordInput = document.getElementById('repeat-password-input');

const errorMessageElement = document.getElementById('error-message');

formElement.addEventListener('submit', (event) => {
    let errors = [];
    
    if (emailInput) {
        errors = getSignupFormErrors(userNameInput.value, emailInput.value, passwordInput.value, repeatPasswordInput.value);
    } else {
        errors = getLoginFormErrors(userNameInput.value, passwordInput.value);
    }
    
    if (errors.length > 0) {
        event.preventDefault();
        errorMessageElement.innerHTML = errors.join('. ');
    }
});

function getLoginFormErrors(username, password) {
    const errors = [];

    if (username.length < 3) {
        errors.push('Username must be at least 3 characters long');
        userNameInput.parentElement.classList.add('incorrect');
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@._#$!%*?&])[A-Za-z\d@._#$!%*?&]{8,15}$/;
    if (!regex.test(password)) {
        errors.push('Password must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
        passwordInput.parentElement.classList.add('incorrect');
    }
    
    return errors;
}

function getSignupFormErrors(username, email, password, repeatPassword) {
    const errors = [];

    if (username.length < 3) {
        errors.push('Username must be at least 3 characters long');
        userNameInput.parentElement.classList.add('incorrect');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('Email is not valid');
        emailInput.parentElement.classList.add('incorrect');
    }
    if (email.length < 5) {
        errors.push('Email must be at least 5 characters long');
        emailInput.parentElement.classList.add('incorrect');
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@._#$!%*?&])[A-Za-z\d@._#$!%*?&]{8,15}$/;
    if (!regex.test(password)) {
        errors.push('Password must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
        passwordInput.parentElement.classList.add('incorrect');
    }

    if (!regex.test(repeatPassword)) {
        errors.push('Password must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
        repeatPasswordInput.parentElement.classList.add('incorrect');
    }

    if (password !== repeatPassword) {
        errors.push('Passwords do not match');
        passwordInput.parentElement.classList.add('incorrect');
        repeatPasswordInput.parentElement.classList.add('incorrect');
    }

    return errors;
}

const allInputs = [userNameInput, emailInput, passwordInput, repeatPasswordInput].filter(Boolean);
allInputs.forEach((input) => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            errorMessageElement.innerText = '';
        }
    });
});