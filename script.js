// ========= SETTINGS =========
const PASSWORD = "changeme"; // 🔴 CHANGE THIS

// ========= LOGIN =========
function login() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    localStorage.setItem("loggedIn", "true");
    location.href = "home.html";
  } else {
    document.getElementById("error").innerText = "Wrong password";
  }
}

// ========= AUTH CHECK =========
if (location.pathname.includes("home") || location.pathname.includes("editor")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    location.href = "index.html";
  }
}

// ========= HOME =========
function newDoc() {
  const docs = JSON.parse(localStorage.getItem("docs") || "{}");
  const id = Date.now().toString();

  docs[id] = { title: "", content: "" };
  localStorage.setItem("docs", JSON.stringify(docs));

  location.href = `editor.html?id=${id}`;
}

function loadDocs() {
  const grid = document.getElementById("docGrid");
  if (!grid) return;

  grid.innerHTML = "";
  const docs = JSON.parse(localStorage.getItem("docs") || "{}");

  Object.keys(docs).forEach(id => {
    const card = document.createElement("div");
    card.className = "doc-card";
    card.innerText = docs[id].title || "Untitled";
    card.onclick = () => location.href = `editor.html?id=${id}`;
    grid.appendChild(card);
  });
}

loadDocs();

// ========= EDITOR =========
function goHome() {
  location.href = "home.html";
}

const params = new URLSearchParams(location.search);
const docId = params.get("id");

if (docId) {
  const docs = JSON.parse(localStorage.getItem("docs") || "{}");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  if (titleInput && contentInput) {
    titleInput.value = docs[docId]?.title || "";
    contentInput.value = docs[docId]?.content || "";

    function autoGrow(el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }

    function save() {
      docs[docId] = {
        title: titleInput.value,
        content: contentInput.value
      };
      localStorage.setItem("docs", JSON.stringify(docs));
      autoGrow(contentInput);
    }

    titleInput.addEventListener("input", save);
    contentInput.addEventListener("input", save);

    autoGrow(contentInput);
  }
}
