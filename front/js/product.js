const getUrlId = window.location.search; // Get url name & id

const pageParams = new URLSearchParams(getUrlId); // Get parameters from url

const id = pageParams.get("id"); // Get id from parameters of url


const getProductData = `http://localhost:3000/api/products/${id}`; // URL for get product data

// Fetch backend data for products
fetch(getProductData)
.then((response) => response.json())
.then((dataResponse) => getProducts(dataResponse))


// Get products from database and send to appendChildren function
function getProducts(data) {
    console.log("Kanap:", data); // show products info in console ( temporaire )

    // Get data from database
    const { name, imageUrl, altTxt, description, price, colors } = data;
    createImg(imageUrl, altTxt)
    addTitle(name)
    addPrice(price)
    AddDescription(description)
    colorChoice(colors)
}


// Add name to product
function addTitle (name) {
    const selectorTitle = document.querySelector("#title") // get selector for title
    if (selectorTitle !== null) { // Security check for title
        selectorTitle.textContent = name // add title from data
    }
    else { // show alert if null
        error()
    }
}


// Add price to product
function addPrice (price) {
    const selectorPrice = document.querySelector("#price") // get selector for price
    if (selectorPrice !== null) { // Security check for price
        selectorPrice.textContent = price // add price from data
    }
    else { // show alert if null
       error()
    }
}


// Add description to product
function AddDescription (description) {
    const selectorDescription = document.querySelector("#description") // get selector for description
    if (selectorDescription !== null) { // Security check for description
        selectorDescription.textContent = description // add description from data
    }
    else { // show alert if null
        error()
    }
}


// add choice of color to product
function colorChoice (colors) {
    const colorSelector = document.querySelector("colors") // get selector for color
}


// Create image for product
function createImg (imageUrl, altTxt) {
    const img = document.createElement("img") // create image
    img.src = imageUrl // add image url from data
    img.alt = altTxt // add alt text from data
    const selectorIMG = document.querySelector(".item__img") // get selector for image
    if (selectorIMG !== null) { // Security check for img selector
        selectorIMG.appendChild(img) // add image to selector
    }
    else { // show alert if null
        alert("Un problème est survenu, nous sommes désolés pour la gêne occasionnée.")
    }
}


// Error message for null / undefined values
function error() {
    alert("Un problème est survenu, nous sommes désolés pour la gêne occasionnée.")
}