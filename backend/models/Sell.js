const mongoose = require("mongoose");

const sellSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    state: String,
    harvestYear: String,
    oilType: String,
    price: Number,
    type: String,
    quantity: Number,
    unit: String,
    note: String,
    imageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

const Sell = mongoose.model("Sell", sellSchema);

module.exports = Sell;
