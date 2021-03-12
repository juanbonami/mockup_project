
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

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButton = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addToCartButton.length; i++) {
        let button = addToCartButton[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-clicked')[0].addEventListener('click', purchaseClicked)
}

function cartNumberChanged() {
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let totalNumber = 0
    let quantity = cartItems.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantity.length; i++) {
        totalNumber += parseInt(quantity[i].value)
    }
    document.getElementById('cart-number').innerText = totalNumber
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('item-title')[0].innerText
    let price = shopItem.getElementsByClassName('item-price')[0].innerText
    addItemToCart(title, price)
    updateCartTotal()
}

function addItemToCart(title, price) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.classList.add('row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRowContents = `
            
                <div class="product-row col-4 item-title">
                    ${title}
                </div>
                <div class="product-row col-4 cart-price">
                    ${price}
                </div>
                <div id="remove" class="product-row col-4">
                    <input class="cart-quantity-input" type="number" value="1">
                    <p class="remove-button"> REMOVE </p>
                </div>
            `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove-button')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (var i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseInt(priceElement.innerHTML.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    cartNumberChanged()
}


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