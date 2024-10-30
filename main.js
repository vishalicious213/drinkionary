const menu = document.getElementById("menu")
const renderSection = document.getElementById("render-area")

// ⬇️ EVENT LISTENERS ⬇️

menu.addEventListener("click", handleMenuClick)

// ⬇️ EVENT HANDLERS ⬇️

function handleMenuClick(e) {
    console.log(e.target.id)

    if (e.target.id === "cocktail-btn") {
        getData("s")
    }
}

// ⬇️ UTILITY FUNCTIONS ⬇️

function getData(btn) {
    let searchTerm = ""

    if (btn === "s") {
        searchTerm = document.getElementById("search-cocktail").value
    }

    if (!searchTerm) {
        return
    }

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${btn}=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)

        if (btn === "s") {
            renderCocktails(data.drinks)
        }
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })
}

// ⬇️ RENDER FUNCTIONS ⬇️

function renderCocktails(arr) {
    console.log(arr)
}