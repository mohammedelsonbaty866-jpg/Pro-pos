// ===============================
// POS PRO - APP LOGIC
// ===============================

// ===============================
// NAVIGATION
// ===============================
function showSection(id, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

// ===============================
// SALES
// ===============================
function addSaleUI() {
  const name  = document.getElementById("saleName").value;
  const qty   = +document.getElementById("saleQty").value;
  const price = +document.getElementById("salePrice").value;

  if (!name || qty <= 0 || price <= 0) {
    alert("بيانات البيع غير مكتملة");
    return;
  }

  const total = qty * price;

  addSale({
    name,
    qty,
    price,
    total,
    date: new Date().toLocaleString()
  });

  updateInventory(name, -qty);

  document.getElementById("salesList").innerHTML += `
    <div>${name} | ${qty} × ${price} = <b>${total}</b></div>
  `;

  updateReports();
}

// ===============================
// PURCHASES
// ===============================
function addPurchaseUI() {
  const name  = document.getElementById("buyName").value;
  const qty   = +document.getElementById("buyQty").value;
  const price = +document.getElementById("buyPrice").value;

  if (!name || qty <= 0 || price <= 0) {
    alert("بيانات الشراء غير مكتملة");
    return;
  }

  const total = qty * price;

  addPurchase({
    name,
    qty,
    price,
    total,
    date: new Date().toLocaleString()
  });

  updateInventory(name, qty);

  document.getElementById("purchaseList").innerHTML += `
    <div>${name} | ${qty} × ${price} = <b>${total}</b></div>
  `;

  updateReports();
}

// ===============================
// EXPENSES
// ===============================
function addExpenseUI() {
  const desc   = document.getElementById("expDesc").value;
  const amount = +document.getElementById("expAmount").value;

  if (!desc || amount <= 0) {
    alert("بيانات المصروف غير صحيحة");
    return;
  }

  addExpense({
    desc,
    amount,
    date: new Date().toLocaleString()
  });

  document.getElementById("expenseList").innerHTML += `
    <div>${desc} = <b>${amount}</b></div>
  `;

  updateReports();
}

// ===============================
// AGENTS
// ===============================
function addAgentUI() {
  const name = document.getElementById("agentName").value;
  if (!name) {
    alert("اكتب اسم المندوب");
    return;
  }

  addAgent({
    name,
    sales: []
  });

  document.getElementById("agentsList").innerHTML += `
    <div>👤 ${name}</div>
  `;

  document.getElementById("agentName").value = "";
}

// ===============================
// REPORTS
// ===============================
function updateReports() {
  document.getElementById("tSales").innerText = totalSales();
  document.getElementById("tBuys").innerText  = totalPurchases();
  document.getElementById("tExp").innerText   = totalExpenses();
  document.getElementById("tNet").innerText   = netProfit();
}

// ===============================
// PRINT
// ===============================
function printInvoice() {
  window.print();
}

// ===============================
// INIT
// ===============================
window.onload = () => {
  updateReports();
};
<script>
/* ========= APP INIT ========= */
document.addEventListener("DOMContentLoaded", () => {
  renderSales();
});
</script>
