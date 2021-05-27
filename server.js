const path=require('path');
const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const colors=require('colors');
const connectDB=require('./config/db');
const errorHandler=require('./middleware/error');
const fileupload=require('express-fileupload');
// load evn vars
dotenv.config({ path:'./config/config.env'});


// route files
const bootcamps=require('./routes/bootcamps');
const courses=require('./routes/courses');


// connect to database
connectDB();

const app=express();

app.use(express.json());
app.use(morgan('dev'));

// File uploading
app.use(fileupload());


// set statuc folder
app.use( express.static(path.join(__dirname,'public')));

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);


const PORT=process.env.PORT || 5000;

const server=app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgYellow.bold);
});




// handle unhandled promies rejections
process.on('unhandledRejection',(err, promise)=>{
    console.log(`Error:${err.message}`.red);
    // close server and exit process
    server.close(()=> process.exit(1))
});