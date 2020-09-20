
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