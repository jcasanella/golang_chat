const buttonElement = document.querySelector('button');

buttonElement.addEventListener('click',async (_event) =>{
    event.preventDefault(); // Prevent form from submitting and reloading the page
    
    const resp = await fetch('/api/logout');
    if (!resp.ok) {
        // const errorMessageElement = formSignUpElement.querySelector('#error-message');
        // errorMessageElement.innerHTML = 'Error: ' + resp.statusText;
        // errorMessageElement.classList.remove('hidden');
        // errorMessageElement.classList.add('error-message');
        console.log("Error:", resp.statusText);
    } else {
        const data = await resp.json();
        console.log("Success:", data);

        window.location.href = '/';
    }
});