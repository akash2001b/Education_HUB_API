const path = require("path");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");

// get all bootcamps
// @routee GET /api/v1/bootcamps
// @access Public
module.exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.statusCode = 200;
  res.json(res.advancedResults);
});

// get signle bootcamps
// @routee GET /api/v1/bootcamps/:id
// @access Public
module.exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp! not found with id of ${req.params.id}`, 404)
    );
  }
  res.statusCode = 200;
  res.json({ success: true, data: bootcamp });
});

// create new bootcamp
// @routee POST /api/v1/bootcamps
// @access Private
module.exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.statusCode = 201;
  res.json({ success: true, data: bootcamp });
});

// create update bootcamp
// @routee Put /api/v1/bootcamps/:id
// @access Private
module.exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp! not found with id of ${req.params.id}`, 404)
    );
  }
  res.statusCode = 200;
  res.json({ success: true, data: bootcamp });
});

// delete bootcamp
// @routee Put /api/v1/bootcamps/:id
// @access Private
module.exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp! not found with id of ${req.params.id}`, 404)
    );
  }

  bootcamp.remove();
  res.statusCode = 200;
  res.json({ success: true, data: {} });
});

//get bootcamps within a radius
// @routee get /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
module.exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  // get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius using radians
  // divide dist by radius of earth
  // eaerth Radius=3 963 miles || 6378 km
  const radius = distance / 3863;
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });
  res.statusCode = 200;
  res.json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
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
  if (!file.mimetype.startsWith("image")) {
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

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
