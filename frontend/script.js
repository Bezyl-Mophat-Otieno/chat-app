const socket = io("http://localhost:3000");
const btnSend = document.querySelector(".btnSend");
const inputMessage = document.querySelector(".input");
const messageContainer = document.querySelector(".messages");

const alertBox = document.getElementById("alertBox");
const alertMessage = document.getElementById("alertMessage");
const closeButton = document.getElementById("closeButton");

// Function to show the alert box
const showAlert = (username) => {
  alertBox.style.display = "block";
  alertMessage.innerHTML = `${username} has joined the chat`;
};
const showAction = (username, action) => {
  alertBox.style.display = "block";
  alertMessage.innerHTML = `${username} is ${action}...`;
};

// Function to hide the alert box
const hideAlert = () => {
  alertBox.style.display = "none";
};

// Close the alert box when the close button is clicked
closeButton.addEventListener("click", () => {
  hideAlert();
});

let userId = "";
socket.on("welcome", (response) => {
  console.log(response);
  userId = response.userId;
});

const username1 = "Mophat";
const username2 = "Bezyl";
const date = new Date();
const time = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
}).format(date);

btnSend.addEventListener("click", () => {
  if (inputMessage.value === "") return;
  const message = inputMessage.value;
  socket.emit("message", message);
});

// Show user typing
inputMessage.addEventListener("input", () => {
  socket.emit("typing", username1);
});

socket.on("typing", (username) => {
  document.querySelector(
    "#alertMessage"
  ).innerText = `${username} is typing...`;
});
// send my username on connect

socket.on("connect", () => {
  socket.emit("setUsername", username1);
});

socket.on("new User", (username) => {
  // Trigger the alert when a user joins the chat
  showAlert(username);
});

socket.on("message", (response) => {
  const isMine = response.userId == userId;
  console.log(isMine);
  messageContainer.innerHTML += `
<div class="message  ${isMine ? "sent" : ""}">
<div class="message__header">
  <div class="message__header__name">${username1}</div>
  <div class="message__header__time">${time}</div>
</div>
<div class="message__body">
 ${response.message}
</div>
</div>`;
});
