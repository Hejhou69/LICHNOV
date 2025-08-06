let products = JSON.parse(localStorage.getItem("products")) || [];
let sale = {};

function renderProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach((p) => {
    sale[p.id] = sale[p.id] || 0;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="product-info">${p.name} (${p.price} Kč)</div>
      <div class="product-buttons">
        <button onclick="updateQuantity(${p.id}, -1)">–</button>
        <span class="qty" id="qty-${p.id}">${sale[p.id]}</span>
        <button onclick="updateQuantity(${p.id}, 1)">+</button>
      </div>
    `;
    container.appendChild(div);
  });

  calculateTotal();
}

function updateQuantity(id, change) {
  sale[id] = (sale[id] || 0) + change;
  if (sale[id] < 0) sale[id] = 0;
  document.getElementById(`qty-${id}`).textContent = sale[id];
  calculateTotal();
}

function calculateTotal() {
  let total = 0;
  products.forEach((p) => {
    total += p.price * (sale[p.id] || 0);
  });

  document.getElementById("total").textContent = total;

  const paid = Number(document.getElementById("paid").value) || 0;
  const change = paid - total;
  document.getElementById("change").textContent = change >= 0 ? change : 0;
}

function saveSale() {
  const items = products
    .filter((p) => sale[p.id] > 0)
    .map((p) => ({
      id: p.id,
      name: p.name,
      qty: sale[p.id],
      price: p.price
    }));

  if (items.length === 0) {
    alert("Nevybrali jste žádné produkty.");
    return;
  }

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const history = JSON.parse(localStorage.getItem("history") || "[]");
  history.push({
    timestamp: Date.now(),
    items,
    total
  });

  localStorage.setItem("history", JSON.stringify(history));
  alert("Prodej uložen.");

  resetSale();
}

function resetSale() {
  sale = {};
  document.getElementById("paid").value = "";
  renderProducts();
}

// při psaní do políčka "zaplaceno" automaticky přepočítej
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("paid").addEventListener("input", calculateTotal);
  renderProducts();
});

// zpřístupnění funkcí pro HTML onclick
window.updateQuantity = updateQuantity;
window.saveSale = saveSale;
window.resetSale = resetSale;
