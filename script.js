// Select both advancements and challenges
const elements = document.querySelectorAll(".advancement, .challenge");
const tooltip = document.getElementById("tooltip");

// Load saved states from localStorage based on title
elements.forEach((element) => {
    const title = element.dataset.title;
    const completed = localStorage.getItem(title) === "true";

    // Apply 'completed' class if the element is saved as completed
    if (completed) {
        element.classList.add("completed");
    }

    // Toggle completion status when the element is clicked
    element.addEventListener("click", () => {
        const isCompleted = !element.classList.contains("completed");
        element.classList.toggle("completed", isCompleted);
        localStorage.setItem(title, isCompleted);

        // Check if the tooltip is currently showing and update it
        if (tooltip.style.display === "block") {
            if (element.classList.contains("completed")) {
                tooltip.classList.add("completed");
            } else {
                tooltip.classList.remove("completed");
            }
        }
    });

    // Show the tooltip on mouseover
    element.addEventListener("mouseover", (event) => {
        // Set the tooltip content
        tooltip.innerHTML = `
        <div class="title">${element.dataset.title}</div>
        <div class="description">${element.dataset.description}</div>
    `;

        // Get the position of the element
        const rect = element.getBoundingClientRect();

        // Position the tooltip
        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2 - 31}px`;
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight + 8}px`;

        // Ensure the tooltip is shown and correctly sized
        tooltip.style.display = "block";
        tooltip.style.height = "auto"; // Ensure the tooltip adjusts height to content

        // Add challenge class if the element is a challenge
        if (element.classList.contains("challenge")) {
            tooltip.classList.add("challenge");
        } else {
            tooltip.classList.remove("challenge");
        }

        // Apply completed class to tooltip if the element is completed
        if (element.classList.contains("completed")) {
            tooltip.classList.add("completed");
        } else {
            tooltip.classList.remove("completed");
        }

        // Set z-index for the hovered element to be on top
        element.style.zIndex = 1488;
    });

    // Hide the tooltip on mouseout
    element.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
        tooltip.classList.remove("completed"); // Reset tooltip class on mouseout

        // Reset the z-index of the element when mouse is no longer hovering over it
        element.style.zIndex = '';
    });
});
