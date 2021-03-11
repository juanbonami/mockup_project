
(function ($) {

    $(document).ready(function () {

        $('.carousel').flickity({
            contain: false,
            cellAlign: 'left'
        });

        $('.start').flickity({
            groupCells: 1,
            setGallerySize: false
        })
    })

})(jQuery)


const faders = document.querySelectorAll('.fade-in');

const options = {
    rootMargin: '0px 0px -100px 0px'
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    })
}, options);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {
    let removeCartItemButton = document.getElementsByClassName('remove-button');
    console.log(removeCartItemButton);
    for (let i = 0; i < removeCartItemButton.length; i++) {
        let button = removeCartItemButton[i]
        button.addEventListener('click', removeCartItem)
    }
}


function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (var i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


// let carts = document.querySelectorAll('.add-cart');

// let products = [
//     {
//         name: 'Hand wash',
//         tag: 'handwash',
//         price: 50,
//         inCart: 0
//     },
//     {
//         name: 'Hand Balm',
//         tag: 'handbalm',
//         price: 60,
//         inCart: 0
//     }
// ]

// for (let i = 0; i < carts.length; i++) {
//     carts[i].addEventListener('click', () => {
//         cartNumbers(products[i]);
//         totalCost(products[i]);
//         displayCart();

//     })

// }

// window.addEventListener('load', () => {
//     removeButtonFunction();
// })

// function removeButtonFunction() {
//     let remove = document.querySelectorAll('.remove-button');
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
//     console.log(cartItems)
//     Object.values(cartItems).map(val => {
//         console.log(val);
//         for (let i = 0; i < remove.length; i++) {
//             remove[i].addEventListener('click', (event) => {
//                 console.log('works');
//                 console.log(val);
//                 removeCartNumbers(val, event);
//                 console.log(val);
//             })
//         }
//     })

// }





// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');
//     if (productNumbers) {
//         document.querySelector('.nav-link span').textContent = productNumbers;
//     }
// }

// function cartNumbers(product) {
//     let productNumbers = localStorage.getItem('cartNumbers');
//     productNumbers = parseInt(productNumbers);

//     if (productNumbers) {
//         localStorage.setItem('cartNumbers', productNumbers + 1);
//         document.querySelector('.nav-link span').textContent = productNumbers + 1;

//     }
//     else {
//         localStorage.setItem('cartNumbers', 1);
//         document.querySelector('.nav-link span').textContent = 1;
//     }

//     setItems(product);

// }

// function removeCartNumbers(product, e) {
//     let productNumbers = localStorage.getItem('cartNumbers');
//     productNumbers = parseInt(productNumbers);

//     if (productNumbers) {
//         localStorage.setItem('cartNumbers', productNumbers - 1);
//         document.querySelector('.nav-link span').textContent = productNumbers - 1;
//     }
//     decrementItems(product, e)
// }

// function setItems(product) {
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     if (cartItems != null) {

//         if (cartItems[product.tag] == undefined) {
//             cartItems = {
//                 ...cartItems,
//                 [product.tag]: product
//             }
//         }
//         cartItems[product.tag].inCart += 1;
//     } else {
//         product.inCart = 1;

//         cartItems = {
//             [product.tag]: product
//         }
//     }
//     localStorage.setItem('productsInCart', JSON.stringify(cartItems));
// }

// function decrementItems(product, e) {
//     // let cartItems = localStorage.getItem('productsInCart');
//     // cartItems = JSON.parse(cartItems);
//     // let productContainer = document.querySelector('.products-container');
//     // console.log(product);
//     // console.log(cartItems);


//     let removeButton = e.targer
//     removeButton.parentElement.remove();
//     //updateCart();

//     //updateCart()
//     //console.log(cartItems[product.tag]);
//     // product.inCart = 2;
//     localStorage.setItem('productsInCart', JSON.stringify(cartItems));
//     //updateCart();
//     //displayCart()
// }

// function totalCost(product) {
//     //console.log('The product price is', product.price);
//     let cartCost = localStorage.getItem('totalCost');

//     if (cartCost != null) {
//         cartCost = parseInt(cartCost);
//         localStorage.setItem('totalCost', cartCost + product.price);
//     } else {
//         localStorage.setItem('totalCost', product.price);
//     }

// }

// // function updateCart(product) {
// //     let cartItems = localStorage.getItem('productsInCart');
// //     cartItems = JSON.parse(cartItems);
// //     console.log(cartItems);

// //     let productContainer = document.querySelector('.products-container');
// //     console.log(product)

// //     // for (let i in product) {
// //     // console.log(product[i].inCart)
// //     // console.log(product[i]);
// //     if (product.inCart != 0) {
// //         productContainer.innerHTML = `
// //             <div class="row">
// //                 <div class="product-row col-4">
// //                     ${product.name}  
// //                 </div>
// //                 <div class="product-row col-4">
// //                     $${product.price}.00 
// //                 </div>
// //                 <div id="remove" class="product-row col-4">
// //                     <div> ${product.inCart} </div>
// //                     <p class="remove-button"> REMOVE </p>
// //                 </div>
// //             </div>`;
// //     }
// //     else {
// //         productContainer.innerHTML = '';
// //     }
// //     //removeButtonFunction();
// //     console.log('hello')
// //     //}
// //     removeButtonFunction();

// //     // Object.values(cartItems).map(val => {
// //     //     if (val.inCart == 0) {

// //     //     }
// //     // })
// // }

// function displayCart() {
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
//     let subtotal = localStorage.getItem('totalCost');
//     subtotal = JSON.parse(subtotal);

//     let productContainer = document.querySelector('.products-container');
//     let total = document.querySelector('.total-cost');

//     console.log(cartItems);
//     console.log(subtotal);
//     if (cartItems && productContainer) {
//         productContainer.innerHTML = '';
//         Object.values(cartItems).map(item => {
//             productContainer.innerHTML += `
//             <div class="row">
//                 <div class="product-row col-4">
//                     ${item.name}  
//                 </div>
//                 <div class="product-row col-4">
//                     $${item.price}.00 
//                 </div>
//                 <div id="remove" class="product-row col-4">
//                     <div> ${item.inCart} </div>
//                     <p class="remove-button"> REMOVE </p>
//                 </div>
//             </div>`
//         })

//         total.innerHTML = `<div> $${subtotal} </div> <div> Subtotal </div>`
//     }
// }


// // function removeItem() {

// //     let items = localStorage.getItem('productsInCart');
// //     items = JSON.parse(items);

// //     let cartCost = localStorage.getItem('totalCost');
// //     cartCost = parseFloat(cartCost);

// //     window.addEventListener('load', () => {
// //         let remove = document.querySelectorAll('.remove-button');
// //         for (let i = 0; i < remove.length; i++) {
// //            remove[i].addEventListener('click', () => {
// //                console.log(remove[i]);
// //         if (items != null) {
// //             Object.keys(items).map(i => {
// //                 delete items.handwash;
// //             })
// //             //delete items.handwash;
// //             //console.log(Object.keys(items));
// //             updatedItems(items);
// //             displayCart();

// //             }

// //         }) 
// //         }

// //       });  
// // }


// // function updatedItems(param) {
// //     localStorage.setItem('productsInCart', JSON.stringify(param));
// //             Object.values(param).map(updatedPrice => {
// //                 console.log(updatedPrice.price)
// //                 localStorage.setItem('totalCost', updatedPrice.price);
// //             })
// // }

// // window.addEventListener('load', () => {
// //    let remove = document.querySelectorAll('.remove-button');
// // for (let i = 0; i < remove.length; i++) {
// //     remove[i].addEventListener('click', () => {
// //         displayCart();
// //     })
// // } 
// // })


// // let items = localStorage.getItem('productsInCart');
// // items = JSON.parse(items);
// // console.log(items);
// // localStorage.removeItem(items[items]);
// // console.log(items);

// //removeItem();




// onLoadCartNumbers();

// displayCart();

function openCart() {
    document.getElementById('cart').style.height = "600px";
    // document.getElementById('mainbox').style.marginTop="300px";
    document.getElementById('closebtn').style.marginTop = "600px"
}

function closeCart() {
    document.getElementById('cart').style.height = "0px";
    document.getElementById('mainbox').style.marginTop = "0px";
    document.getElementById('closebtn').style.marginTop = "0px"
    // document.getElementById('mainbox').innerHTML="&#9776; Open";
}