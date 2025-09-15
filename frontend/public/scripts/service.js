function addOrUpdateCart(id, qty){
  const existing = cart.find(c=>c.id===id);
  if(existing){
    existing.quantity = qty;
    if(qty <= 0) cart = cart.filter(c=>c.id!==id);
  } else {
    if(qty > 0) cart.push({id, quantity: qty});
  }

  updateCartSummary();
  updateCartModal();
  updateGridQuantity(id, qty); // เพิ่มบรรทัดนี้
}

function mockAI(userInput, allItems){
  const prompt = {
    prompt: `
You are given a list of available ingredients (availableItems) with their IDs and names. 
Each item name may include the package size or quantity available (for example, "Betagro Minced Pork 500g").

A user has requested a recipe or menu (request).

Your task:
1. Analyze which available ingredients are needed to make the requested menu.
2. Calculate the quantity of each ingredient in "package units":
   - If the recipe requires less than or equal to the amount in one package, use 1.
   - If it requires more than one package, round up to the number of packages needed.
   - Always reference the available package size given in the ingredient name.
3. Return a JSON object with:
   - An array of ingredients with "id" and "quantity" (in package units)
   - A "comment" field in Thai for any missing items or suggestions.

Use only ingredients from availableItems for quantities, and keep comments concise in Thai.
    `,
    request: userInput,
    availableItems: allItems.map(i=>({id:i.id,name:i.name}))
  };

  var json_prompt_str = JSON.stringify(prompt,null,2);  // อันนี้เป็น prompt สำหรับส่งไป gemini 

  const userGeminiOutput = mockGeminiResult(); // คอมเม้นหรือลบอันนี้ถ้าเชื่อมได้แล้ว
  ////////// ตรงนี้ต้องมี api เชื่อม backend กับ gemini สิ่งที่ต้องการคือ เป็นผลลัพธ์จาก gemini prompt เอาจากข้างบนๆ //////////
  // ให้ทำฟังชั่นนำเข้า json_prompt_str ส่งไปหา gemini 
  try {
    const aiResponse = JSON.parse(userGeminiOutput);
    showAiSuggest(aiResponse);
  } catch(e) {
    alert("รูปแบบ JSON ไม่ถูกต้อง กรุณาใส่ตามตัวอย่าง JSON");
    console.error(e);
  }
}