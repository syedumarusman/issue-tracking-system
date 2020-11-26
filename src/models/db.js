const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/myLocalDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log("mongoDb succesfully connected")
});

module.exports =  mongoose;