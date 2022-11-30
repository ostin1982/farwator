if($('.burger')) {
    $(() => {
        $('.burger').click(() => {
            $('.carte').addClass('dynamic');
            $('.cross').addClass('active');
            $('.burger').addClass('not-active');
        })

        $('.cross').click(() => {
            $('.carte').removeClass('dynamic');
            $('.cross').removeClass('active');
            $('.burger').removeClass('not-active');
        })
    })
}

jQuery(($) => {
    $(".js-phone").mask("+7 (999) 999-99-99");
});


$('.js-scroll').click(function(event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top + 'px'
    }, {
        duration: 1000,
        easing: 'swing'
    });
    return false
})


const more = document.querySelector('.js-more');
const checklist = document.querySelector('.js-checklist');

if(more) {
    more.addEventListener('click', (event) => {
        event.preventDefault();

        checklist.classList.toggle('visible');

        if(more.innerText === 'Показать ещё') {
            more.innerText = 'Скрыть'
        } else {
            more.innerText = 'Показать ещё'
        }
    })
} 

const price = $('.js-price');
const cross = $('.js-cross');
const body = $('body');

if(price) {
    $(() => {
        price.click((event) => {
            event.preventDefault();

            const table = event.target.closest('.js-price');
            const tableId = table.getAttribute('href').replace('#', '');
            const tableWindow = document.getElementById(tableId);

            body.addClass('lock');
            tableWindow.classList.add('notable');
        })

        cross.click((event) => {
            event.preventDefault();

            const table = $('.table');
            body.removeClass('lock');
            table.removeClass('notable');
        })
    })
}

const button = $('.js-popup');
const popupM = $('.js-popup-info');
const discount = $('.js-post-app');
const thanks = $('.js-popup-thanks');
const crossM = $('.js-popup-close');
const dialog = $('.js-dialog');

const onCick = (element, development) => {
    element.click((event) => {
        event.preventDefault();

        body.addClass('lock');
        development.css('display', 'flex');
    });    
}

onCick(button, popupM);
onCick(discount, thanks);

const closing = (element, development) => {
    element.click((event) => {
        event.preventDefault();

        body.removeClass('lock');
        development.css('display', 'none');
    });
}

closing(crossM, popupM);
closing(crossM, thanks);

const outsideWindow = (element) => {
        $(document).mouseup((event) => { 
            if (event.target != dialog[0] && dialog.has(event.target).length === 0) {

            body.removeClass('lock');
            element.css('display', 'none');
        }
    });
}

outsideWindow(popupM); 
outsideWindow(thanks); 

$(function(){  
    body.on('click', '.js-post-app', function() {
        $form = $(this).closest("div").prev("div").children("form");
        if ($form.length == 0){
            $form = $(this).closest("form");
        }
        if (!loading)
        {
            loading = true;

            ar = fill_mas([$form]);
            
            ar['mode'] = 'send_form';
            ar['mango'] = $("[data-mango]").data("mango");
            ar['referal'] = $("[name=referal]").val(); 
            
            argv = {op: 'data', args: ar};
    
            doPostAjax(argv, function(code, answer){
                loading = false;      
                
                if (code == "success")
                {
                    thanks.css('display', 'flex');
                    $form.find("input[type=text], textarea").val('');
                }
                
                if (code == "error")
                {
                    $form.find("[name=" + answer[0] + "]").focus();
                }
            });
        }        
        
        return false;
    });  

});