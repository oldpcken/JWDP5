// Get the product data passed from the all products page

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
// current product intialize
const currentProduct = {
  imgUrl: '',
  name: '',
  varnish: '',
  unitPrice: ''
}

// Retieve the product ID > call the single product ID if one exists
// Get one product data from the database from passed query selector

let url1 = window.location.href;
let newUrl = new URL(url1);
let id = newUrl.searchParams.get('id');

// Use that to get the product data
// Turn the response into a JS object

function retrieveProduct() {

    return new Promise((resolve, reject) => {
      
      productRequest.open('GET', url + id);             // open a GET api
      
      productRequest.onreadystatechange = () => {

        if (productRequest.readyState === 4) {
          
          if (productRequest.status === 200 || productRequest.status === 201) {

              resolve(JSON.parse(productRequest.response));    // retrieve the response if successful
              
          } else {
              reject(JSON.parse(productRequest.response));
          }
          const objArray = JSON.parse(productRequest.response); 
                             
          createCard(objArray);
          
        }
        
      };
      productRequest.send();
    });
   
};

retrieveProduct();

// Create the product cards / page layout
// Add picture, title, description, price, pulldown customize menu, & add to cart button
// Create function to build the card that programmatically build and append cards to the DOM

function createCard(cardObj) {
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

    currentProduct.imgUrl = cardObj.imageUrl;
    currentProduct.name = cardObj.name;
    currentProduct.unitPrice = cardObj.price;
    
    // console.log(currentProduct);
  
  };

// Create function to build pulldown menu for customization,

function createPulldown(array) {
  const pulldown = document.createElement('select');
  const length = array.length;
    
  for(let i = 0; i < length; i++) {
    const option = document.createElement('option');
    option.setAttribute('value', array[i]);
    if (i === 0) {
     currentProduct.varnish = array[i];
    //  console.log('current', currentProduct);
    }
    option.innerText = array[i];
 
    pulldown.appendChild(option);
  }

  // Add event listener for varnish choice change

  pulldown.addEventListener( 'change', (ev) => {
    // console.log(ev.target.value);
    currentProduct.varnish = ev.target.value;
    // console.log(currentProduct);
  });   

  return pulldown;
}

// Add event listener for "add to cart" button
  
// Add product data to local storage in an array, add check for dupes
// localStorage.setItem(one object); -->NO cycle through retrieved objects

// add to local storage as a string  |  JSON.stringify
// keep localstorage cart synced to cart array on page

function addToCart(item) {
  // console.log(e);
  //get a product object
  // const imgUrl = cardObj.imageUrl;
  
  //Create an array entry if not existing in local storage
  // JSON.parse(localStorage.getItem('products[]') || "[]");
    let doPush = false;
    if (cartArray === []) {
      console.log('cart before push', cartArray);
      cartArray.push(item);
      localStorage.setItem('cart', JSON.stringify(cartArray));
      //return;
    } else {
      console.log('on the else')
      //temp code
      cartArray.push(item);
      localStorage.setItem('cart', JSON.stringify(cartArray));
      cartArray = JSON.parse(localStorage.getItem("cart"));
      //localStorage.clear();
      console.log(localStorage.length);
    }
    
  console.log('cartarry', cartArray);

  //Call an updateCart() fuction
  //let addToCart = document.getElementById('addToCart');
    
}

// function updateCart() {
    //
//}



