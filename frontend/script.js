const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const send = document.getElementById("send");
const typing = document.getElementById("typing");


// SEND BUTTON
send.addEventListener("click", sendMessage);


// ENTER KEY
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});


// QUICK COMMANDS
document.querySelectorAll(".command").forEach(button => {

    button.addEventListener("click", () => {

        const command = button.dataset.command;

        input.value = command;

        sendMessage();
    });

});


// MAIN MESSAGE FUNCTION
function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    showTyping();

    setTimeout(() => {

        hideTyping();

        const response = getResponse(text);

        addMessage(response, "ai");

    }, 700);
}


// ADD MESSAGE
function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = "message " + type;

    const sender = document.createElement("span");

    sender.className = "sender";

    sender.textContent =
        type === "user"
            ? "YOU"
            : "J.A.R.V.I.S.";

    const content = document.createElement("span");

    content.textContent = text;

    message.appendChild(sender);
    message.appendChild(content);

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}


// TYPING
function showTyping() {
    typing.style.display = "block";
}

function hideTyping() {
    typing.style.display = "none";
}


// FRONTEND RESPONSE ENGINE
function getResponse(command) {

    const text = command.toLowerCase();

    // GREETING
    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {
        return "Hello, Boss. J.A.R.V.I.S. is online and ready.";
    }


    // STATUS
    if (
        text.includes("status") ||
        text.includes("system status")
    ) {
        return "All primary systems are operational. Core: ONLINE | AI Engine: READY | Security: ACTIVE | Network: CONNECTED.";
    }


    // DIAGNOSTICS
    if (
        text.includes("diagnostic") ||
        text.includes("diagnostics")
    ) {
        return "Running frontend diagnostics... UI: PASS | Reactor: PASS | Console: PASS | Input: PASS | Overall system: NOMINAL.";
    }


    // TIME
    if (text.includes("time")) {

        const now = new Date();

        return "Current local time: " +
            now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
    }


    // DATE
    if (
        text.includes("date") ||
        text.includes("today")
    ) {

        const now = new Date();

        return "Today's date is " +
            now.toLocaleDateString([], {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }) + ".";
    }


    // WHO ARE YOU
    if (
        text.includes("who are you") ||
        text.includes("what are you")
    ) {
        return "I am J.A.R.V.I.S. Mobile Edition, a futuristic frontend interface running locally in your browser.";
    }


    // JARVIS
    if (
        text.includes("jarvis") ||
        text.includes("j.a.r.v.i.s")
    ) {
        return "At your service, Boss. All frontend systems are standing by.";
    }


    // HELP
    if (
        text.includes("help") ||
        text.includes("commands")
    ) {
        return "Available commands: STATUS, DIAGNOSTICS, TIME, DATE, HELLO, or simply type any message.";
    }


    // SECURITY
    if (text.includes("security")) {
        return "Security interface is active. Frontend security status: PROTECTED.";
    }


    // NETWORK
    if (
        text.includes("network") ||
        text.includes("internet")
    ) {
        return "Network interface detected. This frontend is running without a backend connection.";
    }


    // DEFAULT
    return "Command received. I am currently running in frontend-only mode, so I can simulate responses but cannot access a real AI backend yet.";
}