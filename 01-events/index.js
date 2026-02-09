const ChatRoom = require('./chatRoom.js');

const chat = new ChatRoom();

chat.on('join', (user) => {
    console.log(`${user} has joined the chat`);
});
chat.on('message', (user, message) => {
    console.log(`${user} : ${message}`);
});
chat.on('leave', (user) => {
    console.log(`${user} has left the chat`);
});

// simulating the chat
chat.join('Alice');
chat.join('bob');

chat.sendMessage('Alice', 'hey bob, Hello to everyone');
chat.sendMessage('bob', 'hey Alice, Hello to everyone');

chat.leave('Alice');
chat.sendMessage('Alice', "This message won't be sent");
chat.leave('bob');