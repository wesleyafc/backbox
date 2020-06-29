const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())


const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
    console.log('soket')
})

mongoose.connect('mongodb+srv://backgtx:fyEKTUDISMWeEBe1@cluster0.cxc6g.mongodb.net/backbox?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.use((req, res, next) => {
    req.io = io

    return next()
})




app.use(express.json())

//para receber arquivos
app.use(express.urlencoded({ extended: true }))

//linkar os arquivos com url valida
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

//arquivo de rotas
app.use(require('./routes'))


server.listen(process.env.PORT || 3333)