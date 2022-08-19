// Retrieve shopping cart data from localStorage

let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
if (cartArray.length === 0) {
    alert("Your cart is currently empty!");
}
let cartItems = cartArray.length;

console.log(cartArray);

//Get and create elements for the cart
const main = document.getElementById('shoppingcart');
const cartHeader = document.createElement('h4');
const cartHeader2 = document.createElement('h5');
main.classList.add('text-center')
cartHeader.innerText = 'Your Shopping Cart';
main.appendChild(cartHeader);

cartHeader2.classList.add('col-12', 'py-3');
// cartHeader2.setAttribute('display', 'flex');
// cartHeader2.setAttribute('align-items', 'stretch');
cartHeader2.innerText = 'Selection   -   Varnish   -   Price   -   Quantity   -   Total   -   Remove';

main.appendChild(cartHeader2);

let grandTotal = 0;
displayCart();

//-------------------------------------
// Display shoppingcart items function
// Cart items shown: a pic, name, varnish, unit price, quantity, line total, remove button
// A grand total is generated for all line items

function displayCart() {
    
    //cycle thru cart array to create each line of the cart
    for ( let i = 0 ; i < cartItems ; i++ ) {
    
        //create elements to be added to DOM
        const cartLine = document.createElement('div');
        const imageThumb = document.createElement('img'); 
        const name = document.createElement('p');
        const finish = document.createElement('p');
        const price = document.createElement('p');
        const itemNum = document.createElement('p');
        const total = document.createElement('p');
        const remBtn = document.createElement('button');
        const orderTotal = document.createElement('p');
      
        //add classes and attributes to each element
        cartLine.classList.add('d-flex', 'p-1', 'border', 'border-primary', 'rounded');
        cartLine.setAttribute('data-Id', cartArray[i].id);
        cartLine.setAttribute('data-finish', cartArray[i].varnish);

        imageThumb.setAttribute('src', cartArray[i].imgUrl);
        imageThumb.setAttribute('height', 50);
        imageThumb.setAttribute('width', 60);
        imageThumb.classList.add('pt-1');

        name.classList.add('px-1', 'pt-3', 'col-2');
        name.innerText = cartArray[i].name;

        finish.classList.add('px-1', 'pt-3', 'col-1', 'col-sm-2', 'col-md-3');
        finish.innerText = cartArray[i].varnish;

        price.classList.add('px-1', 'pt-3', 'col-1', 'col-sm-2');
        //format price data to money
        let priceFmt =  (cartArray[i].unitPrice / 100);
        price.innerText = ('$' +  priceFmt.toFixed(2));

        itemNum.classList.add('col-xs-2', 'pt-2')
        itemNum.innerHTML = `<input class="form-control" type="number" size="2" value=${cartArray[i].qty} min="1" max="99">`;

        total.classList.add('px-1', 'pt-3', 'col-1', 'col-sm-2', 'col-md-3');

        remBtn.setAttribute('type', 'button');
        remBtn.classList.add('rounded-circle', 'clr');
        // remBtn.setAttribute('height', 20);
        remBtn.innerText = 'X';
        
        //-------------------------------------------------------------
        // Event Listener for triggering deleting an Item from the Cart

        remBtn.addEventListener('click', delCartLine);
                        
        //--------------------------------------------
        // Event Listener for Item Quantity Change
        
        itemNum.addEventListener('change', (e) => {

            //function recalculates cart total price on quantity change & formats it to money
            
            let totalFmt = parseInt(cartArray[i].unitPrice / 100); 
            cartArray[i].qty = e.target.value;
            total.innerText = ' $' + (totalFmt * e.target.value).toFixed(2);
            
            syncCart();          // match up cart array & local storage
            updateGrandTotal();  // Calculate new total for whole page
            updateCartQty();     // Calculate new quantity in cart
        } )
        
        //Caclulate line total and format it for display
        let pageLoadTotal = cartArray[i].qty * parseInt(cartArray[i].unitPrice / 100);
        total.innerText = '$' + pageLoadTotal.toFixed(2);
        
        //assemble cartline & add it to the DOM
        cartLine.appendChild(imageThumb);
        cartLine.appendChild(name);
        cartLine.appendChild(finish);
        cartLine.appendChild(price);
        cartLine.appendChild(itemNum);
        cartLine.appendChild(total);
        cartLine.appendChild(remBtn);
        main.appendChild(cartLine);   

    };

    updateGrandTotal();  // Calculate total for whole page
       
} 

//--------------------------------------------------
// Sync up the cart array and local storage function

function syncCart() {
    //Stringify cart array & push to/replace local storage
    localStorage.setItem('cart', JSON.stringify(cartArray)); 
    //Pull cart string from local storage & parse into cart array object
    cartArray = JSON.parse(localStorage.getItem('cart'));
}

//--------------------------
// Delete cart line function

function delCartLine(ev) {

  console.log(ev);
  // ev.target.parentNode.classList.add('cool');

  // get the product ID
  const id = ev.target.parentNode.dataset.id;
  // get the product finish
  const finish = ev.target.parentNode.dataset.finish;

  console.log(id); 
   
  //use findindex() method to retrieve the index of the product to be deleted
  let index = cartArray.findIndex(o => o.id === id && o.varnish === finish);

  console.log(index);

  //use the splice() method to remove the selected cartline from the array
  cartArray.splice(index,1);

  console.log(cartArray);

  //use the remove method to remove the selected cartline from the DOM
  ev.target.parentNode.remove();

  syncCart();          // match up cart array & local storage
  updateGrandTotal();  // Calculate new total for whole page
  updateCartQty();     // Calculate new quantity in cart

}

//---------------------------------------------
// Update the grand total of the order Function

function updateGrandTotal() {
    // console.log(cartArray);

    //initalize variable
    let total = 0;
    //Cycle thru cart data to calculate the grand total

    for (let i=0; i < cartArray.length; i++) {
        //Multiply each unit price by the quantity of item
        total = total + cartArray[i].unitPrice * cartArray[i].qty;

        // console.log(cartArray[i].unitPrice);
    }
    //grab html ID to append grand total data to
    const orderTotal = document.getElementById('grandtotal');
    //format grand total $ & 2 decimal places - value put in DOM
    orderTotal.innerText = '$' + (total/100).toFixed(2);
    
}

//------------------------------------
// Calculate total line price function

function totatPrice() {
    //Format line price - $ & 2 decimal places, multiply unit price by quantity 
    total.innerText = '$' + ((cartArray[i].unitPrice / 100).toFixed(2) * e.target.value);
};

//--------------------------------------------
//RegEx for input field validation

const fNameRegex = /^[A-Za-z ]{2,32}$/;
const lNameRegex = /^[A-Za-z ]{2,32}$/;
const addressRegex = /^[A-Za-z0-9 ]{5,32}$/;
const cityRegex = /^[A-Za-z ]{3,32}$/;
const stateRegex = /^[A-Za-z ]{2,2}$/;
const zipRegex = /^[0-9 ]{5,5}$/;
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//--------------------------------------------
// Form Validation

let firstNameIsValid = false;
let lastNameIsValid = false;
let addressIsValid = false;
let cityIsValid = false;
let stateIsValid = false;
let zipcodeIsValid = false;
let emailIsValid = false;

// keyup event listeners for all input fields
// If true - adds green, if false - adds red

const fName = document.getElementById('firstName');
const lName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const state = document.getElementById('state');
const zip = document.getElementById('zipcode');
const email = document.getElementById('email');

// let fNameErrorMsg;

fName.addEventListener('keyup', () => {
    // console.log('inside function');
    if (fNameRegex.test(fName.value)) {
        console.log(fName.value);
        fName.style.border = 'solid green';
        firstNameIsValid = true;
    } else {
        fName.style.border = 'solid red';
        firstNameIsValid = false;
    }
    console.log(firstNameIsValid);
});

// Add rest of tests once first one is working!!
fName.addEventListener('keyup', () => {
    // console.log('inside function');
    if (fNameRegex.test(fName.value)) {
        console.log(fName.value);
        fName.style.border = 'solid green';
        firstNameIsValid = true;
    } else {
        fName.style.border = 'solid red';
        firstNameIsValid = false;
    }
    console.log(firstNameIsValid);
});
// last name
lName.addEventListener('keyup', () => {
    // console.log('inside function');
    if (lNameRegex.test(lName.value)) {
        console.log(lName.value);
        lName.style.border = 'solid green';
        lastNameIsValid = true;
    } else {
        lName.style.border = 'solid red';
        lastNameIsValid = false;
    }
    console.log(lastNameIsValid);
});
// address
address.addEventListener('keyup', () => {
    // console.log('inside function');
    if (addressRegex.test(address.value)) {
        console.log(address.value);
        address.style.border = 'solid green';
        addressIsValid = true;
    } else {
        address.style.border = 'solid red';
        addressIsValid = false;
    }
    console.log(addressIsValid);
});
//city
city.addEventListener('keyup', () => {
    // console.log('inside function');
    if (cityRegex.test(city.value)) {
        console.log(city.value);
        city.style.border = 'solid green';
        cityIsValid = true;
    } else {
        city.style.border = 'solid red';
        cityIsValid = false;
    }
    console.log(cityIsValid);
});
//state
state.addEventListener('keyup', () => {
    // console.log('inside function');
    if (stateRegex.test(state.value)) {
        console.log(state.value);
        state.style.border = 'solid green';
        stateIsValid = true;
    } else {
        state.style.border = 'solid red';
        stateIsValid = false;
    }
    console.log(stateIsValid);
});
//zip
zip.addEventListener('keyup', () => {
    // console.log('inside function');
    if (zipRegex.test(zip.value)) {
        console.log(zip.value);
        zip.style.border = 'solid green';
        zipcodeIsValid = true;
    } else {
        zip.style.border = 'solid red';
        zipcodeIsValid = false;
    }
    console.log(zipcodeIsValid);
});
//email
email.addEventListener('keyup', () => {
    // console.log('inside function');
    if (emailRegex.test(email.value)) {
        console.log(email.value);
        email.style.border = 'solid green';
        emailIsValid = true;
    } else {
        email.style.border = 'solid red';
        emailIsValid = false;
    }
    console.log(emailIsValid);
});

email.addEventListener('keyup', () => {
  if (firstNameIsValid === true && lastNameIsValid === true && addressIsValid === true && cityIsValid === true && stateIsValid === true && zipcodeIsValid === true && emailIsValid === true) {
      // document.getElementById('order').disabled = false;
      
  } else {
      console.log('All fields must not be valid!!')
  }
});

//--------------------------------------------
// Create a makeOrder() function to send data to the confirmation page

const subOrder = document.getElementById('order');
// const formData = document.getElementById('form-group');

//--------------------------------------------
// Event Listener for the Make Order Button

subOrder.addEventListener('click', (ev) => {

    if (true) {
    let order = {
        contact: {
         firstName: "",
         lastName: "",
         address: "",
         city: "",
         state: "",
         email: ""
       },
       products: []
      }
          
      getFormData(order);

    //   console.log(order);

      getOrderData(order);

    ev.preventDefault();
    let productOrder = new XMLHttpRequest();            // create the instance of XMLHttprequest
    const url = "http://localhost:3000/api/furniture";   // create the URL string

    return new Promise((resolve, reject) => {
      
        productOrder.open('POST', url + "/order");             // open a POST api
        
        productOrder.onreadystatechange = () => {
          if (productOrder.readyState === 4) {
            if (productOrder.status === 200 || productOrder.status === 201) {

                console.log('product order status is ', productOrder.status)

                resolve(JSON.parse(productOrder.response));    // retrieve the response if successful
                
                console.log('The product order response is ', productOrder.response);
            } else {
                reject(JSON.parse(productOrder.response));

                console.log('The rejected product order response is ', productOrder.response);
            }
            const objOrdArray = JSON.parse(productOrder.response);   
            
            // console.log('The JSON parsed response is ', objOrdArray);
            location.href='confirmation.html' + '?conf=' + objOrdArray.orderId;
          };
        
        };
        
        body = JSON.stringify(order);
        productOrder.setRequestHeader("Content-Type", "application/json");
        productOrder.send(body);
        console.log('order is', order);
    });

    console.log('Is this not reachable?');
  } else {
    alert('Go back to fill out the form');
  }
});

//-----------------------------------------
// Retrieve data from contact form function

function getFormData(order) {
    order.contact.firstName = document.getElementById('firstName').value;
    order.contact.lastName = document.getElementById('lastName').value;
    order.contact.address = document.getElementById('address').value;
    order.contact.city = document.getElementById('city').value;
    order.contact.state = document.getElementById('state').value;
    order.contact.zipcode = document.getElementById('zipcode').value;
    order.contact.email = document.getElementById('email').value;

    console.log('Get Form Data');    
}

//------------------------------------------
// Retrieve order data for the post function

function getOrderData(array) {
    //    - gather cart data (as an array?) to be passed to confirmation page
    for (let i=0; i < cartArray.length; i++) {
        array.products.push(cartArray[i].id)        
    }
    console.log(array.products);
}

updateCartQty();

//------------------------------
// Update Cart Quantity function

function updateCartQty() {

    // Initialize quantity in local storage
    let totalQty = 0
  
    //this will calculate the # of items appearing in the cart
    // console.log('The Update Cart Quantity Function is Engaged!')
  
    const cartIcon = document.getElementsByClassName("cart-qty")[0];
    const storage = JSON.parse(localStorage.getItem('cart'));
    // console.log(cartIcon);
    if (storage === []) {
        totalQty = 0;
        
    } else {
        for (let i=0; i<storage.length; i++) {
          totalQty = totalQty + parseInt(storage[i].qty)
        }
    }
  
    localStorage.setItem('qty', JSON.stringify(totalQty));
    cartIcon.innerText = totalQty;
    
    console.log('total quantity is', totalQty);
  
  }

