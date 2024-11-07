const menu = document.getElementById("menu")
const renderSection = document.getElementById("render-area")
let cocktailsToRender = []
let currentSlide = 0
let flipped = false

// ⬇️ EVENT LISTENERS ⬇️

menu.addEventListener("click", handleMenuClick)
renderSection.addEventListener("click", handleDrinkClick)

// ⬇️ EVENT HANDLERS ⬇️

function handleMenuClick(e) {
    if (e.target.id === "cocktail-btn") {
        getData("s")
    }
}

function handleDrinkClick(e) {
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

    if (e.target.id === "flip") {
        flipped = !flipped

        const info = document.getElementById("cocktail-info")
        const img = document.getElementById("cocktail-img")
        const flipButton = document.getElementById("flip")

        if (flipped) {
            info.classList.remove("hidden")
            img.classList.add("hidden")
            flipButton.innerHTML = "See picture"
        } else {
            info.classList.add("hidden")
            img.classList.remove("hidden")
            flipButton.innerHTML = "See recipe"
        }
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

        let drinkInfo = `
            <section id="cocktail-info" class="cocktail-info hidden">
                <section class="cocktail-details">
                    <p class="italic">${cocktail.strCategory}</p>
                    <p class="italic">${cocktail.strAlcoholic}</p>
                    <p class="italic">${cocktail.strGlass}</p>
                    <h2 class="right">Ingredients</h2>
                    <section>${ingredients}</section>
                    <h2 class="right">Recipe</h2>
                    <p class="instructions">${cocktail.strInstructions}</p>
                </section>
            </section>
        `
        let drinkImg = `<img id="cocktail-img" src=${cocktail.strDrinkThumb} alt=${cocktail.strDrink}>`

        cocktailsToRender.push(`
            <section id=${cocktail.idDrink} class="cocktail">
                <section class="controls">
                    <div id="prev-btn" class="slide-button"><</div>
                    <div id="flip" class="flip">See recipe</div>
                    <div id="next-btn" class="slide-button">></div>
                </section>
                <div>
                    <h1>${cocktail.strDrink}</h1>
                    ${drinkImg}
                    ${drinkInfo}
                </div>
            </section>
        `)
    }).join("")

    renderCocktails(cocktailsToRender, 0)
}

// ⬇️ RENDER FUNCTIONS ⬇️

function renderCocktails(arr, slideNum) {
    renderSection.innerHTML = ""
    renderSection.innerHTML = arr[slideNum]

    document.getElementById("cocktail-info").classList.add("hidden")
    document.getElementById("cocktail-img").classList.remove("hidden")
}