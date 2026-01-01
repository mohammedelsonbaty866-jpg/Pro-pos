<script>
/* ========= REPORTS ========= */

function netProfit() {
  const sales = DB.sales.reduce((t, s) => t + s.total, 0);
  const buys = totalPurchases();
  const exp = DB.expenses.reduce((t, e) => t + e.amount, 0);

  return sales - buys - exp;
}

function showReport() {
  alert(
    "إجمالي المبيعات: " + DB.sales.length +
    "\nصافي الربح: " + netProfit()
  );
}
</script>
