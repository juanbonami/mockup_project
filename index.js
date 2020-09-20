
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


const faders = document.querySelector('.grid-container');

const options = {
    threshold: 1
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


appearOnScroll.observe(faders);
