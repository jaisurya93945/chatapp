// Initialize variables
const messageContainer = document.getElementById("messageContainer");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const setUsernameBtn = document.getElementById("setUsernameBtn");
const usernameInput = document.getElementById("usernameInput");
const nameSetup = document.querySelector(".name-setup");
const logoutBtn = document.getElementById("logoutBtn");

// Get or set username
let username = localStorage.getItem("username");

if (!username) {
    nameSetup.style.display = "block"; // Show the name setup dialog
}

setUsernameBtn.addEventListener("click", () => {
    username = usernameInput.value.trim();
    if (username) {
        localStorage.setItem("username", username);
        nameSetup.style.display = "none"; // Hide name setup
        initChat();
    }
});

// Send message logic
sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        const messageData = {
            sender: username,
            content: message,
            timestamp: Date.now(),
        };
        saveMessage(messageData); // Save message to localStorage
        displayMessage(messageData);
        messageInput.value = ""; // Clear input field
    }
});

// Display messages
function displayMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    if (message.sender === username) {
        messageElement.classList.add("user");
    } else {
        messageElement.classList.add("other");
    }
    messageElement.textContent = `${message.sender}: ${message.content}`;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Save messages in localStorage
function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
}

// Load previous messages
function loadMessages() {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach(displayMessage);
}

// Initialize the chat (load previous messages)
function initChat() {
    loadMessages(); // Load previous messages from localStorage

    // Show logout button
    logoutBtn.style.display = "block";
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        window.location.reload(); // Refresh the page to reset
    });
}

