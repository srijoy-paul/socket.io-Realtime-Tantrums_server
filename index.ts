/**
 * Basically, this is the socket.io server to handle requests from client, (yeah it is different from the normal server that I used to configure yet in each of the prev projects.)
 * we can see it is integrated on the http server.
 */

const express=require('express');
const dotenv = require("dotenv").config({ path: '../.env' });
const {Server}=require('socket.io');
const {createServer}=require('http');
const cors=require('cors');

const PORT=process.env.PORT;

const app=express();
app.use(cors());

const server=createServer(app);
const io=new Server(server,{ /** here we are doing the integration, basically making our http express server a socket server. And actually running the socket server, so it can listen to any requests */
connectionStateRecovery: {},
    cors:{
        origin:'*' //this is to allow the client running on different port access the socket server
    }
});

/**
 * Basically 'connection' is a predefined event of socket.io
 */
io.on('connection',(socket)=>{ //this connection gets triggered whenever a client gets connected to the socket server.(this event is used for server side)
    socket.on('chat message',(mssg)=>{
        console.log('message:' + mssg);
        io.emit('chat message', mssg);
    });
    console.log("hi there, i am server there");
    
    
});


server.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`);
})