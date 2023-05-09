const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

let name = prompt('What is your name');
if (!name) {
  name = 'Anonymous';
}
addMessage('You joined');
socket.emit('new-user', name);

socket.on('chat message', data => {
    addMessage(`${data.name}: ${data.message}`)
})
messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = messageInput.value
    addMessage(`You: ${message}`)
    socket.emit('send chat message', message)
    messageInput.value = ''

})

socket.on('user-connected', name => {
    addMessage(`${name} connected`)
})

function addMessage(message) {

    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
