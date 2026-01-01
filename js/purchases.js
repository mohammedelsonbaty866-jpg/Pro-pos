<script>
/* ========= PURCHASES ========= */

function addPurchase(item, qty, cost) {
  DB.purchases.push({
    id: Date.now(),
    item,
    qty,
    cost,
    total: qty * cost,
    date: new Date().toLocaleString("ar-EG")
  });

  saveDB();
}

function totalPurchases() {
  return DB.purchases.reduce((t, p) => t + p.total, 0);
}
</script>
