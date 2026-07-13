const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("");
        console.log("MongoDB Connected");
        console.log(conn.connection.host);
        console.log("");

    } catch (error) {

        console.log("ERROR");
        console.error(error);
        

        process.exit(1);

    }
};

module.exports = connectDB;