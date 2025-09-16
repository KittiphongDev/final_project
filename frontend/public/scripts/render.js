// render.js
import {
  itemsContainer,
  categoryList,
  cartList,
  cartTotal,
  aiResults,
  aiModal,
  showCartBtn,
} from "./dom.js";

// ฟังก์ชันอัปเดตจำนวนใน grid
export function updateGridQuantity(id, qty, items) {
  const inputs = itemsContainer.querySelectorAll(
    ".item-card input[type=number]"
  );
  inputs.forEach((input) => {
    const card = input.closest(".item-card");
    const name = card.querySelector("h3").textContent;
    const item = items.find((i) => i.name === name && i.id === id);
    if (item) {
      input.value = qty;
    }
  });
}

// ฟังก์ชันสรุปตะกร้า
export function updateCartSummary(cart, items) {
  const totalItems = cart.reduce((acc, c) => acc + c.quantity, 0);
  const totalPrice = cart.reduce((acc, c) => {
    const item = items.find((i) => i.id.toString() === c.id.toString());
    if (!item) {
      return acc;
    }
    return acc + item.price * c.quantity;
  }, 0);
  showCartBtn.textContent = `สรุปรายการ (${totalItems} ชิ้น / ${totalPrice} บาท)`;
}

// ฟังก์ชันอัปเดต modal ตะกร้า
export function updateCartModal(cart, items, addOrUpdateCart) {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((c) => {
    const item = items.find((i) => i.id === c.id);
    if (item) {
      total += item.price * c.quantity;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} (${item.price} บาท/หน่วย) จำนวน 
        <input type="number" min="0" value="${c.quantity}" style="width:50px">
      `;
      cartList.appendChild(li);

      const inputQty = li.querySelector("input[type=number]");
      inputQty.addEventListener("change", (e) => {
        const val = parseInt(e.target.value);
        addOrUpdateCart(item.id, val);
      });
    }
  });

  cartTotal.textContent = `รวม ${total} บาท`;
}

// ฟังก์ชัน render หมวดหมู่
export function renderCategories(items, currentCategory, setCategoryCallback) {
  const cats = [...new Set(items.map((i) => i.category))];
  categoryList.innerHTML = "";

  // Add "All" button
  const allLi = document.createElement("li");
  allLi.textContent = "ทั้งหมด";
  allLi.id = "allcatebtn";
  allLi.addEventListener("click", () => {
    currentCategory = null;
    renderItems(items, currentCategory, [], setCategoryCallback);
  });
  categoryList.appendChild(allLi);

  cats.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat;
    li.addEventListener("click", () => {
      currentCategory = cat;
      renderItems(items, currentCategory, [], setCategoryCallback); // auto-render items
    });
    categoryList.appendChild(li);
  });
}

// ฟังก์ชัน render รายการสินค้า
export function renderItems(items, currentCategory, cart, addOrUpdateCart) {
  itemsContainer.innerHTML = "";
  const filtered = currentCategory
    ? items.filter((i) => i.category === currentCategory)
    : items;

  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className = "item-card";
    const cartItem = cart.find((c) => c.id === item.id);
    const qty = cartItem ? cartItem.quantity : 0;
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>ราคา ${item.price} บาท/หน่วย</p>
      <label>จำนวน <input type="number" min="0" value="${qty}" style="width:50px"></label>
    `;
    itemsContainer.appendChild(card);

    const inputQty = card.querySelector("input[type=number]");
    inputQty.addEventListener("change", (e) => {
      const val = parseInt(e.target.value);
      addOrUpdateCart(item.id, val);
    });
  });
}

// ฟังก์ชันแสดงผล AI suggestion
export function showAiSuggest(aiData, items, cart, addOrUpdateCart) {
  aiResults.innerHTML = "";
  const { ingredients, comment } = aiData;
  ingredients.forEach((itemData) => {
    const item = items.find((i) => i.id === itemData.id);
    const cartItem = cart.find((c) => c.id === itemData.id);
    const qty = cartItem ? cartItem.quantity : itemData.quantity;
    if (item) {
      const div = document.createElement("div");
      div.innerHTML = `
        <label>
          <input type="checkbox" value="${item.id}" checked> ${item.name} (${item.price} บาท)
          จำนวน <input type="number" min="1" value="${qty}" style="width:50px">
        </label>
      `;
      aiResults.appendChild(div);
    }
  });

  if (comment && comment.trim() !== "") {
    const commentDiv = document.createElement("div");
    commentDiv.style.marginTop = "10px";
    commentDiv.style.fontStyle = "italic";
    commentDiv.style.color = "#d63031";
    commentDiv.textContent = `หมายเหตุ: ${comment}`;
    aiResults.appendChild(commentDiv);
  }

  aiModal.style.display = "flex";
}
