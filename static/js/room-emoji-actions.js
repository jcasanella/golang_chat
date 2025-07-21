const roomIconInput = document.querySelector('#room-icon');
roomIconInput.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission
    const dialog = document.getElementById('emoji-picker-dialog');
    dialog.showModal(); 
});