const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


io.on('connection', (socket) => {

    socket.on('Send - location', (data) => {
        io.emit('receive - location', {id: socket.id, ...data});

});
socket.on('disconnect', () => {
    io.emit('disconnect - location', socket.id);    
})
});


app.get('/', (req, res) => {
    res.render("Index");
});

server.listen(5000);