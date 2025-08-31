const logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click', async (event) => {
    window.location.href = '/logout';
});

const createRoomBtn = document.querySelector('.create-room-btn');
createRoomBtn.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission
    const modal = document.getElementById('dialog-create-room');
    if (modal) {
        modal.style.display = 'block';
    }
});

const roomCreationOkBtn = document.querySelector(".btn.btn-ok");
roomCreationOkBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission
    const modal = document.getElementById('dialog-create-room');
    modal.style.display = 'none';

    const roomNameInput = document.getElementById('room-name');
    const roomDescInput = document.getElementById('room-desc');
    const roomIconInput = document.getElementById('room-icon');

    const apiEndpoint = '/api/createRoom';
    const fetchBody = {
        name: roomNameInput.value,
        description: roomDescInput.value,
        icon: roomIconInput.value
    };

    const resp = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(fetchBody),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!resp.ok) {
        // const errorMessageElement = document.querySelector('#error-message');
        // errorMessageElement.innerHTML = 'Error: ' + resp.statusText;
        // errorMessageElement.classList.remove('hidden');
        // errorMessageElement.classList.add('error-message');
        console.error('Error creating room:', resp.statusText);
    } else {
        const data = await resp.json();
        console.log("Success:", data);

        // window.location.href = '/room';
    }
});

const roomCreationCancelBtn = document.querySelector(".btn.btn-cancel");
roomCreationCancelBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission
    const modal = document.getElementById('dialog-create-room');
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('dialog-create-room');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
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
    roomName.textContent = room.icon + room.name;
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