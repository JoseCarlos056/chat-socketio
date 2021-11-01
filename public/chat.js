const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");
const usernameDiv = document.getElementById("user_title");
usernameDiv.innerText = username;
const roomTitleDiv = document.getElementById("room_title");
roomTitleDiv.innerText = room;
socket.emit(
  "select_room",
  {
    username,
    room,
  },
  (messages) => {
    console.log(messages);
    messages.forEach((message) => createMessage(message));
  }
);

document
  .getElementById("message_field")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const message = event.target.value;
      const data = {
        room,
        message,
        username,
      };
      socket.emit("message", data);
      event.target.value = "";
    }
  });

socket.on("message", (data) => {
  createMessage(data);
});
function createMessage(data) {
  const messageDiv = document.getElementById("messages");
  messageDiv.innerHTML += `
  <div class="new_message">
            <label class="form_label">
              <strong>${data.username}</strong>
              <span>${data.text} - ${dayjs(data.createdAt).format(
    "DD/MM HH:mm"
  )}</span>
            </label>
          </div>
`;
}

document
  .getElementsByClassName("fa-sign-out-alt")[0]
  .addEventListener("click", () => {
    window.location.href = "index.html";
  });
