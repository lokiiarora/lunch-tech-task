const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: {type: String},
  uname:{type:String, default:"Rungta"},

  profileDetails: {
    name: {type: String},
    gender: {type: String},
    number:{type: String},
    cname:{type: String},
    approvalStatus:Boolean,
    panNo:{type: String},
    sTax:{type: String},
    alt:{type: String}
  },
  idProof:{
      option:{type: String},
      proofNo:{type: String}
  },
  officeAdr:{
    line1:{type: String},
    line2:{type: String},
    state:{type: String},
    city:{type: String},
    pin:{type: String},
  },
  addrDetails:{
    type:{type: String},
    proofNo:{type: String},
  },
  personalDetails:{
    line1:{type: String},
    line2:{type: String},
    state:{type: String},
    city:{type: String},
    pin:{type: String},
  },
  balance:String
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */

const User = mongoose.model('User', userSchema);

module.exports = User;
