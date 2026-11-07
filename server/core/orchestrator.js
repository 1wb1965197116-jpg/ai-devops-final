// NO node-fetch needed

// ===== STEP PARSER =====
function splitSteps(command) {
  return command
    .split(/then|and/i)
    .map(s => s.trim())
    .filter(Boolean);
}

// ===== SIMPLE RULE PARSER =====
function classifyStep(step) {
  const s = step.toLowerCase();

  if (s.includes("deploy")) return { action: "deploy_render" };
  if (s.includes("push")) return { action: "push_github" };

  if (s.includes("update env")) {
    const match = step.match(/([A-Z0-9_]+)\s*=\s*(.+)/i);
    if (match) {
      return {
        action: "update_env",
        key: match[1],
        value: match[2]
      };
    }
    return { action: "update_env" };
  }

  return { action: "unknown", raw: step };
}

// ===== ACTIONS =====

async function deployRender() {
  return { error: "Remote deployment disabled pending authentication and review" };
}
async function pushGitHub() {
  return { status: "github_push_simulated" };
}
async function updateEnv() {
  return { error: "Remote environment updates disabled pending authentication and review" };
}

// ===== EXECUTOR =====

async function executeStep(stepObj) {

  if (stepObj.action === "deploy_render") {
    return await deployRender();
  }

  if (stepObj.action === "push_github") {
    return await pushGitHub();
  }

  if (stepObj.action === "update_env") {
    if (!stepObj.key || !stepObj.value) {
      return { error: "Missing key/value" };
    }
    return await updateEnv(stepObj.key, stepObj.value);
  }

  return { status: "unknown_step", step: stepObj };
}

// ===== MAIN WORKFLOW =====

async function runAICommand(command) {

  const steps = splitSteps(command);

  let results = [];

  for (let step of steps) {

    const parsed = classifyStep(step);

    let attempts = 0;
    let success = false;
    let result;

    while (attempts < 2 && !success) {
      try {
        result = await executeStep(parsed);

        if (!result.error) success = true;
        else attempts++;

      } catch (e) {
        attempts++;
        result = { error: e.message };
      }
    }

    results.push({
      step,
      result
    });
  }

  return {
    workflow: results
  };
}

module.exports = { runAICommand };
