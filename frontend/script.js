const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const send = document.getElementById("send");


/* =========================
   SEND BUTTON
========================= */

send.addEventListener("click", sendMessage);


/* =========================
   ENTER KEY
========================= */

input.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();
    }

});


/* =========================
   SEND MESSAGE
========================= */

function sendMessage() {

    const text = input.value.trim();

    if (!text) {
        return;
    }


    /* Add user message */

    addMessage(
        "YOU",
        text,
        "user"
    );


    /* Clear input */

    input.value = "";


    /* Disable button while processing */

    setSendingState(true);


    /* Add processing message */

    const processingMessage = addMessage(
        "J.A.R.V.I.S",
        "Processing command...",
        "ai"
    );


    /*
        DEMO RESPONSE

        This is currently frontend-only.
        Replace this section with your backend/API
        when you connect the real AI system.
    */

    setTimeout(() => {

        processingMessage.querySelector(
            ".message-text"
        ).textContent =
            "Systems online. How may I assist you, Boss?";


        setSendingState(false);

        input.focus();

    }, 1000);

}


/* =========================
   ADD MESSAGE
========================= */

function addMessage(label, text, type) {

    const message = document.createElement("div");

    message.className = `msg ${type}`;


    const messageLabel =
        document.createElement("span");

    messageLabel.className =
        "message-label";

    messageLabel.textContent =
        label;


    const messageText =
        document.createElement("span");

    messageText.className =
        "message-text";

    messageText.textContent =
        text;


    message.appendChild(messageLabel);

    message.appendChild(messageText);

    chat.appendChild(message);


    /* Scroll to latest message */

    chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth"
    });


    return message;
}


/* =========================
   BUTTON STATE
========================= */

function setSendingState(isSending) {

    send.disabled = isSending;

    if (isSending) {

        send.textContent = "⋯";

        send.setAttribute(
            "aria-label",
            "Processing"
        );

    } else {

        send.textContent = "➤";

        send.setAttribute(
            "aria-label",
            "Send command"
        );
    }
}


/* =========================
   INITIAL FOCUS
========================= */

window.addEventListener("load", () => {

    input.focus();

});






