
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
formMessage.addEventListener('submit', event => {
  event.preventDefault()

  const username = usernameInput.value
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




  socket.emit('cliente:mensaje', { username, mensaje, resultado, time, nombre , apellido, edad, alias, avatar})
})


socket.on('server:mensaje', data => {
  messagePool.innerHTML = ""

  data.forEach(message => {
    messagePool.innerHTML += `<h2>  <b style= 'color: blue'> ${message.username}:  <b style= 'color: red'> [${message.resultado}]:  [${message.time}]:  <b style= 'color: green'> ${message.mensaje} </h2>`

  })


})