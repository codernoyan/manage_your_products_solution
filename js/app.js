const getInputValueById = id => {
    const inputElement = document.getElementById(id);
    const inputValue = inputElement.value;
    inputElement.value = '';
    return inputValue;
}

const addProduct = () => {
    const productName = getInputValueById('product-name');
    const productQuantity = getInputValueById('product-quantity');
    // console.log(productName, productQuantity);

    const productQuantityNumber = Number(productQuantity);

    if (!isNaN(productName) || !Number.isInteger(productQuantityNumber)) {
        console.warn('Your input is invalid');
        return;
    }

    setProductsToLocalStorage(productName, productQuantity);
}

const getProductsFromLocalStorage = () => {
    const allProducts = localStorage.getItem('all-products');
    const allProductsObj = JSON.parse(allProducts);
    return allProductsObj;
}

const setProductsToLocalStorage = (name, quantity) => {
    // console.log(name, quantity)
    let products = getProductsFromLocalStorage();

    if (!products) {
        products = {};
    }
    products[name] = quantity;

    localStorage.setItem('all-products', JSON.stringify(products));
    renderToDisplay()
    console.table(products)
}

const renderToDisplay = () => {
    const cartProducts = getProductsFromLocalStorage();
    // console.table(cartProducts);
    const allProductsContainer = document.getElementById('all-products');
    allProductsContainer.textContent = '';
    for (const product in cartProducts) {
        // console.log(product, cartProducts[product])
        const productName = product;
        const quantity = cartProducts[product];
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="shadow-sm p-3 mb-2 bg-body rounded d-flex justify-content-between align-items-center">
            <div>
            <span class="fs-3">${productName}</span>
            Quantity:<small class="fw-bold">
                ${quantity}
            </small>
            </div>
            <button onclick="deleteProduct('${productName}')" class="btn btn-danger">Delete</button>
        </div>
        `;
        allProductsContainer.appendChild(div);
    }
}

renderToDisplay();

const deleteProduct = name => {
    // console.log(name);
    const allProducts = getProductsFromLocalStorage();
    delete allProducts[name];

    localStorage.setItem('all-products', JSON.stringify(allProducts))
    renderToDisplay();
}