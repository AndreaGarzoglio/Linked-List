import { LinkedList } from "./index.js";

const list = new LinkedList();

const listState = document.getElementById("list-state");
const queryResult = document.getElementById("query-result");
const errorMsg = document.getElementById("error-msg");

function updateState() {
  const s = list.toString();
  listState.textContent = s === "" ? "null" : s;
}

function showQuery(label, value) {
  queryResult.textContent = `${label}: ${value}`;
  queryResult.classList.remove("hidden");
  errorMsg.classList.add("hidden");
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hidden");
  queryResult.classList.add("hidden");
  setTimeout(() => errorMsg.classList.add("hidden"), 3000);
}

function clearFeedback() {
  queryResult.classList.add("hidden");
  errorMsg.classList.add("hidden");
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
  if (!v) return showError("Enter a value.");
  list.append(v);
  clear("append-val");
  updateState();
  clearFeedback();
});

document.getElementById("btn-prepend").addEventListener("click", () => {
  const v = val("prepend-val");
  if (!v) return showError("Enter a value.");
  list.prepend(v);
  clear("prepend-val");
  updateState();
  clearFeedback();
});

document.getElementById("btn-insert").addEventListener("click", () => {
  const v = val("insert-val");
  const i = num("insert-index");
  if (!v || isNaN(i)) return showError("Enter an index and a value.");
  try {
    list.insertAt(i, v);
    clear("insert-val");
    clear("insert-index");
    updateState();
    clearFeedback();
  } catch (e) {
    showError(e.message);
  }
});

document.getElementById("btn-remove").addEventListener("click", () => {
  const i = num("remove-index");
  if (isNaN(i)) return showError("Enter an index.");
  try {
    list.removeAt(i);
    clear("remove-index");
    updateState();
    clearFeedback();
  } catch (e) {
    showError(e.message);
  }
});

document.getElementById("btn-pop").addEventListener("click", () => {
  if (list.size() === 0) return showError("List is empty.");
  list.pop();
  updateState();
  clearFeedback();
});

document.getElementById("btn-size").addEventListener("click", () => {
  showQuery("size()", list.size());
});

document.getElementById("btn-tail").addEventListener("click", () => {
  showQuery("tail()", list.tail() ?? "List is empty");
});

document.getElementById("btn-at").addEventListener("click", () => {
  const i = num("at-index");
  if (isNaN(i)) return showError("Enter an index.");
  const result = list.at(i);
  showQuery(`at(${i})`, result !== undefined ? result : "Index out of bounds");
});

document.getElementById("btn-contains").addEventListener("click", () => {
  const v = val("contains-val");
  if (!v) return showError("Enter a value.");
  showQuery(`contains("${v}")`, list.contains(v));
});

document.getElementById("btn-find").addEventListener("click", () => {
  const v = val("find-val");
  if (!v) return showError("Enter a value.");
  showQuery(`findIndex("${v}")`, list.findIndex(v));
});

updateState();
