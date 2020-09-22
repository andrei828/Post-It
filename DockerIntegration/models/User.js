const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const FacebookPageSchema = new Schema({

  pageId: { type: String, required: true },
  name: { type: String, required: true }, 
  canPost: { type: Boolean, required: true },
  pageAccessToken: { type: String, required: false },
  pageAccessTokenExpireDate: { type: String, required: false }

})

const UserSchema = new Schema({

  date: { type: Date, default: Date.now },
  username: { type: String, required: true },
  password: { type: String, required: true },
  
  facebookId: { type: String, required: false },
  facebookToken: { type: String, required: false },
  facebookUsername: { type: String, required: false },
  facebookTokenExpireDate: { type: Date, required: false },
  facebookPagesList : [ FacebookPageSchema ],

  twitterId: { type: String, required: false },
  twitterToken: { type: String, required: false },
  twitterUsername: { type: String, required: false },
  twitterTokenSecret: { type: String, required: false },
  twitterTokenExpireDate: { type: String, required: false },

  redditId: { type: String, required: false },
  redditToken: { type: String, required: false },
  redditUsername: { type: String, required: false },
  redditTokenExpireDate: { type: String, required: false }

  // linkedinToken: {
  //   type: String,
  //   required: false
  // }
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app

module.exports = User = mongoose.model('user', UserSchema);
