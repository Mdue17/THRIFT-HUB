const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // email: { type: String, unique: true },
  // password: String,
  // passwordResetToken: String,
  // passwordResetExpires: Date,
  // emailVerificationToken: String,
  // emailVerified: Boolean,
  // google: String,
  // instagram: String,
 

  // profile: {
  //   name: String,
  //   gender: String,
  //   location: String,
  //   website: String,
  //   picture: String
  // },

  loginID: {
    type: String,
    required: true,
},
firstName: {
    type: String,
    required: true,
},
lastName: {
    type: String,
    required: true,
},
displayName: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
    trim: true,
},
image: {
    type: String,
},
createdAt: {
    type: Date,
    default: Date.now,
},
})
  

module.exports =  mongoose.model('User', UserSchema);