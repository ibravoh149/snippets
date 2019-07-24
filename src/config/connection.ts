import mongoose from 'mongoose';


let uri:any;
 if(process.env.NODE_ENV==='test'){
    uri=process.env.MONGO_URI_UNIT_TEST
 }else{
    uri=process.env.MONGO_URI
 }

 
module.exports = function(done:any) {
    done = typeof done === 'function' ? done : function() {};

    console.log('Initializer: Mongoose started');

    // the mongoose models and the mongoose connection don't need to happen in order

    require('../models')();

    mongoose.Promise = global.Promise;
  
    var connectWithRetry = function() {
        if (process.env.NODE_ENV === 'test') {
            mongoose.connect(uri, {
                // useMongoClient: true,
                useNewUrlParser: true,
                reconnectTries: 9999999999,
                connectTimeoutMS: 2000,
            });
        } else {
            mongoose.connect(uri, {
                // useMongoClient: true,
                useNewUrlParser: true,
                reconnectTries: 9999999999,
                connectTimeoutMS: 2000,
            });
        }
    };

    mongoose.connection.on('error', function(err) {
        console.log('Error MONGOOSE: ' + err);
        connectWithRetry();
    });

    mongoose.connection.on('connected', function(err) {
        console.log('Successfully Connected to the database');
        done();
    });

    connectWithRetry();
};
