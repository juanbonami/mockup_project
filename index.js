
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

for (let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        let productNumbers = localStorage.getItem('cartNumbers');
        console.log(productNumbers);
        localStorage.setItem('cartNumbers', 1);
    })
}