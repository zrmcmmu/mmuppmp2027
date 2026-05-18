/* =========================
   GOOGLE SHEETS SETUP
========================= */
const scriptURL = "YOUR_WEBAPP_URL";

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
    activeUnit: null,
    user: null
};

/* =========================
   LOAD + SAVE
========================= */
function saveData() {
    localStorage.setItem("ppmpData", JSON.stringify(state.items));
}

function loadData() {
    const saved = localStorage.getItem("ppmpData");
    if (saved) state.items = JSON.parse(saved);
}

/* =========================
   INIT
========================= */
function init() {
    console.log("APP STARTED");

    loadData();

    const loginForm = document.getElementById("login-form");
    const entryForm = document.getElementById("ppmp-form");

    if (!loginForm || !entryForm) {
        document.body.innerHTML = "❌ Missing HTML elements (login-form or ppmp-form)";
        return;
    }

    setupLogin(loginForm);
    setupEntry(entryForm);

    refreshTable();
}

document.addEventListener("DOMContentLoaded", init);

/* =========================
   LOGIN
========================= */
function setupLogin(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        if (!email || !password) return alert("Enter login details");

        state.user = email;
        state.activeUnit = "DEFAULT";

        document.getElementById("main-nav").style.display = "flex";
        document.getElementById("login-section").style.display = "none";
        document.getElementById("app-section").style.display = "block";
    });
}

/* =========================
   ENTRY FORM
========================= */
function setupEntry(form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const price = parseFloat(document.getElementById("item-price").value || 0);
        const qty = parseInt(document.getElementById("item-qty").value || 0);

        const item = {
            id: Date.now().toString(),
            unit: state.activeUnit,
            description: document.getElementById("item-desc").value,
            category: document.getElementById("item-category").value,
            unitMeasure: document.getElementById("item-unit").value,
            price,
            quantity: qty,
            total: price * qty
        };

        if (!item.description) return alert("Missing description");

        state.items.push(item);
        saveData();

        await sendToGoogleSheet(item);

        form.reset();
        refreshTable();
    });
}

/* =========================
   TABLE
========================= */
function refreshTable() {
    const tbody = document.getElementById("unit-items-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    const items = state.items.filter(i => i.unit === state.activeUnit);

    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3">No data yet</td></tr>`;
        return;
    }

    items.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>${item.total.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}
