
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
        price: 50,
        inCart: 0
    }
]

for (let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers();
    })
}

function cartNumbers() {
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
    
}