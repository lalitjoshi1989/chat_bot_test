(function() {
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chatbot-container';
    document.body.appendChild(chatContainer);

    const chatMessages = document.createElement('div');
    chatMessages.id = 'chat-messages';
    chatContainer.appendChild(chatMessages);

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.placeholder = 'Type a message...';
    chatContainer.appendChild(userInput);

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.onclick = sendMessage;
    chatContainer.appendChild(sendButton);

    function sendMessage() {
        const message = userInput.value;
        if (message.trim() !== '') {
            displayMessage(message, 'user');
            userInput.value = '';

            // Send user message to the Flask API
            $.ajax({
                url: 'http://your-flask-api-url.com/api/chat',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ message: message }),
                success: function(response) {
                    displayMessage(response.response, 'bot');
                },
                error: function() {
                    displayMessage('Error occurred while fetching response.', 'bot');
                }
            });
        }
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = sender;
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
    }
})();
