const URL = "http://localhost:3000/api/products/"; // URL for get products


// Fetch back-end data for products
fetch(URL)
.then((response) => response.json())
.then((dataResponse) => getProductsData(dataResponse))
.catch(() => alertError())
// Get products from back-end and send to getProducts function


// Alert error function
function alertError() {
    alert("Un problème est survenu, nous sommes désolés pour la gêne occasionnée.")
}


// Get products from back-end and send to appendChildren function
function getProductsData(data) {
    for(let i = 0; i < data.length; i++) { // Loop for each product in data

    // Data array of objects id
    const dataId = data[i]._id

    // Data array of objects Name
    const dataName = data[i].name

    // Data array of objects IMG
    const imageUrl = data[i].imageUrl

    // Data array of objects alt
    const altTxt = data[i].altTxt

    // Data array of objects description
    const dataInfo = data[i].description



   // Add link to product
   const link = createLink(dataId, dataName, imageUrl, altTxt, dataInfo)


    // Create article > information for product card
    const h3 = createTitle(dataName)
    const images = createImage(imageUrl, altTxt)
    const description = createDescription(dataInfo)

    const article = document.createElement("article")

    appendArticle(article, images, h3, description)
    appendLinkToArticle(link, article) 

} // End for loop
} // End getProducts function


// Append to Article for product information
function appendArticle(article, images, h3, description) {
    article.appendChild(images)
    article.appendChild(h3)
    article.appendChild(description)
}


// Create link to product with id of product
function createLink(dataId) {
    const link = document.createElement("a")

    link.href = "./product.html?id=" + dataId

    return link
}


// Create title for product card
function createTitle(dataName) {
    const title = document.createElement("h3")

    title.classList.add("productName")
    title.textContent = dataName

    return title
}


// Create img for product card
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")

    image.src = imageUrl
    image.alt = altTxt

    return image
}


// Create description for product card
function createDescription(dataInfo) {
    const description = document.createElement("p")

    description.classList.add("productDescription")
    description.textContent = dataInfo

    return description
}

// Add link to product & load items to article
function appendLinkToArticle(link, article) {
    const items = document.querySelector("#items")

    items.appendChild(link)
    link.appendChild(article)
}