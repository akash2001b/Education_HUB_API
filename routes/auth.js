const express=require('express');

const {register, login, getMe, forgotPassword,resetPassword, updateDetails, updatePassword, logout }=require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router=express.Router();


router
.post('/register',register)
.post('/login', login)
.get('/me', protect, getMe)
.get('/logout', logout)
.put('/updatedetails', protect, updateDetails)
.put('/updatepassword', protect, updatePassword )
.post('/forgotpassword',forgotPassword)
.put('/resetpassword/:resettoken',resetPassword)


module.exports=router;