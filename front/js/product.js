// Get url name & id
const getUrlId = window.location.search


// Get parameters from url
const pageParams = new URLSearchParams(getUrlId)


// Get id from parameters of url
const id = pageParams.get("id")


// URL for get product data
const getProductData = `http://localhost:3000/api/products/${id}`


// Fetch back-end data for products
fetch(getProductData)
.then((response) => response.json())
.then((dataResponse) => getProductsData(dataResponse))
.catch(() => alertError())


// Alert error function
function alertError() {
    alert("Un problème est survenu, nous sommes désolés pour la gêne occasionnée.")
}


// Get products from Back-end
function getProductsData(data) {

    // Get data & Send to functions addTitle, addPrice, addDescription, addColorChoice, addImg
    const { name, imageUrl, altTxt, description, price, colors } = data
    addImg(imageUrl, altTxt)
    addTitle(name)
    addPrice(price)
    addDescription(description)
    addColorChoice(colors)
}


// Add name to product
function addTitle (name) {
    const selectorTitle = document.querySelector("#title")
    selectorTitle.textContent = name
}


// Add price to product
function addPrice (price) {
    const selectorPrice = document.querySelector("#price")
    selectorPrice.textContent = price
}


// Add description to product
function addDescription (description) {
    const selectorDescription = document.querySelector("#description")
    selectorDescription.textContent = description
}


// Add choice of color to product
function addColorChoice (colors) {
    const colorSelector = document.querySelector("#colors")

    colors.forEach(color => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        colorSelector.appendChild(option)
    })
}


// Create image for product
function addImg (imageUrl, altTxt) {
    const img = document.createElement("img")
    img.src = imageUrl
    img.alt = altTxt

    const selectorIMG = document.querySelector(".item__img")
    selectorIMG.appendChild(img)

}



/*----------------------------------------ADD TO CART----------------------------------------*/


// Add to cart button SUCCESS & redirect to cart page
function productAdded() {
    alert("Le produit a été ajouté au panier.")
    if ( confirm( "Allez au panier ?" )) {
        window.location.href = "cart.html"
    } else {
        alert("Votre produit a bien été ajouté au panier.")
    }
}


// Button add to cart & create product object for local storage
const button = document.querySelector("#addToCart")

if (button !== null) { // Security check for button
    button.addEventListener("click", () => {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        const price = document.querySelector("#price").textContent
        const name = document.querySelector("#title").textContent
        const img = document.querySelector(".item__img").querySelector("img").src
        const alt = document.querySelector(".item__img").querySelector("img").alt

        if (quantity === "0" || color === "") { // Check if color or quantity is empty
            alert("Veuillez remplir tous les champs")

        } else { // If color and quantity are not empty
            const product = { // Create product object for add to local storage
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


// Add product in Local Storage
function addToCart(product) {
    const productKey = "Kanap" // Create product key for local storage
    const cart = localStorage.getItem(productKey) // Get cart from local storage

    if (cart === null) { // If cart is empty
        const products = []
        products.push(product)
        const data = JSON.stringify(products)
        localStorage.setItem(productKey, data) // Add product data to local storage
        productAdded()

    } else { // If cart is not empty
        const products = JSON.parse(cart)
        products.push(product)
        const data = JSON.stringify(products)
        localStorage.setItem(productKey, data) // Add product data to local storage
        productAdded()
    }
}