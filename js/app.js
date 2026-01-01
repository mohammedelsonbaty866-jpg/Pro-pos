// =======================
// NAVIGATION
// =======================
function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');

  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// =======================
// DATA
// =======================
let sales = [];
let purchases = [];
let inventory = {};
let agents = [];

// =======================
// SALES
// =======================
function addSale() {
  let name = saleName.value;
  let qty = +saleQty.value;
  let price = +salePrice.value;
  let total = qty * price;

  sales.push(total);

  inventory[name] = (inventory[name] || 0) - qty;

  salesList.innerHTML += `<div>${name} × ${qty} = ${total}</div>`;
  updateReports();
  renderInventory();
}

// =======================
// PURCHASES
// =======================
function addPurchase() {
  let name = buyName.value;
  let qty = +buyQty.value;
  let price = +buyPrice.value;

  purchases.push(qty * price);
  inventory[name] = (inventory[name] || 0) + qty;

  updateReports();
  renderInventory();
}

// =======================
// INVENTORY
// =======================
function renderInventory() {
  inventoryList.innerHTML = '';
  for (let i in inventory) {
    inventoryList.innerHTML += `<div>${i} : ${inventory[i]}</div>`;
  }
}

// =======================
// AGENTS
// =======================
function addAgent() {
  agents.push(agentName.value);
  agentList.innerHTML += `<div>${agentName.value}</div>`;
  agentName.value = '';
}

// =======================
// REPORTS
// =======================
function updateReports() {
  let s = sales.reduce((a,b)=>a+b,0);
  let b = purchases.reduce((a,b)=>a+b,0);

  rSales.innerText = s;
  rBuys.innerText = b;
  rNet.innerText = s - b;
}

// =======================
// BARCODE (كاميرا الموبايل)
// =======================
function startBarcode(targetInput) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => {
      alert("📷 الكاميرا اشتغلت – ربط قارئ باركود لاحقاً");
    })
    .catch(() => alert("❌ الكاميرا غير متاحة"));
}
