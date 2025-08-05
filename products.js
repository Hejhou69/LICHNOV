
let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProductSettings() {
  const container = document.getElementById("product-settings");
  container.innerHTML = "";
  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.innerHTML = \`
      <input value="\${p.name}" onchange="editProduct(\${i}, 'name', this.value)" />
      <input type="number" value="\${p.price}" onchange="editProduct(\${i}, 'price', this.value)" />
      <button onclick="deleteProduct(\${i})">Smazat</button>
    \`;
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
  const name = document.getElementById("new-name").value;
  const price = Number(document.getElementById("new-price").value);
  if (!name || !price) return;
  products.push({ id: Date.now(), name, price });
  localStorage.setItem("products", JSON.stringify(products));
  document.getElementById("new-name").value = "";
  document.getElementById("new-price").value = "";
  renderProductSettings();
}

renderProductSettings();
