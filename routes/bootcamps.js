const express=require('express');
const router=express.Router();
const Bootcamp=require('../models/Bootcamp');
const advancedResults=require('../middleware/advancedResults')

const { protect, authorize } = require('../middleware/auth');

const { createBootcamp, updateBootcamp, deleteBootcamp, getBootcamps, getBootcamp, getBootcampsInRadius,bootcampPhotoUpload}=require('../controllers/bootcamps');


// include other resource routers
const courseRouter=require('./courses');
 
// RE-router into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance')
.get(getBootcampsInRadius);

router.route('/:id/photo')
.put(protect, authorize('publisher', 'admin') ,bootcampPhotoUpload);


router.route('/')
.get( advancedResults(Bootcamp,'courses') , getBootcamps )
.post(protect, authorize('publisher', 'admin') ,createBootcamp);

router.route('/:id')
.get(getBootcamp)
.put(protect, authorize('publisher', 'admin'), updateBootcamp)
.delete(protect, authorize('publisher', 'admin'),deleteBootcamp);


module.exports=router;
