const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const dotenv =require('dotenv').config()
const app = express()
const port = process.env.PORT||5000;


//Require routes 
const ExpRoutes = require('./routes/v1/ExpRoutes')
const EduRoutes= require('./routes/v1/EduRoutes')
const SkillRoutes = require('./routes/v1/SkRoutes')
const UserRoutes = require('./routes/v1/UserRoutes')
const ReffRoutes = require('./routes/v1/RefRoutes')
const projRoutes = require('./routes/v1/ProjRoutes')
const orgRoutes = require('./routes/v1/OrgRoutes')



//Body Parser Initialize
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

//Logger
app.use(morgan('dev'));


//conect To MongoDB
var mongoDB = process.env.MONGOURL; 
//var mongoDB='mongodb://127.0.0.1/BlaxkCV';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors) 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//Use Routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});

app.use('/api/v1/Exp',ExpRoutes)
app.use('/api/v1/Edu',EduRoutes)
app.use('/api/v1/Skill',SkillRoutes)
app.use('/api/v1/Reff',ReffRoutes)
app.use('/api/v1/Proj',projRoutes)
app.use('/api/v1/Org',orgRoutes)
app.use('/api/v1/User/',UserRoutes)



//Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})