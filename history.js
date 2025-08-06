function renderHistory() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  const container = document.getElementById("history-list");
  container.innerHTML = "";

  if (history.length === 0) {
    container.innerHTML = "<p>Žádné prodeje nejsou uloženy.</p>";
    return;
  }

  history.reverse().forEach((sale) => {
    const date = new Date(sale.timestamp).toLocaleString("cs-CZ");
    const items = sale.items.map(i => `${i.name} ×${i.qty}`).join(", ");
    const div = document.createElement("div");
    div.style.marginBottom = "10px";
    div.innerHTML = `
      <strong>${date}</strong><br/>
      ${items}<br/>
      Celkem: <strong>${sale.total} Kč</strong>
      <hr/>
    `;
    container.appendChild(div);
  });
}

function clearHistory() {
  if (confirm("Opravdu chceš smazat celou historii prodejů?")) {
    localStorage.removeItem("history");
    renderHistory();
  }
}

// 🟢 Načtení historie při otevření stránky
renderHistory();

// 🟢 Zpřístupnění funkce pro HTML
window.clearHistory = clearHistory;
