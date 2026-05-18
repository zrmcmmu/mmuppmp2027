const scriptURL = "PASTE_YOUR_WEBAPP_URL_HERE";

document.getElementById("ppmpForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();

    const data = {
        items: document.getElementById("items").value,
        category: document.getElementById("category").value,
        unit: document.getElementById("unit").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value,
        StartDate: document.getElementById("StartDate").value,
        EndDate: document.getElementById("EndDate").value,
        DeliveryDate: document.getElementById("DeliveryDate").value
    };

    try {

        const response = await fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(result.success){

            alert("Saved to Google Sheet!");

            document.getElementById("ppmpForm").reset();

        } else {

            alert("Failed to save.");

        }

    } catch(error) {

        console.error(error);

        alert("Error connecting to Google Sheets.");

    }

});
