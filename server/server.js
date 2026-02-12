const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userAuth = require('./routes/Auth.route.js')
const jobs = require('./routes/Jobs.route.js')
const profile = require('./routes/Profile.route.js')
const cookieParser = require("cookie-parser");
const apply = require('./routes/ApplyJobs.route.js')

const app = express();

app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: ["https://next-hire-gamma.vercel.app","http://localhost:5173"], // frontend URL
    credentials: true,
  })
);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/auth',userAuth); //auth
app.use('/api/jobs',jobs) //jobs
app.use('/api/profile',profile) //profile
app.use('/api/apply',apply) //apply

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("NextHire API Running...");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
