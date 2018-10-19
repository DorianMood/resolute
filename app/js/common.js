// process monthly payments
const monthlyPayments = (amount, yearRate, period) => {
	let monthRate = 1.0 * yearRate / 12.0 / 100;
	//  amount * (monthRate * (1 + monthRate) ^ period) / ((1 + monthRate) ^ period — 1)
	let payment = amount * (monthRate * Math.pow(1 + monthRate, period)) /
		(Math.pow(1 + monthRate, period) - 1);
	return Math.ceil(payment);
}
// refresh all the inputs in calculator
const refresh = () => {
	let cost = parseInt($('#cost')[0].value);
	let firstPayment = parseInt($('#first-payment')[0].value);
	let amount = cost - firstPayment;
	let period = parseInt($('#period')[0].value);
	let percent = parseFloat($('#percent')[0].value);
	let payment = monthlyPayments(amount, percent, period);

	$('#amount')[0].value = amount;
	$('#amount-label').addClass('active');
	$('#payment')[0].value = payment || 'Недостаточно данных';
	$('#payment-label').addClass('active');
}
// process parameters from the href
const processParameters = () => {
	let url = new URL(document.location.href);
	
	let params = {};
	params['cost'] = parseInt(url.searchParams.get('price').replace(/\s/g, ''));
	
	$('#cost')[0].value = params.cost;
}

$(document).ready(function () {
	processParameters();
	refresh();
	$('input.form-control').on('keyup', (e) => {
		refresh();
	});
})

// navbar scroll
$(function(){
	const shrinkHeader = 100;
	$(window).scroll(function() {
		var scroll = getCurrentScroll();
		if ( scroll >= shrinkHeader ) {
			$('.logo').addClass('shrink');
			$('.navbar-phone').addClass('shrink');
		}
		else {
			$('.logo').removeClass('shrink');
			$('.navbar-phone').removeClass('shrink');
		}
	});
	function getCurrentScroll() {
		return window.pageYOffset || document.documentElement.scrollTop;
	}
});