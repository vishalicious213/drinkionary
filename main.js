const menu = document.getElementById("menu")
const renderSection = document.getElementById("render-area")
let cocktailsToRender = []
let currentSlide = 0

// ⬇️ EVENT LISTENERS ⬇️

menu.addEventListener("click", handleMenuClick)

renderSection.addEventListener("click", handleDrinkClick)

// ⬇️ EVENT HANDLERS ⬇️

function handleMenuClick(e) {
    console.log(e.target.id)

    if (e.target.id === "cocktail-btn") {
        getData("s")
    }
}

function handleDrinkClick(e) {
    console.log(e.target.id)

    if (e.target.id === "prev-btn") {
        currentSlide--

        if (currentSlide < 0) {
            currentSlide = cocktailsToRender.length - 1
        }

        renderCocktails(cocktailsToRender, currentSlide)
    }

    if (e.target.id === "next-btn") {
        currentSlide++

        if (currentSlide > cocktailsToRender.length - 1) {
            currentSlide = 0
        }

        renderCocktails(cocktailsToRender, currentSlide)
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
            getCocktails(data.drinks)
        }
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })
}

function getCocktails(arr) {
    cocktailsToRender = []
    console.log(arr)

    arr.map(cocktail => {
        let ingredients = ""

        for (let i = 1; i <= 15; i++) {
            // console.log(cocktail[`strIngredient${i}`])
            if (cocktail[`strIngredient${i}`] !== null) {
                if (cocktail[`strMeasure${i}`] === null) {
                    cocktail[`strMeasure${i}`] = ""
                }
                ingredients += `<p>${cocktail[`strMeasure${i}`]} ${cocktail[`strIngredient${i}`]}</p>`
            }
        }

        cocktailsToRender.push(`
            <section id=${cocktail.idDrink} class="cocktail">
                <section class="cocktail-info">
                    <div id="prev-btn" class="slide-button"><</div>
                    <section class="cocktail-details">
                        <h1>${cocktail.strDrink}</h1>
                        <p>${cocktail.strCategory}</p>
                        <p>${cocktail.strAlcoholic}</p>
                        <p>${cocktail.strGlass}</p>
                        <h2 class="right">Ingredients</h2>
                        <section>${ingredients}</section>
                        <h2 class="right">Recipe</h2>
                        <p class="instructions">${cocktail.strInstructions}</p>
                    </section>
                    <div id="next-btn" class="slide-button">></div>
                </section>
                <img src=${cocktail.strDrinkThumb} alt=${cocktail.strDrink}>
            </section>
        `)
    }).join("")

    renderCocktails(cocktailsToRender, 0)
}

// ⬇️ RENDER FUNCTIONS ⬇️

function renderCocktails(arr, slideNum) {
    renderSection.innerHTML = ""
    renderSection.innerHTML = arr[slideNum]
}