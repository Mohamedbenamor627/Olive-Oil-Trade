const ProSubscription = require("../models/ProSubscription");

// إضافة اشتراك جديد
const addSubscription = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await ProSubscription.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    const newSubscription = new ProSubscription({ email });
    await newSubscription.save();

    res.status(201).json({ message: "Subscription added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// جلب جميع الاشتراكات (للمشرف فقط)
const getAllSubscriptions = async (req, res) => {
  try {
    const subs = await ProSubscription.find().sort({ createdAt: -1 });
    res.status(200).json(subs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await ProSubscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await subscription.deleteOne(); // أو await ProSubscription.findByIdAndDelete(id);

    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




module.exports = { addSubscription, getAllSubscriptions,deleteSubscription };
