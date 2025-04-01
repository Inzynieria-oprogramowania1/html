document.addEventListener("DOMContentLoaded", function () {
    showPanel('login'); // Domyślnie pokazuje panel logowania
    loadStats();
});

function showPanel(panelId) {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
}

function addPart() {
    let partName = prompt("Podaj nazwę części:");
    let partCost = prompt("Podaj koszt części:");
    let partQty = prompt("Podaj ilość:");
    let partBrand = prompt("Podaj markę:");
    let partCondition = prompt("Podaj stan:");

    if (!partName || !partCost || !partQty || !partBrand || !partCondition) {
        alert("Wszystkie pola muszą być wypełnione!");
        return;
    }

    let inventoryTable = document.getElementById("inventoryTable");
    let newRow = inventoryTable.insertRow();
    
    newRow.innerHTML = `
        <td>${partName}</td>
        <td>${partCost} PLN</td>
        <td>${partQty}</td>
        <td>${partBrand}</td>
        <td>${partCondition}</td>
        <td><button onclick="deletePart(this)">Usuń</button></td>
    `;
    
    addHistoryEntry(`Dodano część: ${partName}`);
}

function deletePart(button) {
    let row = button.parentElement.parentElement;
    let partName = row.cells[0].innerText;
    row.remove();
    addHistoryEntry(`Usunięto część: ${partName}`);
}

function addHistoryEntry(entry) {
    let historyList = document.getElementById("historyList");
    let newItem = document.createElement("li");
    newItem.textContent = entry;
    historyList.prepend(newItem);
}

function loadStats() {
    let ctx = document.getElementById("statsChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Część A", "Część B", "Część C"],
            datasets: [{
                label: "Ilość na magazynie",
                data: [10, 20, 15],
                backgroundColor: ["red", "blue", "green"]
            }]
        }
    });
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "admin@example.com" && password === "admin") {
        alert("Zalogowano!");
        showPanel('orders');
    } else {
        alert("Błędne dane logowania.");
    }
});
