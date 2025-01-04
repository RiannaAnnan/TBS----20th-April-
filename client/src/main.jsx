import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const chatbotSwitch = document.querySelector(".chatbot-switch");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// The variable "userMessage" stores the message that will be created by the user
let userMessage = null;
// The API Key to access my account on OpenAI
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

// This method creates a chat list element <li> which will store the message is a list
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"></span>
    <p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    // returns chat <li> element
    return chatLi;
}
// This method allows for access to the openAI API where we will be able to handle the conversations
const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // This defines the properties (authorisation key & content type) and the messages for our request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }
       // This sends a POST request to the API and sets the response as a paragraph
       fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oh no! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}
const handleChat = () => {
    userMessage = chatInput.value.trim(); // This retrieves the input sent by the user. "Trim" removes any whitespace
    if(!userMessage) return;
    // Sets the height of the text area to default and clears the input text field
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    // This appends the user's message to the interface
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Whilst the chatbot is formulating a response, this displays a "Thinking..." message
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}
chatInput.addEventListener("input", () => {
    // The height of the input text area is adjusted based on the height of the content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (e) => {
   // If the enter key is pressed without the shift key and the width of the window is greater than 800, handle the request
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});
sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotSwitch.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
