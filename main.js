const defaultProducts = [
  { id: 1, name: "Pivo Alko", price: 40 },
  { id: 2, name: "Pivo Nealko", price: 40 },
  { id: 3, name: "Kofola", price: 40 },
  { id: 4, name: "Malinovka", price: 40 },
  { id: 5, name: "Křupky", price: 35 },
];

let products = JSON.parse(localStorage.getItem("products"));
if (!products || products.length === 0) {
  products = defaultProducts;
  localStorage.setItem("products", JSON.stringify(products));
}

let quantities = {};

function renderProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div><strong>${p.name}</strong> (${p.price} Kč)</div>
      <div class="product-buttons">
        <button onclick="updateQuantity(${p.id}, -1)">–</button>
        <span class="qty" id="qty-${p.id}">0</span>
        <button onclick="updateQuantity(${p.id}, 1)">+</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function updateQuantity(id, delta) {
  quantities[id] = (quantities[id] || 0) + delta;
  if (quantities[id] < 0) quantities[id] = 0;
  document.getElementById("qty-" + id).innerText = quantities[id];
  updateTotals();
}

function updateTotals() {
  let total = 0;
  products.forEach((p) => {
    const qty = quantities[p.id] || 0;
    total += p.price * qty;
  });
  document.getElementById("total").innerText = total;

  const paid = Number(document.getElementById("paid").value) || 0;
  const change = paid - total;
  document.getElementById("change").innerText = change >= 0 ? change : 0;
}

function resetSale() {
  quantities = {};
  document.getElementById("paid").value = "";
  renderProducts();
  updateTotals();
}

function saveSale() {
  const sale = {
    timestamp: new Date().toISOString(),
    items: products.map((p) => ({
      name: p.name,
      qty: quantities[p.id] || 0,
      price: p.price,
    })).filter(i => i.qty > 0),
    total: Number(document.getElementById("total").innerText),
  };

  const history = JSON.parse(localStorage.getItem("history") || "[]");
  history.push(sale);
  localStorage.setItem("history", JSON.stringify(history));
  resetSale();
}

document.getElementById("paid").addEventListener("input", updateTotals);
renderProducts();

window.updateQuantity = updateQuantity;
window.saveSale = saveSale;
window.resetSale = resetSale;
