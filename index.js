
(function($){

    $(document).ready(function(){

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

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
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


let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Hand wash',
        tag: 'handwash',
        price: 50,
        inCart: 0
    },
    {
        name: 'Hand Balm',
        tag: 'handbalm',
        price: 60,
        inCart: 0
    }
]

for (let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.nav-link span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
       localStorage.setItem('cartNumbers', productNumbers + 1);
       document.querySelector('.nav-link span').textContent = productNumbers + 1;
 
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.nav-link span').textContent = 1;
    }

    setItems(product);
    
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));

}

function totalCost(product) {
    //console.log('The product price is', product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
       localStorage.setItem('totalCost', product.price); 
    }
    
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products-container');

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div>
                <h2> ${item.name} </h2>
                <h2> $${item.price}.00 </h2> 
            </div>`
        })
    }
}

onLoadCartNumbers();

displayCart();

function openCart() {
    document.getElementById('cart').style.height="300px";
    // document.getElementById('mainbox').style.marginTop="300px";
    document.getElementById('closebtn').style.marginTop="300px"
}

function closeCart() {
    document.getElementById('cart').style.height="0px";
    document.getElementById('mainbox').style.marginTop="0px";
    document.getElementById('closebtn').style.marginTop="0px"
    // document.getElementById('mainbox').innerHTML="&#9776; Open";
}