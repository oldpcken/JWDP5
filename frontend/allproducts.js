//  pseudo code for all products

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
    
// Get all product data from the database

function retrieveProducts() {
  return new Promise((resolve, reject) => {
    
    productRequest.open('GET', url);                  // open a GET api
    //console.log(url);
    productRequest.onreadystatechange = () => {
      if (productRequest.readyState === 4) {
        //console.log(productRequest.readyState);
        
        if (productRequest.status === 200 || productRequest.status === 201) {
            resolve(JSON.parse(productRequest.response)); // retrieve the response if successful
            //console.log(productRequest.response);
        } else {
            reject(JSON.parse(productRequest.response));
        }
        const objArray = JSON.parse(productRequest.response); 
        // loop thru responses to create an array of objects
        // turn the JSON into a JS array of opjects
        
        for (let i = 0; i < objArray.length; i++) {
          //console.log(objArray.length);
          //console.log(objArray[i]);
          createCard(objArray[i]);
        }
        updateQty();
        // create cart number items
        // updateCartItems();
      }
    };
    productRequest.send();
  });
 
}

retrieveProducts();

// Create the product cards / page layout
// Cards will have pic, name, & button to go to single product page

// build functions that iterate over that data (for loops) to programmatically build and append cards to the DOM

function createCard(cardObj) {
  const main = document.getElementById('products');
  const card = document.createElement('div');
  const image = document.createElement('img'); 
  const name = document.createElement('h2');
  const btn = document.createElement('a');

  main.classList.add("d-flex", "flex-wrap");
  card.classList.add("card");
  card.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl');
  card.classList.add("d-inline-flex");
  image.classList.add("card-img-top");
  image.setAttribute("src", cardObj.imageUrl);
  image.setAttribute("alt", 'furniture image');
  // btn.classList.add("d-inline-flex");
  btn.classList.add("btn");
  btn.classList.add("btn-primary");
  btn.classList.add("btn-lg");
  btn.setAttribute('type', 'button');
  btn.setAttribute('href', `singleproduct.html?id=${cardObj._id}`);
  btn.innerText = 'Product Details';
  name.classList.add('text-center');
  name.innerText = cardObj.name;
    
  //console.log(card);
  //console.log(name.innerHtml);
  //console.log(image);
  //console.log(btn);

  main.appendChild(card);
  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(btn);

// // each link has the _id of a product attached to it as a query parameter
//
};

// the request returns a response

// use JSON.parse to convert response into array

// create loop to update the html

// Add event listener for the buttons
// create a link for the single product page, E.G. singleproduct.html?id=${product._id}
// generateButton.addEventListener('click', () => {
//     productDetails();
// });
// function updateCartItems() {
//   const num = 0;
//   let qty = 0;
//   const storage = JSON.parse(localStorage.getItem('cart'));
  
  // use ES6 to get quantity from storage
  // num = storage.reduce((a,b) => ({qty:a.qty + b.qty}));
// }

function updateQty() {
  const cartIcon = document.querySelector('.fa-shopping-cart');
  cartIcon.setAttribute('value', '600')
}