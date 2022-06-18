// Get the product data passed from the All Products page

// Get the shopping cart total from local storage
updateCartQty();

// Objects in array arrainged like this...
// const productObj = [
//     'varnish[]',
//     '_id',
//     'name',
//     'price',
//     'description',
//     'imageUrl'
// ];

let productRequest = new XMLHttpRequest();            // create the instance of XMLHttprequest
const url = "http://localhost:3000/api/furniture/";   // create the URL string

let cartStr = localStorage.getItem('cart') || '[]'; 
let cartArray = JSON.parse(cartStr);

// Current product intialize
const currentProduct = {
  id: '',
  imgUrl: '',
  name: '',
  varnish: '',
  unitPrice: '',
  qty: 1
}

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
    console.log(cardObj);
    const main = document.getElementById('product');
    const card = document.createElement('div');
    const image = document.createElement('img'); 
    const name = document.createElement('h2');
    const description = document.createElement('p');
    const price = document.createElement('h3');
    const cart = document.createElement('button');
    const label = document.createElement('h4');
      
    card.classList.add("card");
    card.classList.add("col");
    image.classList.add("card-img-top");
    image.setAttribute("src", cardObj.imageUrl);
    image.setAttribute("alt", 'furniture image');
    cart.classList.add("btn");
    cart.classList.add("btn-primary");
    cart.classList.add("btn-lg");
    cart.classList.add("btn-inline");
    cart.classList.add("m-4");
    description.classList.add("text-center");
    description.classList.add('p-1');
    price.classList.add('text-center');
    price.classList.add('p-2');
    label.classList.add('text-left');
    
    cart.innerText = 'Add to Cart';
    description.innerText = cardObj.description;
    let priceFmt =  (cardObj.price / 100);
    price.innerText = ('$' +  priceFmt.toFixed(2)); 
    name.classList.add('text-center');
    name.innerText = cardObj.name;
    label.innerHTML = "Choice of Varnish:";
    
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
    // currentProduct.qty = cardObj.qty;
        
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
//end of add to cart function

//--------------------------------------------------
// Sync up the cart array and local storage function

function syncCart() {
  localStorage.setItem('cart', JSON.stringify(cartArray)); 
  cartArray = JSON.parse(localStorage.getItem('cart'));
}

//------------------------------
// Update Cart Quantity function

function updateCartQty() {

  // Initialize quantity in local storage
  let totalQty = 0
  
  const cartIcon = document.getElementsByClassName("cart-qty")[0];
  const storage = JSON.parse(localStorage.getItem('cart'));

  if (storage === []) {
      totalQty = 0;
      
  } else {
      for (let i=0; i<storage.length; i++) {
        totalQty = totalQty + parseInt(storage[i].qty)
      }
  }

  localStorage.setItem('qty', JSON.stringify(totalQty));
  cartIcon.innerText = totalQty;
}