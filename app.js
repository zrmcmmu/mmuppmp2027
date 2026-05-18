document.addEventListener("DOMContentLoaded", function () {

    console.log("APP STARTED");

    const main = document.getElementById("main-content");

    const loginTpl = document.getElementById("tpl-login");

    if (!main || !loginTpl) {
        console.error("Templates missing!");
        return;
    }

    // SHOW LOGIN SCREEN FIRST
    main.innerHTML = loginTpl.innerHTML;

    // LOGIN HANDLER
    document.addEventListener("submit", function (e) {

        if (e.target && e.target.id === "login-form") {
            e.preventDefault();

            console.log("LOGIN CLICKED");

            // TEMP: skip login and go to unit selector

            const unitTpl = document.getElementById("tpl-unit-selector");

            if (unitTpl) {
                main.innerHTML = unitTpl.innerHTML;
            }
        }

    });

});
