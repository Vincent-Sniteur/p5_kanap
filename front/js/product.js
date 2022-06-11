const getUrlId = window.location.search; // Get url name & id

const pageParams = new URLSearchParams(getUrlId); // Get parameters from url

const id = pageParams.get("id"); // Get id from parameters of url


const getProductData = `http://localhost:3000/api/products/${id}`; // URL for get product data

// Fetch backend data for products
fetch(getProductData)
.then((response) => response.json())
.then((dataResponse) => getProducts(dataResponse))
.catch((error) => alertError())

// alert error function
function alertError() {
    alert("Un problème est survenu, nous sommes désolés pour la gêne occasionnée.")
}


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
}


// Add price to product
function addPrice (price) {
    const selectorPrice = document.querySelector("#price") // Add selector for price
    if (selectorPrice !== null) { // Security check for price
        selectorPrice.textContent = price // add price from data
    }
}


// Add description to product
function addDescription (description) {
    const selectorDescription = document.querySelector("#description") // Add selector for description
    if (selectorDescription !== null) { // Security check for description
        selectorDescription.textContent = description // Add description from data
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
}





/*----------------------------------------ADD TO CART----------------------------------------*/

// Add to cart button SUCCESS
function productAdded() {
    alert("Le produit a été ajouté au panier.")
    if ( confirm( "Allez au panier ?" )) {
        window.location.href = "cart.html"; // Redirect to cart page
    } else {
        alert("Votre produit a bien été ajouté au panier.")
    }
}


// Add to cart button FAIL
function productNotAdded() {
    alert("Le produit n'a pas pu être ajouté au panier.")
}


// Button add to cart & create product object for cart
const button = document.querySelector("#addToCart") // Add button

if (button !== null) { // Security check for button
    button.addEventListener("click", () => { // Add event listener on button
        const color = document.querySelector("#colors").value // Get value of color
        const quantity = document.querySelector("#quantity").value // Get value of quantity
        const price = document.querySelector("#price").textContent // Get value of price
        const name = document.querySelector("#title").textContent // Get value of name
        const img = document.querySelector(".item__img").querySelector("img").src // Get value of img
        const alt = document.querySelector(".item__img").querySelector("img").alt // Get value of alt

        if (quantity === "0" || color === "") { // Check if color or quantity is empty
            alert("Veuillez remplir tous les champs") // Alert if empty

        } else { // If color and quantity are not empty
            const product = { // Create product object
                id: id,
                name: name,
                quantity: quantity,
                price: price,
                color: color,
                img: img,
                alt: alt
            }
            addToCart(product) // Add product to cart
        }
    })
}

// Toast for product added ( alert ) Library JS - Check si autorisé

// Add product in Local Storage
function addToCart(product) {
    const productKey = "Kanap" // Create product key
    const cart = localStorage.getItem(productKey) // Get cart from local storage

    if (cart === null) { // If cart is empty
        const products = []
        products.push(product)
        const data = JSON.stringify(products)
        localStorage.setItem(productKey, data) // Add data to local storage
        productAdded()

    } else { // If cart is not empty
        const products = JSON.parse(cart)
        products.push(product)
        const data = JSON.stringify(products)
        localStorage.setItem(productKey, data) // Add data to local storage
        productAdded()
    }
}