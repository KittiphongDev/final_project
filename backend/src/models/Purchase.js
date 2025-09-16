import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      category: String,
      image: String,
      quantity: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
