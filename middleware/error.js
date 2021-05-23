const ErrorResponse = require("../utils/errorResponse");

const errorHandler=(err, req,res,next)=>{

    let error={...err};
    
    error.message=err.message;
    console.log('...........................'); //testing
    console.log(err);

    // moongose bad object id
    if(err.name==='CastError'){
        const message=`Bootcamp! not found with id of ${req.params.id}`
        error=new ErrorResponse(message,404); 
    }
    // mongoose duplicate key error
    if(err.code===11000){
        const message= `Duplicate field value entered`;
        error=new ErrorResponse(message,400);
    }

    // mongoose validation error
    if(err.name==='ValidationError'){
        const message=Object.values(err.errors).map(val => val.message);
        error=new ErrorResponse(message,400);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || "server error",
        tatti:'tatti'
    });
};


module.exports=errorHandler;