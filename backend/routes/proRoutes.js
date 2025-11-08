const express = require("express");
const { addSubscription, getAllSubscriptions,deleteSubscription } = require("../controllers/proController");

const router = express.Router();

// POST → إضافة اشتراك جديد
router.post("/subscribe", addSubscription);

// GET → جلب جميع الاشتراكات
router.get("/subscriptions", getAllSubscriptions);
router.delete("/:id", deleteSubscription);

module.exports = router;
