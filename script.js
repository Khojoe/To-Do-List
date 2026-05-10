// ── Constants ────────────────────────────────
const STORAGE_KEY = "todo_tasks";

// ── State ─────────────────────────────────────
let tasks = [];
let filter = "all"; // "all" | "active" | "done"
let editingId = null; // id of task currently being edited

// ── DOM References ────────────────────────────
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const countLabel = document.getElementById("count-label");
const clearDone = document.getElementById("clear-done");
const dateLabel = document.getElementById("date-label");
const filterBtns = document.querySelectorAll(".filter-btn");

// ── Utility: generate unique ID ───────────────
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ── LocalStorage ──────────────────────────────
function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    tasks = [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn("LocalStorage unavailable:", e);
  }
}

// ── Date Label ────────────────────────────────
function setDateLabel() {
  dateLabel.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// ── Filter Helper ─────────────────────────────
function getFilteredTasks() {
  if (filter === "active") return tasks.filter((t) => !t.done);
  if (filter === "done") return tasks.filter((t) => t.done);
  return tasks;
}

// ── Render ────────────────────────────────────
function render() {
  taskList.innerHTML = "";
  const shown = getFilteredTasks();

  if (shown.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent =
      filter === "done"
        ? "No completed tasks."
        : filter === "active"
          ? "All caught up!"
          : "No tasks yet — add one above.";
    taskList.appendChild(li);
  } else {
    shown.forEach((task) => {
      taskList.appendChild(createTaskEl(task));
    });
  }

  updateCountLabel();
}

// ── Build a task <li> element ─────────────────
function createTaskEl(task) {
  const li = document.createElement("li");
  li.className = "task-item" + (task.done ? " done" : "");

  // Checkbox
  const check = document.createElement("div");
  check.className = "task-check" + (task.done ? " checked" : "");
  check.setAttribute("role", "checkbox");
  check.setAttribute("aria-checked", task.done);
  check.setAttribute("tabindex", "0");
  check.title = task.done ? "Mark incomplete" : "Mark complete";
  check.addEventListener("click", () => toggleTask(task.id));
  check.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggleTask(task.id);
    }
  });

  // Text / edit input
  let textEl;
  if (editingId === task.id) {
    textEl = document.createElement("input");
    textEl.type = "text";
    textEl.className = "task-edit-input";
    textEl.value = task.text;
    textEl.setAttribute("aria-label", "Edit task");
    textEl.addEventListener("blur", () => commitEdit(task.id, textEl.value));
    textEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        textEl.blur();
      }
      if (e.key === "Escape") {
        editingId = null;
        render();
      }
    });
    // Focus after DOM insertion
    setTimeout(() => {
      textEl.focus();
      textEl.select();
    }, 10);
  } else {
    textEl = document.createElement("span");
    textEl.className = "task-text";
    textEl.textContent = task.text;
  }

  // Actions (edit + delete)
  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = buildIconBtn("✎", "icon-btn", "Edit task", () => {
    editingId = task.id;
    render();
  });

  const delBtn = buildIconBtn("✕", "icon-btn danger", "Delete task", () => {
    deleteTask(task.id);
  });

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(check);
  li.appendChild(textEl);
  li.appendChild(actions);

  return li;
}

// ── Helper: create icon button ────────────────
function buildIconBtn(symbol, className, ariaLabel, onClick) {
  const btn = document.createElement("button");
  btn.className = className;
  btn.setAttribute("aria-label", ariaLabel);
  btn.textContent = symbol;
  btn.addEventListener("click", onClick);
  return btn;
}

// ── Update footer count ───────────────────────
function updateCountLabel() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const active = total - done;

  if (total === 0) {
    countLabel.textContent = "0 tasks";
  } else {
    countLabel.textContent = `${active} remaining · ${done} done`;
  }
}

// ── CRUD Operations ───────────────────────────

// Add
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.unshift({
    id: uid(),
    text,
    done: false,
    created: Date.now(),
  });

  saveTasks();
  taskInput.value = "";
  editingId = null;
  render();
}

// Toggle complete
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    render();
  }
}

// Commit inline edit
function commitEdit(id, newValue) {
  const text = newValue.trim();
  const task = tasks.find((t) => t.id === id);
  if (task && text) {
    task.text = text;
  }
  editingId = null;
  saveTasks();
  render();
}

// Delete
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  if (editingId === id) editingId = null;
  saveTasks();
  render();
}

// Clear all completed
function clearCompleted() {
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  render();
}

// ── Event Listeners ───────────────────────────
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

clearDone.addEventListener("click", clearCompleted);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

// ── Init ──────────────────────────────────────
setDateLabel();
loadTasks();
render();
