'use strict';

const socket = io('http://localhost:3000/socketMessages');


const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

socket.on('connect_error',error=>{
    displayMessage(error)
})

socket.on('connect', ()=>{
displayMessage("Connected to server  on socket-id :  " + socket.id)
})

socket.on('recieved-message',(message)=>{
    displayMessage(message)
})
form.addEventListener("submit", e =>{
    e.preventDefault();
    const message = messageInput.value
    const room = roomInput.value
    if (message === "") return
    displayMessage(message)
    socket.emit('send-message', message,room)

    messageInput.value = ""

})
joinRoomButton.addEventListener("click", () =>{
    const room = roomInput.value;
    socket.emit('join', room,message=>{
        displayMessage(message)
    })
})
function displayMessage(message){
    const div = document.createElement("div")
    div.textContent = message;
    document.getElementById("message-container").append(div)
     
}

