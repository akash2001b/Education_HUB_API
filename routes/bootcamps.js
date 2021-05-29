const express=require('express');
const router=express.Router();
const Bootcamp=require('../models/Bootcamp');
const advancedResults=require('../middleware/advancedResults')
const { createBootcamp, updateBootcamp, deleteBootcamp, getBootcamps, getBootcamp, getBootcampsInRadius,bootcampPhotoUpload}=require('../controllers/bootcamps');


// include other resource routers
const courseRouter=require('./courses');
 
// RE-router into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance')
.get(getBootcampsInRadius);

router.route('/:id/photo')
.put(bootcampPhotoUpload);


router.route('/')
.get( advancedResults(Bootcamp,'courses') , getBootcamps )
.post(createBootcamp);

router.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp);


module.exports=router;
