<script>
/* ========= SALES ========= */

function addSale(agent, item, qty, price) {
  const total = qty * price;

  DB.sales.push({
    id: Date.now(),
    agent,
    item,
    qty,
    price,
    total,
    date: new Date().toLocaleString("ar-EG")
  });

  saveDB();
  renderSales();
}

function renderSales() {
  const box = document.getElementById("salesList");
  if (!box) return;

  box.innerHTML = "";
  DB.sales.forEach(s => {
    box.innerHTML += `
      <div>
        🧾 ${s.item} | ${s.qty} × ${s.price} = <b>${s.total}</b>
        <br>👤 ${s.agent} – ${s.date}
      </div>
      <hr>
    `;
  });
}

function printInvoice() {
  let html = "<h2>فاتورة بيع</h2><hr>";
  DB.sales.slice(-5).forEach(s => {
    html += `<p>${s.item} = ${s.total}</p>`;
  });

  const w = window.open("");
  w.document.write(html);
  w.print();
}
</script>
