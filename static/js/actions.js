const formSignUpElement = document.querySelector('.form.signup');
// const formLoginElement = document.querySelector('.form #login');

const buttonSignUpElement = formSignUpElement.querySelector('button');
// const buttonLoginElement = formLoginElement.querySelector('button');

buttonSignUpElement.addEventListener('click',async (_event) =>{
    event.preventDefault(); // Prevent form from submitting and reloading the page
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