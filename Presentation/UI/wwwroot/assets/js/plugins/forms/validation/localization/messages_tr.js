/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: TR (Turkish; Türkçe)
 */
$.extend( $.validator.messages, {
	required: "This field is required.",
	remote: "Lütfen bu alanı düzeltin.",
	email: "Please enter a valid e-mail address.",
	url: "Lütfen geçerli bir web adresi (URL) giriniz.",
	date: "Lütfen geçerli bir tarih giriniz.",
	dateISO: "Lütfen geçerli bir tarih giriniz(ISO formatında)",
	number: "Lütfen geçerli bir sayı giriniz.",
	digits: "Lütfen sadece sayısal karakterler giriniz.",
	creditcard: "Lütfen geçerli bir kredi kartı giriniz.",
	equalTo: "Lütfen aynı değeri tekrar giriniz.",
	extension: "Lütfen geçerli uzantıya sahip bir değer giriniz.",
	maxlength: $.validator.format( "Lütfen en fazla {0} karakter uzunluğunda bir değer giriniz." ),
	minlength: $.validator.format( "Lütfen en az {0} karakter uzunluğunda bir değer giriniz." ),
	rangelength: $.validator.format( "Lütfen en az {0} ve en fazla {1} uzunluğunda bir değer giriniz." ),
	range: $.validator.format( "Lütfen {0} ile {1} arasında bir değer giriniz." ),
	max: $.validator.format( "Lütfen {0} değerine eşit ya da daha küçük bir değer giriniz." ),
	min: $.validator.format( "Lütfen {0} değerine eşit ya da daha büyük bir değer giriniz." ),
	require_from_group: $.validator.format( "Lütfen bu alanların en az {0} tanesini doldurunuz." )
} );
