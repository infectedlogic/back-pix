require('dotenv').config();
const mongoose = require('mongoose')


const connectDB = async () => { 

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connection SUCCESS");
    }
    catch(error){
        console.error('MongoDB connection FAILED',error);
        process.exit(1);

    }

}

 async function closeMongooseConnection() {
    await mongoose.disconnect();
  }

module.exports = connectDB,closeMongooseConnection;