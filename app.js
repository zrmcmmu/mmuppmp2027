const scriptURL = "YOUR_WEBAPP_URL";

/* =========================
   GOOGLE SHEETS
========================= */
async function sendToGoogleSheet(item) {
    if (!scriptURL || scriptURL === "YOUR_WEBAPP_URL") {
        console.warn("Google Sheet URL not set");
        return;
    }

    try {
        await fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(item)
        });

        console.log("Sent to Google Sheet");
    } catch (err) {
        console.error("Google Sheet error:", err);
    }
}

/* =========================
   STATE
========================= */
let state = {
    items: [],
    userList: [],
    activeUnit: null
};

/* =========================
   SAVE LOCAL
========================= */
function saveData() {
    localStorage.setItem('ppmpData', JSON.stringify(state.items));
}

/* =========================
   INIT
========================= */
function init() {
    console.log("APP LOADED");

    loadData();
    renderLoginView();
}

/* =========================
   LOAD DATA
========================= */
function loadData() {
    const saved = localStorage.getItem('ppmpData');
    if (saved) state.items = JSON.parse(saved);
}

/* =========================
   LOGIN (MINIMAL SAFE)
========================= */
function renderLoginView() {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) {
        document.body.innerHTML = "Missing login form";
        return;
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        if (email && password) {
            state.activeUnit = "DEFAULT";
            document.getElementById("main-nav").style.display = "flex";
            renderEntry();
        }
    });
}

/* =========================
   ENTRY FORM
========================= */
function renderEntry() {
    const form = document.getElementById("ppmp-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const item = {
            unit: state.activeUnit,
            description: document.getElementById("item-desc").value,
            category: document.getElementById("item-category").value,
            quantity: document.getElementById("item-qty").value
        };

        state.items.push(item);

        saveData();
        await sendToGoogleSheet(item);

        form.reset();
        refreshTable();
    });

    refreshTable();
}

/* =========================
   TABLE
========================= */
function refreshTable() {
    const tbody = document.getElementById("unit-items-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    state.items.forEach(i => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i.description}</td>
            <td>${i.quantity}</td>
        `;
        tbody.appendChild(tr);
    });
}

/* =========================
   START
========================= */
init();
