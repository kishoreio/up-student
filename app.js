const express = require('express');
const app = express();
const userRouter = require('./routes/userRoute');
const teacherRouter = require('./routes/teacherRoute');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/teacher', teacherRouter);
module.exports = app;
