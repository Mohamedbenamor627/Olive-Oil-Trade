const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require("path");
const sellRoutes = require("./routes/sellRoutes.js");
const buyRoutes = require("./routes/buyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

const oilRoute = require("./routes/oilRoute");


const proRoutes = require("./routes/proRoutes");

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.ORIGIN,
}));

// لتحديد مجلد الـ uploads كـ static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/sell", sellRoutes);
app.use("/api/buy", buyRoutes);
app.use("/api/dashboard", dashboardRoutes);

// راوت الزيوت
app.use("/api/oils", oilRoute);

app.use("/api/pro", proRoutes);


mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server ready to take off on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
