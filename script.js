// ===== SETTINGS =====
const PASSWORD = "test1!"; // 🔴 CHANGE THIS

// ===== LOGIN =====
function login() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    localStorage.setItem("loggedIn", "true");
    location.href = "home.html";
  } else {
    document.getElementById("error").innerText = "Wrong password";
  }
}

// ===== AUTH CHECK =====
if (location.pathname.includes("home") || location.pathname.includes("editor")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    location.href = "index.html";
  }
}

// ===== DOCUMENT LIST =====
function loadDocs() {
  const list = document.getElementById("docList");
  if (!list) return;

  list.innerHTML = "";
  const docs = JSON.parse(localStorage.getItem("docs") || "{}");

  Object.keys(docs).forEach(id => {
    const li = document.createElement("li");
    li.textContent = docs[id].title || "Untitled";
    li.onclick = () => location.href = `editor.html?id=${id}`;
    list.appendChild(li);
  });
}

function newDoc() {
  const docs = JSON.parse(localStorage.getItem("docs") || "{}");
  const id = Date.now().toString();

  docs[id] = { title: "", content: "" };
  localStorage.setItem("docs", JSON.stringify(docs));

  location.href = `editor.html?id=${id}`;
}

// ===== EDITOR =====
const params = new URLSearchParams(location.search);
const docId = params.get("id");

if (docId) {
  const docs = JSON.parse(localStorage.getItem("docs") || "{}");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  if (titleInput && contentInput) {
    titleInput.value = docs[docId]?.title || "";
    contentInput.value = docs[docId]?.content || "";

    function save() {
      docs[docId] = {
        title: titleInput.value,
        content: contentInput.value
      };
      localStorage.setItem("docs", JSON.stringify(docs));
    }

    titleInput.oninput = save;
    contentInput.oninput = save;
  }
}

loadDocs();
