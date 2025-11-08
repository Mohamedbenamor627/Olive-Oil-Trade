const express = require("express");
const { handleBuy, getAllBuys,deleteBuy } = require("../controllers/buyController");
const router = express.Router();

router.post("/", handleBuy); // إضافة طلب شراء جديد
router.get("/", getAllBuys); // جلب كل البيانات

// 🗑️ مسار الحذف
router.delete("/:id", deleteBuy);

module.exports = router;
