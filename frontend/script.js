const socket = io("http://localhost:3000");
const btnSend = document.querySelector(".btnSend");
const inputMessage = document.querySelector(".input");
const messageContainer = document.querySelector(".messages");

let userId = "";
socket.on("welcome", (response) => {
  console.log(response);
  userId = response.userId;
});

btnSend.addEventListener("click", () => {
  if (inputMessage.value === "") return;
  socket.emit("message", "Message From The Client");
});

socket.on("message", (response) => {
  const isMine = response.userId == userId;
  console.log(isMine);
  if (isMine) {
    messageContainer.innerHTML += `
<div class="message sent">
<div class="message__header">
  <div class="message__header__name">John Doe</div>
  <div class="message__header__time">12:00</div>
</div>
<div class="message__body">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
  voluptatum, voluptate, quibusdam, quia voluptas quod quos
  voluptatibus quae doloribus quas voluptatem. Quisquam voluptatum,
  voluptate, quibusdam, quia voluptas quod quos voluptatibus quae
  doloribus quas voluptatem.
</div>
</div>`;
  } else {
    messageContainer.innerHTML += `
    <div class="message">
          <div class="message__header">
            <div class="message__header__name">John Doe</div>
            <div class="message__header__time">12:00</div>
          </div>
          <div class="message__body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, voluptate, quibusdam, quia voluptas quod quos
            voluptatibus quae doloribus quas voluptatem. Quisquam voluptatum,
            voluptate, quibusdam, quia voluptas quod quos voluptatibus quae
            doloribus quas voluptatem.
          </div>
        </div
    `;
  }
});
