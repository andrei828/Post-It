const mongoose = require('mongoose')
const mongoUtils = require('./mongoUtils')
const populateMongo = require('./populateMongo')


module.exports = () => {
    
    mongoose
    .connect(
      'mongodb://mongo:27017/docker-node-mongo',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log(err));

    
    registerUser = (req, _username, _password, cb) => {
        return mongoUtils.registerUser(req, _username, _password, cb)
    }
    
}
