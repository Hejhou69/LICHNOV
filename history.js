
const history = JSON.parse(localStorage.getItem("history") || "[]");

const container = document.getElementById("history-list");
history.reverse().forEach((sale) => {
  const div = document.createElement("div");
  const date = new Date(sale.timestamp).toLocaleString("cs-CZ");
  const items = sale.items.map(i => \`\${i.name} x\${i.qty}\`).join(", ");
  div.innerHTML = \`
    <p><strong>\${date}</strong> – \${items} = <strong>\${sale.total} Kč</strong></p>
  \`;
  container.appendChild(div);
});
