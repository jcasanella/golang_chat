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

export function validateLoginForm(username, password) {
    const errors = [];

    const userNameInput = document.getElementById('username-input');
    const [isUsernameValid, usernameError] = validateUsername(username, userNameInput);
    if (!isUsernameValid) errors.push(usernameError);
        
    const passwordInput = document.getElementById('password-input');
    const [isPasswordValid, passwordError] = validatePassword(password, passwordInput);
    if (!isPasswordValid) errors.push(passwordError);

    return errors;
}

export function validateSignupForm(username, email, password, repeatPassword) {
    const errors = [];

    const userNameInput = document.getElementById('username-input');
    const [isUsernameValid, usernameError] = validateUsername(username, userNameInput);
    if (!isUsernameValid) errors.push(usernameError);

    const emailInput = document.getElementById('email-input');
    const [isEmailValid, emailError] = validateEmail(email, emailInput);
    if (!isEmailValid) errors.push(emailError);

    const passwordInput = document.getElementById('password-input');
    const [isPasswordValid, passwordError] = validatePassword(password, passwordInput);
    if (!isPasswordValid) errors.push(passwordError);

    const repeatPasswordInput = document.getElementById('repeat-password-input');
    if (password !== repeatPassword) {
        errors.push('Passwords do not match');
        passwordInput.parentElement.classList.add('incorrect');
        repeatPasswordInput.parentElement.classList.add('incorrect');
    }

    return errors;
}

const formLoginElement = document.querySelector('.form.login');
const allInputs = [];
if (formLoginElement) {
    allInputs.push(document.getElementById('username-input'));
    allInputs.push(document.getElementById('password-input'));
} else {
    allInputs.push(document.getElementById('username-input'));
    allInputs.push(document.getElementById('email-input'));
    allInputs.push(document.getElementById('password-input'));
    allInputs.push(document.getElementById('repeat-password-input'));
}

const errorMessageElement = document.getElementById('error-message');

allInputs.forEach((input) => {
    if (!input) return; // Skip if input is not found
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            errorMessageElement.innerText = '';
        }
    });
});