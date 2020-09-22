const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacebookUserSchema = new Schema({

  username: { type: String, required: true },
  facebookToken: { type: String, required: false }

});


// create the model for users and expose it to our app
module.exports = FacebookUser = mongoose.model('facebookuser', FacebookUserSchema);
