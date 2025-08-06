let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProductSettings() {
  const container = document.getElementById("product-settings");
  container.innerHTML = "";

  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div style="margin-bottom: 10px;">
        <input value="${p.name}" onchange="editProduct(${i}, 'name', this.value)" />
        <input type="number" value="${p.price}" onchange="editProduct(${i}, 'price', this.value)" />
        <button onclick="deleteProduct(${i})">🗑️</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function editProduct(index, key, value) {
  if (key === "price") value = Number(value);
  products[index][key] = value;
  localStorage.setItem("products", JSON.stringify(products));
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProductSettings();
}

function addProduct() {
  const name = document.getElementById("new-name").value.trim();
  const price = Number(document.getElementById("new-price").value);

  if (!name || isNaN(price) || price <= 0) {
    alert("Zadej platný název a cenu.");
    return;
  }

  const newProduct = {
    id: Date.now(),
    name,
    price
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  // Vyčistit vstupy
  document.getElementById("new-name").value = "";
  document.getElementById("new-price").value = "";

  renderProductSettings();
}

// 🟢 Načti produkty po načtení stránky
renderProductSettings();

// 🟢 Zpřístupni funkce pro použití v HTML
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.addProduct = addProduct;
