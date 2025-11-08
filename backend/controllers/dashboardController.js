const Buy = require("../models/Buy");
const Sell = require("../models/Sell");

const getDashboardData = async (req, res) => {
  try {
    const buys = await Buy.find().sort({ createdAt: -1 });
    const sells = await Sell.find().sort({ createdAt: -1 });

    res.status(200).json({ data: { buys, sells } });
  } catch (error) {
    console.error("❌ خطأ في جلب بيانات Dashboard:", error);
    res.status(500).json({ error: "حدث خطأ أثناء جلب البيانات" });
  }
};

module.exports = { getDashboardData };
