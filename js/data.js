// ===============================
// POS PRO - LOCAL DATA ENGINE
// ===============================

// تحميل البيانات
function load(key, def) {
  return JSON.parse(localStorage.getItem(key)) || def;
}

// حفظ البيانات
function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ===============================
// DATA
// ===============================
let sales     = load("sales", []);
let purchases = load("purchases", []);
let expenses  = load("expenses", []);
let inventory = load("inventory", []);
let agents    = load("agents", []);

// ===============================
// SALES
// ===============================
function addSale(item) {
  sales.push(item);
  save("sales", sales);
}

// ===============================
// PURCHASES
// ===============================
function addPurchase(item) {
  purchases.push(item);
  save("purchases", purchases);
}

// ===============================
// EXPENSES
// ===============================
function addExpense(item) {
  expenses.push(item);
  save("expenses", expenses);
}

// ===============================
// INVENTORY
// ===============================
function addInventory(item) {
  inventory.push(item);
  save("inventory", inventory);
}

function updateInventory(name, qty) {
  let i = inventory.find(x => x.name === name);
  if (i) i.qty += qty;
  save("inventory", inventory);
}

// ===============================
// AGENTS
// ===============================
function addAgent(agent) {
  agents.push(agent);
  save("agents", agents);
}

// ===============================
// TOTALS & REPORTS
// ===============================
function totalSales() {
  return sales.reduce((t, x) => t + x.total, 0);
}

function totalPurchases() {
  return purchases.reduce((t, x) => t + x.total, 0);
}

function totalExpenses() {
  return expenses.reduce((t, x) => t + x.amount, 0);
}

function netProfit() {
  return totalSales() - totalPurchases() - totalExpenses();
}
