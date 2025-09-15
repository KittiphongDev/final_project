import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
}, { timestamps: true });

const Item = mongoose.model("ItemList", itemSchema);

export default Item;
