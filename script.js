async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();

    if (message === "") return;

    displayMessage(message, "user");

    const response = await fetchAIResponse(message);
    displayMessage(response, "ai");

    userInput.value = "";
}

function displayMessage(text, sender) {
    const chatBox = document.getElementById("chat");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchAIResponse(message) {
    const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 50
        })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
}
