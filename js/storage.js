/* =========================
   Local Storage Database
========================= */

const DB = {
  get(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  },

  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  push(key, item) {
    const data = this.get(key);
    data.push(item);
    this.set(key, data);
  },

  clear(key) {
    localStorage.removeItem(key);
  }
};

/* Collections */
const SALES_KEY = "pos_sales";
const PURCHASES_KEY = "pos_purchases";
const EXPENSES_KEY = "pos_expenses";
const AGENTS_KEY = "pos_agents";
