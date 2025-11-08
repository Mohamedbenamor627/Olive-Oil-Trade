// routes/sell.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const { handleSell, getAllSells,deleteSell } = require("../controllers/sellController"); // اضف getAllSells

const router = express.Router();

// إعداد multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST لاضافة بيع
router.post("/", upload.single("image"), handleSell);

// GET لجلب كل طلبات البيع
router.get("/", getAllSells);

// ✅ راوت الحذف
router.delete("/:id", deleteSell);

module.exports = router;
