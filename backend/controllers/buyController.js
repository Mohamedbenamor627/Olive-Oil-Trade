const Buy = require("../models/Buy");

// إضافة طلب شراء جديد
const handleBuy = async (req, res) => {
  try {
    const newBuy = new Buy(req.body);
    const savedBuy = await newBuy.save();
    res.status(200).json({ message: "تم استلام الطلب بنجاح", data: savedBuy });
  } catch (error) {
    console.error("❌ خطأ في حفظ الطلب:", error);
    res.status(500).json({ error: "حدث خطأ أثناء معالجة الطلب" });
  }
};

// جلب كل البيانات
const getAllBuys = async (req, res) => {
  try {
    const allBuys = await Buy.find().sort({ createdAt: -1 });
    res.status(200).json({ data: allBuys });
  } catch (error) {
    console.error("❌ خطأ في جلب البيانات:", error);
    res.status(500).json({ error: "حدث خطأ أثناء جلب البيانات" });
  }
};

// حذف طلب شراء
const deleteBuy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBuy = await Buy.findByIdAndDelete(id);

    if (!deletedBuy) {
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });
    }

    res.status(200).json({ success: true, message: "تم حذف الطلب بنجاح" });
  } catch (error) {
    console.error("❌ خطأ في حذف الطلب:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء حذف الطلب" });
  }
};


module.exports = { handleBuy, getAllBuys ,deleteBuy};
