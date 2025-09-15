// main.js
import { getItem, addPurchase, llm } from "./api.js";
import * as DOM from "./dom.js";
import { renderItems, renderCategories, showAiSuggest, updateCartSummary, updateCartModal, updateGridQuantity } from "./render.js";

// ---------- STATE ----------
let items = [];
let cart = [];
let currentCategory = null;

// ---------- CART FUNCTION ----------
export function addOrUpdateCart(id, qty){
  const existing = cart.find(c => c.id === id);
  if(existing){
    existing.quantity = qty;
    if(qty <= 0) cart = cart.filter(c => c.id !== id);
  } else {
    if(qty > 0) cart.push({id, quantity: qty});
  }

  updateCartSummary(cart, items);
  updateCartModal(cart, items, addOrUpdateCart);
  updateGridQuantity(id, qty, items);
}

// ---------- INITIALIZE ITEMS ----------
async function initItems(){
  const data = await getItem();
  items = data || [];
  renderItems(items, currentCategory, cart, addOrUpdateCart);
  renderCategories(items, currentCategory, (cat)=>{
    currentCategory = cat;
    renderItems(items, currentCategory, cart, addOrUpdateCart);
  });
  updateCartSummary(cart, items);
  updateCartModal(cart, items, addOrUpdateCart);
}
initItems();

// ---------- EVENT LISTENERS ----------

// AI input
DOM.sendBtn.addEventListener("click", async () => {
  const query = DOM.userInput.value.trim();
  if (!query) {
    alert("กรุณาพิมพ์เมนูที่อยากทำก่อน");
    return;
  }
  try {
    DOM.loading.style.display = "flex";
    const res = await llm(query);
    DOM.loading.style.display = "none";
    showAiSuggest(res, items, cart, addOrUpdateCart);
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการเรียก AI");
  }
});


// AI modal
DOM.closeModal.addEventListener("click", ()=> DOM.aiModal.style.display="none");
DOM.confirmSelection.addEventListener("click", ()=>{
  const checkedDivs = Array.from(DOM.aiResults.querySelectorAll("div"));
  checkedDivs.forEach(div=>{
    const checkbox = div.querySelector("input[type=checkbox]");
    const inputQty = div.querySelector("input[type=number]");
    if(checkbox && checkbox.checked){
      addOrUpdateCart((checkbox.value), parseInt(inputQty.value));
    }
  });
  DOM.aiModal.style.display="none";
});

// Cart modal
DOM.showCartBtn.addEventListener("click", ()=> DOM.cartModal.style.display="flex");
DOM.closeCart.addEventListener("click", ()=> DOM.cartModal.style.display="none");

// Confirm purchase
DOM.confirmPurchase.addEventListener("click", async ()=>{
  if(cart.length === 0){
    alert("ไม่มีวัตถุดิบในตะกร้า");
    return;
  }
  try {
    const res = await addPurchase(cart);
    if(res && res.status === "ok"){
      alert("สั่งซื้อเรียบร้อย: " + cart.map(c=>items.find(i=>i.id===c.id).name).join(", "));
      cart = [];
      renderItems(items, currentCategory, cart, addOrUpdateCart);
      updateCartSummary(cart, items);
      updateCartModal(cart, items, addOrUpdateCart);
      DOM.cartModal.style.display="none";
    }
  } catch(err){
    console.error(err);
    alert("เกิดข้อผิดพลาดในการสั่งซื้อ");
  }
});

// Reset all
DOM.resetBtn.addEventListener("click", ()=>{
  cart = [];
  currentCategory = null;
  renderItems(items, currentCategory, cart, addOrUpdateCart);
  updateCartSummary(cart, items);
  updateCartModal(cart, items, addOrUpdateCart);
});
