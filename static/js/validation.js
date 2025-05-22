const formElement = document.getElementById('form');

const userNameInput = document.getElementById('username-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const repeatPasswordInput = document.getElementById('repeat-password-input');

const errorMessageElement = document.getElementById('error-message');


function validateUsername(username, inputElement) {
    if (username.length < 3) {
        inputElement.parentElement.classList.add('incorrect');
        return [false, 'Username must be at least 3 characters long'];
    }

    return [true, undefined];
}

function validatePassword(password, inputElement) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@._#$!%*?&])[A-Za-z\d@._#$!%*?&]{8,15}$/;
    if (!regex.test(password)) {
        inputElement.parentElement.classList.add('incorrect');
        return [false, 'Password must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'];
    }

    return [true, undefined];
}

function validateEmail(email, inputElement) {
    const emailRegex = /^(?=.{5,})[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        inputElement.parentElement.classList.add('incorrect');
        return [false, 'Email is not valid'];
    }

    return [true, undefined];
}

function getLoginFormErrors(username, password) {
    const errors = [];

    const [isUsernameValid, usernameError] = validateUsername(username, userNameInput);
    if (!isUsernameValid) errors.push(usernameError);
        
    const [isPasswordValid, passwordError] = validatePassword(password, passwordInput);
    if (!isPasswordValid) errors.push(passwordError);

    return errors;
}

export function validateSignupForm(username, email, password, repeatPassword) {
    const errors = [];

    const [isUsernameValid, usernameError] = validateUsername(username, userNameInput);
    if (!isUsernameValid) errors.push(usernameError);

    const [isEmailValid, emailError] = validateEmail(email, emailInput);
    if (!isEmailValid) errors.push(emailError);

    const [isPasswordValid, passwordError] = validatePassword(password, passwordInput);
    if (!isPasswordValid) errors.push(passwordError);

    const [isRepeatPasswordValid, repeatPasswordError] = validatePassword(repeatPassword, repeatPasswordInput);
    if (!isRepeatPasswordValid) errors.push(repeatPasswordError);

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