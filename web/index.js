document.addEventListener('DOMContentLoaded', function() {
    const userIdInput = document.getElementById('userId');
    const otherUserIdInput = document.getElementById('otherUserId');
    const connectButton = document.getElementById('connect');
    const sendMessageButton = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    const messageLog = document.getElementById('messageLog');
    let ws;

    connectButton.addEventListener('click', function() {
        const userId = userIdInput.value.trim();
        if (!userId) {
            alert('Please enter your user ID.');
            return;
        }
        const serverUrl = `ws://localhost:8080/ws?userId=${userId}`;
        ws = new WebSocket(serverUrl);

        ws.onopen = () => {
            console.log('Connected to WebSocket server.');
            messageLog.value += 'Connected to WebSocket server.\n';
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "MESSAGE" && message.payload.recipientId.toString() === userId) {
                displayMessage(message.payload);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
            messageLog.value += 'WebSocket Error: ' + error.message + '\n';
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
            messageLog.value += 'WebSocket connection closed.\n';
        };
    });

    sendMessageButton.addEventListener('click', function() {
        const message = messageInput.value.trim();
        const recipientId = otherUserIdInput.value.trim();
        const senderId = userIdInput.value.trim();

        if (message && recipientId && senderId && ws && ws.readyState === WebSocket.OPEN) {
            const chatMessage = {
                type: "MESSAGE",
                payload: {
                    recipientId: parseInt(recipientId),
                    senderId: parseInt(senderId),
                    message: message
                }
            };
            ws.send(JSON.stringify(chatMessage));
            displayMessage(chatMessage.payload, 'You: ');
            messageInput.value = ''; // Clear the input after sending
        }
    });

    function displayMessage(payload, prefix = '') {
        const time = payload.createdAt ? new Date(payload.createdAt).toLocaleTimeString() : new Date().toLocaleTimeString();
        messageLog.value += `${prefix}${payload.senderId} @ ${time}: ${payload.message}\n`;
    }
});
