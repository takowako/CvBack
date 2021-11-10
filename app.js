const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const dotenv =require('dotenv').config()
const app = express()
const port = process.env.PORT||5000;


//Require routes 
const ExpRoutes = require('./routes/v1/ExpRoutes')
const EduRoutes= require('./routes/v1/EduRoutes')
// const SkillRoutes = require('./routes/SkillRoutes')
const UserRoutes = require('./routes/v1/UserRoutes')


//Body Parser Initialize
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

//Logger
app.use(morgan('dev'));


//conect To MongoDB
var mongoDB = process.env.MONGOURL; 
var mongoDB='mongodb://127.0.0.1/BlaxkCV';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors) 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//Use Routes
app.use('/api/v1/Exp',ExpRoutes)
app.use('/api/v1/Edu',EduRoutes)
//app.use('/api/Skill',SkillRoutes)
app.use('/api/v1/User/',UserRoutes)



//Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})