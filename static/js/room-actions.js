const logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click', async (event) => {
    window.location.href = '/logout';
});

const createRoomBtn = document.querySelector('.create-room-btn');
createRoomBtn.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission
    const dialog = document.getElementById('dialog-create-room');
    dialog.showModal(); 
});

const roomCreationOkBtn = document.querySelector(".btn.btn-ok");
roomCreationOkBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission
    const dialog = document.getElementById('dialog-create-room');
    dialog.close();
    // Here you can add the logic to create a room, e.g., sending a request to the server
    alert('Room creation confirmed!');
});

const roomCreationCancelBtn = document.querySelector(".btn.btn-cancel");
roomCreationCancelBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission
    const dialog = document.getElementById('dialog-create-room');
    dialog.close();
});
