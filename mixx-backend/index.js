const cors = require('cors');
require('dotenv').config();
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;


// setting up the server
const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server, {
        cors: {
            origin: '*'
        }
    });

// setting middlewares
app.use(cors({
    origin: '*',
}));
app.use(express.json());


// setting up the mongodb database
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

// various routes
const authRouter = require('./routes/auth.js');
const projectRouter = require('./routes/project/createProject.js');
const deleteProjectRouter = require('./routes/project/deleteProject');
const CTTRouter = require('./routes/project/addCommentAndTime');
const getAllProjectsRouter = require('./routes/project/getAllProjects');
const getAllCTTRouter = require('./routes/project/getAllCTT');
const uploadRouter = require('./routes/upload.js');

app.use('/auth', authRouter)
app.use('/project', projectRouter)
app.use('/project', deleteProjectRouter)
app.use('/project', CTTRouter)
app.use('/project', getAllProjectsRouter)
app.use('/project', getAllCTTRouter)
app.use('/', uploadRouter)


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

server.listen(PORT, () => console.log("Server running at PORT " + PORT));
