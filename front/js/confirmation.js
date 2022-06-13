const orderId = idOrder()
displayIdOrder(orderId)
deleteCache()

// Get ID of order
function idOrder() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get("orderId")
}

// Display ID of order
function displayIdOrder(orderId) {
  const orderIdElement = document.querySelector("#orderId")
  orderIdElement.textContent = orderId
}

// Delete Cache
function deleteCache() {
  const cache = window.localStorage
  cache.clear()
}