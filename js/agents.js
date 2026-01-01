<script>
/* ========= AGENTS ========= */

function addAgent(name) {
  DB.agents.push({ name });
  saveDB();
}

function agentSales(name) {
  return DB.sales.filter(s => s.agent === name)
                 .reduce((t, s) => t + s.total, 0);
}
</script>
