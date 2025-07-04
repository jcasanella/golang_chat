const dialog = document.getElementById('myDialog');
const createRoomLink = document.getElementById('create-room');
createRoomLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior
    openDialog();
});

const btnOk = document.querySelector(".btn.btn-ok");
const btnCancel = document.querySelector(".btn.btn-cancel");
btnOk.addEventListener("click", confirmAction);
btnCancel.addEventListener("click", closeDialog);

function openDialog() {
    dialog.showModal();
}

function closeDialog() {
    dialog.close();
}

function confirmAction() {
    alert('Action confirmed!');
    dialog.close();
}

// Close dialog when clicking outside
// dialog.addEventListener('click', (e) => {
//     if (e.target === dialog) {
//         dialog.close();
//     }
// });