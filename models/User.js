const mongoose = require("mongoose");
const bycrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6, 
    select: false, 
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// encrypt password using bcrypt
UserSchema.pre('save',async function(next){
    const salt=await bycrypt.genSalt(10);
    this.password=await bycrypt.hash(this.password, salt);
    next();
});

// sign JWT and return
UserSchema.methods.getSignedJwtToken=function(){
    return jwt.sign({id: this._id }, process.env.JWT_SECRET ,
        { expiresIn: process.env.JWT_EXPIRE });
}


// match user entered password to hashed passwrod in database
UserSchema.methods.matchPassword=async function(enteredPassword){
    return await bycrypt.compare(enteredPassword,this.password);
}


module.exports = mongoose.model("User", UserSchema);
