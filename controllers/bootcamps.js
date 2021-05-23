const Bootcamp=require('../models/Bootcamp');
const ErrorResponse=require('../utils/errorResponse');

// get all bootcamps
// @routee GET /api/v1/bootcamps
// @access Public
module.exports.getBootcamps=async (req,res,next)=>{
    try {
        const bootcamps=await Bootcamp.find({});
        res.statusCode=200;
        res.json( { success:true,count:bootcamps.length , data: bootcamps});
    } catch (error) {
        next(error);
    }
}

// get signle bootcamps
// @routee GET /api/v1/bootcamps/:id
// @access Public
module.exports.getBootcamp=async (req,res,next)=>{
    try {
        const bootcamp=await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            
            return next(new ErrorResponse(`Bootcamp! not found with id of ${req.params.id}`, 404 ));    
        }
        res.statusCode=200;
        res.json( { success:true, data: bootcamp});
    } catch (error) {        
        next(error);
    }
}

// create new bootcamp
// @routee POST /api/v1/bootcamps
// @access Private
module.exports.createBootcamp=async (req,res,next)=>{
    
    try {
        const bootcamp= await Bootcamp.create(req.body);
        res.statusCode=201;
        res.json( { success:true, data: bootcamp});
        
    } catch (error) {
        next(error);
    }

}

// create update bootcamp
// @routee Put /api/v1/bootcamps/:id
// @access Private
module.exports.updateBootcamp=async (req,res,next)=>{
    try {
        const bootcamp=await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp! not found with id of ${req.params.id}`, 404 ));    
        }
    
        res.statusCode=200;
        res.json( { success:true, data: bootcamp});
        
    } catch (error) {
        next(error);
    }
}

// delete bootcamp
// @routee Put /api/v1/bootcamps/:id
// @access Private
module.exports.deleteBootcamp=async (req,res,next)=>{
    
    try {
        const bootcamp=await Bootcamp.findByIdAndDelete(req.params.id);
        
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp! not found with id of ${req.params.id}`, 404 ));    
        }
    
        res.statusCode=200;
        res.json( { success:true, data: {}});
        
    } catch (error) {
        next(error);
    }
}