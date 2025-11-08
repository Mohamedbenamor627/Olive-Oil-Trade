const mongoose = require("mongoose");

const ProSubscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProSubscription = mongoose.model("ProSubscription", ProSubscriptionSchema);

module.exports = ProSubscription;
