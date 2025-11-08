const express = require("express");
const router = express.Router();
const { getOils, addOil, updateOil, deleteOil } = require("../controllers/oilController");

// 🟢 عرض جميع الزيوت
router.get("/", getOils);

// 🟢 إضافة زيت جديد
router.post("/", addOil);

// 🟡 تعديل زيت موجود
router.put("/:id", updateOil);

// 🔴 حذف زيت
router.delete("/:id", deleteOil);

module.exports = router;
