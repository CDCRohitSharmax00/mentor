const express = require("express");
const loginRoute = require("./routes/loginRoute");
const mentorRoutes = require("./routes/mentor");
const connectDB = require("./database/db");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api", loginRoute);
app.use("/mentor", mentorRoutes);

//user profile
const userRoutes = require("./routes/profile");
app.use("/api/users", userRoutes);

// app.use('/mentor', mentorRoutes);
connectDB(); //! database

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
