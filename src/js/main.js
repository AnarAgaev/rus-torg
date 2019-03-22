// Varible for controll multiple clicks
var eventTimer = true

$( document ).ready(function() {
    // OPEN FEEDBACK MODAL
    $('.open-feedback-modal').on('click', function(event) {
        event.preventDefault()
        $('.material-slider').removeClass('visible')
        $('.material-slider__container').removeClass('active')
        $('.feedback-form').addClass('visible')
        $('.feedback-form__container').addClass('active')
        $('body').addClass('modal-open')
    })
    // CLOSE FEEDBACK MODAL
    function closeFeedbackModal() {
        $('.feedback-form').removeClass('visible')
        $('.feedback-form__container').removeClass('active')
        $('body').removeClass('modal-open')
    }
    $('.feedback-form__close').on('click', function(event) {
        event.preventDefault()
        closeFeedbackModal()
    })

    // Show material card when user clickd button Read more on the page
    $(document).on( 'click', '[data-card-id]', function (event) {
        event.preventDefault()
        // ID of the displayed card
        let cardId = $(this).attr('data-card-id')

        $('.material-slider').addClass('visible')
        $('#' + cardId).addClass('active')
        $('body').addClass('modal-open')
    })

    // Show material card About Company when user clickd About company link in main navigation
    $('a[data-card-id="about-company"]').on('click', function(event){
        event.preventDefault()
        let cardId = $(this).data('card-id')

        $('.nav__item a').not($(this)).removeClass('active')
        $(this).addClass('active')
        $('.material-slider').addClass('visible')
        $('#' + cardId).addClass('active')
        $('body').addClass('modal-open')
    })

    // Smooth scroll to the target on page when user click anchor in the main navegation
    $('[data-anchor-target]').on('click', function functionName(event) {
        event.preventDefault()
        let anchorTargetId = $(this).data('anchor-target')

        $('.nav__item a').not($(this)).removeClass('active')
        $(this).addClass('active')
        if ( $(anchorTargetId).length != 0 ) {
    	    $('html, body').animate({ scrollTop: $(anchorTargetId).offset().top }, 500);
        }
    })

    // Hide material card when user clickd button close
    $('.material-slider__close').on('click', function(){
        $('a[data-card-id="about-company"]').removeClass('active')
        hideMaterialCard()
    })

    // Moove cards inside material card slider when user clickd button left or button right
    $('.material-slider__control').on('click', function(){
        // Varible for save where we well scroll
        let  tooSide = $(this).attr('data-to-side')
        slideMaterialCard(tooSide)
    })

    // HIDE POPUP CARD WHEN USER CLICKD OUTSIDE BLOCK
	$(document).on('mouseup', function(event) {
		let targetBlockMaterial = $('.material-slider__container')
        let targetBlockFeedack = $('.feedback-form__container')

        if (!targetBlockMaterial.is(event.target) && targetBlockMaterial.has(event.target).length === 0
         && !targetBlockFeedack.is(event.target) && targetBlockFeedack.has(event.target).length === 0) {
             hideMaterialCard()
             closeFeedbackModal()
        }
	})
})

// FUNCTION FOR HIDE MATERIAL CARD
function hideMaterialCard() {
    $('.material-slider').removeClass('visible')
    $('.material-slider__container').css('marginTop','0').removeClass('active')
    $('body').removeClass('modal-open')
}

// FUNCTION FOR SLIDEING MATERIAL CARDS INSIDE CARD SLIDER
function slideMaterialCard(tooSide) {
    let activeCard = $('.material-slider__container.active').index()
    let cards = $('.material-slider__container:not(.single-card)')
    //let numCards = $('.material-slider__container:not(.single-card)').length
    let numCards = 3

    // Changed number of active card
    switch (tooSide) {
        case 'left':
            if (activeCard == 0) activeCard = --numCards
            else activeCard--
            break
        case 'right':
            if (activeCard == --numCards) activeCard = 0
            else activeCard++
            break
    }

    // Moove active card to the front and hide not active cards
    $('.material-slider__container.active').css('marginTop','-100%').removeClass('active')
    cards.eq(activeCard).css('marginTop','0').addClass('active')
}

// WIDTH ONE SLIDE PLUS RIGHT INDENT
const STEP_WIDTH = 410

// FUNCTION FOR INITIALIZATION MATERIAL SLIDER
function materialSliderInit() {
    let sliderContainer = $('.material__items')
    let firstElement = $('.material__item:first')
    let lastElement = $('.material__item:last')
    let positionLeft = sliderContainer.position().left

    // Cloning first and last element
    firstElement.clone().appendTo(sliderContainer)
    lastElement.clone().prependTo(sliderContainer)

    // Moove to the left slider container on the step width
    positionLeft -= STEP_WIDTH
    sliderContainer.css('left', positionLeft + 'px')
}
// INITIALIZATION MATERIAL SLIDER
materialSliderInit()

// FUNCTION FOR SLIDING MATERIAL SLIDER
function materialSliding(slideTo) {
    let sliderContainer = $('.material__items')
    let positionLeft = sliderContainer.position().left
    let firstElement = $('.material__item:first')
    let lastElement = $('.material__item:last')

    switch (slideTo) {
        case 'left':
            // Manipulation with DOM elements
            let activeElement = $('.material__item_active')
            activeElement.clone().prependTo(sliderContainer)
            lastElement.remove() // Deleted last element
            $('.material__item_active').addClass('material__item_passive').removeClass('material__item_active')
            $('.material__item:eq(2)').removeClass('material__item_passive').addClass('material__item_active')
            positionLeft -= STEP_WIDTH
            sliderContainer.css('left', positionLeft + 'px')
            positionLeft += STEP_WIDTH
            sliderContainer.animate({left: positionLeft + 'px'}, 700, 'easeOutQuart')

            // positionLeft += STEP_WIDTH
            // sliderContainer.animate(
            //     {left: positionLeft + 'px'},
            //     500,
            //     'expoout',
            //     function(){
            //         // Manipulation with DOM elements
            //         let activeElement = $('.material__item_active')
            //         activeElement.addClass('material__item_passive').removeClass('material__item_active')
            //         $('.material__item:last').prependTo(sliderContainer) // Cloning last element to the front
            //         lastElement.remove() // Deleted last element
            //         let numElements = $('.material__item').length - 2 // Number of the last but one element
            //         $('.material__item:eq(' + numElements + ')').clone().prependTo(sliderContainer) // Cloning last but one element to the front
            //         sliderContainer.css('left', '-' + STEP_WIDTH + 'px') // Moove slider container to the start position
            //         $('.material__item:eq(2)').removeClass('material__item_passive').addClass('material__item_active')
            //     })

            break
        case 'right':
            positionLeft -= STEP_WIDTH
            sliderContainer.animate(
                {left: positionLeft + 'px'},
                500,
                'expoout',
                function(){
                    // Manipulation with DOM elements
                    let activeElement = $('.material__item_active')
                    activeElement.addClass('material__item_passive').removeClass('material__item_active')
                    firstElement.remove() // Deleted first element
                    $('.material__item:eq(1)').clone().appendTo(sliderContainer) // Cloning last but one element to the front
                    sliderContainer.css('left', '-' + STEP_WIDTH + 'px')
                    $('.material__item').removeClass('material__item_active')
                    $('.material__item:eq(2)').removeClass('material__item_passive').addClass('material__item_active')
                })
            break
    }
}

// HANDLE CLICK ON TO THE LEFT OR TO THE RIGHT IN MATERIAL SLIDER
$('.material__arr_left').on('click', function(){
    if(eventTimer) {
        eventTimer = false
        setTimeout(function() {
            eventTimer = true
        }, 1000)
        materialSliding('left')
    }
})
$('.material__arr_right').on('click', function(){
    if(eventTimer) {
        eventTimer = false
        setTimeout(function() {
            eventTimer = true
        }, 1000)
        materialSliding('right')
    }
})
