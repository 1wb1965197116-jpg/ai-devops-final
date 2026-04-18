async function runAI() {
  await fetch("/ai/run", { method: "POST" });
  loadAll();
}

async function loadAll() {

  const t = await fetch("/ai/tasks").then(r => r.json());
  const l = await fetch("/ai/logs").then(r => r.json());

  document.getElementById("tasks").innerText =
    JSON.stringify(t, null, 2);

  document.getElementById("logs").innerText =
    JSON.stringify(l, null, 2);
}

loadAll();
