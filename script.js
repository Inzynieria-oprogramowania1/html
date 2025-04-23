document.addEventListener("DOMContentLoaded", function () {
    showPanel('login');
    loadInventory();
    loadStats();
});

// Funkcje paneli pozostają bez zmian...

async function loadInventory() {
    try {
        const response = await fetch('get_parts.php');
        const parts = await response.json();
        
        const inventoryTable = document.getElementById("inventoryTable");
        // Wyczyść tabelę pozostawiając nagłówki
        while (inventoryTable.rows.length > 1) {
            inventoryTable.deleteRow(1);
        }
        
        parts.forEach(part => {
            const newRow = inventoryTable.insertRow();
            newRow.innerHTML = `
                <td>${part.kategoria} - ${part.podkategoria}</td>
                <td>${part.cena} PLN</td>
                <td>1</td>
                <td>${part.marka_samochodu}</td>
                <td>${part.stan}</td>
                <td>
                    <button onclick="editPart(${part.part_id})">Edytuj</button>
                    <button onclick="deletePart(${part.part_id})">Usuń</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Błąd ładowania danych:', error);
    }
}

async function addPart() {
    const partData = {
        kategoria: prompt("Podaj kategorię części:"),
        podkategoria: prompt("Podaj podkategorię części:"),
        marka_samochodu: prompt("Podaj markę samochodu:"),
        stan: prompt("Podaj stan części:"),
        cena: prompt("Podaj cenę części:")
    };

    if (!Object.values(partData).every(value => value)) {
        alert("Wszystkie pola muszą być wypełnione!");
        return;
    }

    try {
        const response = await fetch('add_part.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partData)
        });

        const result = await response.json();
        if (result.success) {
            alert("Część dodana pomyślnie!");
            loadInventory();
            addHistoryEntry(`Dodano część: ${partData.kategoria} - ${partData.podkategoria}`);
        } else {
            alert("Błąd podczas dodawania części: " + result.message);
        }
    } catch (error) {
        console.error('Błąd:', error);
    }
}

async function deletePart(partId) {
    if (!confirm("Czy na pewno chcesz usunąć tę część?")) return;

    try {
        const response = await fetch(`delete_part.php?part_id=${partId}`);
        const result = await response.json();
        
        if (result.success) {
            alert("Część usunięta pomyślnie!");
            loadInventory();
            addHistoryEntry(`Usunięto część ID: ${partId}`);
        } else {
            alert("Błąd podczas usuwania części: " + result.message);
        }
    } catch (error) {
        console.error('Błąd:', error);
    }
}

// Reszta funkcji pozostaje bez zmian...
