require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		// const conn = await mongoose.connect('mongodb://localhost:27017/MENTORS');
		const conn = await mongoose.connect("mongodb://127.0.0.1:27017/MENTORS");

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

module.exports = connectDB;
