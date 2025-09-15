const API_BASE = "http://localhost:3222/api";

// ---------- ITEMS ----------
export async function getItem() {
  try {
    const response = await fetch(`${API_BASE}/items`);
    if (!response.ok) throw new Error("Failed to fetch items");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function addItem(item, password) {
  try {
    const response = await fetch(`${API_BASE}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-password": password
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to add item");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateItem(id, item, password) {
  try {
    const response = await fetch(`${API_BASE}/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-password": password
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) throw new Error("Failed to update item");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}


export async function removeItem(id, password) {
  try {
    const response = await fetch(`${API_BASE}/items/${id}`, {
      method: "DELETE",
      headers: {
        "x-password": password
      }
    });
    if (!response.ok) throw new Error("Failed to delete item");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// ---------- PURCHASES ----------
export async function addPurchase(cartItems) {
  try {
    const response = await fetch(`${API_BASE}/purchases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItems }),
    });
    if (!response.ok) throw new Error("Failed to add purchase");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getPurchases(password) {
  try {
    const response = await fetch(`${API_BASE}/purchases`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-password": password
      },
    });

    if (!response.ok) throw new Error("Failed to fetch purchases");

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}


// ---------- LLM ----------
// api.js
export async function llm(prompt) {
  try {
    const response = await fetch(`${API_BASE}/llm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) throw new Error("Failed to call LLM API");

    const data = await response.json();
    return data;

  } catch (err) {
    console.error(err);
    return { ingredients: [], comment: "เกิดข้อผิดพลาดในการเรียก AI" };
  }
}


// ---------- PASSWORD ----------
export async function checkPassword(password) {
  try {
    const response = await fetch(`${API_BASE}/check-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (!response.ok) throw new Error("Failed to check password");
    return await response.json(); // { valid: true/false }
  } catch (err) {
    console.error(err);
    return { valid: false };
  }
}
