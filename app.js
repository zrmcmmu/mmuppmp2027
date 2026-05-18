const scriptURL = "PASTE_YOUR_WEBAPP_URL_HERE";

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("ppmp-form");

    if (!form) {
        console.error("ppmp-form not found. UI not loaded yet.");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = {
            items: document.getElementById("item-desc").value,
            category: document.getElementById("item-category").value,
            unit: document.getElementById("item-unit").value,
            price: document.getElementById("item-price").value,
            quantity: document.getElementById("item-qty").value,
            StartDate: document.getElementById("item-start-date").value,
            EndDate: document.getElementById("item-end-date").value,
            DeliveryDate: document.getElementById("item-delivery-date").value
        };

        try {
            const response = await fetch(scriptURL, {
                method: "POST",
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                alert("Saved to Google Sheet!");
                form.reset();
            } else {
                alert("Failed to save.");
            }

        } catch (error) {
            console.error(error);
            alert("Error connecting to Google Sheets.");
        }
    });

});
