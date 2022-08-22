const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
},
  
 { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', async function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = async function comparePassword(candidatePassword, cb) {
  try {
    cb(null, await bcrypt.compare(candidatePassword, this.password));
  } catch (err) {
    cb(err);
  }
};



const User = mongoose.model('User', userSchema);

module.exports = User;