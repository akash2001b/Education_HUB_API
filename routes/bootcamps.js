const express=require('express');
const router=express.Router();
const { createBootcamp, updateBootcamp, deleteBootcamp, getBootcamps, getBootcamp, getBootcampsInRadius}=require('../controllers/bootcamps')

// include other resource routers
const courseRouter=require('./courses');

// RE-router into other resource routers
router.use('/:bootcampId/courses', courseRouter);



router.route('/radius/:zipcode/:distance')
.get(getBootcampsInRadius);


router.route('/')
.get(getBootcamps)
.post(createBootcamp);

router.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp);


module.exports=router;
