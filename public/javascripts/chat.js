
const socket = io();

let name = document.getElementById('name').textContent;
let textarea = document.querySelector('#msg');
let messageArea = document.querySelector('.message_area');


window.addEventListener('load', () => {
    textarea.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            sendMessage(e.target.value);
        }
    });
    
    function sendMessage(message) {
        let msg = {
            user: name,
            message: message.trim()
        }
        // append 
        textarea.value = '';
        scrollToBotoom();
        // sent to server
        socket.emit('message', msg);
    }
    
    function appendMessage(msg, type) {
        let mainDiv = document.createElement('div');
        let className = type;
        mainDiv.classList.add(className, 'message');
    
        let markup = `
            <p>${msg.response.name}
                ${formatDate(msg.response.date_Today)}
               ${msg.response.message}</p>
        `
        mainDiv.innerHTML = markup
        messageArea.appendChild(mainDiv);
    }
    
    const formatDate = (d) => {
        const date = new Date(d);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    } 
    
    // Receive message
    socket.on('message', (msg) => {
        appendMessage(msg, 'incoming');
        console.log(msg.response);
        scrollToBotoom();
    })
    
    function scrollToBotoom() {
        messageArea.scrollTop = messageArea.scrollHeight;
    }
    })