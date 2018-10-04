/*---------animation-----------*/
let portfolioBox = Array.from(document.querySelectorAll('.portfolio .porfolio__box'));
let portfolioImgs = Array.from(document.querySelectorAll('.portfolio .porfolio__box img'));
let feedbackBoxs = Array.from(document.querySelectorAll('.feedback .feedback_box'));
let headerMenuIcon = $('.header_menu-icon');


function getCoords(elem) { // кроме IE8-
	if(elem !== null) {
  var box = elem.getBoundingClientRect();

	  return {
	    top: box.top + pageYOffset,
	    left: box.left + pageXOffset
	  };
	}
}

portfolioBox.map(function(elem, index) {
		elem.style.opacity = 0;
})
feedbackBoxs.map(function(elem, index) {
	elem.classList.add('animated');
		elem.style.opacity = 0;
});



/*=============Функции при скролле===============*/

$(document).ready(function() {
	let cloneHeader = $('.fixed_header');
	let winHeight = $(document).height();
	let step = 5;
	let timeScroll = winHeight/step;
	$(window).on('scroll', function(e) {
		let scrolled = window.pageYOffset || document.documentElement.scrollTop;
		let header = $('.header');
		/*-----------------------Появление хедера ---------------------*/
		if($(this).scrollTop() < 40) {
			$('.header').css({'padding-top' : 0, 'top' : "20px"})
			}
			else if($(this).scrollTop() > 40){
				$('.header').css({'top' : "-150px"});
			}

			
		/*-----------------------Появление блока с темами галереи---------------------*/
		portfolioBox.map(function(elem, index) {
			let offsetTop = getCoords(elem);
			let $winHeight = $(window).height() - 138;
			if(scrolled > (offsetTop.top - $winHeight) && !elem.classList.contains('fadeInUp')) {
				elem.classList.add('fadeInUp');
				elem.addEventListener('animationend', function() {
	   				elem.style.opacity = 1;
				});

			};
		});
		/*-----------------------Появление блока отзывов---------------------*/
		feedbackBoxs.map(function(elem, index) {
			let offsetElem = getCoords(elem);
			let $winHeight = $(window).height() - 138;
			if(scrolled > offsetElem.top - $winHeight ) {
				if(index === 0) {
					elem.classList.add('fadeInLeft');
					elem.addEventListener('animationend', function() {
	   				elem.style.opacity = 1;
					});
				}
				if(index == 1) {
					elem.classList.add('fadeInRight');
					elem.addEventListener('animationend', function() {
	   				elem.style.opacity = 1;
					});
				}
				if(index == 2) {
					elem.classList.add('fadeInUp');
					elem.addEventListener('animationend', function() {
	   				elem.style.opacity = 1;
					});
				}
			};
		});
		/*=====================Форма появление=======================*/
		let form = document.querySelector('form.form');
		if(form !== null) {
		let $winHeight = $(window).height() - 138;
		let offsetForm = getCoords(form);
		if(scrolled > offsetForm.top - $winHeight && !form.classList.contains('fadeInUp')) {
				form.classList.add('fadeInUp');
				form.addEventListener('animationend', function() {
				form.style.opacity = 1;
				})
			}
		};
		/*-----------------------Кнопка наверх---------------------*/
		if (scrolled > document.documentElement.clientHeight) {
			$('.button_top').addClass('btn_show');
		}
		else if (scrolled <= document.documentElement.clientHeight) {
			$('.button_top').removeClass('btn_show');
		};

	}); 

	$('.button_top').on('click', function(){
			$('html, body').animate({
				scrollTop: 0
			}, timeScroll);
		});
	/*=================end window scroll=====================*/

	

	/*-----------------------Form---------------------*/
	$("[name = 'tel']").bind("change keyup input click",function(){
		if(this.value.match(/[^0-9]/g)){
			this.value=this.value.replace(/[^0-9]/g,'');
		}
		// $(this).parent().find("span.err").html('Здесь только цифры телефона');
	});

	function testInputName(e) {

	}

/*==============появление меню по кнопке в хедере ================*/
	$('.header_menu-icon').on('click', function(e) {
		$(this).toggleClass('menu_icon_active').prev().toggleClass('menu_active');
	});
	
/*====================FAQ contact.html==================*/
	let asks = $('.faq .ask').on('click', function(e) {
		let answ = $(this).next();
		$('.faq .ask').not($(this)).removeClass('active');
		$(this).addClass('active');
		$('.faq .answ').not(answ).fadeOut(300);
		answ.slideToggle(300);
	});
	$('.contact_form label').css({'position': "relative"});
 /*=========================form=======================*/
 let form = $('form');
 let name = $('input[name="name"]');
 let email = $('input[name="email"]');
 let tel = $('input[name="tel"]');


 	// form.onsubmit = validInput;
 	let namePatern = /[0-9a-zA-Zа-яА-ЯёЁ_-]{4,50}/i; 
 	let emailPatern = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm ; 
 	let telPatern = /[0-9]{7,11}/i; 


 	name.on('input', function(e) {
 		nameTest();
 	});
 	email.on('input', function(e) {
 		emailTest();
 	});
 	tel.on('input', function(e) {
 		telTest();
 	});

	

	function nameTest(e) {

		let nameVal = name.val();
		if (nameVal.search(namePatern) == -1) {
			name.css({'box-shadow' : "none", 'border-bottom': "2px solid red"}).nextAll('.err').html('Не меньше трех символов');
			return false;
		}
		else {
			name.css({'border-bottom': "2px solid #03C26C"}).nextAll('.err').html('');
			return true;
		}
	}

	function emailTest(e) {
		let emailVal = email.val();
		if (emailVal.search(emailPatern) == -1) {
			email.css({'box-shadow' : "none", 'border-bottom': "2px solid red"}).nextAll('.err').html('Как минимум адрес почты должен быть настоящим');
			return false;
		}
		else {
			email.css({'border-bottom': "2px solid #03C26C"}).nextAll('.err').html('');
			return true;
		}
	}

	function telTest(e) {
		let telVal = tel.val();
		if (telVal.search(telPatern) == -1) {
			tel.css({'box-shadow' : "none", 'border-bottom': "2px solid red"}).nextAll('.err').html('Здесь только цифры телефона');
			return false;
		}
		else {
			tel.css({'border-bottom': "2px solid #03C26C"}).nextAll('.err').html('');
			return true;
		}
	}

	form.on('submit', function(e) {
		if(!validInput()) {
			e.preventDefault();
		}
		
	})

	function validInput() {

		if(nameTest() && telTest() || nameTest() && emailTest()) {
			return true;
		}
		else {
			return false;
		}
	};

});





