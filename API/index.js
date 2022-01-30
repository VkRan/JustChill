const express = require('express');
const app = express();
const cors = require('cors');
const Connect = require('./database');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = process.env.PORT || 5000

//Middleware:
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

//Routers:
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const movieRoute = require('./routes/movie');
const listRoute = require('./routes/lists');

//API Routes:
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/movie', movieRoute);
app.use('/api/list', listRoute);

Connect();

app.listen(port, () => {
    console.log(`Server is running at port ${port} successfully!`)
});