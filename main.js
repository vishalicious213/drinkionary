const menu = document.getElementById("menu")
const renderSection = document.getElementById("render-area")

// ⬇️ EVENT LISTENERS ⬇️

menu.addEventListener("click", handleMenuClick)

// ⬇️ EVENT HANDLERS ⬇️

function handleMenuClick(e) {
    console.log(e.target.id)

    if (e.target.id === "cocktail-btn") {
        console.log("Get cocktail info")
    }
}

// ⬇️ UTILITY FUNCTIONS ⬇️