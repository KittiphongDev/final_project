import {
  getItem,
  addItem,
  updateItem,
  removeItem,
  checkPassword,
  getPurchases,
} from "./api.js";

// DOM
const manageBtn = document.getElementById("manageBtn");
const passwordModal = document.getElementById("passwordModal");
const passwordInput = document.getElementById("passwordInput");
const confirmPassword = document.getElementById("confirmPassword");
const closePasswordModal = document.getElementById("closePasswordModal");
const passwordError = document.getElementById("passwordError");

const manageForm = document.getElementById("manageForm");
const addItemBtn = document.getElementById("addItemBtn");
const existingItemsContainer = document.getElementById(
  "existingItemsContainer"
);
const newItemName = document.getElementById("newItemName");
const newItemPrice = document.getElementById("newItemPrice");
const newItemCategory = document.getElementById("newItemCategory");
const newItemImage = document.getElementById("newItemImage");

const loadPurchasesBtn = document.getElementById("loadPurchasesBtn");
const purchasesContainer = document.getElementById("purchasesContainer");

let savedPassword = "";

// ----------------- เปิด modal รหัสผ่าน -----------------
manageBtn.addEventListener("click", () => {
  passwordInput.value = "";
  passwordError.textContent = "";
  passwordModal.style.display = "flex";
});

// ----------------- ปิด modal -----------------
closePasswordModal.addEventListener("click", () => {
  passwordModal.style.display = "none";
  location.reload(); // รีโหลดหน้าเมื่อปิด modal
});

// ----------------- ตรวจสอบรหัสผ่าน -----------------
confirmPassword.addEventListener("click", async () => {
  const pwd = passwordInput.value.trim();
  if (!pwd) {
    passwordError.textContent = "กรุณากรอกรหัสผ่าน";
    return;
  }

  try {
    const data = await checkPassword(pwd);
    if (data.valid) {
      savedPassword = pwd; // บันทึกรหัสผ่านไว้ใช้ต่อ
      manageForm.style.display = "block";
      loadExistingItems();
      purchasesContainer.innerHTML = ""; // เคลียร์ก่อน
    } else {
      passwordError.textContent = "รหัสผ่านไม่ถูกต้อง";
    }
  } catch (err) {
    console.error(err);
    passwordError.textContent = "เกิดข้อผิดพลาด";
  }
});

// ----------------- โหลดสินค้าที่มี -----------------
async function loadExistingItems() {
  existingItemsContainer.innerHTML = "";
  try {
    const items = await getItem();
    items.forEach((i) => {
      const div = document.createElement("div");

      div.innerHTML = `
      <div>
        <input type="text" value="${i.name}" class="nameInput" />
        <input type="number" value="${i.price}" class="priceInput" />
      </div>
      <div>
        <input type="text" value="${i.category}" class="categoryInput" />
        <input type="text" value="${i.image}" class="imageInput" />
      </div>
      <div>
        <button class="editItemBtn" data-id="${i.id}">แก้ไข</button>
        <button class="deleteItemBtn" data-id="${i.id}">ลบ</button>
      </div>
      `;

      existingItemsContainer.appendChild(div);
    });

    // เพิ่ม event ลบ
    document.querySelectorAll(".deleteItemBtn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const res = await removeItem(id, savedPassword);
        if (res && res.status === "ok") {
          loadExistingItems();
        } else {
          alert(res?.error || "ไม่สามารถลบได้");
        }
      });
    });

    // เพิ่ม event แก้ไข
    document.querySelectorAll(".editItemBtn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const parentDiv = e.target.parentElement;
        const name = parentDiv.querySelector(".nameInput").value;
        const price = parentDiv.querySelector(".priceInput").value;
        const category = parentDiv.querySelector(".categoryInput").value;

        const res = await updateItem(
          id,
          { name, price, category },
          savedPassword
        );
        console.log(res);
        if (res) {
          alert("อัปเดตเรียบร้อยแล้ว");
          loadExistingItems();
        } else {
          alert(res?.error || "ไม่สามารถแก้ไขได้");
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

// ----------------- เพิ่มสินค้า -----------------
addItemBtn.addEventListener("click", async () => {
  const name = newItemName.value.trim();
  const price = parseFloat(newItemPrice.value);
  const category = newItemCategory.value.trim();
  const image = newItemImage.value.trim();

  if (!name || !price) {
    alert("กรอกชื่อและราคาให้ครบ");
    return;
  }

  try {
    const newItemData = { name, price, category, image };
    const res = await addItem(newItemData, savedPassword);
    if (res?._id) {
      newItemName.value = "";
      newItemPrice.value = "";
      newItemCategory.value = "";
      newItemImage.value = "";
      loadExistingItems();
    } else {
      alert(res?.error || "ไม่สามารถเพิ่มสินค้าได้");
    }
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาด");
  }
});

// ----------------- โหลดรายการคำสั่งซื้อ -----------------
loadPurchasesBtn.addEventListener("click", async () => {
  purchasesContainer.innerHTML = "กำลังโหลด...";
  const purchases = await getPurchases(savedPassword);

  if (!purchases.length) {
    purchasesContainer.innerHTML = "<i>ไม่มีคำสั่งซื้อ</i>";
    return;
  }

  // สร้างตาราง
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  const header = document.createElement("tr");
  header.innerHTML = `
    <th style="border:1px solid #ccc;padding:4px">วันที่</th>
    <th style="border:1px solid #ccc;padding:4px">รายการสินค้า</th>
    <th style="border:1px solid #ccc;padding:4px">รวมราคา</th>
  `;
  table.appendChild(header);

  purchases.forEach((p) => {
    const row = document.createElement("tr");
    const total = p.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const itemsText = p.items.map((i) => `${i.name} x${i.quantity}`).join(", ");

    row.innerHTML = `
      <td style="border:1px solid #ccc;padding:4px">${new Date(
        p.createdAt
      ).toLocaleString()}</td>
      <td style="border:1px solid #ccc;padding:4px">${itemsText}</td>
      <td style="border:1px solid #ccc;padding:4px">${total} บาท</td>
    `;
    table.appendChild(row);
  });

  purchasesContainer.innerHTML = "";
  purchasesContainer.appendChild(table);
});
