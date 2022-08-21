//  All products page display


// Get the shopping cart totals from local storage
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
                
        for (let i = 0; i < objArray.length; i++) {
          //console.log(objArray[i]);
          createCard(objArray[i]);
        }       
      }
    };
    productRequest.send();
  });
 
}

retrieveProducts();

//---------------------------------------------
// Create the product cards / page layout function
// Cards will have pic, name, & button to go to single product page

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
  btn.classList.add("btn");
  btn.classList.add("btn-primary");
  btn.classList.add("btn-lg");
  btn.setAttribute('type', 'button');
  btn.setAttribute('href', `singleproduct.html?id=${cardObj._id}`);
  btn.innerText = 'Product Details';
  name.classList.add('text-center');
  name.innerText = cardObj.name;
    
  main.appendChild(card);
  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(btn);

};

//--------------------------------------------
// Update Cart Quantity function

function updateCartQty() {

  // Initialize quantity in local storage
  let totalQty = 0

  //this will calculate the # of items appearing in the cart
  // console.log('The Update Cart Quantity Function is Engaged!')

  const cartIcon = document.getElementsByClassName("cart-qty")[0];
  const storage = JSON.parse(localStorage.getItem('cart'));

  console.log('storage is ', storage);
  console.log('totalQty is ', totalQty);

  if (storage === [] || storage === null) {
      totalQty = 0;
      
  } else {
      for (let i=0; i<storage.length; i++) {
        totalQty = totalQty + parseInt(storage[i].qty)
      }
  }

  localStorage.setItem('qty', JSON.stringify(totalQty));
  cartIcon.innerText = totalQty;
  
  // console.log(totalQty);

}
