let currentIndex = 0;

function displayData(index) {
    if (index < 0) index = Names.length - 1;
    if (index >= Names.length) index = 0;
    
    currentIndex = index;
    var randomElement = Names[currentIndex];
    
    // randomElement: [Name, Meaning, SlokaIndex]
    var actualIndex = currentIndex + 1;
    var name = randomElement[0];
    var meaning = randomElement[1];
    var slokaIndex = randomElement[2];
    
    document.getElementById("Index").textContent = actualIndex;
    document.getElementById("Name").textContent = name;
    document.getElementById("Meaning").textContent = meaning;
    
    // SlokaIndex is 1-based, Slokas array is 0-based
    if (slokaIndex > 0 && slokaIndex <= Slokas.length) {
        var sloka = Slokas[slokaIndex - 1]; // [Sanskrit, English]
        document.getElementById("Sloka-Sanskrit").innerHTML = sloka[0];
        document.getElementById("Sloka-English").innerHTML = sloka[1];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Use crypto.getRandomValues for secure randomness
    var randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    var startIndex = randomBuffer[0] % Names.length;

    displayData(startIndex);

    // Event Listeners for Buttons
    document.getElementById("prevBtn").addEventListener("click", function() {
        displayData(currentIndex - 1);
    });

    document.getElementById("nextBtn").addEventListener("click", function() {
        displayData(currentIndex + 1);
    });

    document.getElementById("secretMenu").addEventListener("click", function() {
        const modal = document.getElementById("listModal");
        modal.style.display = "block";
        
        // Populate table if empty
        const tbody = document.getElementById("namesTableBody");
        if (tbody.children.length === 0) {
            let html = "";
            for (let i = 0; i < Names.length; i++) {
                const nameData = Names[i];
                const slokaIndex = nameData[2];
                let sanskrit = "";
                let english = "";
                if (slokaIndex > 0 && slokaIndex <= Slokas.length) {
                    sanskrit = Slokas[slokaIndex - 1][0];
                    english = Slokas[slokaIndex - 1][1];
                }
                html += `<tr>
                    <td>${i + 1}</td>
                    <td>${nameData[0]}</td>
                    <td>${nameData[1]}</td>
                    <td class="sanskrit">${sanskrit}</td>
                    <td class="english">${english}</td>
                </tr>`;
            }
            tbody.innerHTML = html;
        }
    });

    document.getElementById("closeModal").addEventListener("click", function() {
        document.getElementById("listModal").style.display = "none";
    });

    // Close when clicking outside of modal content
    window.addEventListener("click", function(event) {
        const modal = document.getElementById("listModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});