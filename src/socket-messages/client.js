'use strict';

const socket = io('http://localhost:3000/socketMessages');


const joinRoomButton = document.getElementById("room-button");
const joinUser = document.getElementById("user-button")
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const userName = document.getElementById("user-name");
const form = document.getElementById("form");

socket.on('connect_error',error=>{
    displayMessage(error)
})

socket.on('connect', ()=>{
    connectMessage("Connected to server  on socket-id :  " + socket.id)
})

socket.on('recieved-message',(message,user)=>{
    displayMessage(message,user)
})
form.addEventListener("submit", e =>{
    e.preventDefault();
    const message = messageInput.value
    const room = roomInput.value
    const user = userName.value
    if (message === "") return
    displayMessage(message,user)
    socket.emit('send-message', message,user,room)

    messageInput.value = ""

})
joinRoomButton.addEventListener("click", () =>{
    const room = roomInput.value;
    socket.emit('join', room,message=>{
        connectMessage(message)
    })
})
joinUser.addEventListener("click", () =>{
    const user = userName.value;
    socket.emit('join-user', user,message=>{
        connectMessage(message)
    })
});
function displayMessage(message,user){
    const div = document.createElement("div")
    div.textContent = `${user} : ${message}`;
    document.getElementById("message-container").append(div)
}
function connectMessage(message){
    const div = document.createElement("div")
    div.textContent = message;
    document.getElementById("message-container").append(div)
}

