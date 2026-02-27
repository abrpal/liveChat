const socket = io();

let userName;

const form = document.getElementById("form");
const inputMessage = document.getElementById("message")
const messagesArea = document.getElementById("messagesArea")
const userNameArea = document.getElementById("userName")

Swal.fire({
  title: "Welcome to the chat room",
  text: "Enter your user name",
  input: "text",
  allowOutsideClick: false,
  inputAttributes: {
    autocapitalize: "off"
  }}).then((input) => {
    userName = input.value;
    userNameArea.innerHTML = `Hi, ${userName}`;
    socket.emit("newUser", userName)
  })

socket.on("newUser", (userName) => {      
    Toastify({
        text: `${userName} signed in`,
        duration: 3000,
        //newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
})



form.onsubmit = (e) => {
    e.preventDefault();
    const words = inputMessage.value;
    const message = { userName, words }
    socket.emit("newMessage", message);
    inputMessage.value = '';
}

socket.on("newMessage", (messages) => {
    let messagesContent = '';
    messages.forEach((message) => {
        messagesContent += `<li>${message.userName}: ${message.words}</li>`
    })
    messagesArea.innerHTML = messagesContent;
})





  