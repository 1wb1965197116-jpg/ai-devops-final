const API = "";

// ---------------- RUN AI
async function runAI() {

  await fetch("/ai/run", { method: "POST" });

  loadAll();
}

// ---------------- DEPLOY
async function deploy() {

  await fetch("/ai/run", { method: "POST" });

  alert("🚀 Deploy triggered");

  loadAll();
}

// ---------------- LOAD TASKS
async function loadTasks() {

  const res = await fetch("/ai/tasks");
  const data = await res.json();

  document.getElementById("tasks").innerText =
    JSON.stringify(data, null, 2);
}

// ---------------- LOAD LOGS
async function loadLogs() {

  const res = await fetch("/ai/logs");
  const data = await res.json();

  document.getElementById("logs").innerText =
    JSON.stringify(data, null, 2);
}

// ---------------- LOAD PRs
async function loadPRs() {

  const res = await fetch("/ai/prs");
  const data = await res.json();

  document.getElementById("prs").innerText =
    JSON.stringify(data, null, 2);
}

// ---------------- LOAD DEPLOY STATUS
async function loadDeploy() {

  const res = await fetch("/ai/deploy-status");
  const data = await res.json();

  document.getElementById("deploy").innerText =
    JSON.stringify(data, null, 2);
}

// ---------------- LOAD ALL
async function loadAll() {

  await loadTasks();
  await loadLogs();
  await loadPRs();
  await loadDeploy();
}

// ---------------- AUTO REFRESH
setInterval(loadAll, 5000);

// initial load
loadAll();
