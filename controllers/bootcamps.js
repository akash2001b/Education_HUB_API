const path=require('path');
const Bootcamp=require('../models/Bootcamp');
const ErrorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middleware/async');
const geocoder=require('../utils/geocoder');

// get all bootcamps
// @routee GET /api/v1/bootcamps
// @access Public
module.exports.getBootcamps=asyncHandler( async (req,res,next)=>{
    
    let query;
    // copy req.query
    const resQuery={...req.query};

    // fiels to exclude
    const removeFields=['select','sort','page','limit'];

    // loop over remove fileds and delete them for reqQuery
    removeFields.forEach( (p) => delete resQuery[p]);

    console.log(resQuery);  //testing.........
    console.log(req.query); //tesging..........

    // create query string
    let queryStr=JSON.stringify(resQuery);

    // create operators($gt,$gte ..etc)
    queryStr=queryStr.replace(/\b(gt|gte|lte|lt|in)\b/g, match=>`$${match}`);   

    // finding resourse
    query=Bootcamp.find(JSON.parse(queryStr)).populate('courses');

    // select fields
    if(req.query.select){
        const fields=req.query.select.split(',').join(' ');
        query.select(fields);
    }

    // sort
    if(req.query.sort){
        const sortBy=req.query.sort.split(',').join(" ");
        query=query.sort(sortBy);
    }else{
        query.sort('-createdAt');
    }

    //Pagination
    const page=parseInt(req.query.page,10) || 1;
    const limit=parseInt(req.query.limit,10) || 25;
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    const total=await Bootcamp.countDocuments();

    query=query.skip(startIndex).limit(limit); 

    // executing query
    const bootcamps=await query;

    // pagination result
    const pagination={};

    if(endIndex<total){
        pagination.next={
            page:page+1,
            limit:limit
        }
    }
    if(startIndex>0){
        pagination.prev={
            page:page-1,
            limit:limit
        }
    }

    // response
    res.statusCode=200;
    res.json( { success:true,count:bootcamps.length , data: bootcamps, pagination });

});

// get signle bootcamps
// @routee GET /api/v1/bootcamps/:id
// @access Public
module.exports.getBootcamp=asyncHandler( async (req,res,next)=>{
    
    const bootcamp=await Bootcamp.findById(req.params.id);
    if(!bootcamp){
        
        return next(new ErrorResponse(`Bootcamp! not found with id of ${req.params.id}`, 404 ));    
    }
    res.statusCode=200;
    res.json( { success:true, data: bootcamp});
    
});

// create new bootcamp
// @routee POST /api/v1/bootcamps
// @access Private
module.exports.createBootcamp=asyncHandler( async (req,res,next)=>{
       
    const bootcamp= await Bootcamp.create(req.body);
    res.statusCode=201;
    res.json( { success:true, data: bootcamp});
});

// create update bootcamp
// @routee Put /api/v1/bootcamps/:id
// @access Private
module.exports.updateBootcamp=asyncHandler( async (req,res,next)=>{
    
    const bootcamp=await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    
    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp! not found with id of ${req.params.id}`, 404 ));    
    }
    res.statusCode=200;
    res.json( { success:true, data: bootcamp});
    
});

// delete bootcamp
// @routee Put /api/v1/bootcamps/:id
// @access Private
module.exports.deleteBootcamp=asyncHandler (async (req,res,next)=>{    
   
    const bootcamp=await Bootcamp.findByIdAndDelete(req.params.id);

    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp! not found with id of ${req.params.id}`, 404 ));    
    }
    
    bootcamp.remove();
    res.statusCode=200;
    res.json( { success:true, data: {}});
 
}); 

//get bootcamps within a radius
// @routee get /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
module.exports.getBootcampsInRadius=asyncHandler (async (req,res,next)=>{    
   const {zipcode, distance}=req.params;
    // get lat/lng from geocoder
    const loc=await geocoder.geocode(zipcode);
    const lat=loc[0].latitude;
    const lng=loc[0].longitude;

    // calc radius using radians
    // divide dist by radius of earth
    // eaerth Radius=3 963 miles || 6378 km
    const radius=distance/3863;
    const bootcamps=await Bootcamp.find({
        location :{
            $geoWithin: { $centerSphere: [ [ lng , lat ], radius ] }
        } 
    });
    res.statusCode=200;
    res.json({
        success:true,
        count:bootcamps.length,
        data:bootcamps
    })
 });


// @desc      Upload photo for bootcamp
// @route     PUT /api/v1/bootcamps/:id/photo
// @access    Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
  
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }  
 
  
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }

    console.log(req.files);
  
    const file = req.files.file;
  
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }
  
    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    // Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      } 
  
      await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
  
      res.status(200).json({
        success: true,
        data: file.name
      });
    });
  });
  