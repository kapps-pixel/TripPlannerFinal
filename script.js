function login() {
    console.log("login function running"); // DEBUG

    const pin = document.getElementById("pinInput").value;
    console.log("entered pin:", pin);

    if (pin === "1234") {
        console.log("correct pin");

        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

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