const fs=require('fs');
const mongoose=require('mongoose');
const colors=require('colors');
const dotenv=require('dotenv');

// load env vars
dotenv.config({path: './config/config.env'})

// load models
const Bootcamp=require('./models/Bootcamp');
const Course=require('./models/Course');

// connect to DB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then( (db)=>{
    console.log('connect to the database'.red);
})

const bootcamps=JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));

const courses=JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'));

const importData=async()=>{
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log('Data Imported ...'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

// Delete data;
const deleteData=async()=>{
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('Data Destryed...'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};


if(process.argv[2]==='-i'){
    importData();
}else if(process.argv[2]==='-d'){
    deleteData();
}




