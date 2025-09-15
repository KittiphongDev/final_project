import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";
import Item from "../models/ItemList.js";
import Purchase from "../models/Purchase.js";
import { GoogleGenAI } from "@google/genai";
// ---------------- ITEMS ----------------
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();

    // แปลง _id => id และเลือกเฉพาะ field ที่ต้องการ
    const formatted = items.map(i => ({
      id: i._id.toString(), // แปลง ObjectId เป็น string
      name: i.name,
      price: i.price,
      category: i.category,
      image: i.image
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const addItem = async (req, res) => {
  try {
    const { name, price, category, image } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Name & price required" });

    const newItem = new Item({ name, price, category, image });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, image } = req.body;

    if (!id) return res.status(400).json({ error: "ID required" });
    if (!name && !price && !category && !image) {
      return res.status(400).json({ error: "No data to update" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, price, category, image },
      { new: true, runValidators: true } // new: คืนค่า item หลังอัปเดตแล้ว
    );

    if (!updatedItem) return res.status(404).json({ error: "Item not found" });

    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Item not found" });

    res.json({ status: "ok", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- PURCHASES ----------------
export const addPurchase = async (req, res) => {
  try {
    const { items: cartItems } = req.body;
    if (!Array.isArray(cartItems) || cartItems.length === 0)
      return res.status(400).json({ error: "Cart items required" });

    // map cartItems → snapshot ของ item
    const purchaseItems = [];
    for (let c of cartItems) {
      const item = await Item.findById(c.id);
      if (!item) continue;
      purchaseItems.push({
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image,
        quantity: c.quantity,
      });
    }

    const purchase = new Purchase({ items: purchaseItems });
    await purchase.save();

    res.json({ status: "ok", purchaseId: purchase._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 });

    // map ข้อมูล snapshot ของ item ใน purchase
    const result = purchases.map(p => ({
      id: p._id,
      createdAt: p.createdAt,
      items: p.items.map(i => ({
        id: i.itemId,      // ObjectId ของสินค้า (snapshot)
        name: i.name,
        price: i.price,
        category: i.category,
        image: i.image,
        quantity: i.quantity,
      })),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- LLM ----------------

export const llmSuggest = async (req, res) => {
  try {
    const { prompt: userPrompt } = req.body;

    // กรณี prompt ว่าง
    if (!userPrompt || !userPrompt.trim()) {
      return res.json({
        ingredients: [],
        comment: "ขออภัย ข้อมูลไม่ถูกต้องหรือไม่ได้ระบุชื่ออาหารที่สามารถประมวลผลได้"
      });
    }

    const allItems = await Item.find(); // ดึงรายการวัตถุดิบทั้งหมด
    const availableItems = allItems.map(i => ({
      id: i._id.toString(),
      name: i.name,
      price: i.price
    }));

const finalPrompt = `
You are given a list of available ingredients (availableItems) with their IDs, names, and prices.

A user has requested a recipe or menu in natural, possibly messy, casual text (request).

Your task:
1. Try to understand any food items or recipes mentioned, even if the request is short or casual.
2. If the request contains absolutely no recognizable food:
   - Return {"ingredients": [], "comment": "..."} 
   - In the comment field, briefly explain in Thai why the request cannot be processed as a recipe or food.
3. If any food is recognized:
   - Determine which ingredients from availableItems are needed.
   - Calculate quantity in package units as before.
   - Mention missing ingredients concisely in Thai in the comment field.

Always try to interpret the request generously. Treat short phrases like "ข้าวผัดกุ้ง" as valid.

Request: ${userPrompt}

AvailableItems: ${JSON.stringify(availableItems)}
`;





    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // ปิด thinking เพื่อความเร็ว
      },
    });

    const generatedText = response.text || "";

    let result = { ingredients: [], comment: "" };
    try {
      const cleaned = generatedText.replace(/```(json)?\n?/g, "").replace(/```/g, "").trim();
      result = JSON.parse(cleaned);
    } catch (e) {
      result = generatedText;
    }

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

