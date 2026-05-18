document.addEventListener("DOMContentLoaded", function () {

    console.log("APP STARTED");

    const main = document.getElementById("main-content");

    const loginTpl = document.getElementById("tpl-login");
    const unitTpl = document.getElementById("tpl-unit-selector");

    // SAMPLE UNITS (you can edit this later)
    const units = [
        "Administration",
        "Accounting",
        "Supply Office",
        "Medical Department",
        "ICT Unit",
        "HR Office"
    ];

    // SHOW LOGIN FIRST
    main.innerHTML = loginTpl.innerHTML;

    // LOGIN HANDLER
    document.addEventListener("submit", function (e) {

        if (e.target && e.target.id === "login-form") {
            e.preventDefault();

            console.log("LOGIN SUCCESS");

            loadUnitSelector();
        }

    });

    function loadUnitSelector() {

        main.innerHTML = unitTpl.innerHTML;

        const grid = document.getElementById("unit-grid");
        const search = document.getElementById("unit-search");

        if (!grid) {
            console.error("unit-grid not found");
            return;
        }

        renderUnits(units, grid);

        // SEARCH FUNCTION
        search.addEventListener("input", function () {
            const filtered = units.filter(u =>
                u.toLowerCase().includes(this.value.toLowerCase())
            );
            renderUnits(filtered, grid);
        });
    }

    function renderUnits(data, grid) {

        grid.innerHTML = "";

        data.forEach(unit => {

            const card = document.createElement("div");

            card.className = "unit-card";
            card.style.padding = "15px";
            card.style.margin = "10px";
            card.style.border = "1px solid #ccc";
            card.style.cursor = "pointer";

            card.innerHTML = `<strong>${unit}</strong>`;

            card.addEventListener("click", function () {
                alert("Selected Unit: " + unit);
            });

            grid.appendChild(card);
        });
    }

});
