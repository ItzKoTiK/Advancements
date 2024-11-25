// Get advancements and tooltip elements
const advancements = document.querySelectorAll(".advancement");
const tooltip = document.getElementById("tooltip");

// Load saved states from localStorage
advancements.forEach((advancement) => {
    const id = advancement.dataset.id;
    const completed = localStorage.getItem(id) === "true";

    // Apply 'completed' class if the achievement is saved as completed
    if (completed) {
        advancement.classList.add("completed");
    }

    // Toggle completion status when the advancement is clicked
    advancement.addEventListener("click", () => {
        const isCompleted = !advancement.classList.contains("completed");
        advancement.classList.toggle("completed", isCompleted);
        localStorage.setItem(id, isCompleted);

        // Check if the tooltip is currently showing and update it
        if (tooltip.style.display === "block") {
            // Update the tooltip immediately after the click
            if (advancement.classList.contains("completed")) {
                tooltip.classList.add("completed");
            } else {
                tooltip.classList.remove("completed");
            }
        }
    });

    // Show the tooltip on mouseover
    advancement.addEventListener("mouseover", (event) => {
        // Set the tooltip content
        tooltip.innerHTML = `
            <div class="title">${advancement.dataset.title}</div>
            <div class="description">${advancement.dataset.description}</div>
        `;

        // Get the position of the entire .advancement div
        const rect = advancement.getBoundingClientRect();

        // Position the tooltip
        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 10}px`;

        // Show the tooltip
        tooltip.style.display = "block";

        // Apply completed class to tooltip if the advancement is completed
        if (advancement.classList.contains("completed")) {
            tooltip.classList.add("completed");
        } else {
            tooltip.classList.remove("completed");
        }
    });

    // Hide the tooltip on mouseout
    advancement.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
        tooltip.classList.remove("completed"); // Reset tooltip class on mouseout
    });
});
