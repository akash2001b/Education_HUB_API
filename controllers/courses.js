const Course=require('../models/Course');
const ErrorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middleware/async');

 // get courses
// @routee GET /api/v1/courses
// @routee GET /api/v1/bootcamps/:bootcampId/courses
// @access Public

exports.getCourses=asyncHandler( async(req,res,next)=>{
    let query;
    if(req.params.bootcampId){
        query=Course.find({bootcamp:req.params.bootcampId})
    }
    else{
        query=Course.find({}).populate({
            path:'bootcamp',
            select:'name description'
        });
    }

    const courses=await query;
    
    res.statusCode=200;
    res.json({success:true, count: courses.length, data: courses});
})