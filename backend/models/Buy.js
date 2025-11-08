const mongoose = require("mongoose");

const buySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    state: String,
    amount: Number,
    type: String,
    quantity: Number,
    unit: { type: String, default: "لتر" },
  },
  { timestamps: true }
);

const Buy = mongoose.model("Buy", buySchema);
module.exports = Buy;
