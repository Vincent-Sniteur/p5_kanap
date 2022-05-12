
const URL = "http://localhost:3000/api/products";


// Fetch backend
fetch(URL)
.then((response) => response.json())
.then((dataResponse) => getProducts(dataResponse))


// Get products from database
function getProducts(data) {
    console.log(data); // show all products

    // Data array of objects uuid
    const productId = data[0]._id

    // Data array of objects Name
    const productName = data[0].name

    // Data array of objects IMG
    const imageUrl = data[0].imageUrl

    // Data array of objects alt
    const altTxt = data[0].altTxt

    // Data array of objects price
    const productPrice = data[0].price


    const h3 = createTitle(productName) // create title
    const images = createImage(imageUrl, altTxt) // create image
    const price = createPrice(productPrice) // create price


    // add link to product
    const link = createLink(productId, productName, imageUrl, altTxt, productPrice)
    const article = createArticle()
    article.appendChild(h3) // add title to article
    article.appendChild(images) // add image to article
    article.appendChild(price)  // add price to article
    appendChildren(link, article) // add link to article  
}


// Create article for product card
function createArticle() {
    const article = document.createElement("article") // Create a element for article
    article.classList.add("products") // add a class to article
    console.log(article) // show article console
    return article // return article
}




// Create product card link from data whith UUID
function createLink(productId) {
    const link = document.createElement("a") // Create a element for link / product
    link.href = "./product.html?id=" + productId // Create a link to product with UUID
    return link
}

// create product card from data TITLE h3
function createTitle(productName) {
    const title = document.createElement("h3") // Create a element for title
    title.textContent = productName // add a text to title
    return title
}

// create product card from data IMG
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img") // Create a element for image
    image.src = imageUrl // add a link to image
    image.alt = altTxt // add a alt for image
    return image
}

// create product card from data paragraph price
function createPrice(productPrice) {
    const price = document.createElement("p") // Create a element for price
    price.textContent = productPrice + "€" // add a text to price
    return price
}

// Add link to product & load items to article
function appendChildren(link, article) {
    const items = document.querySelector("#items"); // select the element for append link
    if (items !== null) { // if element exist
        items.appendChild(link); // append link to element
        link.appendChild(article); // append article to element
    }
}