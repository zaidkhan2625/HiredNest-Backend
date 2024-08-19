const mongoose = require("mongoose");
const connectDb = async () => {
    try {
        // Replace with your actual MongoDB Atlas URI
        const uri = "mongodb+srv://bhaikhan76705:1234khan@cluster0.x6gmmvp.mongodb.net/hirednest";
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Not connected to MongoDB:", error.message);
    }
}
module.exports = connectDb;
