
const socket = io()


// CHAT
const formMessage = document.querySelector('#formMessage')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagePool = document.querySelector('#messagePool')
const formProducto = document.querySelector('#formProducto')
const nombreInput  = document.querySelector('#nombreInput')
const apellidoInput  = document.querySelector('#apellidoInput')
const edadInput  = document.querySelector('#edadInput')
const aliasInput  = document.querySelector('#aliasInput')
const avatarInput  = document.querySelector('#avatarInput')




//SUBMIT CHAT
function sendMessage() {

  const email = usernameInput.value
  const nombre = nombreInput.value
  const apellido = apellidoInput.value
  const edad = edadInput.value
  const alias = aliasInput.value
  const avatar = avatarInput.value
  const mensaje = messageInput.value
  const hours = new Date()
  const fecha = ([hours.getDate(), hours.getMonth() +1, hours.getFullYear()])
  const time = ([hours.getHours(), hours.getMinutes()])
  const resultado = fecha.join("/")




  socket.emit('client:messageNormalizar', {author: { email,nombre,apellido,edad,alias,avatar}, comment: {text:mensaje, time:time,result:resultado}})
}

function renderMessages(messagesArray) {
  try {
      const html = messagesArray.map(messageInfo => {
          return(`<div>
              <strong style="color: blue;" >${messageInfo.author.email}</strong>[
              <span style="color: brown;">${messageInfo.comment.time}</span>]:
              <em style="color: green;font-style: italic;">${messageInfo.comment.text}</em> </div>`)
      }).join(" ");

      totalMessages.innerHTML = html
  } catch(error) {
      console.log(`Hubo un error ${error}`)
  }
}






formMessage.addEventListener('submit', event => {
  event.preventDefault()
  sendMessage()
  messageInput.value = "" 
})