import { LinkedList } from "./index.js";
import { LINKEDLIST_SOURCE } from "./annotated-source.js";

const STORAGE_KEY = "linked-list-state";

const list = new LinkedList();

const listState = document.getElementById("list-state");
const log = document.getElementById("log");

function toArray() {
  const result = [];
  let current = list.head;
  while (current !== null) {
    result.push(current.value);
    current = current.nextNode;
  }
  return result;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toArray()));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    JSON.parse(raw).forEach((v) => list.append(v));
  } catch {
    // ignore corrupt storage
  }
}

const typingTimers = new WeakMap();

function typeWriter(el, text, { speed = 22, onTick } = {}) {
  clearInterval(typingTimers.get(el));

  const textSpan = document.createElement("span");
  const cursorSpan = document.createElement("span");
  cursorSpan.className = "cursor";
  el.replaceChildren(textSpan, cursorSpan);

  let i = 0;
  const timer = setInterval(() => {
    textSpan.textContent += text[i];
    i += 1;
    onTick?.();
    if (i >= text.length) clearInterval(timer);
  }, speed);
  typingTimers.set(el, timer);
}

const MAX_LOG_LINES = 20;

// Newest command goes on the left; the row scrolls horizontally and older
// entries drop off the right once MAX_LOG_LINES is exceeded.
function logLine(text, type = "ok") {
  const line = document.createElement("div");
  line.className = type === "error" ? "log-line error" : "log-line";
  log.prepend(line);

  while (log.children.length > MAX_LOG_LINES) {
    log.removeChild(log.lastElementChild);
  }

  typeWriter(line, text, { onTick: () => (log.scrollLeft = 0) });
  log.scrollLeft = 0;
}

function updateState() {
  const s = list.toString();
  typeWriter(listState, s === "" ? "null" : s);
}

function persist() {
  updateState();
  saveState();
}

function showQuery(label, value) {
  logLine(`${label}: ${value}`);
}

function showError(msg, invalidIds = []) {
  logLine(msg, "error");
  invalidIds.forEach((id) =>
    document.getElementById(id).classList.add("invalid"),
  );
}

function val(id) {
  return document.getElementById(id).value.trim();
}
function num(id) {
  return parseInt(document.getElementById(id).value, 10);
}
function clear(id) {
  document.getElementById(id).value = "";
}

document.getElementById("btn-append").addEventListener("click", () => {
  const v = val("append-val");
  if (!v) return showError("append: enter a value.", ["append-val"]);
  list.append(v);
  clear("append-val");
  persist();
  logLine(`append("${v}")`);
});

document.getElementById("btn-prepend").addEventListener("click", () => {
  const v = val("prepend-val");
  if (!v) return showError("prepend: enter a value.", ["prepend-val"]);
  list.prepend(v);
  clear("prepend-val");
  persist();
  logLine(`prepend("${v}")`);
});

document.getElementById("btn-insert").addEventListener("click", () => {
  const v = val("insert-val");
  const i = num("insert-index");
  const invalid = [];
  if (isNaN(i)) invalid.push("insert-index");
  if (!v) invalid.push("insert-val");
  if (invalid.length)
    return showError("insertAt: enter an index and a value.", invalid);
  try {
    list.insertAt(i, v);
    clear("insert-val");
    clear("insert-index");
    persist();
    logLine(`insertAt(${i}, "${v}")`);
  } catch (e) {
    showError(e.message, invalid);
  }
});

document.getElementById("btn-remove").addEventListener("click", () => {
  const i = num("remove-index");
  if (isNaN(i)) return showError("removeAt: enter an index.", ["remove-index"]);
  try {
    list.removeAt(i);
    clear("remove-index");
    persist();
    logLine(`removeAt(${i})`);
  } catch (e) {
    showError(e.message, ["remove-index"]);
  }
});

document.getElementById("btn-pop").addEventListener("click", () => {
  if (list.size() === 0) return showError("pop: list is empty.");
  const popped = list.pop();
  persist();
  logLine(`pop() → "${popped}"`);
});

document.getElementById("btn-size").addEventListener("click", () => {
  showQuery("size()", list.size());
});

document.getElementById("btn-tail").addEventListener("click", () => {
  showQuery("tail()", list.tail() ?? "list is empty");
});

document.getElementById("btn-at").addEventListener("click", () => {
  const i = num("at-index");
  if (isNaN(i)) return showError("at: enter an index.", ["at-index"]);
  const result = list.at(i);
  showQuery(`at(${i})`, result !== undefined ? result : "index out of bounds");
});

document.getElementById("btn-contains").addEventListener("click", () => {
  const v = val("contains-val");
  if (!v) return showError("contains: enter a value.", ["contains-val"]);
  showQuery(`contains("${v}")`, list.contains(v));
});

document.getElementById("btn-find").addEventListener("click", () => {
  const v = val("find-val");
  if (!v) return showError("findIndex: enter a value.", ["find-val"]);
  showQuery(`findIndex("${v}")`, list.findIndex(v));
});

// ── "How it works" modal ──
const howModal = document.getElementById("how-modal");
const howModalCode = document.getElementById("how-modal-code");

function renderCode(code) {
  howModalCode.replaceChildren();
  code.split("\n").forEach((line) => {
    const lineEl = document.createElement("div");
    lineEl.className = line.trim().startsWith("//")
      ? "code-line comment"
      : "code-line";
    lineEl.textContent = line.length ? line : " ";
    howModalCode.appendChild(lineEl);
  });
}

document.getElementById("btn-how").addEventListener("click", () => {
  renderCode(LINKEDLIST_SOURCE);
  howModal.showModal();
});
document
  .getElementById("how-modal-close")
  .addEventListener("click", () => howModal.close());
howModal.addEventListener("click", (e) => {
  if (e.target === howModal) howModal.close();
});

// Quality of life: Enter runs the row's command, typing clears its error state.
document.querySelectorAll(".cmd-row input").forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    input.closest(".cmd-row").querySelector("button.run").click();
  });
  input.addEventListener("input", () => input.classList.remove("invalid"));
});

loadState();
updateState();
document.getElementById("append-val").focus();
