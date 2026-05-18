window.sendToGoogleSheet = async function (item) {
    const scriptURL = "YOUR_WEBAPP_URL";

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
};


const scriptURL = "YOUR_WEBAPP_URL";

/* =========================
   GOOGLE SHEETS FUNCTION
========================= */
async function sendToGoogleSheet(item) {
    if (!scriptURL || scriptURL === "YOUR_WEBAPP_URL") {
        console.warn("Google Sheet URL not set");
        return;
    }

    try {
        await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(item)
        });

        console.log("Sent to Google Sheet");
    } catch (err) {
        console.error("Google Sheet error:", err);
    }
}

/* =========================
   LOCAL SAVE
========================= */
function saveData() {
    localStorage.setItem('ppmpData', JSON.stringify(state.items));
}

function saveCatalog() {
    localStorage.setItem('ppmpCatalog', JSON.stringify(state.catalogItems));
}

function saveUsers() {
    localStorage.setItem('ppmpUsers', JSON.stringify(state.userList));
}

/* =========================
   CONSTANTS
========================= */
const UNITS = [
    "Accounting", "AO Office", "Billing", "Billing & Claims", "Bucas", "Budget",
    "Cashier", "CMPS", "CSS", "DCO", "Dental", "Dietary", "DR", "EFM", "ER",
    "HEMB", "Hemo", "HEPO", "HIMMS", "HRM", "ICC", "ICT", "ICU", "ISO Ward",
    "LAB", "Laboratory", "Law Office", "Medical Records", "Med. Ward", "MMU",
    "MSS", "NICU", "NSO", "Nursing Office", "OB Ward", "OMCC", "OPD", "OR",
    "Pedia Ward", "Pharmacy", "Planning", "Procurement", "PRU", "Psych", "PT",
    "Radiology", "SAO", "Semi-Private Ward", "Zax"
];

const DEFAULT_USERS = [
    { email: "reportsmcs@mcsgh.com.ph", password: "omcc2026", unit: "OMCC" },
    { email: "procurement@mcsgh.com.ph", password: "pru2026", unit: "Procurement" },
    { email: "budget@mcsgh.com.ph", password: "budget2026", unit: "Budget" },
    { email: "aooffice@mcsgh.com.ph", password: "aooffice2026", unit: "AO Office" },
    { email: "accounting@mcsgh.com.ph", password: "accounting2026", unit: "Accounting" },
    { email: "hrm@mcsgh.com.ph", password: "hrm2026", unit: "HRM" },
    { email: "cashier@mcsgh.com.ph", password: "cashier2026", unit: "Cashier" },
    { email: "efm@mcsgh.com.ph", password: "efm2026", unit: "EFM" },
    { email: "nursingoffice@mcsgh.com.ph", password: "nursingoffice2026", unit: "Nursing Office" },
    { email: "hepo@mcsgh.com.ph", password: "hepo2026", unit: "HEPO" },
    { email: "pt@mcsgh.com.ph", password: "pt2026", unit: "PT" },
    { email: "radiology@mcsgh.com.ph", password: "radiology2026", unit: "Radiology" },
    { email: "billing@mcsgh.com.ph", password: "billing2026", unit: "Billing" },
    { email: "laboratory@mcsgh.com.ph", password: "laboratory2026", unit: "Laboratory" },
    { email: "pharmacy@mcsgh.com.ph", password: "pharmacy2026", unit: "Pharmacy" },
    { email: "opd@mcsgh.com.ph", password: "opd2026", unit: "OPD" },
    { email: "medicalrecords@mcsgh.com.ph", password: "medicalrecords2026", unit: "Medical Records" },
    { email: "css@mcsgh.com.ph", password: "css2026", unit: "CSS" },
    { email: "mss@mcsgh.com.ph", password: "mss2026", unit: "MSS" },
    { email: "dietary@mcsgh.com.ph", password: "dietary2026", unit: "Dietary" },
    { email: "cmps@mcsgh.com.ph", password: "cmps2026", unit: "CMPS" },
    { email: "ict@mcsgh.com.ph", password: "ict2026", unit: "ICT" },
    { email: "dental@mcsgh.com.ph", password: "dental2026", unit: "Dental" },
    { email: "aldwinmalinaolaz@gmail.com", password: "Zax2026", unit: "Zax" }
];

/* =========================
   STATE
========================= */
let state = {
    items: [],
    catalogItems: [],
    userList: [],
    activeUnit: null,
    editingItemId: null,
    role: null,
    currentUserEmail: null
};

/* =========================
   DOM
========================= */
const mainContent = document.getElementById('main-content');
const navEntry = document.getElementById('nav-entry');
const navConsolidated = document.getElementById('nav-consolidated');

/* =========================
   INIT
========================= */
function init() {
    loadData();
    setupNavigation();
    setupDataManagement();
    renderLoginView();
}

/* =========================
   LOAD DATA
========================= */
function loadData() {
    const saved = localStorage.getItem('ppmpData');
    if (saved) state.items = JSON.parse(saved);

    const savedUsers = localStorage.getItem('ppmpUsers');
    if (savedUsers) state.userList = JSON.parse(savedUsers);

    DEFAULT_USERS.forEach(def => {
        const idx = state.userList.findIndex(u => u.email === def.email);
        if (idx >= 0) state.userList[idx] = def;
        else state.userList.push(def);
    });
}

/* =========================
   NAVIGATION
========================= */
function setupNavigation() {
    navEntry.addEventListener('click', () => {
        if (state.activeUnit) renderUnitEntryView();
        else renderUnitSelectorView();
    });

    navConsolidated.addEventListener('click', () => {
        renderConsolidatedView();
    });
}

/* =========================
   LOGIN
========================= */
function renderLoginView() {
    clearMain();

    const tpl = document.getElementById('tpl-login');
    const clone = tpl.content.cloneNode(true);

    clone.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        const user = state.userList.find(u => u.email === email && u.password === password);

        if (!user) return alert("Invalid login");

        state.role = email === "supply@mcsgh.com.ph" ? "admin" : "user";
        state.currentUserEmail = email;
        state.activeUnit = user.unit;

        document.getElementById('main-nav').style.display = 'flex';
        navEntry.click();
    });

    mainContent.appendChild(clone);
}

/* =========================
   UNIT ENTRY (FIXED SUBMIT)
========================= */
function renderUnitEntryView() {
    clearMain();

    const tpl = document.getElementById('tpl-unit-entry');
    const clone = tpl.content.cloneNode(true);

    const form = clone.getElementById('ppmp-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newItem = {
            id: Date.now().toString(),
            unit: state.activeUnit,
            description: document.getElementById('item-desc').value,
            category: document.getElementById('item-category').value,
            unitMeasure: document.getElementById('item-unit').value,
            price: parseFloat(document.getElementById('item-price').value || 0),
            quantity: parseInt(document.getElementById('item-qty').value || 0),
            total: 0
        };

        newItem.total = newItem.price * newItem.quantity;

        state.items.push(newItem);

        saveData();
        await sendToGoogleSheet(newItem);

        form.reset();
        refreshUnitItems();
    });

    mainContent.appendChild(clone);
    refreshUnitItems();
}

/* =========================
   REFRESH TABLE
========================= */
function refreshUnitItems() {
    const tbody = document.getElementById('unit-items-body');
    if (!tbody) return;

    tbody.innerHTML = "";

    const items = state.items.filter(i => i.unit === state.activeUnit);

    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>${item.total}</td>
        `;
        tbody.appendChild(tr);
    });
}

/* =========================
   UTIL
========================= */
function clearMain() {
    mainContent.innerHTML = '';
}

/* =========================
   START
========================= */
init();
