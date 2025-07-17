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

const roomDescriptionBuilder = (room) => {
    // Create Parent Element
    const roomInfo = document.createElement('div');
    roomInfo.classList.add('room-info');

    // Add Description
     const roomInfoSpan = document.createElement('span');
    roomInfoSpan.textContent = room.description; // Assuming description is available
    roomInfo.appendChild(roomInfoSpan);

    // Add number of users
    const userCountSpan = document.createElement('span');
    userCountSpan.classList.add('online-count');
    userCountSpan.textContent = '10 online';    // TODO: Replace with actual user count
    roomInfo.appendChild(userCountSpan);

    return roomInfo;
};

const roomNameBuilder = (room) => {
    // Create Element
    const roomName = document.createElement('div');
    roomName.classList.add('room-name');

    // Add Room name
    roomName.textContent = '🎮' + room.name;    // TODO - provide correct icon
    return roomName;
}

const fetchRooms = async () => {
    try {
        const response = await fetch('/api/rooms');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const rooms = await response.json();
        const roomList = document.querySelector('.rooms-list');
        roomList.innerHTML = ''; // Clear existing rooms
        let firstRoom = true;
        rooms.forEach(room => {
            const roomItem = document.createElement('div');
            roomItem.classList.add('room-item');
            
            // TODO: This is a temporary solution to highlight the first room
            if (firstRoom) {
                roomItem.classList.add('active'); // Add 'active' class to the first room
                firstRoom = false; // Only the first room gets the 'active' class
            } 

            // Create room name element
            const roomName = roomNameBuilder(room);
            roomItem.appendChild(roomName);

            // Create room info element
            const roomInfo = roomDescriptionBuilder(room);
            roomItem.appendChild(roomInfo);
            
            roomList.appendChild(roomItem);
        });
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
}

await fetchRooms();