let trips = JSON.parse(localStorage.getItem("trips")) || [];
let currentTrip = null;

// ---------------- LOGIN ----------------
function login() {
    const pin = document.getElementById("pinInput").value;

    if (pin === "1234") {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        alert("Wrong PIN");
    }
}

// ---------------- NAVIGATION ----------------
function showCreate() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("create").style.display = "block";
}

function showDashboard() {
    document.getElementById("create").style.display = "none";
    document.getElementById("trip").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}

function openTrip(index) {
    currentTrip = index;

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("trip").style.display = "block";

    document.getElementById("tripTitle").innerText = trips[index].name;
    renderItems();
}

// ---------------- CREATE TRIP ----------------
function createTrip() {
    const name = document.getElementById("country").value;
    const duration = document.querySelector('input[name="duration"]:checked')?.value;
    const climate = document.getElementById("climate").value;
    const activities = document.getElementById("activities").value;

    let items = generateItems(duration, climate, activities);

    trips.push({ name, items });
    save();
    showDashboard();
}

// ---------------- PACKING LOGIC ----------------
function generateItems(duration, climate, activities) {
    let items = [];

    if (climate === "hot") items.push("T-shirts", "Shorts", "Sunscreen");
    if (climate === "cold") items.push("Jacket", "Sweater");
    if (climate === "rainy") items.push("Umbrella", "Raincoat");

    activities = activities.toLowerCase();

    if (activities.includes("beach")) items.push("Swimsuit");
    if (activities.includes("walking")) items.push("Walking Shoes");
    if (activities.includes("hiking")) items.push("Hiking Boots");

    if (duration === "short") items.push("3 Outfits");
    if (duration === "medium") items.push("7 Outfits");
    if (duration === "long") items.push("10+ Outfits");

    items.push("Passport", "Wallet");

    return items;
}

// ---------------- RENDER ----------------
function renderTrips() {
    const list = document.getElementById("tripList");
    list.innerHTML = "";

    trips.forEach((t, i) => {
        list.innerHTML += `<div onclick="openTrip(${i})">${t.name}</div>`;
    });
}

function renderItems() {
    const div = document.getElementById("items");
    div.innerHTML = "";

    trips[currentTrip].items.forEach(item => {
        div.innerHTML += `<div>☐ ${item}</div>`;
    });
}

// ---------------- EDIT ----------------
function addItem() {
    const val = document.getElementById("newItem").value;
    trips[currentTrip].items.push(val);
    save();
    renderItems();
}

// ---------------- STORAGE ----------------
function save() {
    localStorage.setItem("trips", JSON.stringify(trips));
}