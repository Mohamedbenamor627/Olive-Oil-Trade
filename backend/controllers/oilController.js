const Oil = require("../models/Oil");

// 🟢 جلب جميع أنواع الزيوت
const getOils = async (req, res) => {
  try {
    const oils = await Oil.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: oils });
  } catch (err) {
    console.error("❌ خطأ في جلب الزيوت:", err);
    res.status(500).json({ success: false, message: "خطأ في جلب البيانات" });
  }
};

// 🟢 إضافة نوع زيت جديد
const addOil = async (req, res) => {
  try {
    const { type, price, date } = req.body;

    if (!type || !price || !date) {
      return res.status(400).json({ success: false, message: "يرجى تعبئة جميع الحقول" });
    }

    const oil = await Oil.create({ type, price, date });
    res.status(201).json({ success: true, data: oil });
  } catch (err) {
    console.error("❌ فشل في الإضافة:", err);
    res.status(400).json({ success: false, message: "فشل في الإضافة" });
  }
};

// 🟡 تعديل نوع زيت
const updateOil = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, price, date } = req.body;

    const updatedOil = await Oil.findByIdAndUpdate(
      id,
      { type, price,date },
      { new: true, runValidators: true }
    );

    if (!updatedOil) {
      return res.status(404).json({ success: false, message: "الزيت غير موجود" });
    }

    res.status(200).json({ success: true, data: updatedOil });
  } catch (err) {
    console.error("❌ خطأ في التعديل:", err);
    res.status(400).json({ success: false, message: "فشل في تعديل الزيت" });
  }
};

// 🔴 حذف نوع زيت
const deleteOil = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOil = await Oil.findByIdAndDelete(id);
    if (!deletedOil) {
      return res.status(404).json({ success: false, message: "الزيت غير موجود" });
    }

    res.status(200).json({ success: true, message: "تم حذف الزيت بنجاح" });
  } catch (err) {
    console.error("❌ خطأ في الحذف:", err);
    res.status(500).json({ success: false, message: "فشل في حذف الزيت" });
  }
};

module.exports = { getOils, addOil, updateOil, deleteOil };
