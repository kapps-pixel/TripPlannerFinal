let trips = JSON.parse(localStorage.getItem("trips")) || [];
let currentTrip = null;

function login() {
    const pin = document.getElementById("pinInput").value;

    if (pin === "1234") {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        alert("Wrong PIN");
    }
}

function showCreate() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("create").style.display = "block";
}

function showDashboard() {
    document.getElementById("create").style.display = "none";
    document.getElementById("trip").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    renderTrips();
}

function createTrip() {
    const name = document.getElementById("country").value;

    if (!name) {
        alert("Please enter a location");
        return;
    }

    const duration = document.querySelector('input[name="duration"]:checked')?.value;

    const climate = Array.from(document.querySelectorAll('.climate-group input:checked'))
        .map(c => c.value);

    const activities = document.getElementById("activities").value;

    let items = generateItems(duration, climate, activities);

    if (trips.some(t => t.name === name)) {
        alert("Trip already exists");
        return;
    }

    trips.push({ name, items });

    save();

    showDashboard();
}

function generateItems(duration, climateList, activities) {
    let items = [];

    items.push(
        "Passport",
        "Wallet",
        "Phone",
        "Phone Charger",
        "Headphones",
        "Toothbrush",
        "Toothpaste",
        "Deodorant",
        "Shampoo",
        "Medications",
        "Travel Documents",
        "Money / Credit Card"
    );

    items.push(
        "Underwear",
        "Socks",
        "Sleepwear"
    );

    climateList.forEach(climate => {
        if (climate === "hot") items.push("T-shirts", "Shorts", "Sunscreen");
        if (climate === "cold") items.push("Jacket", "Sweater", "Warm Pants");
        if (climate === "rainy") items.push("Umbrella", "Raincoat");
        if (climate === "snowy") items.push("Snow Boots", "Gloves");
        if (climate === "windy") items.push("Windbreaker");
        if (climate === "humid") items.push("Breathable Clothing");
        if (climate === "dry") items.push("Moisturizer", "Lip Balm");
        if (climate === "tropical") items.push("Bug Spray", "Light Clothing");
    });

    activities = activities.toLowerCase();

    if (activities.includes("beach")) items.push("Swimsuit", "Flip Flops");
    if (activities.includes("walking")) items.push("Comfortable Shoes");
    if (activities.includes("hiking")) items.push("Hiking Boots", "Backpack");
    if (activities.includes("gym")) items.push("Workout Clothes");
    if (activities.includes("formal")) items.push("Formal Outfit");

    if (duration === "short") items.push("3–5 Outfits");
    if (duration === "medium") items.push("7–10 Outfits");
    if (duration === "long") items.push("10+ Outfits");

    return [...new Set(items)];
}

function save() {
    localStorage.setItem("trips", JSON.stringify(trips));
}

function renderTrips() {
    const list = document.getElementById("tripList");
    list.innerHTML = "";

    trips.forEach((trip, index) => {
        list.innerHTML += `
            <div class="button" onclick="openTrip(${index})">
                ${trip.name}
            </div>
        `;
    });
}

function renderItems() {
    const div = document.getElementById("items");
    div.innerHTML = "";

    trips[currentTrip].items.forEach((item, i) => {
        div.innerHTML += `
            <div class="item-row">
                <span>☐ ${item}</span>
                <button onclick="deleteItem(${i})">✕</button>
            </div>
        `;
    });
}

function openTrip(index) {
    currentTrip = index;

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("trip").style.display = "block";

    document.getElementById("tripTitle").innerText = trips[index].name;

    renderItems();
}

function addItem() {
    const input = document.getElementById("newItem");
    const value = input.value.trim();

    if (!value) return;

    trips[currentTrip].items.push(value);

    input.value = "";

    save();
    renderItems();
}

function deleteItem(index) {
    trips[currentTrip].items.splice(index, 1);
    save();
    renderItems();
}

function deleteTrip() {
    console.log("Current trip index:", currentTrip);

    if (currentTrip === null || currentTrip === undefined) {
        alert("Error: No trip selected");
        return;
    }

    if (!confirm("Are you sure you want to delete this trip?")) return;

    trips.splice(currentTrip, 1);

    save();

    currentTrip = null;

    showDashboard();
}