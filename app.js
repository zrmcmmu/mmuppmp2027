const scriptURL = "YOUR_WEBAPP_URL";

function saveData() {

    const data = {
        name: document.getElementById("name").value,
        amount: document.getElementById("amount").value
    };

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            alert("Saved Successfully");
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });

}



// Constants
const UNITS = [
    "Accounting", "AO Office", "Billing", "Billing & Claims", "Bucas", "Budget",
    "Cashier", "CMPS", "CSS", "DCO", "Dental", "Dietary", "DR", "EFM", "ER",
    "HEMB", "Hemo", "HEPO", "HIMMS", "HRM", "ICC", "ICT", "ICU", "ISO Ward",
    "LAB", "Laboratory", "Law Office", "Medical Records", "Med. Ward", "MMU",
    "MSS", "NICU", "NSO", "Nursing Office", "OB Ward", "OMCC", "OPD", "OR",
    "Pedia Ward", "Pharmacy", "Planning", "Procurement", "PRU", "Psych", "PT",
    "Radiology", "SAO", "Semi-Private Ward", "Zax"
];

// Default users for each unit
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

// Default catalog items
const DEFAULT_CATALOG = [
    "INK CART, EPSON C13T664100 (T6641), Black",
    "INK CART, EPSON C13T664200 (T6642), Cyan",
    "INK CART, EPSON C13T664300 (T6643), Magenta",
    "INK CART, EPSON C13T664400 (T6644), Yellow",
    "INK, EPSON 003, BLACK",
    "INK, EPSON 003, CYAN",
    "INK, EPSON 003, MAGENTA",
    "INK, EPSON 003, YELLOW",
    "INK, Brother BTD60BK",
    "INK, Brother BT5000C",
    "INK, Brother BT5000M",
    "INK, Brother BT5000Y",
    "PAPER, Multi-Purpose (COPY) A4, 70 gsm",
    "PAPER, Multi-Purpose (COPY) Legal, 70 gsm",
    "RECORD BOOK, 300 PAGES",
    "RECORD BOOK, 500 PAGES",
    "NOTE PAD, stick on, 2\" x 3\"",
    "NOTE PAD, stick on, 3\" x 3\"",
    "NOTE PAD, stick on, 3\" x 4\"",
    "FOLDER, TAGBOARD, Legal",
    "FOLDER, TAGBOARD, A4",
    "FOLDER, with Tab, Legal",
    "FOLDER, with Tab, A4",
    "ENVELOPE, expanding, plastic",
    "ENVELOPE, Documentary, Legal",
    "ENVELOPE, Documentary, A4",
    "FASTENER, metal, non-sharp edges",
    "FASTENER, plastic",
    "BINDER CLIP, 1\"",
    "BINDER CLIP, 2\"",
    "PAPER CLIP, vinyl/plastic coated, 33mm",
    "PAPER CLIP, vinyl/plastic coated, 50mm",
    "STAPLE WIRE, standard (#35)",
    "TAPE, transparent, 24mm",
    "TAPE, transparent, 48mm",
    "TAPE, packaging, 48mm",
    "TAPE, masking, 24mm",
    "TAPE, masking, 48mm",
    "MARKER, permanent, black",
    "MARKER, permanent, blue",
    "MARKER, whiteboard, black",
    "MARKER, whiteboard, blue",
    "SIGN PEN, black",
    "SIGN PEN, blue",
    "BALLPEN, black",
    "BALLPEN, blue",
    "HIGHLIGHTER, assorted colors",
    "CORRECTION TAPE, 8m",
    "GLUE, all purpose",
    "SCISSORS, symmetrical",
    "CUTTER/UTILITY KNIFE",
    "STAPLER, standard type",
    "STAPLE REMOVER, plier type",
    "TAPE DISPENSER, table top",
    "PUNCHER, paper, heavy duty",
    "CALCULATOR, compact",
    "BATTERY, dry cell, AA",
    "BATTERY, dry cell, AAA"
];

// State Management
let state = {
    items: [], // Array of { id, unit, description, category, unitMeasure, price, quantity, total }
    catalogItems: [],
    userList: [],
    activeUnit: null,
    editingItemId: null,
    role: null,
    currentUserEmail: null
};

// DOM Elements
const mainContent = document.getElementById('main-content');
const navEntry = document.getElementById('nav-entry');
const navConsolidated = document.getElementById('nav-consolidated');

// Templates
const tplUnitSelector = document.getElementById('tpl-unit-selector');
const tplUnitEntry = document.getElementById('tpl-unit-entry');
const tplConsolidated = document.getElementById('tpl-consolidated');

// Initialization
function init() {
    loadData();
    setupNavigation();
    setupDataManagement();
    renderLoginView();
}

function loadData() {
    const saved = localStorage.getItem('ppmpData');
    if (saved) {
        try {
            state.items = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to load data", e);
        }
    }
    const savedCatalog = localStorage.getItem('ppmpCatalog');
    if (savedCatalog) {
        try {
            state.catalogItems = JSON.parse(savedCatalog);
        } catch (e) {
            console.error("Failed to load catalog", e);
        }
    }
    // Use default catalog if empty
    if (state.catalogItems.length === 0) {
        state.catalogItems = [...DEFAULT_CATALOG];
    }

    const savedUsers = localStorage.getItem('ppmpUsers');
    if (savedUsers) {
        try {
            state.userList = JSON.parse(savedUsers);
        } catch (e) {
            console.error("Failed to load users", e);
        }
    }

    // Always ensure the default users are loaded and up to date
    DEFAULT_USERS.forEach(defUser => {
        const existingIdx = state.userList.findIndex(u => u.email === defUser.email);
        if (existingIdx >= 0) {
            state.userList[existingIdx] = defUser; // Update password/unit
        } else {
            state.userList.push(defUser);
        }
    });
    populateCatalogDatalist();
}

function saveData() {
    localStorage.setItem('ppmpData', JSON.stringify(state.items));
}

function saveCatalog() {
    localStorage.setItem('ppmpCatalog', JSON.stringify(state.catalogItems));
}

function saveUsers() {
    localStorage.setItem('ppmpUsers', JSON.stringify(state.userList));
}

function populateCatalogDatalist() {
    const datalist = document.getElementById('item-catalog');
    if (!datalist) return;
    datalist.innerHTML = '';
    state.catalogItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        datalist.appendChild(option);
    });
}

// Format Currency
function formatCurrency(amount) {
    return Number(amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Navigation Logic
function setupNavigation() {
    navEntry.addEventListener('click', () => {
        navEntry.classList.add('active');
        navConsolidated.classList.remove('active');
        if (state.activeUnit) {
            renderUnitEntryView();
        } else {
            renderUnitSelectorView();
        }
    });

    navConsolidated.addEventListener('click', () => {
        navConsolidated.classList.add('active');
        navEntry.classList.remove('active');
        renderConsolidatedView();
    });
}

// Data Management & File I/O
function setupDataManagement() {
    const btnBackup = document.getElementById('btn-backup');
    const btnRestore = document.getElementById('btn-restore');
    const fileRestore = document.getElementById('file-restore');
    const btnImportCatalog = document.getElementById('btn-import-catalog');
    const fileCatalog = document.getElementById('file-catalog');

    if (btnBackup) {
        btnBackup.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.items));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "ppmp_backup_" + Date.now() + ".json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    }

    if (btnRestore && fileRestore) {
        btnRestore.addEventListener('click', () => fileRestore.click());
        fileRestore.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parsed = JSON.parse(e.target.result);
                    if (Array.isArray(parsed)) {
                        state.items = parsed;
                        saveData();
                        alert("Data restored successfully!");
                        // Refresh current view
                        if (navConsolidated.classList.contains('active')) {
                            renderConsolidatedView();
                        } else if (state.activeUnit) {
                            renderUnitEntryView();
                        } else {
                            renderUnitSelectorView();
                        }
                    } else {
                        alert("Invalid backup file format.");
                    }
                } catch (err) {
                    alert("Error parsing backup file.");
                }
                fileRestore.value = ""; // Reset
            };
            reader.readAsText(file);
        });
    }

    if (btnImportCatalog && fileCatalog) {
        btnImportCatalog.addEventListener('click', () => fileCatalog.click());
        fileCatalog.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    const newCatalog = [];
                    // Skip header if it says 'Description' or something similar, but standard is to just grab valid strings
                    json.forEach(row => {
                        if (row && row.length > 0 && typeof row[0] === 'string' && row[0].trim() !== '') {
                            // Don't include the header row itself if it's literally "Item Description"
                            if (row[0].trim().toLowerCase() !== 'item description' && row[0].trim().toLowerCase() !== 'description') {
                                newCatalog.push(row[0].trim());
                            }
                        }
                    });

                    if (newCatalog.length > 0) {
                        state.catalogItems = [...new Set(newCatalog)]; // Remove duplicates
                        saveCatalog();
                        populateCatalogDatalist();
                        alert(`Successfully imported ${state.catalogItems.length} items to catalog!`);
                    } else {
                        alert("No valid items found in the first column of the Excel file.");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Error parsing Excel file.");
                }
                fileCatalog.value = ""; // Reset
            };
            reader.readAsArrayBuffer(file);
        });
    }

    const btnImportUsers = document.getElementById('btn-import-users');
    const fileUsers = document.getElementById('file-users');
    if (btnImportUsers && fileUsers) {
        btnImportUsers.addEventListener('click', () => fileUsers.click());
        fileUsers.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet);

                    const newUsers = [];
                    json.forEach(row => {
                        const email = row['Email'] || row['email'];
                        const password = row['Password'] || row['password'];
                        const unit = row['Unit'] || row['unit'];
                        if (email && password && unit) {
                            newUsers.push({ email: email.trim(), password: password.toString().trim(), unit: unit.trim() });
                        }
                    });

                    if (newUsers.length > 0) {
                        state.userList = newUsers;
                        saveUsers();
                        alert(`Successfully imported ${newUsers.length} users!`);
                    } else {
                        alert("No valid users found. Ensure Excel has 'Email', 'Password', and 'Unit' headers.");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Error parsing users Excel file.");
                }
                fileUsers.value = "";
            };
            reader.readAsArrayBuffer(file);
        });
    }

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            state.role = null;
            state.currentUserEmail = null;
            state.activeUnit = null;
            document.getElementById('main-nav').style.display = 'none';
            renderLoginView();
        });
    }
}

function clearMain() {
    mainContent.innerHTML = '';
}

// View: Unit Selector
function renderUnitSelectorView() {
    clearMain();
    const clone = tplUnitSelector.content.cloneNode(true);
    const unitGrid = clone.getElementById('unit-grid');
    const searchInput = clone.getElementById('unit-search');

    const renderGrid = (filter = '') => {
        unitGrid.innerHTML = '';
        const filtered = UNITS.filter(u => u.toLowerCase().includes(filter.toLowerCase())).sort();

        if (filtered.length === 0) {
            unitGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted)">No units found.</p>';
            return;
        }

        filtered.forEach(unit => {
            const div = document.createElement('div');
            div.className = 'unit-card';
            div.textContent = unit;
            div.addEventListener('click', () => {
                if (state.role === 'admin') {
                    state.activeUnit = unit;
                    renderUnitEntryView();
                }
            });
            unitGrid.appendChild(div);
        });
    };

    searchInput.addEventListener('input', (e) => renderGrid(e.target.value));

    renderGrid();
    mainContent.appendChild(clone);
}

// View: Login Form
function renderLoginView() {
    clearMain();
    const tplLogin = document.getElementById('tpl-login');
    const clone = tplLogin.content.cloneNode(true);

    const title = clone.querySelector('h2');
    if (title) title.textContent = `Welcome to PPMP`;

    const form = clone.getElementById('login-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (email === 'supply@mcsgh.com.ph' && password === 'admin123') {
            // Admin Login
            state.role = 'admin';
            state.currentUserEmail = email;
            document.getElementById('main-nav').style.display = 'flex';

            // Show all admin buttons
            document.getElementById('nav-consolidated').style.display = 'block';
            document.getElementById('btn-backup').style.display = 'block';
            document.getElementById('btn-restore').style.display = 'block';
            document.getElementById('btn-import-catalog').style.display = 'block';
            document.getElementById('btn-import-users').style.display = 'block';

            navConsolidated.click();
        } else {
            // Regular User Login
            const user = state.userList.find(u => u.email === email && u.password === password);
            if (user) {
                state.role = 'user';
                state.currentUserEmail = email;
                state.activeUnit = user.unit;

                document.getElementById('main-nav').style.display = 'flex';
                // Hide admin buttons
                document.getElementById('nav-consolidated').style.display = 'none';
                document.getElementById('btn-backup').style.display = 'none';
                document.getElementById('btn-restore').style.display = 'none';
                document.getElementById('btn-import-catalog').style.display = 'none';
                document.getElementById('btn-import-users').style.display = 'none';

                navEntry.click();
            } else {
                alert("Invalid email or password.");
            }
        }
    });

    mainContent.appendChild(clone);
}

// View: Unit Entry Form
function renderUnitEntryView() {
    if (!state.activeUnit) {
        renderUnitSelectorView();
        return;
    }

    clearMain();
    const clone = tplUnitEntry.content.cloneNode(true);

    // Set Unit Name
    clone.getElementById('current-unit-title').textContent = `${state.activeUnit} - PPMP Entry`;

    // Back Button
    const btnBack = clone.getElementById('btn-back');
    if (state.role === 'admin') {
        btnBack.addEventListener('click', () => {
            state.activeUnit = null;
            renderUnitSelectorView();
        });
    } else {
        btnBack.style.display = 'none';
    }

    // Form Handling
    const form = clone.getElementById('ppmp-form');
    const btnCancel = clone.getElementById('btn-cancel-edit');
    const btnSubmit = clone.getElementById('btn-submit-form');

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            state.editingItemId = null;
            form.reset();
            btnSubmit.textContent = 'Add';
            btnCancel.style.display = 'none';
        });
    }

    // Export Button
    clone.getElementById('btn-export-unit').addEventListener('click', () => {
        const unitItems = state.items.filter(i => i.unit === state.activeUnit);
        if (unitItems.length === 0) return alert("No data to export.");

        const data = unitItems.map(item => ({
            "Item Description": item.description,
            "Category": item.category,
            "Unit of Measure": item.unitMeasure,
            "Unit Price": item.price,
            "Quantity": item.quantity,
            "Total Price": item.total,
            "Start Date": item.startDate || '',
            "End Date": item.endDate || '',
            "Delivery Date": item.deliveryDate || ''
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Unit PPMP");
        XLSX.writeFile(wb, `PPMP_${state.activeUnit}.xlsx`);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const desc = document.getElementById('item-desc').value.trim();
        const category = document.getElementById('item-category').value;
        const unitMeasure = document.getElementById('item-unit').value.trim();
        const priceInput = document.getElementById('item-price').value;
        const price = priceInput ? parseFloat(priceInput) : 0;
        const qty = parseInt(document.getElementById('item-qty').value, 10);

        const startDate = document.getElementById('item-start-date').value;
        const endDate = document.getElementById('item-end-date').value;
        const deliveryDate = document.getElementById('item-delivery-date').value;

        if (!desc || !category || !unitMeasure || isNaN(qty) || !startDate || !endDate || !deliveryDate) return;

        const newItem = {
            id: state.editingItemId ? state.editingItemId : Date.now().toString(),
            unit: state.activeUnit,
            description: desc,
            category: category,
            unitMeasure: unitMeasure,
            price: price,
            quantity: qty,
            total: price * qty,
            startDate: startDate,
            endDate: endDate,
            deliveryDate: deliveryDate
        };

        if (state.editingItemId) {
            const index = state.items.findIndex(i => i.id === state.editingItemId);
            if (index !== -1) {
                state.items[index] = newItem;
            }
            state.editingItemId = null;
            btnSubmit.textContent = 'Add';
            btnCancel.style.display = 'none';
        } else {
            state.items.push(newItem);
        }

        // Automatically add the new item description to the catalog if it's not there
        if (!state.catalogItems.includes(desc)) {
            state.catalogItems.push(desc);
            state.catalogItems.sort();
            saveCatalog();
            populateCatalogDatalist();
        }

        saveData();
        form.reset();
        refreshUnitItems();
    });

    mainContent.appendChild(clone);
    refreshUnitItems();
}

function refreshUnitItems() {
    const tbody = document.getElementById('unit-items-body');
    const totalEl = document.getElementById('unit-total-cost');
    if (!tbody || !totalEl) return;

    tbody.innerHTML = '';

    const unitItems = state.items.filter(i => i.unit === state.activeUnit);
    let totalCost = 0;

    if (unitItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--text-muted)">No items requested yet.</td></tr>';
    } else {
        unitItems.forEach(item => {
            totalCost += item.total;
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    <div style="font-weight: 500">${item.description}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted)">Per ${item.unitMeasure}</div>
                </td>
                <td>${item.category}</td>
                <td style="font-size: 0.85rem; color: var(--text-muted)">
                    <div>S: ${item.startDate}</div>
                    <div>E: ${item.endDate}</div>
                </td>
                <td style="font-size: 0.85rem; color: var(--text-muted)">${item.deliveryDate}</td>
                <td>${item.quantity}</td>
                <td>Php ${formatCurrency(item.total)}</td>
                <td>
                    <div style="display: flex; gap: 0.25rem;">
                        <button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; height: auto;" onclick="editItem('${item.id}')">Edit</button>
                        <button class="btn-danger" onclick="deleteItem('${item.id}')">Remove</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    totalEl.textContent = formatCurrency(totalCost);
}

// Global Edit function for inline onclick handler
window.editItem = function (id) {
    const item = state.items.find(i => i.id === id);
    if (!item) return;

    state.editingItemId = id;

    document.getElementById('item-desc').value = item.description;
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-unit').value = item.unitMeasure;
    document.getElementById('item-price').value = item.price || '';
    document.getElementById('item-qty').value = item.quantity;
    document.getElementById('item-start-date').value = item.startDate || '';
    document.getElementById('item-end-date').value = item.endDate || '';
    document.getElementById('item-delivery-date').value = item.deliveryDate || '';

    document.getElementById('btn-submit-form').textContent = 'Update';
    document.getElementById('btn-cancel-edit').style.display = 'inline-block';

    // Scroll to form smoothly
    document.getElementById('ppmp-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Global Delete function for the inline onclick handler
window.deleteItem = function (id) {
    if (confirm("Are you sure you want to remove this item?")) {
        state.items = state.items.filter(i => i.id !== id);
        saveData();
        refreshUnitItems();
    }
}

// View: Consolidated PPMP
function renderConsolidatedView() {
    clearMain();
    const clone = tplConsolidated.content.cloneNode(true);
    mainContent.appendChild(clone);

    const filterCategory = document.getElementById('filter-category');
    const filterName = document.getElementById('filter-name');
    const sortBy = document.getElementById('sort-by');
    const btnExport = document.getElementById('btn-export-consolidated');

    filterCategory.addEventListener('change', renderConsolidatedTable);
    filterName.addEventListener('input', renderConsolidatedTable);
    sortBy.addEventListener('change', renderConsolidatedTable);

    btnExport.addEventListener('click', () => {
        if (window.currentConsolidatedData && window.currentConsolidatedData.length > 0) {
            const data = window.currentConsolidatedData.map(item => ({
                "Item Description": item.description,
                "Category": item.category,
                "Unit Price": item.price,
                "Total Quantity": item.totalQty,
                "Total Cost": item.totalCost,
                "Requested By": Object.entries(item.requestedBy).map(([u, q]) => `${u} (${q})`).join(', '),
                "Start Dates": Array.from(item.startDates).join(', '),
                "End Dates": Array.from(item.endDates).join(', '),
                "Delivery Dates": Array.from(item.deliveryDates).join(', ')
            }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Consolidated PPMP");
            XLSX.writeFile(wb, `Consolidated_PPMP.xlsx`);
        } else {
            alert("No data to export.");
        }
    });

    renderConsolidatedTable();
}

function renderConsolidatedTable() {
    const tbody = document.getElementById('consolidated-items-body');
    const statTotalItems = document.getElementById('stat-total-items');
    const statTotalUnits = document.getElementById('stat-total-units');
    const statTotalBudget = document.getElementById('stat-total-budget');
    const filterVal = document.getElementById('filter-category').value;
    const filterNameVal = document.getElementById('filter-name').value.trim().toLowerCase();
    const sortVal = document.getElementById('sort-by').value;

    if (!tbody) return;

    const consolidated = {};
    const participatingUnits = new Set();
    let grandTotal = 0;
    let distinctItemsCount = 0;

    state.items.forEach(item => {
        if (filterVal !== 'All' && item.category !== filterVal) return;
        if (filterNameVal && !item.description.toLowerCase().includes(filterNameVal)) return;

        const key = `${item.description.toLowerCase().trim()}|${item.category}|${item.price}`;
        participatingUnits.add(item.unit);

        if (!consolidated[key]) {
            consolidated[key] = {
                description: item.description,
                category: item.category,
                price: item.price,
                startDates: new Set(),
                endDates: new Set(),
                deliveryDates: new Set(),
                totalQty: 0,
                totalCost: 0,
                requestedBy: {}
            };
            distinctItemsCount++;
        }

        if (item.startDate) consolidated[key].startDates.add(item.startDate);
        if (item.endDate) consolidated[key].endDates.add(item.endDate);
        if (item.deliveryDate) consolidated[key].deliveryDates.add(item.deliveryDate);

        consolidated[key].totalQty += item.quantity;
        consolidated[key].totalCost += item.total;

        if (!consolidated[key].requestedBy[item.unit]) {
            consolidated[key].requestedBy[item.unit] = 0;
        }
        consolidated[key].requestedBy[item.unit] += item.quantity;

        grandTotal += item.total;
    });

    statTotalItems.textContent = distinctItemsCount;
    statTotalUnits.textContent = participatingUnits.size;
    statTotalBudget.textContent = formatCurrency(grandTotal);

    let consolidatedArray = Object.values(consolidated);

    if (sortVal === 'category') {
        consolidatedArray.sort((a, b) => a.category.localeCompare(b.category) || a.description.localeCompare(b.description));
    } else if (sortVal === 'name') {
        consolidatedArray.sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortVal === 'cost_desc') {
        consolidatedArray.sort((a, b) => b.totalCost - a.totalCost);
    } else if (sortVal === 'cost_asc') {
        consolidatedArray.sort((a, b) => a.totalCost - b.totalCost);
    }

    window.currentConsolidatedData = consolidatedArray;

    tbody.innerHTML = '';
    if (consolidatedArray.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color: var(--text-muted)">No data available.</td></tr>';
    } else {
        consolidatedArray.forEach(item => {
            const tr = document.createElement('tr');

            const requestingUnitsHtml = Object.entries(item.requestedBy)
                .map(([unit, qty]) => `<span class="unit-tag">${unit} (${qty})</span>`)
                .join(' ');

            const sDate = item.startDates.size > 1 ? "Various" : (Array.from(item.startDates)[0] || "N/A");
            const eDate = item.endDates.size > 1 ? "Various" : (Array.from(item.endDates)[0] || "N/A");
            const dDate = item.deliveryDates.size > 1 ? "Various" : (Array.from(item.deliveryDates)[0] || "N/A");

            tr.innerHTML = `
                <td style="font-weight: 500">${item.description}</td>
                <td>${item.category}</td>
                <td style="font-size: 0.85rem; color: var(--text-muted)">
                    <div>S: ${sDate}</div>
                    <div>E: ${eDate}</div>
                </td>
                <td style="font-size: 0.85rem; color: var(--text-muted)">${dDate}</td>
                <td>Php ${formatCurrency(item.price)}</td>
                <td style="font-weight: 600">${item.totalQty}</td>
                <td>${requestingUnitsHtml}</td>
                <td style="font-weight: 600; color: var(--primary-color)">Php ${formatCurrency(item.totalCost)}</td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// Start App
init();
