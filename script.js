function login() {
    const pin = document.getElementById("pinInput").value;

    if (pin === "1234") {
        // hide login
        document.getElementById("login").classList.add("hidden");

        // show dashboard
        document.getElementById("dashboard").classList.remove("hidden");
    } else {
        alert("Wrong PIN");
    }
}

function renderItems() {
    const div = document.getElementById("items");
    div.innerHTML = "";

    trips[currentTrip].items.forEach(item => {
        div.innerHTML += `<div>☐ ${item}</div>`;
    });
}

// EDIT
function addItem() {
    const val = document.getElementById("newItem").value;
    trips[currentTrip].items.push(val);
    save();
    renderItems();
}

// SAVE
function save() {
    localStorage.setItem("trips", JSON.stringify(trips));
}