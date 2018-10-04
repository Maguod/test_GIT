
/*===============ФУНКЦИЯ Появления ГАЛЕРЕИ С ЭФФЕКТАМИ===================*/
/*клонирую оверлай*/
var $overlayClone = $('a.overlay_gallary').clone(true);

function insertCloneOverlay() 
{
		$overlayClone.appendTo($('.gallary__slider'));
};

function maskForCreatGallary() {
    // insertCloneOverlay();
	$('.image_gallary').imagesLoaded()
	  .always( function( instance ) {
	  	$('.gallary__slider').removeClass('hidden');
	  	$('.gallary__slider .wrap').masonry({
		  itemSelector: '.image_gallary',
		  columnWidth: '.image_gallary',
		  originLeft: true,
		  percentPosition: true
		}).find($('.image_gallary')).removeClass('hidden').parent('.wrap').siblings('a.overlay_gallary').remove()
	  })
	  .done( function( instance ) {
	    
	  	$('.gallary__slider a.overlay_gallary').remove();
	  })
	  .progress( function( instance, image ) {

	  });
};

function creatGallary(targetGallary) {
	$('.gallary__slider').empty();
	let sortImages = allObj.filter(function(elem, index) {
		if (elem.title === targetGallary) {
			return elem;
		}
	});
	let wrap = $('<div/>').addClass('wrap');
	sortImages.map(function(elem, index) {
		let div = $('<div/>').addClass('image_gallary').addClass('hidden');
		let link = $('<a/>').attr({
			 'href'        : 'images/' + elem.image,
			'data-fancybox': 'images',
			'data-caption' : elem.title
		});
		let img = $('<img>').attr({
			'src': 'images/' + elem['imagemin'],
			'alt': ""
		});
		img.appendTo(link);
		link.appendTo(div);
		div.appendTo(wrap);
		return wrap;
	})
	wrap.appendTo($('.gallary__slider'));
	insertCloneOverlay();
	maskForCreatGallary();
};
/*===========================/--------------/=====================*/
window.onload = function() {

	$('.image_gallary').imagesLoaded()
	  .always( function( instance ) {
	  	$('.gallary__slider').removeClass('hidden');
	  	$('.image_gallary').addClass('animated').addClass('fadeInUp');
	    console.log('Все изображения загружены');
	  })
	  .done( function( instance ) {
	  	$('.image_gallary').on('animationend', function(e) {
	  		$('.image_gallary').removeClass('fadeInUp').removeClass('animated');
	  		$('a.overlay_gallary').remove();
	  	})
	    // console.log('Все изображения загрузились удачно');
	  })
	  .progress( function( instance, image ) {
	    // let result = image.isLoaded ? 'загрузилось' : 'не загрузилось';
	    // console.log( 'Изображение ' + image.img.src + result );
	  });
	  /*=======темный блок сортировки подвесил функции=====*/
	  $('.drop__down').on('click', "li", function(e) {
		  	let targetGallary = $(this).attr('data-target');
		  	creatGallary(targetGallary);
		});
	  /*======the end темный блок======*/

	  $('.gallary__slider .wrap').masonry({
		  itemSelector: '.image_gallary',
		  columnWidth: '.image_gallary',
		  originLeft: true,
		  percentPosition: true
		});

	  /*===================Скрипты для сайдбара сортировки галлереи===============*/
	$('.sidebar__nav').on('click', "a", function(e) {
		$('div.sidebar').remove();
		$('.inputs__group').fadeIn(400);
		$('.main__gallary .gallary__slider').css({'width' : "100%"})
	  	let targetGallary = $(this).parent().attr('data-target');
	  	creatGallary(targetGallary);
	});
	/*==============появление меню по кнопке в хедере ================*/
	
/*===========================FancyBox================================*/
	$.fancybox.defaults.buttons = [
		  'fullScreen',
		  'thumbs',
		  'zoom',
		  'close'
	];
	$('[data-fancybox]').fancybox({
		animationEffect: "zoom",
		fullScreen : true,
		center : true,
		hash : false
	});

/*---------------изменение ширины экрана----------------*/
	$(window).resize(function() {
    if ($(window).width() > '993'){
      		$('.fixed_header').removeClass('fadeInDown').addClass('toTop_block');
		}
    });
	
};



