const Sell = require("../models/Sell");

// إضافة طلب بيع جديد
const handleSell = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      state,
      harvestYear,
      oilType,
      price,
      type,
      quantity,
      unit,
      note,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newSell = new Sell({
      name,
      phone,
      email,
      state,
      harvestYear,
      oilType,
      price,
      type,
      quantity,
      unit,
      note,
      imageUrl,
    });

    await newSell.save();

    res.status(201).json({
      message: "تم حفظ العرض بنجاح ✅",
      data: newSell,
    });
  } catch (error) {
    console.error("❌ خطأ في الحفظ:", error);
    res.status(500).json({ error: "حدث خطأ أثناء حفظ البيانات" });
  }
};

// جلب جميع طلبات البيع
const getAllSells = async (req, res) => {
  try {
    const sells = await Sell.find().sort({ createdAt: -1 });
    res.status(200).json(sells);
  } catch (error) {
    console.error("❌ خطأ في جلب البيانات:", error);
    res.status(500).json({ error: "حدث خطأ أثناء جلب البيانات" });
  }
};


const deleteSell = async (req, res) => {
  try {
    const { id } = req.params;
    const sell = await Sell.findById(id);

    if (!sell) {
      return res.status(404).json({ message: "طلب البيع غير موجود" });
    }

    await Sell.findByIdAndDelete(id);
    res.status(200).json({ message: "تم حذف طلب البيع بنجاح ✅" });
  } catch (error) {
    console.error("❌ خطأ في الحذف:", error);
    res.status(500).json({ error: "حدث خطأ أثناء حذف البيانات" });
  }
};

module.exports = { handleSell, getAllSells,deleteSell  };
