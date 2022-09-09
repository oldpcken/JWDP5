// JS for the single product page

// Get the shopping cart total from local storage
updateCartQty();

// Product objects in array arrainged like this...
// const productObj = [
//     'varnish[]',
//     '_id',
//     'name',
//     'price',
//     'description',
//     'imageUrl'
// ];

let cartStr = localStorage.getItem('cart') || '[]'; 
let cartArray = JSON.parse(cartStr);

// Current product intialization
const currentProduct = {
  id: '',
  imgUrl: '',
  name: '',
  varnish: '',
  unitPrice: '',
  qty: 1
}

// Get the product data passed from the All Products page

let productRequest = new XMLHttpRequest();            // create the instance of XMLHttprequest
const url = "http://localhost:3000/api/furniture/";   // create the URL string

// Retieve the product ID > call the single product ID if one exists
// Get one product data from the database from passed query selector

let url1 = window.location.href;
let newUrl = new URL(url1);
let id = newUrl.searchParams.get('id');

//-------------------------------
// Retrieve product data function

function retrieveProduct() {
    return new Promise((resolve, reject) => {
      
        productRequest.open('GET', url + id);       // open a GET api
      
        productRequest.onreadystatechange = () => {

            if (productRequest.readyState === 4) {
          
                if (productRequest.status === 200 || productRequest.status === 201) {

                    resolve(JSON.parse(productRequest.response));    // retrieve the response if successful
                } else {
                    reject(JSON.parse(productRequest.response));                    
                }
                
                const objArray = JSON.parse(productRequest.response); 
                           
                createCard(objArray);          
            };
        };
        productRequest.send();
    });   
};

retrieveProduct();

//------------------------------------------------
// Create the product cards & page layout function
// Add picture, title, description, price, pulldown customize menu, & add to cart button

function createCard(cardObj) {
    
    const main = document.getElementById('product');
    const card = document.createElement('div');
    const image = document.createElement('img'); 
    const name = document.createElement('h2');
    const description = document.createElement('p');
    const price = document.createElement('h3');
    const cart = document.createElement('button');
    const label = document.createElement('h4');
      
    card.classList.add('card', 'col');
    
    image.classList.add('card-img-top');
    image.setAttribute('src', cardObj.imageUrl);
    image.setAttribute('alt', 'furniture image');

    cart.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-inline', 'm-4');
    cart.innerText = 'Add to Cart';
    
    description.classList.add('text-center');
    description.classList.add('p-1');
    description.innerText = cardObj.description;

    price.classList.add('text-center');
    price.classList.add('p-2');

    label.classList.add('text-left');
    label.innerHTML = "Choice of Varnish:";
        
    let priceFmt =  (cardObj.price / 100);
    price.innerText = ('$' +  priceFmt.toFixed(2));

    name.classList.add('text-center');
    name.innerText = cardObj.name;
        
    cart.addEventListener('click', () => {
      addToCart(currentProduct);
    });

    main.appendChild(card);
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(label);
    card.appendChild(createPulldown(cardObj.varnish));
    card.appendChild(cart);

    currentProduct.id = cardObj._id;
    currentProduct.imgUrl = cardObj.imageUrl;
    currentProduct.name = cardObj.name;
    currentProduct.unitPrice = cardObj.price;
           
};

//------------------------------------------------------
// Build pulldown menu for varnish customization function

function createPulldown(array) {
    const pulldown = document.createElement('select');
    const length = array.length;
    
    for(let i = 0; i < length; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', array[i]);
        if (i === 0) {
            currentProduct.varnish = array[i];
        }
        option.innerText = array[i];
        pulldown.appendChild(option);
    }

    //----------------------------------------- 
    // Event listener for varnish choice change

    pulldown.addEventListener( 'change', (ev) => {
        currentProduct.varnish = ev.target.value;
    });   

    return pulldown;
}

//-------------------------------------------------
// Add unique product data to shopping cart function

function addToCart(item) {
  
    let doPush = true;
  
    for (let i = 0; i < cartArray.length; i++) {
            
        if (currentProduct.id === cartArray[i].id &&
        currentProduct.varnish === cartArray[i].varnish) {
            doPush = false;      
        };

    };
    
    if (doPush) {  
        cartArray.push(currentProduct);
        syncCart();
        alert('Product added to shopping cart!');
    
        updateCartQty();
    } else {
        alert('Product already exists in shopping cart! If you want another of this item, you can increase the quantity when you go to the shopping cart.');
    };
  
};  

//--------------------------------------------------
// Sync up the cart array and local storage function

function syncCart() {
  localStorage.setItem('cart', JSON.stringify(cartArray)); 
  cartArray = JSON.parse(localStorage.getItem('cart'));
};

//------------------------------
// Update Cart Quantity function

function updateCartQty() {

    // Initialize quantity
    let totalQty = 0
  
    const cartIcon = document.getElementsByClassName("cart-qty")[0];
    const storage = JSON.parse(localStorage.getItem('cart'));

    if (storage === [] || storage === null) {
        totalQty = 0;
      
    } else {
        for (let i=0; i<storage.length; i++) {
            totalQty = totalQty + parseInt(storage[i].qty)
        }
    }

    localStorage.setItem('qty', JSON.stringify(totalQty));
    cartIcon.innerText = totalQty;
};