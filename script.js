
function showCreate() {
    hideAll();
    document.getElementById("create").classList.remove("hidden");
}

function openTrip(index) {
    currentTrip = index;
    hideAll();
    document.getElementById("trip").classList.remove("hidden");

    document.getElementById("tripTitle").innerText = trips[index].name;
    renderItems();
}

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

function generateItems(duration, climate, activities) {
    let items = [];

    if (climate === "cold") items.push("Jacket","Sweater");
    if (climate === "rainy") items.push("Umbrella","Raincoat");
    if (climate === "hot") items.push("Sunscreen","Shorts");

    if (activities.includes("beach")) items.push("Swimsuit");
    if (activities.includes("hiking")) items.push("Hiking Shoes");

    if (duration === "short") items.push("3 Outfits");
    if (duration === "medium") items.push("7 Outfits");
    if (duration === "long") items.push("10 Outfits");

    return items;
}

function renderTrips() {
    const list = document.getElementById("tripList");
    list.innerHTML = "";

    trips.forEach((t, i) => {
        list.innerHTML += `<div class="button" onclick="openTrip(${i})">${t.name}</div>`;
    });
}

function renderItems() {
    const div = document.getElementById("items");
    div.innerHTML = "";

    trips[currentTrip].items.forEach((item, i) => {
        div.innerHTML += `<div>☐ ${item}</div>`;
    });
}

function addItem() {
    const val = document.getElementById("newItem").value;
    trips[currentTrip].items.push(val);
    save();
    renderItems();
}

function showTips() {
    alert("Pack based on climate and respect local culture!");
}

function save() {
    localStorage.setItem("trips", JSON.stringify(trips));
}

function hideAll() {
    document.querySelectorAll(".box").forEach(el => el.classList.add("hidden"));
}
