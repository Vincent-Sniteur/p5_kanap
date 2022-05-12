const getUrlId = window.location.search; // Get url name & id

const pageParams = new URLSearchParams(getUrlId); // Get parameters from url

const id = pageParams.get("id"); // Get id from parameters of url


const getProductData = `http://localhost:3000/api/products/${id}`; // URL for get product data

// Fetch backend data for products
fetch(getProductData)
.then((response) => response.json())
.then((dataResponse) => getProducts(dataResponse))


// Get products from database
function getProducts(data) {
    console.log("Kanap:", data); // Show products info in console ( temporaire )

    // Get data & Send to functions addTitle, addPrice, addDescription, addColorChoice, addImg
    const { name, imageUrl, altTxt, description, price, colors } = data;
    addImg(imageUrl, altTxt)
    addTitle(name)
    addPrice(price)
    addDescription(description)
    addColorChoice(colors)
}


// Add name to product
function addTitle (name) {
    const selectorTitle = document.querySelector("#title") // Add selector for title
    if (selectorTitle !== null) { // Security check for title
        selectorTitle.textContent = name // Add title from data
    }
    else { // Show alert if null
        error()
    }
}


// Add price to product
function addPrice (price) {
    const selectorPrice = document.querySelector("#price") // Add selector for price
    if (selectorPrice !== null) { // Security check for price
        selectorPrice.textContent = price // add price from data
    }
    else { // Show alert if null
       error()
    }
}


// Add description to product
function addDescription (description) {
    const selectorDescription = document.querySelector("#description") // Add selector for description
    if (selectorDescription !== null) { // Security check for description
        selectorDescription.textContent = description // Add description from data
    }
    else { // Show alert if null
        error()
    }
}


// Add choice of color to product
function addColorChoice (colors) {
    const colorSelector = document.querySelector("#colors") // Add selector for color
    if (colorSelector !== null) { // Security check for color selector
        colors.forEach(color => {
            const option = document.createElement("option") // Create option
            option.value = color // Add value to option
            option.textContent = color // Add text to option
            colorSelector.appendChild(option) // Add option to selector
        });
    }
    else { // Show alert if null
        error()
    }
}


// Create image for product
function addImg (imageUrl, altTxt) {
    const img = document.createElement("img") // Create image
    img.src = imageUrl // Add image url from data
    img.alt = altTxt // Add alt text from data
    const selectorIMG = document.querySelector(".item__img") // Add selector for image
    if (selectorIMG !== null) { // Security check for img selector
        selectorIMG.appendChild(img) // Add image to selector
    }
    else { // Show alert if null
        error()
    }
}


// Error message for null / undefined values
function error() {
    alert("Un problème est survenu, nous sommes désolés pour la gêne occasionnée.")
}